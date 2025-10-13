<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="containe max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-2xl font-bold mb-4">Kampung Patin</h3>
          <p class="text-gray-300">
            Pusat budidaya dan penjualan ikan patin segar berkualitas dari Riau. 
            Melayani kebutuhan rumah tangga, restoran, hotel, dan acara khusus.
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-semib极 mb-4">Tautan Cepat</h4>
          <ul class="space-y-2">
            <li><a href="#tentang" class="text-gray-300 hover:text-white">Tentang Kami</a></li>
            <li><a href="#produk" class="text-gray-300 hover:text-white">Produk</a></li>
            <li><a href="#testimoni" class="text-gray-300 hover:text-white">Testimoni</a></li>
            <li><a href="#kontak" class="text-gray-300 hover:text-white">Kontak</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">Pesan Sekarang</h4>
          <a
            href="https://wa.me/628123456789"
            class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-4"
          >
            <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 极 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 极 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            WhatsApp
          </a>
          <p class="text-gray-300 mt-4">© 2024 Kampung Patin. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>