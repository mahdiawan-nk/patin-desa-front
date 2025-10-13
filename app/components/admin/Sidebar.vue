<template>
	<!-- Overlay untuk mobile -->
	<div v-if="mobileOpen && isMobile" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="closeMobile"></div>

	<aside :class="[
		'fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-white shadow-md transition-all duration-300',
		collapsed ? 'w-20' : 'w-64',
		mobileOpen ? 'translate-x-0' : '-translate-x-full',
		'lg:translate-x-0',
	]">
		<div class="flex items-center justify-between p-4 border-b h-16">
			<div v-if="!collapsed" class="flex items-center">
				<img v-if="!collapsed" src="/logo.png" alt="" class="w-8 h-8">
				<h1 v-if="!collapsed" class="ml-2 text-xl font-bold text-indigo-600">E-PATEEN</h1>

			</div>
			<button @click="$emit('toggle')" class="p-2 rounded hover:bg-indigo-100">
				<svg v-if="collapsed" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none"
					viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
				</svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none"
					viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<nav class="flex flex-col mt-4 space-y-2 px-2">
			<NuxtLink to="/panel/dashboard" class="flex items-center gap-3 p-2 rounded hover:bg-indigo-100"
				:class="{ 'bg-indigo-200 font-semibold': route.path === '/panel/dashboard' }"
				@click="closeMobile(false)">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path fill-rule="evenodd"
						d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
						clip-rule="evenodd" />
				</svg>
				<span v-if="!collapsed">Dashboard</span>
			</NuxtLink>
			<!-- Section: Management User -->
			<p v-if="!collapsed" class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
				Management User
			</p>
			<NuxtLink to="/panel/users" class="flex items-center gap-3 p-2 rounded hover:bg-indigo-100"
				active-class="bg-indigo-200 font-semibold" @click="closeMobile(false)">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"
						clip-rule="evenodd" />
				</svg>
				<span v-if="!collapsed">Users</span>
			</NuxtLink>
			<NuxtLink to="/panel/profile" class="flex items-center gap-3 p-2 rounded hover:bg-indigo-100"
				active-class="bg-indigo-200 font-semibold" @click="closeMobile(false)">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<span v-if="!collapsed">Profile</span>
			</NuxtLink>

			<!-- Section: Management Budidaya -->
			<p v-if="!collapsed" class="mt-4 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
				Management Budidaya
			</p>
			<NuxtLink to="/panel/kolam" class="flex items-center gap-3 p-2 rounded hover:bg-indigo-100"
				:class="{ 'bg-indigo-200 font-semibold': route.path === '/panel/kolam' }" @click="closeMobile(false)">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M9 6h6M9 18h6" />
				</svg>
				<span v-if="!collapsed">Data Kolam</span>
			</NuxtLink>
			<NuxtLink to="/panel/monitoring" class="flex items-center gap-3 p-2 rounded hover:bg-indigo-100"
				active-class="bg-indigo-200 font-semibold" @click="closeMobile(false)">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M9 6h6M9 18h6" />
				</svg>
				<span v-if="!collapsed">Monitoring Kolam & Event</span>
			</NuxtLink>
			<div class="nav-main-submenu">
				<button class="flex items-center justify-between w-full gap-3 p-2 rounded hover:bg-indigo-100"
					:class="{ 'bg-indigo-200 font-semibold': openSubmenu == 'seeding' }"
					@click="toggleSubmenu('seeding')">
					<div class=" flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 12h18M9 6h6M9 18h6" />
						</svg>
						<span v-if="!collapsed">Siklus Budidaya</span>
					</div>
					<svg v-if="!collapsed" xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-gray-500 transition-transform duration-200"
						:class="{ 'rotate-90': openSubmenu == 'seeding' }" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>

				<!-- Submenu -->
				<transition name="fade">
					<nav v-show="openSubmenu == 'seeding' && !collapsed" class="ml-8 mt-1 flex flex-col gap-1">
						<NuxtLink to="/panel/seedings" class="submenu-link" active-class="bg-indigo-200 font-semibold"
							@click="closeMobile">
							Penebaran Benih
						</NuxtLink>
						<NuxtLink to="/panel/feedings" class="submenu-link"
							active-class="bg-indigo-200 font-semibold" @click="closeMobile">
							Pemberian Pakan
						</NuxtLink>
						<NuxtLink to="/panel/sampling-growth" class="submenu-link"
							active-class="bg-indigo-200 font-semibold" @click="closeMobile">
							Sampling Pertumbuhan
						</NuxtLink>
					</nav>
				</transition>
			</div>
			<div class="nav-main-submenu">
				<button class="flex items-center justify-between w-full gap-3 p-2 rounded hover:bg-indigo-100"
					:class="{ 'bg-indigo-200 font-semibold': openSubmenu == 'harvest' }"
					@click="toggleSubmenu('harvest')">
					<div class=" flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M3 12h18M9 6h6M9 18h6" />
						</svg>
						<span v-if="!collapsed">Panen</span>
					</div>
					<svg v-if="!collapsed" xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-gray-500 transition-transform duration-200"
						:class="{ 'rotate-90': openSubmenu == 'harvest' }" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</button>

				<!-- Submenu -->
				<transition name="fade">
					<nav v-show="openSubmenu == 'harvest' && !collapsed" class="ml-8 mt-1 flex flex-col gap-1">
						<NuxtLink to="/panel/harvest/estimation" class="submenu-link"
							active-class="bg-indigo-200 font-semibold" @click="closeMobile">
							Estimasi Panen
						</NuxtLink>
						<NuxtLink to="/panel/harvest/realization" class="submenu-link"
							active-class="bg-indigo-200 font-semibold" @click="closeMobile">
							Realisasi Panen
						</NuxtLink>
					</nav>
				</transition>
			</div>
		</nav>

	</aside>

	<!-- Tombol toggle hanya muncul di mobile -->
	<button class="fixed bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg lg:hidden z-50"
		@click="toggleMobile">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "#imports";

const route = useRoute();

defineProps({
	collapsed: Boolean,
});

const mobileOpen = ref(false);
const isMobile = ref(false);
const openSubmenu = ref<string | null>(null)
// const collapsed = ref(false)

const checkMobile = () => {
	isMobile.value = window.innerWidth < 1024;
	if (!isMobile.value) {
		mobileOpen.value = false;
	}
};

const toggleMobile = () => {
	mobileOpen.value = !mobileOpen.value;
};

const closeMobile = (keepSubmenu = true) => {
	mobileOpen.value = false;
	if (!keepSubmenu) {
		openSubmenu.value = null
	}
}

function toggleSubmenu(name: string) {
	openSubmenu.value = openSubmenu.value === name ? null : name;
}
onMounted(() => {
	checkMobile();
	window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
aside {
	min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}
</style>
