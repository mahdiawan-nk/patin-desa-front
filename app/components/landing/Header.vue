<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
    <nav class="max-w-7xl mx-auto px-6 lg:px-8 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Kampung Patin Logo"
            class="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span
            class="text-2xl font-extrabold text-blue-600 tracking-tight group-hover:text-blue-700 transition-colors duration-300"
          >
            E-PATEEN
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            href="#tentang"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Tentang</a
          >
          <a
            href="#produk"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Produk</a
          >
          <a
            href="#testimoni"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Testimoni</a
          >
          <a
            href="#kontak"
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Kontak</a
          >
        </div>

        <!-- Desktop Button -->
        <div class="hidden md:block">
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition-all duration-300"
          >
            Pesan Sekarang
          </a>
        </div>

        <!-- Mobile Hamburger -->
        <button
          @click="isOpen = !isOpen"
          class="md:hidden text-gray-700 focus:outline-none transition-transform duration-200"
          :class="{ 'rotate-90': isOpen }"
        >
          <svg
            v-if="!isOpen"
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <svg
            v-else
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-show="isOpen"
          class="md:hidden mt-4 space-y-4 bg-white rounded-xl p-5 shadow-lg border border-gray-100"
        >
          <a
            href="#tentang"
            class="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Tentang</a
          >
          <a
            href="#produk"
            class="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Produk</a
          >
          <a
            href="#testimoni"
            class="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Testimoni</a
          >
          <a
            href="#kontak"
            class="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
            >Kontak</a
          >
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            class="block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-center shadow-md transition-all duration-300"
          >
            Pesan Sekarang
          </a>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
const isOpen = ref(false);
</script>
