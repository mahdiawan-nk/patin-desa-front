<template>
  <section id="testimoni" class="py-20 bg-blue-50">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Testimoni Pelanggan
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Apa kata mereka yang telah mempercayai kualitas ikan patin kami
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-white p-6 rounded-lg shadow-md">
          <div class="flex mb-4">
            <svg 
              v-for="star in testimonial.rating" 
              :key="star" 
              class="h-5 w-5 text-yellow-400 fill-current" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p class="text-gray-600 italic mb-4">"{{ testimonial.content }}"</p>
          <div class="border-t pt-4">
            <p class="font-semibold text-gray-800">{{ testimonial.name }}</p>
            <p class="text-blue-600">{{ testimonial.company }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Testimonials',
  data() {
    return {
      testimonials: [
        {
          name: "Budi Santoso",
          company: "Restoran Sari Laut",
          content: "Sudah 2 tahun kami menggunakan patin dari Kampung Patin. Kualitasnya selalu konsisten segar dan harganya kompetitif.",
          rating: 5
        },
        {
          name: "Dewi Lestari",
          company: "Hotel Grand Riau",
          content: "Patin fillet dari Kampung Patin menjadi favorit tamu hotel kami. Dagingnya lembut dan tanpa bau amis.",
          rating: 5
        },
        {
          name: "Ahmad Rizki",
          company: "Catering Sejahtera",
          content: "Untuk acara-acara besar, kami selalu percaya pada Kampung Patin. Suplai terjamin dan pengirimannya tepat waktu.",
          rating: 5
        }
      ]
    }
  }
}
</script>