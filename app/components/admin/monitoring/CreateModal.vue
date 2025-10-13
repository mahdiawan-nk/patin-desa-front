<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useKolamApi } from '~/composables/useKolamApi';
import { useMonitoringsApi, type MonitoringsPayload } from '~/composables/useMonitoringsApi'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue', 'created'])

const open = ref(props.modelValue)
watch(() => props.modelValue, (v) => (open.value = v))
watch(open, (v) => emit('update:modelValue', v))

const form = ref<MonitoringsPayload>({
    id: '',
    tanggal_monitoring: '',
    water_ph: 0,
    oxygen_level: 0,
    amonia_level: 0,
    keterangan: '',
    kolam_budidaya_id: '',
})

interface KolamResponse {
    id: string
    nama_kolam: string
}

const kolamOptions = ref<{ label: string; value: string }[]>([])

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const { getListKolam } = useKolamApi()
const { createMonitorings } = useMonitoringsApi()
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
        tanggal_monitoring: 'tanggal wajib dipilih',
        water_ph: 'water ph wajib diisi',
        oxygen_level: 'Oksigen wajib diisi',
        amonia_level: 'Amonia wajib diisi',
    }

    // field yang numeric
    const numericFields = ['water_ph', 'oxygen_level', 'amonia_level']

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
        await createMonitorings(form.value)
        emit('created')
        close()
    } catch (err: any) {
        console.error('Gagal create', err?.response?._data || err)
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
                Tambah Monitoring Baru
            </div>
        </template>
        <template #body>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4">
                <!-- Kolam -->
                <UFormField label="Kolam" :error="errors.kolam_budidaya_id">
                    <USelectMenu v-model="form.kolam_budidaya_id" value-key="value" :items="kolamOptions"
                        option-attribute="label" placeholder="-- Pilih Kolam --" class="w-full" />
                </UFormField>
                <UFormField label="Tanggal Monitoring" :error="errors.tanggal_monitoring">
                    <UInput v-model="form.tanggal_monitoring" class="w-full" type="date" />
                </UFormField>

                <div class="grid grid-cols-2 gap-4">
                    <!-- Jumlah Tebar -->
                    <UFormField label="PH Air" :error="errors.water_ph">
                        <UInput v-model="form.water_ph" type="number" class="w-full" />
                    </UFormField>

                    <!-- Rata-rata Berat Awal -->
                    <UFormField label="Level Oxygen" :error="errors.oxygen_level">
                        <UInput v-model="form.oxygen_level" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Level Amonia" :error="errors.amonia_level">
                        <UInput v-model="form.amonia_level" type="number" class="w-full" />
                    </UFormField>
                </div>

                <!-- Catatan -->
                <UFormField label="Catatan" :error="errors.keterangan">
                    <UTextarea v-model="form.keterangan" class="w-full" />
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
