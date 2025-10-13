<template>
  <section class="py-20 bg-white">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Data & Fakta Produksi
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Bukti nyata komitmen kami dalam menyediakan ikan patin berkualitas
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div class="p-6" v-for="(fact, index) in facts" :key="index">
          <div class="text-5xl font-bold text-blue-600 mb-4">{{ fact.value }}</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ fact.title }}</h3>
          <p class="text-gray-600">{{ fact.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Facts',
  data() {
    return {
      facts: [
        {
          value: "90%+",
          title: "Warga Terlibat Budidaya",
          description: "Mayoritas warga desa terlibat dalam proses budidaya ikan patin"
        },
        {
          value: "3-4 Ton",
          title: "Panen Harian",
          description: "Setiap hari kami memanen 3-4 ton ikan patin segar"
        },
        {
          value: "Seluruh Riau",
          title: "Area Distribusi",
          description: "Melayani pengiriman ke seluruh Riau dan Sumatera"
        }
      ]
    }
  }
}
</script>