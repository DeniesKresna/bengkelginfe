<script setup>
import { ref, onMounted, watch } from "vue";
import UserMenu from "../components/DropdownProfile.vue";
import MenuNavbar from "../pages/Homepage/MenuNavbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  sidebarOpen: Boolean,
  session: Object,
});

let showLogoJobhun = ref(true);

if (route.meta.hideLogo) {
  showLogoJobhun = false;
}

// const isDashboard = ref(null);

// onMounted(() => {
//   isDashboard.value = route.path.startsWith("/dashboard");
// });

// watch(route, (to) => {
//   isDashboard.value = to.path.startsWith("/dashboard");
// });

let burgerButtonShown = ref(false);

onMounted(() => {
  if (route.path.startsWith("/dashboard")) {
    burgerButtonShown.value = true;
  }
});
</script>

<template>
  <header class="sticky top-0 bg-white z-30 shadow-lg">
    <div class="px-4 sm:px-6 md:px-8 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex">
          <button
            v-if="burgerButtonShown"
            class="text-slate-500 hover:text-slate-600 md:hidden"
            @click.stop="$emit('toggle-sidebar')"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
          <div>
            <b>BENGKEL INTEGRAL</b>
            <router-link to="/" class="">
              <img
                src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/cropped-logo-jobhun-3.png"
                alt="Logo Jobhun"
                class="h-8 md:h-10"
                v-if="showLogoJobhun"
              />
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div>
            <MenuNavbar />
          </div>
          <UserMenu align="right" />
        </div>
      </div>
    </div>
  </header>
</template>