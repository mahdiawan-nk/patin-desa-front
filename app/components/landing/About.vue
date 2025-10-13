<template>
  <section id="tentang" class="py-20 bg-white">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Kenapa Patin dari Kampung Patin?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Keunggulan budidaya ikan patin kami yang membuat perbedaan
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <div class="flex items-start" v-for="(feature, index) in features" :key="index">
            <div class="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
              <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1250b783-a9ec-4d1c-8fb7-ecbb0b4b6555.png"
            alt="Kolam ikan patin yang luas dengan pemandangan alam hijau di sekitarnya"
            class="rounded-lg shadow-md"
          />
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7ee82406-3f62-4de8-9d96-0f0f976cd301.png"
            alt="Proses pemberian pakan alami untuk ikan patin di kolam budidaya"
            class="rounded-lg shadow-md"
          />
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c5a8195d-104e-48ee-b553-795e648b9490.png"
            alt="Panen ikan patin segar dengan jaring yang penuh dengan ikan"
            class="rounded-lg shadow-md"
          />
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ad800521-0d53-4cb0-94a0-46828476ae85.png"
            alt="Ikan patin segar yang baru dipanen dengan kualitas terbaik"
            class="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      features: [
        {
          title: "Kolam Seluas ±42 Hektar",
          description: "Luas kolam yang memadai menjamin suplai ikan patin yang stabil dan berkualitas."
        },
        {
          title: "Panen Harian 3–4 Ton",
          description: "Dipanen setiap hari untuk memastikan kesegaran maksimal sampai ke konsumen."
        },
        {
          title: "Teknik Budidaya Ramah Lingkungan",
          description: "Metode budidaya yang memperhatikan kelestarian lingkungan dan kesejahteraan ikan."
        },
        {
          title: "Bersertifikat & Terpercaya",
          description: "Sudah bersertifikat dan dipercaya oleh konsumen dari seluruh Indonesia."
        }
      ]
    }
  }
}
</script>