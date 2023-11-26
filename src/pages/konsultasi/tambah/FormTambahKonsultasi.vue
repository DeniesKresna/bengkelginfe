<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import Multiselect from "@vueform/multiselect";
import { useDataKonsultasiStore } from "../../../stores/store-konsultasi";
import { useDataExpertStore } from "../../../stores/store-experts";
import { useOptionsStore } from "../../../stores/store-options";
import flatPickr from "vue-flatpickr-component";
import DateSingle from "./DateSingle.vue";
import { hours, minutes } from "../../../utils/Constants";
import { debounce } from "lodash";

const expertStore = useDataExpertStore();
const tambahExpertKonsultasiStore = useDataKonsultasiStore();
const optionStore = useOptionsStore();

const { listSector, listDomicile, listService, listTitle } =
  storeToRefs(optionStore);

const duration = ref(1);
const price = ref(200000);

const increment = () => {
  duration.value += 1;
};

const decrement = () => {
  if (duration.value === 1) return;
  duration.value -= 1;
};

const pricePerHour = computed(() => {
  var pricePerHour = price.value;
  return (
    "Rp" +
    pricePerHour.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
  );
  return pricePerHour;
});

const total = computed(() => {
  var total = duration.value * price.value;
  return "Rp" + total.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
  return total;
});

const formTambahDashboardExpertKonsultasi = ref({
  start_date: "",
  start_hour: "",
  start_minute: "",
  discussion: [],
  description: "",
  total: "",
  duration: 1,
  expert_id: 0,
});

const discussions = ["Teori", "Praktik", "Tools", "Soft Skill"];

const config = {
  wrap: true,
  required: true,
  altInput: true,
  altFormat: "F j, Y",
  static: true,
  required: true,
  monthSelectorType: "static",
  dateFormat: "Z",
  prevArrow:
    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
  nextArrow:
    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
};

const formValidation = async () => {
  if (
    formTambahDashboardExpertKonsultasi.value.start_date != "" &&
    formTambahDashboardExpertKonsultasi.value.start_hour != "" &&
    formTambahDashboardExpertKonsultasi.value.start_minute != "" &&
    formTambahDashboardExpertKonsultasi.value.discussion != "" &&
    formTambahDashboardExpertKonsultasi.value.description != "" &&
    formTambahDashboardExpertKonsultasi.value.total != "" &&
    formTambahDashboardExpertKonsultasi.value.duration != ""
  ) {
    if (
      await tambahExpertKonsultasiStore.formTambahTransaksiKonsultasiDashboard(
        formTambahDashboardExpertKonsultasi.value
      )
    ) {
      return;
    }
  }
};

const listExpertOptionData = ref([]);
const loadingSpinner = ref(false);

const getInitialExpertOptions = async () => {
  let expertOptionData = await expertStore.getListExpertOptionData("");
  expertOptionData.forEach((el) => {
    el.value = el.id;
  });
  listExpertOptionData.value = expertOptionData;
};

const debouncedGetExpertOptions = debounce(async (query) => {
  if (query) {
    loadingSpinner.value = true;
    let expertOptionData = await expertStore.getListExpertOptionData(query);
    expertOptionData.forEach((el) => {
      el.value = el.id;
    });
    listExpertOptionData.value = expertOptionData;
  }
  loadingSpinner.value = false;
}, 1000);

onMounted(() => {
  getInitialExpertOptions();
});

const handleExpertSelect = (selectedOptions) => {
  formTambahDashboardExpertKonsultasi.value.expert = selectedOptions;
};
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>
<template>
  <div
    class="flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-8 py-3 md:py-8"
  >
    <div
      class="sm:flex sm:justify-between sm:items-center mb-5 grid grid-flow-row md:flex"
    >
      <div class="">
        <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
          Tambah Transaksi Konsultasi ✨
        </h1>
      </div>
    </div>
  </div>
  <form @submit.prevent="formValidation()">
    <div
      class="flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0"
    >
      <div>
        <label class="block text-sm font-medium mb-1 text-black"
          >Pengajuan tanggal konsultasi</label
        >
        <div class="flex items-center space-x-2">
          <DateSingle v-model="formTambahDashboardExpertKonsultasi.date" />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pengajuan waktu konsultasi</label
        >
        <div class="flex items-center space-x-2">
          <select
            v-model="formTambahDashboardExpertKonsultasi.start_hour"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-14"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <option v-for="hour in hours" :key="hour.text">
              {{ hour.text }}
            </option>
          </select>
          <span class="px-1">:</span>
          <select
            v-model="formTambahDashboardExpertKonsultasi.start_minute"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-14"
          >
            <option v-for="minute in minutes" :key="minute.text">
              {{ minute.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Durasi konsultasi</label
        >
        <div class="custom-number-input w-32">
          <div
            class="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1"
          >
            <div
              @click="decrement()"
              class="border-0 bg-gray-100 hover:bg-gray-300 hover:ring-emerald-500 focus:ring-jobhunGreen h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="text-2xl ml-2 font-thin">−</span>
            </div>
            <div
              type="number"
              class="border-0 bg-gray-100 hover:ring-emerald-500 focus:ring-jobhunGreen p-1.5 text-sm w-full text-center flex items-center text-gray-700"
            >
              {{ duration }} jam
            </div>
            <div
              @click="increment()"
              class="border-0 bg-gray-100 hover:bg-gray-300 hover:ring-emerald-500 focus:ring-jobhunGreen h-full w-20 rounded-r cursor-pointer"
            >
              <span class="ml-2 text-2xl font-thin">+</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Jenis pembahasan</label
        >
        <Multiselect
          v-model="formTambahDashboardExpertKonsultasi.discussion"
          mode="tags"
          :close-on-select="false"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full"
          required
          :options="discussions"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Jelaskan secara spesifik topik/pembahasan apa saja yang ingin kamu
          pelajari dari expert!</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formTambahDashboardExpertKonsultasi.topic"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pilih expert</label
        >
        <Multiselect
          v-model="formTambahDashboardExpertKonsultasi.expert_id"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full ml-0"
          :classes="{
            containerActive: 'ring-0',
            search:
              'w-full absolute inset-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen appearance-none border-0 text-base font-sans rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
          }"
          :close-on-select="true"
          :searchable="true"
          required
          :options="listExpertOptionData"
          @search-change="debouncedGetExpertOptions"
          :filter-results="false"
          :resolve-on-load="false"
          @select="handleExpertSelect"
          :loading="loadingSpinner"
        >
          <template v-slot:singlelabel="{ value }">
            <div class="multiselect-single-label">
              <span>{{ value.name }} - {{ value.profession }}</span>
            </div>
          </template>
          <template v-slot:option="{ option }">
            <span>{{ option.name }} - {{ option.profession }}</span>
          </template>
        </Multiselect>
      </div>
      <hr class="my-10 border-gray-300 sm:mx-auto" />
      <div>
        <div class="flex justify-end mt-5">
          <div class="font-bold text-lg text-black">Total {{ total }},-</div>
        </div>
      </div>
      <div>
        <div class="flex justify-end">
          <div>
            <button
              type="submit"
              class="h-9 mt-5 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm"
            >
              Tambah
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  margin: 0;
}

.custom-number-input input:focus {
  outline: none !important;
}

.custom-number-input button:focus {
  outline: none !important;
}
</style>