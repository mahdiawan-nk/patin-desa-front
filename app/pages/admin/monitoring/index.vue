<script lang="ts" setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})
useDynamicSeo({
    title: 'Panel - Monitoring & Event',
    description: 'Budidaya ikan patin segar langsung dari XIII Koto Kampar. Beli ikan patin segar berkualitas tinggi.',
    image: '/og-image.jpg'
})

import { useApiTable } from '~/composables/useApiTable';
import { useMonitoringsApi } from '~/composables/useMonitoringsApi';
import { useUserApi } from '~/composables/useUserApi';
import { useKolamApi } from '~/composables/useKolamApi';
import type { TableColumn } from '@nuxt/ui'
import MonitoringCreateModal from '~/components/admin/monitoring/CreateModal.vue';
import MonitoringEditModal from '~/components/admin/monitoring/EditModal.vue';

const toast = useToast()
const config = useRuntimeConfig()
const endpoint = config.public.API_URL + '/kolam-monitorings'
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedMonitoring = ref<any | null>(null)
const showDeleteModal = ref(false)
const deletingMonitoring = ref<any | null>(null)
const showFilterModal = ref(false)

const { deleteMonitorings } = useMonitoringsApi()
const { getListUser } = useUserApi()
const { getListKolam } = useKolamApi()
interface UserResponse {
    id: string
    fullname: string
}
const userOptions = ref<{ label: string; value: string }[]>([])

interface KolamResponse {
    id: string
    nama_kolam: string
}

const kolamOptions = ref<{ label: string; value: string }[]>([])
interface Monitoring {
    id: string;
    tanggal_monitoring: string;
    water_ph: number;
    oxygen_level: number;
    amonia_level: number;
    keterangan: string;
    kolam_budidaya_id: string;
    kolam: {
        id: string;
        nama_kolam: string;
        user: {
            id: string;
            fullname: string;
        }
    }
}

const columns: TableColumn<Monitoring>[] = [
    { accessorKey: 'no', header: 'No', id: 'no' },
    { accessorKey: 'tanggal_monitoring', header: 'Tanggal Monitoring'},
    { accessorKey: 'water_ph', header: 'Water PH'},
    { accessorKey: 'oxygen_level', header: 'Oxygen Level' },
    { accessorKey: 'amonia_level', header: 'Amonia Level' },
    { accessorKey: 'keterangan', header: 'Keterangan'},
    { accessorKey: 'kolam.nama_kolam', header: 'Kolam'},
    { accessorKey: 'kolam.user.fullname', header: 'User'},
    { accessorKey: 'action', header: 'Aksi'},
]

const {
    rows,
    meta,
    page,
    perPage,
    search,
    filters,
    loading,
    error,
    fetchData,
} = useApiTable<Monitoring>(endpoint)

filters.value = {
    kolam_budidaya_id: null,
    owner: null,
}

function openEdit(row: any) {
    selectedMonitoring.value = row.original
    console.log(row.original)
    showEditModal.value = true
}
const from = computed(() => {
    if (!meta.value) return 0
    return (page.value - 1) * perPage.value + 1
})

const onMonitoringCreated = async () => {
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil disimpan.',
        color: 'success'
    })
}

const onMonitoringUpdated = async () => {
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil diupdate.',
        color: 'success'
    })
}

const confirmDelete = (row: any) => {
    deletingMonitoring.value = row.original
    showDeleteModal.value = true
}

const remove = async () => {
    if (!deletingMonitoring.value) return
    await deleteMonitorings(deletingMonitoring.value.id)
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: `Monitoring ${deletingMonitoring.value.tanggal_monitoring} berhasil dihapus.`,
        color: 'success'
    })
    showDeleteModal.value = false
    deletingMonitoring.value = null
}

async function fetchUserOptions() {
    try {
        const { data } = await getListUser()
        userOptions.value = data.map((user: UserResponse) => ({
            label: user.fullname,
            value: user.id,
        }))
    } catch (err: any) {
        console.error('Gagal fetch user options', err?.response?._data || err)
    }
}

async function fetchKolamOptions() {
    try {
        const { data } = await getListKolam()
        kolamOptions.value = data.map((kolam: KolamResponse) => ({
            label: kolam.nama_kolam,
            value: kolam.id,
        }))
    } catch (err: any) {
        console.error('Gagal fetch kolam options', err?.response?._data || err)
    }
}


onMounted(() => {
    fetchData()
    fetchUserOptions()
    fetchKolamOptions()
})

const to = computed(() => {
    if (!meta.value) return 0
    return Math.min(page.value * perPage.value, meta.value.total)
})

watch(filters, () => {
    page.value = 1 // reset page ke 1
    fetchData()
}, { deep: true })

