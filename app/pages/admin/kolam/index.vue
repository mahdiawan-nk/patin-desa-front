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
import type { TableColumn } from '@nuxt/ui'
import KolamCreateModal from '~/components/admin/kolam/CreateModal.vue'
import KolamEditModal from '~/components/admin/kolam/EditModal.vue'
const toast = useToast()
const config = useRuntimeConfig()
const endpoint = config.public.API_URL + '/kolam'
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedKolam = ref<any | null>(null)
const showDeleteModal = ref(false)
const deletingKolam = ref<any | null>(null)

interface KolamBudidaya {
    id: string
    nama_kolam: string
    lokasi_kolam: string
    jenis_kolam: string
    status_kolam: string
    user: {
        fullname: string
    }
}

const columns: TableColumn<KolamBudidaya>[] = [
    { accessorKey: 'no', header: 'No', id: 'no' }, // tambahkan id biar tidak error
    { accessorKey: 'nama_kolam', header: 'Nama Kolam' },
    { accessorKey: 'detail', header: 'Detail Kolam' },
    { accessorKey: 'jenis_kolam', header: 'Jenis' },
    { accessorKey: 'status_kolam', header: 'Status' },
    { accessorKey: 'user.fullname', header: 'Pemilik' },
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
} = useApiTable<KolamBudidaya>(endpoint)

filters.value = {
    status_kolam: null,
    jenis_kolam: null,
}

onMounted(() => {
    fetchData()
})

watch([page, perPage, search, () => filters.value], () => {
    fetchData()
}, { deep: true })

function openEdit(row: any) {
    selectedKolam.value = row.original
    showEditModal.value = true
}
const from = computed(() => {
    if (!meta.value) return 0
    return (page.value - 1) * perPage.value + 1
})

const onKolamCreated = async () => {
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil disimpan.',
        color: 'success'
    })
}

const onKolamUpdated = async () => {
    await fetchData()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil diupdate.',
        color: 'success'
    })
}

const confirmDelete = (row: any) => {
    deletingKolam.value = row.original
    showDeleteModal.value = true
}

const remove = async () => {
    if (!deletingKolam.value) return

    try {
        await $fetch(`${endpoint}/${deletingKolam.value.id}`, {
            method: 'DELETE',
        })

        await fetchData()
        toast.add({
            title: 'Berhasil!',
            description: `User ${deletingKolam.value.nama_kolam} berhasil dihapus.`,
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
        deletingKolam.value = null
    }
}

const to = computed(() => {
    if (!meta.value) return 0
    return Math.min(page.value * perPage.value, meta.value.total)
})
</script>

<template>
    <div class="p-6">
        <div class="sm:flex sm:items-center sm:justify-between mb-4">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Data Kolam Budidaya</h2>
                </div>
            </div>

            <div class="flex items-center mt-4 gap-x-3">
            </div>
        </div>

        <UCard>
            <template #header>
                <div class="flex justify-end items-center">
                    <UButton label="Tambah Kolam" color="secondary" icon="i-lucide-plus"
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
                    <USelect v-model="filters.status_kolam" :items="['aktif', 'nonaktif']"
                        placeholder="Filter Status Kolam" class="flex-1 sm:flex-none" />
                    <UButton v-if="filters.status_kolam" label="Clear" color="gray" variant="soft"
                        icon="i-lucide-x-circle" @click="filters.status_kolam = null" />
                </div>

                <!-- Search -->
                <div class="w-full sm:w-64">
                    <UInput v-model="search" placeholder="Cari kolam..." icon="i-lucide-search" />
                </div>
            </div>

            <UTable :data="rows" :columns="columns" :loading="loading">
                <template #detail-cell="{ row }">
                    <div class="space-y-1 text-sm">
                        <div><strong>Panjang:</strong> {{ row.original.panjang }} m</div>
                        <div><strong>Lebar:</strong> {{ row.original.lebar }} m</div>
                        <div><strong>Kedalaman:</strong> {{ row.original.kedalaman }} m</div>
                        <div><strong>Volume Air:</strong> {{ row.original.volume_air }} m³</div>
                        <div><strong>Kapasitas:</strong> {{ row.original.kapasitas }} ekor</div>
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
    <KolamCreateModal v-model="showCreateModal" @created="onKolamCreated" />
    <KolamEditModal v-model="showEditModal" :kolam="selectedKolam?.id" @updated="onKolamUpdated" />
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
                Apakah Anda yakin ingin menghapus Kolam
                <span class="font-medium text-gray-900 dark:text-white">
                    {{ deletingKolam?.nama_kolam }}
                </span>
                ? Tindakan ini tidak dapat dibatalkan.
            </div>
        </template>


        <template #footer>
            <UButton label="Batal" color="gray" variant="ghost" @click="showDeleteModal = false" />
            <UButton label="Hapus" color="error" icon="i-lucide-trash-2" @click="remove" />
        </template>
    </UModal>
</template>
