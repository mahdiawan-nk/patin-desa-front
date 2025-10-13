<template>
  <section class="relative h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img
        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/48594bbe-a79a-4ec0-bfbf-3b2901ca83f8.png"
        alt="Panen ikan patin di kolam dengan pemandangan alam yang hijau dan kolam ikan yang luas"
        class="w-full h-full object-cover opacity-20"
      />
    </div>
    
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
          Patin Segar Langsung dari <span class="text-blue-600">Kampung Patin XIII Koto Kampar</span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Budidaya alami, panen setiap hari 3–4 ton, kualitas terbaik dari sentra patin Riau
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/628123456789?text=Halo,%20saya%20ingin%20memesan%20ikan%20patin%20segar"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg flex items-center justify-center transition-colors"
          >
            Pesan Ikan Segar Sekarang
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
          
          <a
            href="#tentang"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg flex items-center justify-center transition-colors"
          >
            Lihat Proses Budidaya
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>