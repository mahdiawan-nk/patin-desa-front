// ~/composables/useUserApi.ts
export interface KolamPayload {
    nama_kolam: string
    lokasi_kolam: string
    panjang: number
    lebar: number
    kedalaman: number
    volume_air: number
    kapasitas: number
    jenis_kolam: string
    status_kolam: string
    user_id: string
}

export function useKolamApi() {
    const config = useRuntimeConfig()
    const baseURL = config.public.API_URL
    const token = process.client ? localStorage.getItem('token') : null

    async function getListKolam() {
        return await $fetch('/kolam', {
            baseURL,
            headers: { Authorization: `Bearer ${token}` },
            query: { paginate: false }
        })
    }

    async function getKolam(id: string) {
        return await $fetch(`/kolam/${id}`, {
            baseURL,
            headers: { Authorization: `Bearer ${token}` }
        })
    }
    async function createKolam(payload: UserPayload) {
        console.log(payload)
        return await $fetch('/kolam', {
            baseURL,
            method: 'POST',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async function updateKolam(id: string, payload: any) {
        return await $fetch(`/kolam/${id}`, {
            baseURL,
            method: 'PUT',
            body: payload,
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    async function deleteKolam(id: string) {
        return await $fetch(`/kolam/${id}`, {
            baseURL,
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    return { createKolam, updateKolam, deleteKolam, getListKolam, getKolam }
}
