<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserApi, type UserPayload } from '~/composables/useUserApi'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'created'])

const open = ref(props.modelValue)
watch(() => props.modelValue, (v) => (open.value = v))
watch(open, (v) => emit('update:modelValue', v))

const form = ref<UserPayload>({
    fullname: '',
    email: '',
    no_hp: '',
    nik: '',
    jenis_kelamin: null,
    tanggal_lahir: null,
    alamat_lengkap: '',
    tgl_bergabung: null,
    status: '',
    role: '',
    password: ''
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const { createUser } = useUserApi()

function validate() {
    errors.value = {}
    if (!form.value.fullname) errors.value.fullname = 'Nama lengkap wajib diisi'
    if (!form.value.email) errors.value.email = 'Email wajib diisi'
    if (!form.value.password) errors.value.password = 'Password wajib diisi'
    if (!form.value.role) errors.value.role = 'Role wajib dipilih'
    if (!form.value.status) errors.value.status = 'Status wajib dipilih'

    return Object.keys(errors.value).length === 0
}

async function onSubmit() {
    if (!validate()) return
    try {
        loading.value = true
        await createUser(form.value)
        emit('created')
        close()
    } catch (err: any) {
        console.error('Gagal create user', err?.response?._data || err)
    } finally {
        loading.value = false
    }
}

function close() {
    open.value = false
}
</script>

<template>
    <UModal v-model:open="open" :ui="{ footer: 'justify-end space-x-2' }">
        <template #header>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
                Tambah User Baru
            </div>
        </template>
        <template #body>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4">
                <!-- Nama -->
                <UFormField label="Nama Lengkap" :error="errors.fullname">
                    <UInput v-model="form.fullname" class="w-full" />
                </UFormField>

                <!-- Email -->
                <UFormField label="Email" :error="errors.email">
                    <UInput v-model="form.email" type="email" class="w-full"/>
                </UFormField>

                <!-- Password -->
                <UFormField label="Password" :error="errors.password">
                    <UInput v-model="form.password" type="password" class="w-full"/>
                </UFormField>

                <!-- Role & Status -->
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Role" :error="errors.role">
                        <USelect v-model="form.role" :items="[
                            { label: 'Super Admin', value: 'superadmin' },
                            { label: 'Admin', value: 'admin' },
                            { label: 'Pembudidaya', value: 'pembudidaya' }
                        ]" placeholder="-- Pilih Role --" class="w-full"/>
                    </UFormField>

                    <UFormField label="Status" :error="errors.status">
                        <USelect v-model="form.status" :items="[
                            { label: 'Aktif', value: 'aktif' },
                            { label: 'Nonaktif', value: 'nonaktif' }
                        ]" placeholder="-- Pilih Status --" class="w-full"/>
                    </UFormField>
                </div>
            </form>
        </template>

        <template #footer>
            <UButton label="Batal" color="gray" variant="ghost" @click="close" />
            <UButton :label="loading ? 'Menyimpan...' : 'Simpan'" color="primary" :loading="loading"
                @click="onSubmit" />
        </template>
    </UModal>
</template>
