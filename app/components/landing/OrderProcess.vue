<template>
  <section class="py-20 bg-blue-50">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Cara Pemesanan Mudah
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Hanya 3 langkah sederhana untuk mendapatkan ikan patin segar kami
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center" v-for="(step, index) in steps" :key="index">
          <div class="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{{ index + 1 }}</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <a
          href="https://wa.me/628123456789?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20pemesanan%20ikan%20patin"
          class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OrderProcess',
  data() {
    return {
      steps: [
        {
          title: "Hubungi Kami",
          description: "Hubungi via WhatsApp atau marketplace untuk konsultasi kebutuhan"
        },
        {
          title: "Pilih Produk",
          description: "Tentukan jenis produk dan jumlah yang dibutuhkan"
        },
        {
          title: "Pengiriman",
          description: "Ikan segar dikirim dan sampai ke tujuan dengan cepat"
        }
      ]
    }
  }
}
</script>