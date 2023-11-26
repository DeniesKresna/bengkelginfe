<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "lodash";
import Multiselect from "@vueform/multiselect";
import { useDataOrderPelatihanStore } from "../../../../../stores/store-order-pelatihan";
import { useDataExpertStore } from "../../../../../stores/store-experts";
import ModalFormPelatihan from "./ModalAjukanFormPelatihan.vue";
import { hours, minutes, days } from "../../../../../utils/Constants";

const router = useRouter();

const pelatihanStore = useDataOrderPelatihanStore();
const expertStore = useDataExpertStore();

const formProposalPelatihan = ref({
  type: null,
  participants: "",
  session: "",
  description: "",
  start_hour: "",
  start_minute: "",
  days: [],
  expert_id: "",
});

const parseValue = (event) => {
  formProposalPelatihan.value.type = parseInt(event.target.value);
};

const isNumberCurrency = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    parseInt(evt.preventDefault());
  } else {
    return true;
  }
};

const isLoading = ref(false);

const formValidation = async () => {
  console.log(formProposalPelatihan.value);
  try {
    if (
      formProposalPelatihan.value.type !== "" &&
      formProposalPelatihan.value.participants !== "" &&
      formProposalPelatihan.value.session !== "" &&
      formProposalPelatihan.value.description !== "" &&
      formProposalPelatihan.value.start_hour !== "" &&
      formProposalPelatihan.value.start_minute !== "" &&
      formProposalPelatihan.value.days !== "" &&
      formProposalPelatihan.value.expert_id !== ""
    ) {
      isLoading.value = true;
      const res = await pelatihanStore.formPengajuanPelatihan(
        formProposalPelatihan.value
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
  router.push("/layanan/pelatihan");
};

const isDisabled = computed(() => {
  return formProposalPelatihan.value.type === 1;
});

watch(isDisabled, (newValue) => {
  if (newValue) {
    formProposalPelatihan.value.participants = 0;
  }
});

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
  formProposalPelatihan.value.expert_id = selectedOptions;
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
          Formulir Pelatihan
        </h1>
      </div>
    </div>
  </div>
  <form @submit.prevent="formValidation">
    <div
      class="flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0"
    >
      <div>
        <div>
          <span class="text-lg font-bold text-black"> Daftar pelatihan </span>
        </div>
        <div class="max-w-xl mt-5">
          <div>
            <label class="block text-sm font-medium mb-1 text-black"
              >Jenis pelatihan</label
            >
            <div class="flex items-center">
              <input
                type="radio"
                v-model="formProposalPelatihan.type"
                required
                value="1"
                @change="parseValue"
                class="w-4 h-4 text-jobhunGreen bg-gray-200 border-gray-200 focus:ring-jobhunGreen focus:ring-1 hover:ring-jobhunGreen hover:ring-1"
              />
              <span class="text-sm ml-1 text-black">Privat</span>
            </div>
            <div class="flex items-center">
              <input
                type="radio"
                v-model="formProposalPelatihan.type"
                required
                value="2"
                @change="parseValue"
                class="w-4 h-4 text-jobhunGreen bg-gray-200 border-gray-200 focus:ring-jobhunGreen focus:ring-1 hover:ring-jobhunGreen hover:ring-1"
              />
              <span class="text-sm ml-1 text-black">Grup</span>
            </div>
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1 text-black"
              >Jika grup, berapa peserta yang akan mengikuti pelatihan?</label
            >
            <input
              class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-md"
              @keypress="isNumberCurrency($event)"
              :disabled="isDisabled"
              placeholder="Input angka"
              v-model="formProposalPelatihan.participants"
              type="number"
            />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1 text-black"
              >Berapa sesi pertemuan yang diajukan?</label
            >
            <input
              class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-md"
              @keypress="isNumberCurrency($event)"
              required
              placeholder="Input angka"
              v-model="formProposalPelatihan.session"
              type="number"
            />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1 text-black"
              >Jelaskan secara spesifik topik/pembahasan apa saja yang ingin
              kamu pelajari?</label
            >
            <textarea
              rows="5"
              class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
              required
              v-model="formProposalPelatihan.description"
              type="text"
            />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1 text-black"
              >Pengajuan hari kelas</label
            >
            <Multiselect
              v-model="formProposalPelatihan.days"
              mode="tags"
              :close-on-select="false"
              class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full"
              :create-option="true"
              :options="days"
            />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium mb-1 text-black"
              >Pengajuan waktu pelatihan</label
            >
            <div class="flex items-center space-x-2">
              <select
                required
                v-model="formProposalPelatihan.start_hour"
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
                v-model="formProposalPelatihan.start_minute"
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
              >Pilih Expert</label
            >
            <Multiselect
              v-model="formProposalPelatihan.expert_id"
              :close-on-select="true"
              :searchable="true"
              required
              :options="listExpertOptionData"
              @search-change="debouncedGetExpertOptions"
              :filter-results="false"
              :resolve-on-load="false"
              :loading="loadingSpinner"
              @select="handleExpertSelect"
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
        </div>
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
            <ModalFormPelatihan
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