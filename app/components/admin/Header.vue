<template>
    <header class="flex items-center justify-between bg-white shadow px-4 sm:px-6 h-16">
        <!-- Judul -->
        <div>
            <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        <!-- User -->
        <div class="relative">
            <button @click="toggleMenu" class="flex items-center gap-3 focus:outline-none">
                <!-- Info user sembunyi di mobile -->
                <div class="block text-right">
                    <p class="font-medium text-gray-700" v-if="user">{{ user.fullname }}</p>
                    <p class="text-sm text-gray-500" v-if="user">{{ user.email }}</p>
                </div>
                <img src="https://i.pravatar.cc/40" alt="User Avatar"
                    class="w-10 h-10 rounded-full border-2 border-indigo-600" />
            </button>

            <!-- Dropdown -->
            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <div v-if="open" class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
                    <NuxtLink to="/panel/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        @click="closeMenu">
                        Profil
                    </NuxtLink>
                    <button @click="logoutUser"
                        class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                        Logout
                    </button>
                </div>
            </transition>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const { fetchUser, user, logout } = useAuth()


await useAsyncData('auth-user', async () => {
    const users = await fetchUser()
    if (!users) {
        navigateTo('/panel')
        // console.log('no user')
    }
    return user.value
})

const open = ref(false)

const toggleMenu = () => {
    open.value = !open.value
}

const closeMenu = () => {
    open.value = false
}

const logoutUser = () => {
    
    logout()
    navigateTo('/panel')
}

// tutup dropdown kalau klik di luar
const handleClickOutside = (e) => {
    const dropdown = document.querySelector("header .relative")
    if (dropdown && !dropdown.contains(e.target)) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>
