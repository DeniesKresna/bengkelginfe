<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "lodash";
import DateSingle from "./DateSingle.vue";
import Multiselect from "@vueform/multiselect";
import { useDataKonsultasiStore } from "../../../../../stores/store-konsultasi";
import { useDataExpertStore } from "../../../../../stores/store-experts";
import ModalFormKonsultasi from "./ModalAjukanFormKonsultasi.vue";
import { hours, minutes, discussions } from "../../../../../utils/Constants";

const router = useRouter();

const formTambahKonsultasi = useDataKonsultasiStore();
const expertStore = useDataExpertStore();

const formProposalKonsultasi = ref({
  start_date: "",
  start_hour: "",
  start_minute: "",
  discussion: [],
  description: "",
  duration: 1,
  expert_id: "",
});

const increment = () => {
  formProposalKonsultasi.value.duration += 1;
};

const decrement = () => {
  if (formProposalKonsultasi.value.duration === 1) return;
  formProposalKonsultasi.value.duration -= 1;
};

const isLoading = ref(false);

const formValidation = async () => {
  try {
    if (
      formProposalKonsultasi.value.start_date != "" &&
      formProposalKonsultasi.value.start_hour != "" &&
      formProposalKonsultasi.value.start_minute != "" &&
      formProposalKonsultasi.value.discussion.length !== 0 &&
      formProposalKonsultasi.value.description != "" &&
      formProposalKonsultasi.value.duration != "" &&
      formProposalKonsultasi.value.expert_id != ""
    ) {
      isLoading.value = true;
      const res = await formTambahKonsultasi.formPengajuanKonsultasi(
        formProposalKonsultasi.value
      );
      if (res) {
        openModal();
        return;
      } else {
        isLoading.value = false;
      }
    }
  } catch (error) {
    isLoading.value = false;
  }
};

const isFormFilled = ref(false);

const openModal = () => {
  isFormFilled.value = true;
};

const closeModal = () => {
  isFormFilled.value = false;
  router.push("/layanan/konsultasi");
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
  formProposalKonsultasi.value.expert_id = selectedOptions;
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<template>
  <div
    class="flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-8 py-3 md:py-8"
  >
    <div
      class="sm:flex sm:justify-between sm:items-center mb-5 grid grid-flow-row md:flex"
    >
      <div class="">
        <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
          Formulir Konsultasi
        </h1>
      </div>
    </div>
  </div>
  <form @submit.prevent="formValidation">
    <div
      class="flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0"
    >
      <div>
        <label class="block text-sm font-medium mb-1 text-black"
          >Pengajuan tanggal konsultasi</label
        >
        <div class="flex items-center space-x-2">
          <DateSingle v-model="formProposalKonsultasi.start_date" required />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pengajuan waktu konsultasi</label
        >
        <div class="flex items-center space-x-2">
          <select
            required
            v-model="formProposalKonsultasi.start_hour"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-14"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <option v-for="hour in hours" :key="hour.text">
              {{ hour.text }}
            </option>
          </select>
          <span class="px-1">:</span>
          <select
            required
            v-model="formProposalKonsultasi.start_minute"
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
              {{ formProposalKonsultasi.duration }} jam
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
          v-model="formProposalKonsultasi.discussion"
          mode="tags"
          :close-on-select="false"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full"
          :create-option="true"
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
          v-model="formProposalKonsultasi.description"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pilih Expert</label
        >
        <Multiselect
          v-model="formProposalKonsultasi.expert_id"
          :close-on-select="true"
          :searchable="true"
          required
          :options="listExpertOptionData"
          @search-change="debouncedGetExpertOptions"
          :filter-results="false"
          :resolve-on-load="false"
          @select="handleExpertSelect"
          :loading="loadingSpinner"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full"
          :classes="{
            containerActive: 'ring-0',
            search:
              'w-full absolute inset-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen appearance-none border-0 text-base font-sans rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
          }"
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
      <div>
        <div class="flex justify-end">
          <div>
            <button
              v-if="!isLoading"
              type="submit"
              class="h-9 mt-5 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm"
            >
              Ajukan
            </button>
            <button
              v-if="isLoading"
              class="btn bg-jobhunGreen hover:bg-emerald-600 text-white mt-5 ml-3 w-20 h-9"
            >
              <span class="loader"></span>
            </button>
            <ModalFormKonsultasi
              :isUserAjukan="isFormFilled"
              @close-modal="closeModal"
            />
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