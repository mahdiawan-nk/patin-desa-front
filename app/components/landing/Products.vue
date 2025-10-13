<template>
  <section id="produk" class="py-20 bg-gray-50">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Judul -->
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Harga Ikan Patin Segar
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Pilihan paket ikan patin segar langsung dari kolam dengan kualitas terbaik
        </p>
      </div>

      <!-- Price Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="product in freshProducts"
          :key="product.id"
          class="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
        >
          <!-- Gambar -->
          <img
            :src="product.image"
            :alt="product.alt"
            class="w-full h-48 object-cover"
          />

          <!-- Isi -->
          <div class="p-6 flex flex-col flex-1">
            <!-- Nama & Deskripsi -->
            <h3 class="text-xl font-semibold text-gray-800 mb-2 text-center">
              {{ product.name }}
            </h3>
            <p class="text-gray-600 text-center mb-4">
              {{ product.description }}
            </p>

            <!-- Harga -->
            <div class="text-center mb-6">
              <span class="text-3xl font-bold text-blue-600 block">
                {{ product.price }}
              </span>
              <span v-if="product.minOrder" class="text-sm text-gray-500">
                {{ product.minOrder }}
              </span>
            </div>

            <!-- Point Unggulan -->
            <ul class="space-y-2 text-gray-700 text-sm mb-6">
              <li
                v-for="(point, index) in product.highlights"
                :key="index"
                class="flex items-start"
              >
                <svg
                  class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{{ point }}</span>
              </li>
            </ul>

            <!-- Ketentuan -->
            <div v-if="product.terms && product.terms.length" class="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
              <h4 class="font-medium text-gray-800 text-sm mb-2">Ketentuan:</h4>
              <ul class="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li v-for="(term, tIndex) in product.terms" :key="tIndex">{{ term }}</li>
              </ul>
            </div>

            <!-- CTA -->
            <a
              :href="`https://wa.me/628123456789?text=Saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`"
              class="mt-auto block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PriceCards',
  data() {
    return {
      products: [
        {
          id: 1,
          category: 'segar',
          name: 'Ikan Patin Segar Utuh',
          description: 'Dipanen hari ini, dijamin segar langsung dari kolam.',
          price: 'Rp 35.000/kg',
          minOrder: '',
          image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5824ee48-f645-4b4f-9afc-6c5f1ef2c756.png',
          alt: 'Ikan patin segar utuh',
          highlights: [
            'Dipanen langsung saat dipesan',
            'Harga petani tanpa perantara',
            'Dijamin segar 100%'
          ],
          terms: [
            'Pengiriman area Kampar & Pekanbaru',
            'Minimal order 5 kg'
          ]
        },
        {
          id: 2,
          category: 'segar',
          name: 'Patin Ukuran Besar',
          description: 'Khusus untuk restoran dan hotel (1kg ke atas).',
          price: 'Rp 45.000/kg',
          minOrder: '',
          image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f0318ab4-187c-493a-abe8-17ce3fe9b6a5.png',
          alt: 'Patin ukuran besar',
          highlights: [
            'Ukuran premium 1kg+ per ekor',
            'Cocok untuk restoran & hotel',
            'Kualitas super segar'
          ],
          terms: [
            'Pesanan besar bisa pre-order',
            'Gratis ongkir min. 30 kg'
          ]
        },
        {
          id: 3,
          category: 'segar',
          name: 'Paket Kebutuhan Acara',
          description: 'Ideal untuk acara pernikahan, syukuran, dan lainnya.',
          price: 'Rp 30.000/kg',
          minOrder: '(min. 50kg)',
          image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b40d7a95-1e1d-4866-a5c2-008105d6f273.png',
          alt: 'Paket ikan segar untuk acara',
          highlights: [
            'Harga khusus untuk acara besar',
            'Langsung panen jumlah banyak',
            'Kualitas tetap terjaga'
          ],
          terms: [
            'Minimal order 50 kg',
            'Harap booking H-3 acara'
          ]
        }
      ]
    }
  },
  computed: {
    freshProducts() {
      return this.products.filter(p => p.category === 'segar')
    }
  }
}
</script>
