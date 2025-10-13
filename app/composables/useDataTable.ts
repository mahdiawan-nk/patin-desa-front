// ~/composables/useDataTable.ts
import { ref, computed, watch, onMounted } from 'vue'

export interface DataTableOptions {
    initialPage?: number
    initialPerPage?: number
    perPageOptions?: number[]
    defaultSortBy?: string | null
    defaultSortDesc?: boolean
    debounceMs?: number
}

export type FetcherFn<T> = (params: {
    page: number
    per_page: number
    sort_by?: string | null
    sort_desc?: boolean
    q?: string | null
    filters?: Record<string, any>
}) => Promise<{ data: T[]; total: number }>

export function useDataTable<T = any>(
    fetcher: string | FetcherFn<T>,
    opts: DataTableOptions = {}
) {
    const page = ref(opts.initialPage ?? 1)
    const perPage = ref(opts.initialPerPage ?? 10)
    const perPageOptions = opts.perPageOptions ?? [10, 25, 50, 100]
    const sortBy = ref<string | null>(opts.defaultSortBy ?? null)
    const sortDesc = ref<boolean>(opts.defaultSortDesc ?? false)
    const q = ref<string | null>(null)
    const filters = ref<Record<string, any>>({})
    const loading = ref(false)
    const items = ref<T[]>([])
    const total = ref(0)
    const selected = ref<Record<number | string, boolean>>({})
    const selectAll = ref(false)
    const debounceMs = opts.debounceMs ?? 350

    // simple debounce
    let debounceTimer: ReturnType<typeof setTimeout> | null = null
    function debounceFetch() {
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => fetchPage(), debounceMs)
    }

    async function doFetch(params: {
        page: number
        per_page: number
        q?: string | null
        filters?: Record<string, any>
    }) {
        loading.value = true
        try {
            if (typeof fetcher === 'string') {
                // build query string
                const qs: Record<string, any> = {
                    page: params.page,
                    per_page: params.per_page
                }
                if (params.q) qs.q = params.q
                if (params.filters && Object.keys(params.filters).length)
                    qs.filters = JSON.stringify(params.filters)

                // ambil token dari localStorage
                const token = localStorage.getItem('token')

                // use Nuxt $fetch dengan headers
                const url = fetcher
                const res = await $fetch(url, {
                    params: qs,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                }) as any
                // expect { data: [], total: number } — adapt if needed
                items.value = res.data ?? res.items ?? res
                total.value = res.total ?? res.meta?.total ?? (Array.isArray(items.value) ? items.value.length : 0)
                // console.log(items.value, total.value)

            } else {
                const res = await fetcher(params)
                items.value = res.data
                total.value = res.total
            }
        } catch (e) {
            console.error('useDataTable fetch error', e)
            items.value = []
            total.value = 0
        } finally {
            
            loading.value = false
        }
    }

    async function fetchPage(p?: number) {
        if (typeof p === 'number') page.value = p
        await doFetch({
            page: page.value,
            per_page: perPage.value,
            q: q.value,
            filters: filters.value
        })
        selected.value = {}
        selectAll.value = false
    }

    function setPerPage(n: number) {
        perPage.value = n
        page.value = 1
        fetchPage()
    }

    function sort(columnKey: string) {
        if (sortBy.value === columnKey) {
            sortDesc.value = !sortDesc.value
        } else {
            sortBy.value = columnKey
            sortDesc.value = false
        }
        fetchPage()
    }

    function setFilter(key: string, value: any) {
        if (value === undefined || value === null || value === '') {
            delete filters.value[key]
        } else {
            filters.value[key] = value
        }
        page.value = 1
        fetchPage()
    }

    function setQuery(qstr: string | null) {
        q.value = qstr
        page.value = 1
        debounceFetch()
    }

    function toggleSelect(id: number | string) {
        selected.value[id] = !selected.value[id]
        if (!selected.value[id]) selectAll.value = false
    }

    function toggleSelectAll() {
        selectAll.value = !selectAll.value
        if (selectAll.value) {
            items.value.forEach((it: any) => {
                const id = it.id ?? it._id ?? it.ID ?? it.guid
                if (id !== undefined) selected.value[id] = true
            })
        } else {
            selected.value = {}
        }
    }

    const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage.value)))
    const selectedIds = computed(() =>
        Object.keys(selected.value)
            .filter(k => selected.value[k])
            .map(k => isNaN(Number(k)) ? k : Number(k))
    )

    onMounted(() => {
        fetchPage()
    })

    watch([page, perPage], () => {
        fetchPage()
    })

    return {
        page,
        perPage,
        perPageOptions,
        sortBy,
        sortDesc,
        q,
        filters,
        loading,
        items,
        total,
        selected,
        selectAll,
        totalPages,
        selectedIds,

        fetchPage,
        setPerPage,
        sort,
        setFilter,
        setQuery,
        toggleSelect,
        toggleSelectAll,
        doFetch
    }
}