watch([page, perPage, search], () => fetchData())

</script>

<template>
    <div class="p-6">
        <div class="sm:flex sm:items-center sm:justify-between mb-4">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Data Monitoring Kolam</h2>
                </div>
            </div>

            <div class="flex items-center mt-4 gap-x-3">
            </div>
        </div>

        <UCard>
            <template #header>
                <div class="flex justify-end items-center">
                    <UButton label="Tambah Monitoring" color="secondary" icon="i-lucide-plus"
                        @click="showCreateModal = true" />
                </div>
            </template>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <!-- Per page -->
                <div class="w-full sm:w-auto">
                    <USelect v-model="perPage" :items="[10, 20, 30]" />
                </div>

                <!-- Filter -->
                <div class="flex gap-2 w-full sm:w-auto items-center">
                    <UButton label="Filter" color="secondary" icon="i-lucide-filter" @click="showFilterModal = true" />

                </div>

                <!-- Search -->
                <div class="w-64">
                    <UInput v-model="search" class="w-full" placeholder="Cari kolam..." icon="i-lucide-search" />
                </div>
            </div>

            <UTable :data="rows" :columns="columns" :loading="loading">
                <template #detail_kolam-cell="{ row }">
                    <div>
                        <div><strong>{{ row.original.kolam.nama_kolam }}</strong></div>
                        <div>{{ row.original.kolam.jenis_kolam }}</div>
                    </div>
                </template>


                <template #action-cell="{ row }">
                    <div class="flex gap-2">
                        <UButton label="Edit" color="secondary" icon="i-lucide-edit" variant="link" size="xs"
                            @click="openEdit(row)" />
                        <UButton label="Hapus" color="error" icon="i-lucide-trash-2" variant="link" size="xs"
                            @click="confirmDelete(row)" />
                    </div>
                </template>
            </UTable>

            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                <!-- Info entries -->
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Showing {{ from }} to {{ to }} of {{ meta?.total || 0 }} entries
                </p>

                <!-- Pagination -->
                <UPagination v-if="meta" v-model="page" :page-count="perPage" :total="meta.total" show-first show-last
                    class="shrink-0" />
            </div>

        </UCard>
    </div>
    <MonitoringCreateModal v-model="showCreateModal" @created="onMonitoringCreated" />
    <MonitoringEditModal v-model="showEditModal" :monitoring="selectedMonitoring" @updated="onMonitoringUpdated" />
    <UModal v-model:open="showDeleteModal" :ui="{ footer: 'justify-end space-x-2' }">
        <template #header>
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-alert-triangle" class="text-red-500 w-5 h-5" />
                <span class="text-base font-semibold text-gray-900 dark:text-white">
                    Konfirmasi Hapus
                </span>
            </div>
        </template>
        <template #body>
            <div class="py-2 text-sm text-gray-600 dark:text-gray-300">
                Apakah Anda yakin ingin menghapus Data Penebaran ini

                ? Tindakan ini tidak dapat dibatalkan.
            </div>
        </template>


        <template #footer>
            <UButton label="Batal" color="gray" variant="ghost" @click="showDeleteModal = false" />
            <UButton label="Hapus" color="error" icon="i-lucide-trash-2" @click="remove" />
        </template>
    </UModal>
    <UModal v-model:open="showFilterModal" :ui="{ footer: 'justify-end space-x-2', content: 'w-96' }" title="Filter">
        <template #body>
            <div class="py-4 text-sm text-gray-700 dark:text-gray-300 grid grid-cols-1 sm:grid-cols-1 gap-4">
                <!-- Pemilik -->
                <UFormField label="Pemilik">
                    <div class="flex items-center gap-2">
                        <USelectMenu v-model="filters.owner" value-key="value" :items="userOptions"
                            placeholder="-- Pilih Pemilik --" class="flex-1" />
                        <UButton v-if="filters.owner" label="Clear" color="gray" variant="soft" icon="i-lucide-x-circle"
                            size="sm" @click="filters.owner = null" />
                    </div>
                </UFormField>

                <!-- Kolam -->
                <UFormField label="Kolam">
                    <div class="flex items-center gap-2">
                        <USelectMenu v-model="filters.kolam_budidaya_id" value-key="value" :items="kolamOptions"
                            placeholder="-- Pilih Kolam --" class="flex-1" />
                        <UButton v-if="filters.kolam_budidaya_id" label="Clear" color="gray" variant="soft"
                            icon="i-lucide-x-circle" size="sm" @click="filters.kolam_budidaya_id = null" />
                    </div>
                </UFormField>
            </div>

        </template>
    </UModal>
</template>