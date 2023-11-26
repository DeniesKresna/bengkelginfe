<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { debounce } from "lodash";
import DateSingle from "./DateSingle.vue";
import Multiselect from "@vueform/multiselect";
import { convertRawIntToRupiah } from "../../../../../utils/Helper";
import { useDataRekrutExpertStore } from "../../../../../stores/store-rekrut-expert";
import { useDataExpertStore } from "../../../../../stores/store-experts";
import { useOptionsStore } from "../../../../../stores/store-options";
import ModalRekrutExpert from "./ModalAjukanFormRekrutExpert.vue";

const router = useRouter();

const formTambahRekrutExpert = useDataRekrutExpertStore();
const optionStore = useOptionsStore();
const expertStore = useDataExpertStore();

const { listDomicile } = storeToRefs(optionStore);

const formProposalRekrutExpert = ref({
  expert_id: "",
  company: "",
  location: "",
  website: "",
  linkedin: "",
  email: "",
  phone: "",
  project_detail: "",
  job_detail: "",
  description: "",
  deadline: "",
  budget: "",
});

const isInputNumber = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};

const formatBudget = () => {
  formProposalRekrutExpert.value.budget = convertRawIntToRupiah(
    formProposalRekrutExpert.value.budget
  );
};

const isLoading = ref(false);

const formValidation = async () => {
  try {
    if (
      formProposalRekrutExpert.value.company != "" &&
      formProposalRekrutExpert.value.location != "" &&
      formProposalRekrutExpert.value.website != "" &&
      formProposalRekrutExpert.value.linkedin != "" &&
      formProposalRekrutExpert.value.email != "" &&
      formProposalRekrutExpert.value.phone != "" &&
      formProposalRekrutExpert.value.project_detail != "" &&
      formProposalRekrutExpert.value.job_detail != "" &&
      formProposalRekrutExpert.value.description != "" &&
      formProposalRekrutExpert.value.deadline != "" &&
      formProposalRekrutExpert.value.budget != "" &&
      formProposalRekrutExpert.value.expert_id != ""
    ) {
      isLoading.value = true;
      const res = await formTambahRekrutExpert.formPengajuanRekrutExpert(
        formProposalRekrutExpert.value
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
  router.push("/layanan/rekrutexpert");
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
  formProposalRekrutExpert.value.expert_id = selectedOptions;
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
          Formulir Rekrut Expert
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
          >Nama perusahaan</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.company"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Lokasi perusahaan</label
        >
        <div class="flex items-center">
          <Multiselect
            v-model="formProposalRekrutExpert.location"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full ml-0"
            :classes="{
              containerActive: 'ring-0',
              search:
                'w-full absolute inset-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen appearance-none border-0 text-base font-sans rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
            }"
            :options="listDomicile"
            :searchable="true"
          />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Website perusahaan</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.website"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >LinkedIn perusahaan</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.linkedin"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Email perusahaan</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.email"
          type="email"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Nomor telepon perusahaan</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.phone"
          @keypress="isInputNumber($event)"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Detail proyek</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.project_detail"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Detail pekerjaan expert</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.job_detail"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Syarat dan kualifikasi</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          required
          v-model="formProposalRekrutExpert.description"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Batas waktu pekerjaan</label
        >
        <div class="flex items-center space-x-2">
          <DateSingle v-model="formProposalRekrutExpert.deadline" required />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Budget yang dimiliki</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-md"
          @input="formatBudget"
          placeholder="Rp"
          required
          v-model="formProposalRekrutExpert.budget"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pilih Expert</label
        >
        <Multiselect
          v-model="formProposalRekrutExpert.expert_id"
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
            <ModalRekrutExpert
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