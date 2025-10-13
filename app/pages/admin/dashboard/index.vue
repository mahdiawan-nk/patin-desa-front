<template>
  <section class="space-y-6">
    <!-- Statistik Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatsCard title="Users" value="1,234" description="Total registered users">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </template>
      </StatsCard>

      <StatsCard title="Revenue" value="$12,345" description="Monthly revenue">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414"
            />
          </svg>
        </template>
      </StatsCard>

      <StatsCard title="Orders" value="567" description="Orders this month">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 15h10M9 20h6"
            />
          </svg>
        </template>
      </StatsCard>

      <StatsCard title="Feedback" value="89" description="New feedbacks">
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        </template>
      </StatsCard>
    </div>

    <!-- Tabel -->
    <div>
      <h3 class="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
        User Overview
      </h3>

      <!-- Bungkus tabel agar bisa scroll di mobile -->
      <div class="overflow-x-auto bg-white shadow rounded-lg">
        <DataTable />
      </div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})
import StatsCard from '@/components/admin/StatsCard.vue'
import DataTable from '@/components/admin/DataTable.vue'

import { useDynamicSeo } from '@/composables/useDynamicSeo'

// Set SEO meta untuk halaman landing
useDynamicSeo({
  title: 'Kampung Patin XIII Koto Kampar',
  description: 'Budidaya ikan patin segar langsung dari XIII Koto Kampar. Beli ikan patin segar berkualitas tinggi.',
  image: '/og-image.jpg'
})
</script>
