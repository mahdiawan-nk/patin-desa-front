<script setup lang="ts">
definePageMeta({
	layout: 'admin',
	middleware: ['auth']
})

import { ref, onMounted } from 'vue'
import { useUserApi, type UserPayload } from '~/composables/useUserApi'
import { useToast } from '#imports'
// import { fetchUser } from '@/composables/useAuth'
const { fetchUser, updatePassword } = useAuth();
const toast = useToast()
const { updateUser } = useUserApi()

// data user asli
const user = ref<any>({
	fullname: '',
	email: '',
	no_hp: '',
	nik: '',
	jenis_kelamin: '',
	tanggal_lahir: '',
	alamat_lengkap: '',
	tgl_bergabung: '',
	status: '',
	role: ''
})

const idUser = ref(0)

const getProfile = async () => {
	try {
		const response = await fetchUser()
		user.value = response
		idUser.value = response.id
	} catch (error) {
		console.error(error)
	}
}
// state edit profile
const editing = ref(false)
const tempForm = ref({ ...user.value })
const loading = ref(false)

// state ubah password
const showPasswordModal = ref(false)
const passwordForm = ref({
	old_password: '',
	new_password: '',
	confirm_password: ''
})
const passwordLoading = ref(false)


function startEdit() {
	tempForm.value = { ...user.value }
	editing.value = true
}

function cancelEdit() {
	editing.value = false
}

async function saveProfile() {
	try {
		loading.value = true
		// TODO: API PUT /me
		await updateUser(idUser.value, tempForm.value)
		user.value = { ...tempForm.value }
		editing.value = false
		toast.add({ title: 'Berhasil', description: 'Profil berhasil diperbarui.', color: 'green' })
	} catch {
		toast.add({ title: 'Error', description: 'Gagal memperbarui profil.', color: 'red' })
	} finally {
		loading.value = false
	}
}

async function changePassword() {
	try {
		passwordLoading.value = true
		if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
			throw new Error('Konfirmasi password tidak sama.')
		}
		// TODO: API PUT /change-password
		const success = await updatePassword(passwordForm.value.old_password, passwordForm.value.new_password)
		if (!success) throw new Error('Gagal ubah password.')
		toast.add({ title: 'Sukses', description: 'Password berhasil diubah.', color: 'green' })
		showPasswordModal.value = false
		passwordForm.value = { old_password: '', new_password: '', confirm_password: '' }
	} catch (e: any) {
		toast.add({ title: 'Error', description: e.message || 'Gagal ubah password.', color: 'red' })
	} finally {
		passwordLoading.value = false
	}
}

onMounted(getProfile)
</script>

<template>
	<div class="p-6 max-w-3xl mx-auto">
		<UCard>
			<template #header>
				<div class="flex justify-between items-center">
					<h2 class="text-lg font-semibold">My Profile</h2>
					<div class="flex gap-2">
						<UButton v-if="!editing" label="Edit Profile" icon="i-lucide-edit" @click="startEdit" />
						<UButton v-if="!editing" label="Ubah Password" icon="i-lucide-key" color="secondary"
							@click="showPasswordModal = true" />
					</div>
				</div>
			</template>

			<!-- Tampilan detail -->
			<div v-if="!editing" class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<p class="text-sm text-gray-500">Nama Lengkap</p>
					<p class="font-medium">{{ user.fullname }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">Email</p>
					<p class="font-medium">{{ user.email }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">No HP</p>
					<p class="font-medium">{{ user.no_hp || '-' }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">NIK</p>
					<p class="font-medium">{{ user.nik || '-' }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">Jenis Kelamin</p>
					<p class="font-medium">{{ user.jenis_kelamin || '-' }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">Tanggal Lahir</p>
					<p class="font-medium">{{ user.tanggal_lahir || '-' }}</p>
				</div>
				<div class="md:col-span-2">
					<p class="text-sm text-gray-500">Alamat Lengkap</p>
					<p class="font-medium">{{ user.alamat_lengkap || '-' }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">Tanggal Bergabung</p>
					<p class="font-medium">{{ user.tgl_bergabung || '-' }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">Status</p>
					<p class="font-medium">{{ user.status || '-' }}</p>
				</div>
				<div>
					<p class="text-sm text-gray-500">Role</p>
					<p class="font-medium">{{ user.role || '-' }}</p>
				</div>
			</div>

			<!-- Form edit -->
			<form v-else @submit.prevent="saveProfile" class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<UFormField label="Nama Lengkap">
					<UInput v-model="tempForm.fullname" class="w-full" />
				</UFormField>
				<UFormField label="Email">
					<UInput v-model="tempForm.email" type="email" class="w-full" />
				</UFormField>
				<UFormField label="No HP">
					<UInput v-model="tempForm.no_hp" class="w-full" />
				</UFormField>
				<UFormField label="NIK">
					<UInput v-model="tempForm.nik" class="w-full" />
				</UFormField>
				<UFormField label="Jenis Kelamin">
					<USelect v-model="tempForm.jenis_kelamin" :items="['L', 'P']" class="w-full" />
				</UFormField>
				<UFormField label="Tanggal Lahir">
					<UInput v-model="tempForm.tanggal_lahir" type="date" class="w-full" />
				</UFormField>
				<UFormField class="md:col-span-2" label="Alamat Lengkap">
					<UTextarea v-model="tempForm.alamat_lengkap" class="w-full" />
				</UFormField>
				<UFormField label="Tanggal Bergabung">
					<UInput v-model="tempForm.tgl_bergabung" type="date" class="w-full" />
				</UFormField>
				<UFormField label="Status">
					<USelect v-model="tempForm.status" :items="['aktif', 'nonaktif']" class="w-full" />
				</UFormField>

				<div class="flex justify-end gap-2 md:col-span-2 pt-4">
					<UButton label="Batal" color="secondary" @click="cancelEdit" />
					<UButton :label="loading ? 'Menyimpan...' : 'Simpan'" color="primary" :loading="loading"
						type="submit" />
				</div>
			</form>
		</UCard>

		<!-- Modal Ubah Password -->
		<UModal v-model:open="showPasswordModal" title="Ubah Password" :ui="{ footer: 'justify-end' }" class="w-xs">
			<template #header>
				<div class="flex items-center gap-2">
					<UIcon name="i-lucide-key" class="text-red-500 w-5 h-5" />
					<span class="text-base font-semibold text-gray-900 dark:text-white">
						Ubah Password
					</span>
				</div>
			</template>
			<template #body>
				<form @submit.prevent="changePassword" class="space-y-4 flex flex-col">
					<UFormField label="Password Lama">
						<UInput v-model="passwordForm.old_password" type="password" class="w-full" />
					</UFormField>
					<UFormField label="Password Baru">
						<UInput v-model="passwordForm.new_password" type="password" class="w-full" />
					</UFormField>
					<UFormField label="Konfirmasi Password Baru">
						<UInput v-model="passwordForm.confirm_password" type="password" class="w-full" />
					</UFormField>
					<div class="flex justify-end gap-2 pt-4">
						<UButton label="Batal" color="secondary" @click="showPasswordModal = false" />
						<UButton :label="passwordLoading ? 'Menyimpan...' : 'Simpan'" color="primary"
							:loading="passwordLoading" type="submit" />
					</div>
				</form>
			</template>
		</UModal>
	</div>
</template>
