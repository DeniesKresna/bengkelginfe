<script setup>
import { computed, ref } from "vue";
import PinLocation from "../../partials/icons/icon-pin-location.vue";
import ProfileOverview from "./ProfileOverview.vue";
import OrderingHistory from "./OrderingHistory.vue";

const props = defineProps({
  dataUser: {
    default: {},
    type: Object,
  },
});

const openTab = ref(1);
const toggleTabs = (tabNumber) => (openTab.value = tabNumber);

const dataUser = computed(() => props.dataUser);

const hideHistory = ref(false);
</script>
<template>
  <div class="flex h-96 bg-slate-200 -z-20 -mt-10 md:mt-0">
    <img
      class="object-cover h-full w-full object-top"
      src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner-ilustrasi-01-min.png"
      alt="Profile background"
    />
  </div>
  <div
    class="mx-auto w-full max-w-6xl min-w-0 pt-6 lg:px-8 px-6 lg:pt-8 py-3 md:py-8"
  >
    <div class="mb-6 sm:mb-3 md:flex">
      <div
        class="flex flex-col -mt-10 items-center md:w-1/4 sm:flex-row sm:justify-between sm:items-end"
      >
        <div class="flex flex-row -mt-1 mb-4 sm:mb-0">
          <img
            v-if="dataUser.image_url === ''"
            class="custom-image rounded-full lg:ring-8 md:ring-4 ring-white xl:w-[120px] xl:h-[120px] md:w-[120px] md:h-[120px] w-32 h-32"
            src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/dummy-profile.png"
          />
          <img
            v-else
            class="custom-image rounded-full lg:ring-8 md:ring-4 ring-white xl:w-[150px] xl:h-[150px] md:w-[150px] md:h-[150px] w-40 h-40"
            :src="dataUser.image_url"
          />
        </div>
      </div>
      <div class="text-sm mt-5 ml-5 shrink w-full custom-space">
        <h1 class="text-2xl sm:text-left text-center text-slate-800 font-bold">
          {{ dataUser.first_name + " " + dataUser.last_name }} ✨
        </h1>
        <div
          class="sm:text-left text-center text-slate-800"
          v-if="
            dataUser.role_id === 3 &&
            dataUser.profession !== null &&
            dataUser.company !== null
          "
        >
          <p class="inline-flex">
            {{ dataUser.profession }}
          </p>
          at
          <p class="inline-flex">
            {{ dataUser.company }}
          </p>
        </div>
        <div
          class="sm:text-left text-center text-slate-800"
          v-if="dataUser.role_id === 3 && dataUser.domicile !== null"
        >
          <div class="inline-flex items-center">
            <PinLocation height="30px" />
            <p>{{ dataUser.domicile }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-10 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
        <li class="mr-2">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-jobhunGreen"
            @click="toggleTabs(1)"
            v-bind:class="{
              'text-black': openTab !== 1,
              'text-jobhunGreen border-jobhunGreen': openTab === 1,
            }"
          >
            Profil Pengguna
          </button>
        </li>
        <li class="mr-2" v-if="hideHistory">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-jobhunGreen"
            @click="toggleTabs(2)"
            v-bind:class="{
              'text-black': openTab !== 2,
              'text-jobhunGreen border-jobhunGreen': openTab === 2,
            }"
          >
            Riwayat Transaksi
          </button>
        </li>
      </ul>
    </div>
    <div class="shrink w-full">
      <div class="rounded-lg" v-if="openTab === 1">
        <ProfileOverview :dataProfile="dataUser" />
      </div>
      <div class="rounded-lg" v-if="openTab === 2">
        <div>
          <OrderingHistory />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.custom-image {
  max-width: 100%;
  height: auto;
}

.custom-space {
  margin-top: 10px;
}
</style>