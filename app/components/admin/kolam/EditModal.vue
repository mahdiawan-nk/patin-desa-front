<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useUserApi } from '~/composables/useUserApi'
import { useKolamApi, type KolamPayload } from '~/composables/useKolamApi'

const props = defineProps<{
    modelValue: boolean
    kolam: string | null
}>()

const emit = defineEmits(['update:modelValue', 'updated'])

const open = ref(props.modelValue)
watch(() => props.modelValue, (v) => (open.value = v))
watch(open, (v) => emit('update:modelValue', v))

const form = ref<KolamPayload>({
    nama_kolam: '',
    lokasi_kolam: '',
    panjang: 0,
    lebar: 0,
    kedalaman: 0,
    volume_air: 0,
    kapasitas: 0,
    jenis_kolam: '',
    status_kolam: '',
    user_id: '',
})

interface UserResponse {
    id: string
    fullname: string
}
const userOptions = ref<{ label: string; value: string }[]>([])

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const { getListUser, getUser } = useUserApi()
const { updateKolam, getKolam } = useKolamApi()

function isEmptyNumber(value: any) {
    return value === null || value === undefined || value === ''
}

function isEmptyField(value: any) {
    return !value // untuk string dan pilihan select
}

function validate() {
    errors.value = {}
    const rules: Record<keyof typeof form.value, string> = {
        nama_kolam: 'Nama kolam wajib diisi',
        lokasi_kolam: 'Lokasi kolam wajib diisi',
        panjang: 'Panjang wajib diisi',
        lebar: 'Lebar wajib diisi',
        kedalaman: 'Kedalaman wajib diisi',
        volume_air: 'Volume air wajib diisi',
        kapasitas: 'Kapasitas wajib diisi',
        jenis_kolam: 'Jenis kolam wajib diisi',
        status_kolam: 'Status kolam wajib dipilih',
        user_id: 'Pemilik wajib dipilih',
    }

    for (const [field, message] of Object.entries(rules)) {
        const value = form.value[field as keyof typeof form.value]

        if (['panjang', 'lebar', 'kedalaman', 'volume_air', 'kapasitas'].includes(field)) {
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
    console.log(props.kolam)
    if (!validate() || !props.kolam) return
    try {
        loading.value = true
        await updateKolam(props.kolam, form.value)
        emit('updated')
        close()
    } catch (err: any) {
        console.error('Gagal update Kolam', err?.response?._data || err)
    } finally {
        loading.value = false
    }
}

async function fetchUserOptions() {
    try {
        const { data } = await getListUser()
        userOptions.value = data.map((user: UserResponse) => ({
            label: user.fullname,
            value: user.id,
        }))
    } catch (err: any) {
        console.error('Gagal fetch user options', err?.response?._data || err)
    }
}

async function fetchKolamDetail(id: string) {
    try {
        const { data } = await getKolam(id)
        console.log(data)
        form.value = {
            nama_kolam: data.nama_kolam,
            lokasi_kolam: data.lokasi_kolam,
            panjang: data.panjang,
            lebar: data.lebar,
            kedalaman: data.kedalaman,
            volume_air: data.volume_air,
            kapasitas: data.kapasitas,
            jenis_kolam: data.jenis_kolam,
            status_kolam: data.status_kolam,
            user_id: typeof data.user === 'object' ? data.user.id : data.user_id,
        }
    } catch (err: any) {
        console.error('Gagal ambil detail kolam', err?.response?._data || err)
    }
}

function close() {
    open.value = false
    errors.value = {}
}

watch(
    () => props.kolam,
    async (val) => {
        if (val) {
            const kolam = (val as any).original ?? val // fallback ke original kalau ada


            await fetchKolamDetail(kolam)
        }
    },
    { immediate: true }
)

onMounted(() => {
    fetchUserOptions()
})

</script>

<template>
    <UModal v-model:open="open" :ui="{ footer: 'justify-end space-x-2' }" @close="close">
        <template #header>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
                Edit Kolam
            </div>
        </template>
        <template #body>
            <form @submit.prevent="onSubmit" class="grid grid-cols-1 gap-4">
                <UFormField label="Pemilik" :error="errors.user_id">
                    <USelectMenu v-model="form.user_id" value-key="value" :items="userOptions"
                        placeholder="-- Pilih Pemilik --" class="w-full" />
                </UFormField>

                <!-- Nama Kolam -->
                <UFormField label="Nama Kolam" :error="errors.nama_kolam">
                    <UInput v-model="form.nama_kolam" class="w-full" />
                </UFormField>

                <!-- Lokasi Kolam -->
                <UFormField label="Lokasi Kolam" :error="errors.lokasi_kolam">
                    <UInput v-model="form.lokasi_kolam" class="w-full" />
                </UFormField>

                <!-- Panjang & Lebar -->
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Panjang (m)" :error="errors.panjang">
                        <UInput v-model="form.panjang" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Lebar (m)" :error="errors.lebar">
                        <UInput v-model="form.lebar" type="number" class="w-full" />
                    </UFormField>
                </div>

                <!-- Kedalaman -->
                <UFormField label="Kedalaman (m)" :error="errors.kedalaman">
                    <UInput v-model="form.kedalaman" type="number" class="w-full" />
                </UFormField>

                <!-- Volume Air & Kapasitas -->
                <div class="grid grid-cols-2 gap-4">
                    <UFormField label="Volume Air (m³)" :error="errors.volume_air">
                        <UInput v-model="form.volume_air" type="number" class="w-full" />
                    </UFormField>
                    <UFormField label="Kapasitas (ekor)" :error="errors.kapasitas">
                        <UInput v-model="form.kapasitas" type="number" class="w-full" />
                    </UFormField>
                </div>

                <!-- Jenis Kolam -->
                <UFormField label="Jenis Kolam" :error="errors.jenis_kolam">
                    <USelect v-model="form.jenis_kolam" :items="[
                        { label: 'Beton', value: 'beton' },
                        { label: 'Terpal', value: 'terpal' },
                        { label: 'Tanah', value: 'tanah' },
                    ]" placeholder="-- Pilih Jenis Kolam --" class="w-full" />
                </UFormField>

                <!-- Status Kolam -->
                <UFormField label="Status Kolam" :error="errors.status_kolam">
                    <USelect v-model="form.status_kolam" :items="[
                        { label: 'Aktif', value: 'aktif' },
                        { label: 'Nonaktif', value: 'nonaktif' },
                    ]" placeholder="-- Pilih Status --" class="w-full" />
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
