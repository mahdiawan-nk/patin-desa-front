<script setup lang="ts">
import { ref, watch } from 'vue'
import Modal from '~/components/ui/Modal.vue'
import { useUserApi, type UserPayload } from '~/composables/useUserApi'

const props = defineProps<{
    modelValue: boolean
    user?: UserPayload | null
}>()
const emit = defineEmits(['update:modelValue', 'updated'])

const open = ref(props.modelValue)
watch(() => props.modelValue, v => (open.value = v))
watch(open, v => emit('update:modelValue', v))

// form state
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

// isi ulang form saat props.user berubah
watch(
    () => props.user,
    (u) => {
        if (u) {
            form.value = { ...u, password: '' } // kosongkan password saat edit
        }
    },
    { immediate: true }
)

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const { updateUser } = useUserApi()

function validate() {
    errors.value = {}
    if (!form.value.fullname) errors.value.fullname = 'Nama lengkap wajib diisi'
    if (!form.value.email) errors.value.email = 'Email wajib diisi'
    if (!form.value.role) errors.value.role = 'Role wajib dipilih'
    if (!form.value.status) errors.value.status = 'Status wajib dipilih'
    // password opsional saat edit

    return Object.keys(errors.value).length === 0
}

async function onSubmit() {
    if (!validate()) return
    if (!props.user?.id) return // pastikan ada id
    try {
        loading.value = true
        await updateUser(props.user.id, form.value)
        emit('updated')
        close()
    } catch (err: any) {
        console.error('Gagal update user', err?.response?._data || err)
    } finally {
        loading.value = false
    }
}

function close() {
    open.value = false
}
</script>

<template>
    <Modal v-model="open" title="Edit User">
        <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- Nama -->
            <div>
                <label class="block text-sm font-medium">Nama Lengkap</label>
                <input v-model="form.fullname" type="text" class="w-full mt-1 border rounded px-3 py-2"
                    :class="errors.fullname ? 'border-red-500' : ''" />
                <p v-if="errors.fullname" class="text-red-500 text-xs mt-1">{{ errors.fullname }}</p>
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium">Email</label>
                <input v-model="form.email" type="email" class="w-full mt-1 border rounded px-3 py-2"
                    :class="errors.email ? 'border-red-500' : ''" />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
            </div>

            <!-- Password (opsional) -->
            <div>
                <label class="block text-sm font-medium">Password (opsional)</label>
                <input v-model="form.password" type="password" placeholder="Kosongkan jika tidak diganti"
                    class="w-full mt-1 border rounded px-3 py-2" />
            </div>

            <!-- Role & Status -->
            <div class="flex gap-3">
                <div class="flex-1">
                    <label class="block text-sm font-medium">Role</label>
                    <select v-model="form.role" class="w-full mt-1 border rounded px-3 py-2"
                        :class="errors.role ? 'border-red-500' : ''">
                        <option value="">-- Pilih Role --</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="pembudidaya">Pembudidaya</option>
                    </select>
                    <p v-if="errors.role" class="text-red-500 text-xs mt-1">{{ errors.role }}</p>
                </div>

                <div class="flex-1">
                    <label class="block text-sm font-medium">Status</label>
                    <select v-model="form.status" class="w-full mt-1 border rounded px-3 py-2"
                        :class="errors.status ? 'border-red-500' : ''">
                        <option value="">-- Pilih Status --</option>
                        <option value="aktif">Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                    </select>
                    <p v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status }}</p>
                </div>
            </div>
        </form>

        <template #footer>
            <button @click="close" type="button" class="px-3 py-1 rounded border">Batal</button>
            <button @click="onSubmit" type="button" class="px-3 py-1 rounded bg-blue-600 text-white"
                :disabled="loading">
                {{ loading ? 'Menyimpan...' : 'Update' }}
            </button>
        </template>
    </Modal>
</template>
