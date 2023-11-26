<script setup>
import { ref, computed, toRaw } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import Multiselect from "@vueform/multiselect";
import { useDataKonsultasiStore } from "../../../stores/store-konsultasi";
import flatPickr from "vue-flatpickr-component";
import { useOptionsStore } from "../../../stores/store-options";
import {
  hours,
  minutes,
  star,
  payments,
  status,
} from "../../../utils/Constants";
import {
  convertApiDateToWebDate,
  convertToComponentFormatDate,
} from "../../../utils/Helper";
import { useLayoutStore } from "../../layout/store";

const route = useRoute();
const id = route.params.id;

const optionStore = useOptionsStore();

// Store Data Konsultasi
const tableExpertKonsultasiStore = useDataKonsultasiStore();
await tableExpertKonsultasiStore.getDataDetailKonsultasi(id);

// Store Layout
const layoutStore = useLayoutStore();
const { session } = storeToRefs(layoutStore);

const { detailKonsultasi } = storeToRefs(tableExpertKonsultasiStore);

const { listSector, listDomicile, listService, listTitle } =
  storeToRefs(optionStore);

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

const formDetailDashboardExpertKonsultasi = ref({});

// change from proxy value to raw object dataKonsultasi
let detailRaw = toRaw(detailKonsultasi.value);

const duration = ref(detailRaw.service.consultation.duration);
const price = ref(detailRaw.price);

formDetailDashboardExpertKonsultasi.value = {
  start_date: convertApiDateToWebDate(
    detailRaw.service.consultation.start_date
  ),
  start_hour: detailRaw.service.consultation.start_hour,
  start_minute: detailRaw.service.consultation.start_minute,
  discussion: detailRaw.service.consultation.discussion,
  description: detailRaw.service.consultation.description,
  duration: detailRaw.service.consultation.duration,
  status_paid: detailRaw.status_paid,
  status: detailRaw.status,
  no_invoice: detailRaw.no_invoice,
  invoice_url: detailRaw.invoice_url,
  expert_rate: detailRaw.expert_rate,
  expert_suggestion: detailRaw.expert_suggestion,
};

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

const isLoading1 = ref(false);

const formattedDate = convertToComponentFormatDate(
  detailRaw.service.consultation.start_date
);

