<template>
  <div
    class="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
    :class="hover ? 'hover:shadow-lg transition-shadow duration-300' : ''"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="mt-1 text-2xl font-semibold text-indigo-600">{{ value }}</p>
      </div>
      <div class="text-indigo-100 bg-indigo-200 rounded-full p-3">
        <slot name="icon" />
      </div>
    </div>
    <p class="mt-4 text-sm text-gray-400">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  description: String,
  hover: {
    type: Boolean,
    default: true
  }
})
</script>