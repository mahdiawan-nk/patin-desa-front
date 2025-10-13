<template>
  <div class="min-h-screen bg-white">
    <Header />
    <Hero />
    <About />
    <Process />
    <Products />
    <Testimonials />
    <Facts />
    <OrderProcess />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/landing/Header.vue'
import Hero from '@/components/landing/Hero.vue'
import About from '@/components/landing/About.vue'
import Process from '@/components/landing/Process.vue'
import Products from '@/components/landing/Products.vue'
import Testimonials from '@/components/landing/Testimonials.vue'
import Facts from '@/components/landing/Facts.vue'
import OrderProcess from '@/components/landing/OrderProcess.vue'
import Contact from '@/components/landing/Contact.vue'
import Footer from '@/components/landing/Footer.vue'

import { useDynamicSeo } from '@/composables/useDynamicSeo'

// Set SEO meta untuk halaman landing
useDynamicSeo({
  title: 'Kampung Patin XIII Koto Kampar',
  description: 'Budidaya ikan patin segar langsung dari XIII Koto Kampar. Beli ikan patin segar berkualitas tinggi.',
  image: '/og-image.jpg'
})
</script>
