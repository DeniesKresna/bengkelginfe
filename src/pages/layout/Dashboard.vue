<template>
  <div class="flex h-screen">
    <div
      class="relative flex flex-col flex-1 overflow-y-auto"
      id="layoutContent"
    >
      <Header
        :session="session"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />
      <main>
        <router-view />
        <footer>
            <hr class="border-gray-300 mt-6 mb-3">
            <p class="block text-sm mt-5 text-gray-500 md:text-center text-center mr-4 md:mr-6 ml-4 md:ml-0">
                <span class="text-sm">© Copyright 2023 PT Jobhun Membangun Indonesia. All Right Reserved.</span>
            </p>
        </footer>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useLayoutStore } from "./store";
import Header from "../../partials/Header.vue";

const sidebarOpen = ref(false);

const layoutStore = useLayoutStore();

const session = computed(() => layoutStore.session);
layoutStore.getSession();

onMounted(() => {
  const body = document.querySelector("body");
  body.classList.add("overflow-y-hidden");
  setTimeout(() => {
    body.classList.remove("overflow-y-hidden");
    window.scrollTo(0, 0);
  }, 0);
});
</script>