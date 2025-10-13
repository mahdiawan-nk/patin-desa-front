<script lang="ts" setup>
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})
useDynamicSeo({
    title: 'Panel - Sedding',
    description: 'Budidaya ikan patin segar langsung dari XIII Koto Kampar. Beli ikan patin segar berkualitas tinggi.',
    image: '/og-image.jpg'
})

import { feedingData } from '@/data/feeding'
const perPage = ref(10)
const page = ref(1)
const columns = [
    { accessorKey: 'nama_pakan', header: 'Nama Pakan' },
    { accessorKey: 'tanggal_pemberian', header: 'Tanggal Pemberian' },
    { accessorKey: 'jumlah_pakan', header: 'Jumlah (kg)' },
    { accessorKey: 'frekuensi', header: 'Frekuensi' },
    { accessorKey: 'catatan', header: 'Catatan' },
    { accessorKey: 'kolam', header: 'Detail Kolam' },
    { accessorKey: 'action', header: 'Aksi' },
]

</script>

<template>
    <div class="p-6">
        <div class="sm:flex sm:items-center sm:justify-between mb-4">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Data Pemberian Pakan</h2>
                </div>
            </div>

            <div class="flex items-center mt-4 gap-x-3">
            </div>
        </div>

        <UCard>
            <template #header>
                <div class="flex justify-end items-center">
                    <UButton label="Tambah Pemberian Pakan" color="secondary" icon="i-lucide-plus"
                        @click="showCreateModal = true" />
                </div>
            </template>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <!-- Per page -->
                <div class="w-full sm:w-auto">
                    <USelect v-model="perPage" :items="[10, 20, 30]" />
                </div>

                <!-- Filter -->

                <!-- Search -->
                <div class="w-full sm:w-64">
                    <UInput v-model="search" placeholder="Cari kolam..." icon="i-lucide-search" />
                </div>
            </div>

            <UTable :data="feedingData" :columns="columns" class="w-full">
                <!-- Custom cell untuk kolam -->
                <template #kolam-data="{ row }">
                    <div>
                        <p class="font-semibold">{{ row.kolam.nama_kolam }}</p>
                        <p class="text-sm text-gray-500">Benih: {{ row.kolam.jenis_benih }}</p>
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
                    Showing 10 to 10 of 100 entries
                </p>

                <!-- Pagination -->
                <UPagination v-if="meta" v-model="page" :page-count="perPage" :total="'100'" show-first show-last
                    class="shrink-0" />
            </div>

        </UCard>
    </div>
</template>