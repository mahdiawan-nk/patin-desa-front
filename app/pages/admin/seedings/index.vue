<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})

useDynamicSeo({
    title: 'Panel - Kolam',
    description: 'Budidaya ikan patin segar langsung dari XIII Koto Kampar. Beli ikan patin segar berkualitas tinggi.',
    image: '/og-image.jpg'
})

import { useApiTable } from '~/composables/useApiTable';
import { useUserApi } from '~/composables/useUserApi';
import { useKolamApi } from '~/composables/useKolamApi';
import type { TableColumn } from '@nuxt/ui'
import SeedingCreateModal from '~/components/admin/seedings/CreateModal.vue'
import SeedingEditModal from '~/components/admin/seedings/EditModal.vue'
const toast = useToast()
const config = useRuntimeConfig()
const endpoint = config.public.API_URL + '/seedings'
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showFilterModal = ref(false)
const selectedSeeding = ref<any | null>(null)
const showDeleteModal = ref(false)
const deletingSeeding = ref<any | null>(null)

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

interface Seeding {
    id: string
    kolam: {
        id: string
        nama_kolam: string
        jenis_kolam: string
        user: {
            fullname: string
        }
    }
    jenis_benih: string
    tanggal_tebar: string
    jumlah_tebar: string
    rata_rata_berat_awal: string
    kepadatan_tebar: string
    status_seeding: string
    catatan: string
}

const columns: TableColumn<Seeding>[] = [
    { accessorKey: 'no', header: 'No', id: 'no' },
    { accessorKey: 'detail_kolam', header: 'Detail Kolam' }, // akan di-render via slot
    { accessorKey: 'kolam.user.fullname', header: 'Pemilik' },
    { accessorKey: 'tanggal_tebar', header: 'Tanggal Tebar' },
    { accessorKey: 'jenis_benih', header: 'Jenis Benih' },
    { accessorKey: 'detail_tebar', header: 'Jumlah / Berat / Kepadatan' }, // custom slot
    { accessorKey: 'status_seeding', header: 'Status' },
    { accessorKey: 'catatan', header: 'Catatan' },
    { accessorKey: 'action', header: 'Aksi' },
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
} = useApiTable<Seeding>(endpoint)

filters.value = {
    status_seeding: null,
    kolam_budidaya_id: null,
    owner: null,
    tanggal_tebar: null
}



function openEdit(row: any) {
    selectedSeeding.value = row.original
    console.log(row.original)
    showEditModal.value = true
}
const from = computed(() => {
    if (!meta.value) return 0
    return (page.value - 1) * perPage.value + 1
})

const onSeedingCreated = async () => {
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil disimpan.',
        color: 'success'
    })
}

const onSeedingUpdated = async () => {
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil diupdate.',
        color: 'success'
    })
}

const confirmDelete = (row: any) => {
    deletingSeeding.value = row.original
    showDeleteModal.value = true
}

const remove = async () => {
    if (!deletingSeeding.value) return

    try {
        await $fetch(`${endpoint}/${deletingSeeding.value.id}`, {
            method: 'DELETE',
        })

        await fetchData()
        toast.add({
            title: 'Berhasil!',
            description: `User ${deletingSeeding.value.nama_kolam} berhasil dihapus.`,
            color: 'success'
        })
    } catch (err: any) {
        toast.add({
            title: 'Gagal!',
            description: err?.data?.message || 'Terjadi kesalahan saat menghapus user.',
            color: 'error'
        })
    } finally {
        showDeleteModal.value = false
        deletingSeeding.value = null
    }
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
const to = computed(() => {
    if (!meta.value) return 0
    return Math.min(page.value * perPage.value, meta.value.total)
})

onMounted(() => {
    fetchData()
    fetchUserOptions()
    fetchKolamOptions()
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
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Data Penebaran Benih</h2>
                </div>
            </div>

            <div class="flex items-center mt-4 gap-x-3">
            </div>
        </div>

        <UCard>
            <template #header>
                <div class="flex justify-end items-center">
                    <UButton label="Tambah Penebaran" color="secondary" icon="i-lucide-plus"
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

                <template #detail_tebar-cell="{ row }">
                    <div class="space-y-1 text-sm">
                        <div><strong>Jumlah:</strong> {{ row.original.jumlah_tebar }}</div>
                        <div><strong>Berat Awal:</strong> {{ row.original.rata_rata_berat_awal }}</div>
                        <div><strong>Kepadatan:</strong> {{ row.original.kepadatan_tebar }}</div>
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
    <SeedingCreateModal v-model="showCreateModal" @created="onSeedingCreated" />
    <SeedingEditModal v-model="showEditModal" :seeding="selectedSeeding" @updated="onSeedingUpdated" />
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
                <!-- Status Seeding -->
                <UFormField label="Status Seeding">
                    <div class="flex items-center gap-2">
                        <USelect v-model="filters.status_seeding" :items="['berjalan', 'selesai']"
                            placeholder="Filter Status Seeding" class="flex-1" />
                        <UButton v-if="filters.status_seeding" label="Clear" color="gray" variant="soft"
                            icon="i-lucide-x-circle" size="sm" @click="filters.status_seeding = null" />
                    </div>
                </UFormField>

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
