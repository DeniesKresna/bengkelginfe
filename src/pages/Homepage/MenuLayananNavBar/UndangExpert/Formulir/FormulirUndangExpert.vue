<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "lodash";
import Multiselect from "@vueform/multiselect";
import { useDataUndangExpertStore } from "../../../../../stores/store-undang-expert";
import { useDataExpertStore } from "../../../../../stores/store-experts";
import flatPickr from "vue-flatpickr-component";
import DateSingle from "./DateSingle.vue";
import {
  convertRawIntToRupiah,
  convertToComponentFormatDate,
  convertApiDateToWebDate,
  convertToApiDate,
} from "../../../../../utils/Helper";
import ModalUndangExpert from "./ModalAjukanFormUndangExpert.vue";

const router = useRouter();

const undangExpertStore = useDataUndangExpertStore();
const expertStore = useDataExpertStore();

const formProposalTambahUndangExpert = ref({
  company: "",
  company_description: "",
  event: "",
  event_description: "",
  start_date: "",
  format_event: null,
  participants: "",
  fee: "",
  benefit: "",
  expert_id: "",
});

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

const isNumberCurrency = (evt) => {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};

const formatBudget = () => {
  formProposalTambahUndangExpert.value.fee = convertRawIntToRupiah(
    formProposalTambahUndangExpert.value.fee
  );
};

// const formattedDate = convertToApiDate(formProposalTambahUndangExpert.value.start_date)

const isLoading = ref(false);
const isFormFilled = ref(false);

const formValidation = async () => {
  // const start_date = formattedDate
  const format_event = parseInt(
    formProposalTambahUndangExpert.value.format_event
  );
  const participants = parseInt(
    formProposalTambahUndangExpert.value.participants
  );
  const formData = {
    ...formProposalTambahUndangExpert.value,
    format_event: format_event,
    participants: participants,
    // start_date: start_date
  };
  console.log(formData);
  try {
    if (
      formProposalTambahUndangExpert.value.start_date != "" &&
      formProposalTambahUndangExpert.value.company != "" &&
      formProposalTambahUndangExpert.value.company_description != "" &&
      formProposalTambahUndangExpert.value.event != "" &&
      formProposalTambahUndangExpert.value.event_description != "" &&
      formProposalTambahUndangExpert.value.format_event != "" &&
      formProposalTambahUndangExpert.value.participants != "" &&
      formProposalTambahUndangExpert.value.fee != "" &&
      formProposalTambahUndangExpert.value.benefit != "" &&
      formProposalTambahUndangExpert.value.expert_id != ""
    ) {
      isLoading.value = true;
      const res =
        await undangExpertStore.formTambahTransaksiUndangExpertDashboard(
          formData
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

const openModal = () => {
  isFormFilled.value = true;
};

const closeModal = () => {
  isFormFilled.value = false;
  router.push("/layanan/undangexpert");
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
  formProposalTambahUndangExpert.value.expert_id = selectedOptions;
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
          Formulir Undang Expert
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
          >Asal perusahaan/organisasi/komunitas</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          require
          v-model="formProposalTambahUndangExpert.company"
          type="text"
          placeholder="PT ABC"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Penjelasan singkat tentang perusahaan/organisasi/komunitas</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          require
          v-model="formProposalTambahUndangExpert.company_description"
          type="text"
          placeholder="Perusahaan di Surabaya yang bergerak dalam bidang ritel, menjual abc, dst."
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Nama acara/kegiatan</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          v-model="formProposalTambahUndangExpert.event"
          require
          type="text"
          placeholder="Workshop Public Speaking Karyawan"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Penjelasan tentang acara/kegiatan</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          require
          v-model="formProposalTambahUndangExpert.event_description"
          type="text"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Tanggal pelaksanaan acara</label
        >
        <div class="flex items-center space-x-2">
          <DateSingle v-model="formProposalTambahUndangExpert.start_date" />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Format acara</label
        >
        <div class="flex items-center">
          <input
            type="radio"
            name="format-event"
            v-model="formProposalTambahUndangExpert.format_event"
            value="1"
            class="w-4 h-4 text-jobhunGreen bg-gray-200 border-gray-200 focus:ring-jobhunGreen focus:ring-1 hover:ring-jobhunGreen hover:ring-1"
          />
          <span class="text-sm ml-1 text-black">Talkshow</span>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            name="format-event"
            v-model="formProposalTambahUndangExpert.format_event"
            value="2"
            class="w-4 h-4 text-jobhunGreen bg-gray-200 border-gray-200 focus:ring-jobhunGreen focus:ring-1 hover:ring-jobhunGreen hover:ring-1"
          />
          <span class="text-sm ml-1 text-black">Workshop</span>
        </div>
        <div class="flex items-center">
          <input
            type="radio"
            name="format-event"
            v-model="formProposalTambahUndangExpert.format_event"
            value="3"
            class="w-4 h-4 text-jobhunGreen bg-gray-200 border-gray-200 focus:ring-jobhunGreen focus:ring-1 hover:ring-jobhunGreen hover:ring-1"
          />
          <span class="text-sm ml-1 text-black">Lainnya</span>
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Jumlah target peserta secara spesifik</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-md"
          @keypress="isNumberCurrency($event)"
          require
          v-model="formProposalTambahUndangExpert.participants"
          type="text"
          placeholder="175"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Berapa <i>budget</i> yang diajukan untuk <i>fee expert</i>?</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-md"
          @input="formatBudget"
          require
          v-model="formProposalTambahUndangExpert.fee"
          type="text"
          placeholder="Rp15000000"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Apakah Jobhun bisa mendapatkan benefit promosi lainnya? Jika ada,
          sebutkan!</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          require
          v-model="formProposalTambahUndangExpert.benefit"
          type="text"
          placeholder="Logo di media promosi & banner."
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pilih Expert</label
        >
        <Multiselect
          v-model="formProposalTambahUndangExpert.expert_id"
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
            <ModalUndangExpert
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