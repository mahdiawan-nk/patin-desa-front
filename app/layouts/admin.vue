<template>
  <div class="flex h-screen bg-gray-50 text-gray-900">
    <!-- Overlay untuk mobile -->
    <div
      v-if="mobileOpen && isMobile"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="closeMobile"
    ></div>

    <!-- Sidebar -->
    <Sidebar
      :collapsed="sidebarCollapsed"
      @toggle="toggleSidebar"
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0'
      ]"
    />

    <!-- Konten utama -->
    <div class="flex flex-col flex-1 min-w-0">
      <Header @menu="toggleMobile" />

      <main class="p-4 sm:p-6 overflow-auto flex-1">
        <slot />
      </main>
    </div>
  </div>

  <!-- <UiToast /> -->
</template>

<script setup>
import '~/assets/css/admin.css'
import { ref, onMounted, onBeforeUnmount } from "vue"
import Sidebar from "@/components/admin/Sidebar.vue"
import Header from "~/components/admin/Header.vue"
// import UiToast from '~/components/ui/UiToast.vue'

const sidebarCollapsed = ref(false)
const mobileOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) {
    mobileOpen.value = false
  }
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}

const closeMobile = () => {
  mobileOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener("resize", checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile)
})
</script>

<style>
/* Scrollbar styling for main content */
main::-webkit-scrollbar {
  width: 8px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(100, 116, 139, 0.5);
  border-radius: 4px;
}
</style>
