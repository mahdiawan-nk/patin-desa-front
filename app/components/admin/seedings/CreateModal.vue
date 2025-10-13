<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useKolamApi } from '~/composables/useKolamApi';
import { useSeedingApi, type SeedingPayload } from '~/composables/useSeedingApi'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'created'])

const open = ref(props.modelValue)
watch(() => props.modelValue, (v) => (open.value = v))
watch(open, (v) => emit('update:modelValue', v))

const form = ref<SeedingPayload>({
    kolam_budidaya_id: '',
    jenis_benih: '',
    tanggal_tebar: '',
    jumlah_tebar: 0,
    rata_rata_berat_awal: 0,
    kepadatan_tebar: 0,
    status_seeding: '',
    catatan: '',
})

interface KolamResponse {
    id: string
    nama_kolam: string
}

const kolamOptions = ref<{ label: string; value: string }[]>([])

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const { getListKolam } = useKolamApi()
const { createSeeding } = useSeedingApi()
function isEmptyNumber(value: any) {
    return value === null || value === undefined || value === ''
}

function isEmptyField(value: any) {
    return value === null || value === undefined || value === ''
}

function validate() {
    errors.value = {}

    // daftar rules
    const rules: Record<keyof typeof form.value, string> = {
        kolam_budidaya_id: 'Kolam wajib dipilih',
        jenis_benih: 'Jenis benih wajib dipilih',
        tanggal_tebar: 'Tanggal tebar wajib diisi',
        jumlah_tebar: 'Jumlah tebar wajib diisi',
        rata_rata_berat_awal: 'Rata-rata berat awal wajib diisi',
        kepadatan_tebar: 'Kepadatan tebar wajib diisi',
        status_seeding: 'Status seeding wajib dipilih',
        catatan: '',
    }

    // field yang numeric
    const numericFields = ['jumlah_tebar', 'rata_rata_berat_awal', 'kepadatan_tebar']

    for (const [field, message] of Object.entries(rules)) {
        const value = form.value[field as keyof typeof form.value]

        if (numericFields.includes(field)) {
            if (isEmptyNumber(value)) {
                errors.value[field] = message
            }
        } else {
            if (isEmptyField(value)) {
                errors.value[field] = message
            }
        }
    }

    return Object.keys(errors.value).length === 0
}

async function onSubmit() {
    if (!validate()) return
    try {
        loading.value = true
        await createSeeding(form.value)
        emit('created')
        close()
    } catch (err: any) {
        console.error('Gagal create seeding', err?.response?._data || err)
    } finally {
        loading.value = false
    }
}

async function fetchKolamOptions() {
    try {
        const { data } = await getListKolam()
        kolamOptions.value = data.map((kolam: KolamResponse) => ({
            label: kolam.nama_kolam,
            value: kolam.id,
        }))
    } catch (err: any) {
        console.error('Gagal fetch kolam options', err?.response?._data || err)
    }
}
function close() {
    open.value = false
    errors.value = {}
}

watch(() => form.kolam_budidaya_id, (val) => {
    if (val && typeof val === 'object') {
        form.kolam_budidaya_id = val.value
    }
})

onMounted(() => {
    fetchKolamOptions()
})
</script>

<template>
    <UModal v-model:open="open" :ui="{ footer: 'justify-end space-x-2' }" @close="close">
        <template #header>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
                Tambah Penebaran Baru
            </div>
        </template>
        <template #body>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4">
                <!-- Kolam -->
                <UFormField label="Kolam" :error="errors.kolam_budidaya_id">
                    <USelectMenu v-model="form.kolam_budidaya_id" value-key="value" :items="kolamOptions"
                        option-attribute="label" placeholder="-- Pilih Kolam --" class="w-full" />
                </UFormField>

                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Jenis Benih/Nama Benih" :error="errors.jenis_benih">
                        <UInput v-model="form.jenis_benih" class="w-full" />
                    </UFormField>
                    <!-- Tanggal Tebar -->
                    <UFormField label="Tanggal Tebar" :error="errors.tanggal_tebar">
                        <UInput v-model="form.tanggal_tebar" class="w-full" type="date" />
                    </UFormField>
                </div>


                <div class="grid grid-cols-2 gap-4">
                    <!-- Jumlah Tebar -->
                    <UFormField label="Jumlah Tebar" :error="errors.jumlah_tebar">
                        <UInput v-model="form.jumlah_tebar" type="number" class="w-full" />
                    </UFormField>

                    <!-- Rata-rata Berat Awal -->
                    <UFormField label="Rata-rata Berat Awal" :error="errors.rata_rata_berat_awal">
                        <UInput v-model="form.rata_rata_berat_awal" type="number" class="w-full" />
                    </UFormField>

                </div>
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Kepadatan Tebar" :error="errors.kepadatan_tebar">
                        <UInput v-model="form.kepadatan_tebar" type="number" class="w-full" />
                    </UFormField>

                    <!-- Status Seeding -->
                    <UFormField label="Status Penebaran Benih" :error="errors.status_seeding">
                        <URadioGroup orientation="horizontal" variant="list" v-model="form.status_seeding" :items="[
                            { label: 'Aktif', value: 'aktif' },
                            { label: 'Selesai', value: 'selesai' },
                            { label: 'Batal', value: 'batal' }
                        ]" />
                        <!-- <USelect v-model="form.status_seeding" :items="" placeholder="-- Pilih Status --" class="w-full" /> -->
                    </UFormField>
                </div>


                <!-- Catatan -->
                <UFormField label="Catatan" :error="errors.catatan">
                    <UTextarea v-model="form.catatan" class="w-full" />
                </UFormField>
            </form>

        </template>

        <template #footer>
            <UButton label="Batal" color="gray" variant="ghost" @click="close" />
            <UButton :label="loading ? 'Menyimpan...' : 'Simpan'" color="primary" :loading="loading"
                @click="onSubmit" />
        </template>
    </UModal>
</template>
