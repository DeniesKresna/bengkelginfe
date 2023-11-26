<template>
  <div class="flex h-screen">
    <div
      class="relative flex flex-col flex-1 overflow-y-auto"
      id="layoutContent"
    >
      <Header
        :sidebarOpen="sidebarOpen"
        :session="session"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />
      <main>
        <loading-overlay :is-loading="!isRequestAmountIsNull">
          <!-- <router-view />
          <Footer /> -->
          <Suspense>
            <template #default>
              <div>
                <router-view />
                <Footer />
              </div>
            </template>
            <template #fallback>
              <loading-overlay
                :is-loading="!isRequestAmountIsNull"
              ></loading-overlay>
            </template>
          </Suspense>
        </loading-overlay>
      </main>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useLayoutStore } from "./store";
import Header from "../../partials/Header.vue";
import Footer from "../../pages/layout/Footer.vue";
import LoadingOverlay from "./Overlay.vue";
import { useOptionsStore } from "../../stores/store-options";

const sidebarOpen = ref(false);

const layoutStore = useLayoutStore();

const isRequestAmountIsNull = computed(
  () => layoutStore.isApiRequestAmountNull
);
const session = computed(() => layoutStore.session);

layoutStore.getSession();

const optionsStore = useOptionsStore();
optionsStore.getSectors();
optionsStore.getDomiciles();
optionsStore.getServices();
optionsStore.getTitle();
optionsStore.getAccorConsul();

onMounted(() => {
  const roleId = session.value.role_id;
  localStorage.setItem("role_id", JSON.stringify(roleId));

  const body = document.querySelector("body");
  body.classList.add("overflow-y-hidden");
  setTimeout(() => {
    body.classList.remove("overflow-y-hidden");
    window.scrollTo(0, 0);
  }, 0);
});
</script>