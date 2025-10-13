// ~/composables/useUserApi.ts
export interface SeedingPayload {
    kolam_budidaya_id: string
    jenis_benih: string
    tanggal_tebar: string
    jumlah_tebar: number
    rata_rata_berat_awal: number
    kepadatan_tebar: number
    status_seeding: string
    catatan: string
}

export function useSeedingApi() {
    const config = useRuntimeConfig()
    const baseURL = config.public.API_URL
    const token = process.client ? localStorage.getItem('token') : null

    async function getListSeeding() {
        return await $fetch('/seedings', {
            baseURL,
            headers: { Authorization: `Bearer ${token}` },
            query: { paginate: false }
        })
    }
    async function createSeeding(payload: SeedingPayload) {
        console.log(payload)
        return await $fetch('/seedings', {
            baseURL,
            method: 'POST',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async function updateSeeding(id: string, payload: any) {
        return await $fetch(`/seedings/${id}`, {
            baseURL,
            method: 'PUT',
            body: payload,
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    async function deleteSeeding(id: string) {
        return await $fetch(`/seedings/${id}`, {
            baseURL,
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    return { getListSeeding, createSeeding, updateSeeding, deleteSeeding }
}