const formValidation = async () => {
  const start_date = formattedDate;
  const expert_rate = parseInt(
    formDetailDashboardExpertKonsultasi.value.expert_rate
  );
  const formData = {
    ...formDetailDashboardExpertKonsultasi.value,
    start_date: start_date,
    expert_rate: expert_rate,
  };

  try {
    if (
      formData.start_date != "" &&
      formData.start_hour != "" &&
      formData.start_minute != "" &&
      formData.discussion != "" &&
      formData.description != "" &&
      formData.duration != ""
    ) {
      isLoading1.value = true;
      if (
        await tableExpertKonsultasiStore.formEditTransaksiKonsultasiDashboard(
          id,
          formData
        )
      ) {
        return;
      } else {
        isLoading1.value = false;
      }
    }
  } catch (error) {
    isLoading1.value = false;
  }
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
          Konsultasi ✨
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
          <div class="grid md:grid-cols-1 md:w-2/5">
            <div class="max-w-md">
              <flat-pickr
                :disabled="session.role_id !== 1"
                class="form-input pl-9 border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm"
                :config="config"
                v-model="formDetailDashboardExpertKonsultasi.start_date"
              ></flat-pickr>
              <div
                class="absolute inset-0 right-auto flex items-center pointer-events-none"
              >
                <svg class="w-4 h-4 fill-gray-700 ml-3" viewBox="0 0 16 16">
                  <path
                    d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Pengajuan waktu konsultasi</label
        >
        <div class="flex items-center space-x-2">
          <select
            v-model="formDetailDashboardExpertKonsultasi.start_hour"
            :disabled="session.role_id !== 1"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-14"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <option v-for="hour in hours" :key="hour.text">
              {{ hour.text }}
            </option>
          </select>
          <span class="px-1">:</span>
          <select
            v-model="formDetailDashboardExpertKonsultasi.start_minute"
            :disabled="session.role_id !== 1"
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
              v-if="session.role_id === 1"
              class="border-0 bg-gray-100 hover:bg-gray-300 hover:ring-emerald-500 focus:ring-jobhunGreen h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span class="text-2xl ml-2 font-thin">−</span>
            </div>
            <div
              type="number"
              class="border-0 bg-gray-100 hover:ring-emerald-500 focus:ring-jobhunGreen p-1.5 text-sm w-full text-center flex items-center text-gray-700"
            >
              {{ formDetailDashboardExpertKonsultasi.duration }} jam
            </div>
            <div
              @click="increment()"
              v-if="session.role_id === 1"
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
          v-model="formDetailDashboardExpertKonsultasi.discussion"
          mode="tags"
          :close-on-select="false"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen text-sm w-full"
          :create-option="true"
          required
          :options="discussions"
          :disabled="session.role_id !== 1"
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
          v-model="formDetailDashboardExpertKonsultasi.description"
          :disabled="session.role_id !== 1"
        />
      </div>
      <div>
        <div class="flex justify-end mt-5">
          <div class="font-bold text-lg text-black">Total {{ total }},-</div>
        </div>
      </div>
      <hr class="my-10 border-gray-300 sm:mx-auto" />
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Status pembayaran</label
        >
        <div class="flex items-center space-x-2">
          <select
            v-model="formDetailDashboardExpertKonsultasi.status_paid"
            :disabled="session.role_id !== 1"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-44"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <option v-for="payment in payments" :key="payment.text">
              {{ payment.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black">Status</label>
        <div class="flex items-center space-x-2">
          <select
            v-model="formDetailDashboardExpertKonsultasi.status"
            :disabled="session.role_id !== 1"
            class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-44"
            @click.prevent="dropdownOpen = !dropdownOpen"
          >
            <option v-for="status in status" :key="status.text">
              {{ status.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Nomor invoice</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-2/3"
          v-model="formDetailDashboardExpertKonsultasi.no_invoice"
          type="text"
          :disabled="session.role_id !== 1"
        />
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium mb-1 text-black"
          >Url invoice</label
        >
        <input
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-2/3"
          v-model="formDetailDashboardExpertKonsultasi.invoice_url"
          type="text"
          :disabled="session.role_id !== 1"
        />
      </div>
      <hr
        class="my-10 border-gray-300 sm:mx-auto"
        v-if="session.role_id === 1"
      />
      <div class="mt-4" v-if="session.role_id === 1">
        <label class="block text-sm font-medium mb-1 text-black">Rating</label>
        <div class="inline-flex space-x-3">
          <div class="flex items-center space-x-2">
            <select
              v-model="formDetailDashboardExpertKonsultasi.expert_rate"
              class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-14"
              @click.prevent="dropdownOpen = !dropdownOpen"
            >
              <option v-for="star in star" :key="star.value">
                {{ star.value }}
              </option>
            </select>
          </div>
          <div class="flex flex-wrap justify-between items-center">
            <div
              class="flex items-center"
              v-if="formDetailDashboardExpertKonsultasi.expert_rate == 5"
            >
              <div class="flex space-x-1">
                <div v-for="index in 5" :key="index">
                  <div v-if="index <= 5">
                    <span class="sr-only">1 star</span>
                    <svg
                      class="w-4 h-4 fill-current text-jobhunYellow"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                      />
                    </svg>
                  </div>
                  <div v-else>
                    <span class="sr-only">5 stars</span>
                    <svg
                      class="w-4 h-4 fill-current text-slate-300"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap justify-between items-center"
              v-else-if="formDetailDashboardExpertKonsultasi.expert_rate == 4"
            >
              <div class="flex items-center">
                <div class="flex space-x-1">
                  <div v-for="index in 5" :key="index">
                    <div v-if="index <= 4">
                      <span class="sr-only">1 star</span>
                      <svg
                        class="w-4 h-4 fill-current text-jobhunYellow"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                    <div v-else>
                      <span class="sr-only">5 stars</span>
                      <svg
                        class="w-4 h-4 fill-current text-slate-300"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap justify-between items-center"
              v-else-if="formDetailDashboardExpertKonsultasi.expert_rate == 3"
            >
              <div class="flex items-center">
                <div class="flex space-x-1">
                  <div v-for="index in 5" :key="index">
                    <div v-if="index <= 3">
                      <span class="sr-only">1 star</span>
                      <svg
                        class="w-4 h-4 fill-current text-jobhunYellow"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                    <div v-else>
                      <span class="sr-only">5 stars</span>
                      <svg
                        class="w-4 h-4 fill-current text-slate-300"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap justify-between items-center"
              v-else-if="formDetailDashboardExpertKonsultasi.expert_rate == 2"
            >
              <div class="flex items-center">
                <div class="flex space-x-1">
                  <div v-for="index in 5" :key="index">
                    <div v-if="index <= 2">
                      <span class="sr-only">1 star</span>
                      <svg
                        class="w-4 h-4 fill-current text-jobhunYellow"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                    <div v-else>
                      <span class="sr-only">5 stars</span>
                      <svg
                        class="w-4 h-4 fill-current text-slate-300"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-wrap justify-between items-center"
              v-else-if="formDetailDashboardExpertKonsultasi.expert_rate == 1"
            >
              <div class="flex items-center">
                <div class="flex space-x-1">
                  <div v-for="index in 5" :key="index">
                    <div v-if="index <= 1">
                      <span class="sr-only">1 star</span>
                      <svg
                        class="w-4 h-4 fill-current text-jobhunYellow"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                    <div v-else>
                      <span class="sr-only">5 stars</span>
                      <svg
                        class="w-4 h-4 fill-current text-slate-300"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4" v-if="session.role_id === 1">
        <label class="block text-sm font-medium mb-1 text-black"
          >Bagaimana pengalaman pengguna menggunakan layanan ini?</label
        >
        <textarea
          rows="5"
          class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
          v-model="formDetailDashboardExpertKonsultasi.expert_suggestion"
        />
      </div>
      <div>
        <div class="flex justify-end">
          <div>
            <button
              type="submit"
              v-if="!isLoading1"
              class="h-9 mt-10 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm"
            >
              Simpan
            </button>
            <button
              v-if="isLoading1"
              type="submit"
              class="h-9 mt-10 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm"
            >
              <span class="loader"></span>
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

.loader {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>