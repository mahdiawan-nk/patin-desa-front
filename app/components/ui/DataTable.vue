<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue'
import type { FetcherFn } from '~/composables/useDataTable'
import { useDataTable } from '~/composables/useDataTable'

interface Column {
    key: string
    label: string
    sortable?: boolean
    width?: string
    formatter?: (row: any) => string
}

const props = defineProps<{
    fetcher: string | FetcherFn<any>
    columns: Column[]
    options?: Record<string, any>
}>()

const table = useDataTable(props.fetcher, props.options ?? {})

defineExpose({
    reload: () => table.fetchPage(table.page.value),
    fetchPage: (p?: number) => table.fetchPage(p),
})
// search state
const localSearch = ref('')
const page = computed({
    get: () => table.page.value,
    set: (v: number) => (table.page.value = v)
})

function onSearchInput() {
    table.setQuery(localSearch.value || null)
}

function onPerPageChange(e?: Event) {
    const n = Number((e?.target as HTMLSelectElement)?.value ?? table.perPage.value)
    table.setPerPage(n)
}

function goTo(n: number) {
    if (n < 1) n = 1
    if (n > table.totalPages.value) n = table.totalPages.value
    table.fetchPage(n)
}

function isSelected(row: any) {
    return !!table.selected.value[getId(row)]
}

function getId(row: any) {
    return row.id ?? row._id ?? row.ID ?? row.guid
}

function formatCell(row: any, col: Column) {
    if (col.formatter) return col.formatter(row)
    const val = row[col.key]
    if (val === null || val === undefined) return ''
    if (typeof val === 'object') return JSON.stringify(val)
    return String(val)
}
</script>

<template>
    <div class="w-full bg-white rounded-lg shadow-sm p-4">
        <!-- Top controls -->
        <div class="mb-6 md:flex md:items-center md:justify-between">
            <div
                class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                <USelect v-model="table.perpage" :items="table.perPageOptions" @change="onPerPageChange"/>
                <!-- <select v-model.number="table.perPage.value" @change="onPerPageChange"
                    class="px-2 py-1 border rounded-md">
                    <option v-for="n in table.perPageOptions" :key="n" :value="n">{{ n }}</option>
                </select> -->
            </div>

            <div class="flex items-center gap-2">

                <nav class="inline-flex items-center gap-1">
                    <UButton icon="i-lucide-chevron-left" size="md" color="neutral" variant="outline"
                        @click="goTo(page - 1)" :disabled="page <= 1">Prev</UButton>
                    <span class="px-2">Hal {{ page }} / {{ table.totalPages.value }}</span>
                    <UButton trailing-icon="i-lucide-chevron-right" size="md" color="neutral" variant="outline"
                        @click="goTo(page + 1)" :disabled="page >= table.totalPages.value">Next</UButton>
                </nav>
            </div>

            <div class="relative flex items-center mt-4 md:mt-0">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </span>

                <UInput icon="i-lucide-search" size="md" variant="outline" placeholder="Search..." highlight="false"
                    color="secondary" v-model="localSearch" @input="onSearchInput" />
            </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y">
                <thead>
                    <tr class="text-left">
                        <!-- select all -->
                        <th class="px-3 py-2 text-xs">
                            <!-- <input type="checkbox" :checked="table.selectAll.value" @change="table.toggleSelectAll" /> -->
                            No
                        </th>

                        <!-- header columns -->
                        <th v-for="col in columns" :key="col.key" class="px-3 py-2 cursor-pointer select-none"
                            @click="col.sortable ? table.sort(col.key) : null"
                            :style="col.width ? { width: col.width } : {}">
                            <div class="flex items-center gap-2">
                                <span class="text-xs">{{ col.label }}</span>
                                <span v-if="col.sortable" class="text-xs">
                                    <span v-if="table.sortBy.value === col.key">
                                        <span v-if="table.sortDesc.value">▼</span>
                                        <span v-else>▲</span>
                                    </span>
                                    <span v-else class="opacity-40">↕</span>
                                </span>
                            </div>
                        </th>

                        <th class="px-3 py-2 text-xs">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- loading state -->
                    <tr v-if="table.loading.value">
                        <td :colspan="columns.length + 2" class="px-4 py-6 text-center">Loading...</td>
                    </tr>

                    <!-- empty state -->
                    <tr v-else-if="table.items.value.length === 0">
                        <td :colspan="columns.length + 2" class="px-4 py-6 text-center">No data</td>
                    </tr>

                    <!-- rows -->
                    <tr v-for="(row, idx) in table.items.value" :key="getId(row) ?? idx" class="hover:bg-gray-50">
                        <td class="px-3 py-2">
                            <span class="text-xs">{{ idx + 1 }}</span>
                        </td>

                        <!-- cell with slot fallback -->
                        <td v-for="col in columns" :key="col.key" class="px-3 py-2">
                            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                                <span class="text-xs">{{ formatCell(row, col) }}</span>
                            </slot>
                        </td>

                        <!-- actions slot -->
                        <td class="px-3 py-2">
                            <slot name="actions" :row="row">
                                <button class="px-2 py-1 border rounded">View</button>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        <div class="mt-3 flex items-center justify-between">
            <div>
                <small>Menampilkan {{ table.items.value.length }} dari {{ table.total.value }}</small>
            </div>
            <small class="text-sm text-gray-600">Total: {{ table.total.value }}</small>
        </div>
    </div>
</template>
