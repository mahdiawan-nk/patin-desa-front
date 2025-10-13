// composables/useApiTable.ts
import { ref } from 'vue'

interface Meta {
    total: number
    page: number
    per_page: number
    total_pages: number
}

export function useApiTable<T>(url: string) {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const rows = ref<T[]>([])
    const meta = ref<Meta | null>(null)

    const page = ref(1)
    const perPage = ref(10)
    const search = ref('')
    const filters = ref<Record<string, any>>({})

    const fetchData = async () => {
        loading.value = true
        error.value = null
        try {
            const token = localStorage.getItem('token')
            const params = new URLSearchParams({
                page: String(page.value),
                per_page: String(perPage.value),
                q: search.value || '',

            })
            for (const key in filters.value) {
                if (filters.value[key] !== null && filters.value[key] !== '') {
                    params.append(key, String(filters.value[key]))
                }
            }
            const res = await $fetch<{
                success: boolean
                message: string
                meta: Meta
                data: T[]
            }>(`${url}?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(res.data)
            rows.value = res.data
            meta.value = res.meta
        } catch (e: any) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }


    return {
        rows,
        meta,
        page,
        perPage,
        search,
        filters,
        loading,
        error,
        fetchData,
    }
}
