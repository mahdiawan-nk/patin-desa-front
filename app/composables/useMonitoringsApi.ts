// ~/composables/useUserApi.ts
export interface MonitoringsPayload {
    id: string;
    tanggal_monitoring: string;
    water_ph: number;
    oxygen_level: number;
    amonia_level: number;
    keterangan: string;
    kolam_budidaya_id: string;
}

export function useMonitoringsApi() {
    const config = useRuntimeConfig()
    const baseURL = config.public.API_URL
    const token = process.client ? localStorage.getItem('token') : null

    async function getListMonitorings() {
        return await $fetch('/monitorings', {
            baseURL,
            headers: { Authorization: `Bearer ${token}` },
            query: { paginate: false }
        })
    }
    async function createMonitorings(payload: MonitoringsPayload) {
        console.log(payload)
        return await $fetch('/monitorings', {
            baseURL,
            method: 'POST',
            body: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async function updateMonitorings(id: string, payload: any) {
        return await $fetch(`/monitorings/${id}`, {
            baseURL,
            method: 'PUT',
            body: payload,
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    async function deleteMonitorings(id: string) {
        return await $fetch(`/monitorings/${id}`, {
            baseURL,
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    return { getListMonitorings, createMonitorings, updateMonitorings, deleteMonitorings }
}
