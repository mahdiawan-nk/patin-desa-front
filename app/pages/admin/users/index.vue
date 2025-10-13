<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: ['auth']
})
import { ref } from 'vue'
import DataTable from '~/components/ui/DataTable.vue';
import { useRouter } from '#imports';
import { useDynamicSeo } from '@/composables/useDynamicSeo'
import UserCreateModal from '~/components/admin/users/UserCreateModal.vue'
import UserEditModal from '~/components/admin/users/UserEditModal.vue';

// Set SEO meta untuk halaman landing
useDynamicSeo({
    title: 'Panel - Users',
    description: 'Budidaya ikan patin segar langsung dari XIII Koto Kampar. Beli ikan patin segar berkualitas tinggi.',
    image: '/og-image.jpg'
})

const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedUser = ref<any | null>(null)
const toast = useToast()


const config = useRuntimeConfig()
const endpoint = config.public.API_URL + '/users'
const columns = [
    { key: 'fullname', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
]
const dataTableRef = ref<InstanceType<typeof DataTable> | null>(null)
const onUserCreated = () => {
    dataTableRef.value?.fetchPage(1)
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil disimpan.',
        color: 'success'
    })
}

function openEdit(row: any) {
    selectedUser.value = row
    showEditModal.value = true
}

const onUserUpdated = () => {
    dataTableRef.value?.reload()
    toast.add({
        title: 'Berhasil!',
        description: 'Data user berhasil diupdate.',
        color: 'success'
    })
}

const showDeleteModal = ref(false)
const deletingUser = ref<any | null>(null)

const confirmDelete = (row: any) => {
    deletingUser.value = row
    // alert(deletingUser.value.fullname)
    showDeleteModal.value = true
}

const remove = async () => {
    if (!deletingUser.value) return

    try {
        await $fetch(`${endpoint}/${deletingUser.value.id}`, {
            method: 'DELETE',
        })

        dataTableRef.value?.reload()

        toast.add({
            title: 'Berhasil!',
            description: `User ${deletingUser.value.fullname} berhasil dihapus.`,
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
        deletingUser.value = null
    }
}

</script>
<template>
    <div class="p-6">
        <div class="sm:flex sm:items-center sm:justify-between mb-4">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Users</h2>
                </div>
            </div>

            <div class="flex items-center mt-4 gap-x-3">
                <UButton label="Tambah User" color="secondary" icon="i-lucide-plus" @click="showCreateModal = true" />
            </div>
        </div>

        <DataTable ref="dataTableRef" :fetcher="endpoint" :columns="columns" :options="{ initialPerPage: 10,perPageOptions: [5, 10, 25, 50, 100] }">
            <template #cell-status="{ value }">
                <span class="px-2 py-1 rounded text-xs font-semibold" :class="value === 'aktif'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'">
                    {{ value }}
                </span>
            </template>
            <!-- custom actions -->
            <template #actions="{ row }">
                <div class="flex gap-2">
                    <UButton label="Edit" color="secondary" icon="i-lucide-edit" variant="link" size="xs"
                        @click="openEdit(row)" />
                    <UButton label="Hapus" color="error" icon="i-lucide-trash-2" variant="link" size="xs"
                        @click="confirmDelete(row)" />
                    <!-- <button @click="edit(row)"
                        class="flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 focus:outline-none">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                        <span>Edit</span>
                    </button>

                    <button
                        class="flex items-center gap-1 px-2 py-1 text-sm font-medium text-red-600 transition-colors duration-200 hover:text-red-800 focus:outline-none">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                        </svg>
                        <span>Hapus</span>
                    </button> -->

                </div>
            </template>
        </DataTable>
    </div>
    <UserCreateModal v-model="showCreateModal" @created="onUserCreated" />
    <UserEditModal v-model="showEditModal" :user="selectedUser" @updated="onUserUpdated" />

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
                Apakah Anda yakin ingin menghapus user
                <span class="font-medium text-gray-900 dark:text-white">
                    {{ deletingUser?.fullname }}
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