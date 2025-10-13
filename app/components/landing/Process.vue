<template>
  <section class="py-20 bg-blue-50">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Proses Budidaya Kami
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Langkah-langkah yang kami lakukan untuk menghasilkan ikan patin berkualitas tinggi
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md text-center" v-for="(step, index) in steps" :key="index">
          <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-blue-600">{{ index + 1 }}</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ step.title }}</h3>
          <p class="text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Process',
  data() {
    return {
      steps: [
        {
          title: "Pemilihan Bibit Unggul",
          description: "Seleksi bibit patin berkualitas tinggi untuk pertumbuhan optimal."
        },
        {
          title: "Pemberian Pakan Sehat",
          description: "Pakan berkualitas nutrisi tinggi tanpa bahan kimia berbahaya."
        },
        {
          title: "Pemeliharaan Air & Lingkungan",
          description: "Pengelolaan kualitas air dan lingkungan kolam yang optimal."
        },
        {
          title: "Panen & Distribusi",
          description: "Panen berkala setiap hari dan distribusi cepat ke konsumen."
        }
      ]
    }
  }
}
</script>