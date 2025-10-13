// ~/composables/useUserApi.ts
export interface UserPayload {
    fullname: string
    email: string
    no_hp?: string
    nik?: string
    jenis_kelamin?: string
    tanggal_lahir?: string
    alamat_lengkap?: string
    tgl_bergabung?: string
    status?: string
    role?: string
    password: string
}

export function useUserApi() {
    const config = useRuntimeConfig()
    const baseURL = config.public.API_URL
    const token = process.client ? localStorage.getItem('token') : null

    async function getListUser() {
        return await $fetch('/users', {
            baseURL,
            headers: { Authorization: `Bearer ${token}` },
            query: { paginate: false }
        })
    }
    async function createUser(payload: UserPayload) {
        return await $fetch('/users', {
            baseURL,
            method: 'POST',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async function updateUser(id: string, payload: any) {
        return await $fetch(`/users/${id}`, {
            baseURL,
            method: 'PUT',
            body: payload,
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    async function deleteUser(id: string) {
        return await $fetch(`/users/${id}`, {
            baseURL,
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    async function getUser(id: string) {
        return await $fetch(`/users/${id}`, {
            baseURL,
            headers: { Authorization: `Bearer ${token}` }
        })
    }
    return { createUser, updateUser, deleteUser, getListUser, getUser }
}
