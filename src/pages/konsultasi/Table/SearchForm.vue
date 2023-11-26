<script setup>
import { ref, toRefs, onMounted, defineEmits, defineProps } from 'vue';
import Date from './DateSingle.vue'
import { payments, status } from '../../../utils/Constants'

const props = defineProps({
    datePlaceholder: String,
    generalPlaceholder: String,
    created_at: String,
    search: String,
    status: String,
    status_paid: String
  }
)

const emits = defineEmits(['searchClick']);

const dateValue = ref('')
const generalValue = ref('')
const statusValue = ref('')
const paymentValue = ref('')

const clickSearchButton = () => {
  const searchParams = {
    created_at: dateValue.value,
    search: generalValue.value,
    status: statusValue.value,
    status_paid: paymentValue.value,
  };
  emits('searchClick', searchParams);
};

const { datePlaceholder, generalPlaceholder, } = toRefs(props);

const isMobile = ref(false);

function checkIfMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});
</script>
<template>
  <form class="relative" @submit.prevent="clickSearchButton">
    <div class="grid md:gap-x-3 gap-y-3 md:grid-cols-4 grid-cols-1">
      <select v-model="statusValue"
        class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm"
        @click.prevent="dropdownOpen = !dropdownOpen" placeholder="Status">
        <option value="" selected>Status</option>
        <option v-for="status in status" :key="status.text">{{ status.text }}</option>
      </select>
      <select v-model="paymentValue"
        class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm"
        @click.prevent="dropdownOpen = !dropdownOpen">
        <option value="" selected>Pembayaran</option>
        <option v-for="payment in payments" :key="payment.text">{{ payment.text }}</option>
      </select>
      <label for="action-search" class="sr-only">Search Date</label>
      <Date :placeholder="datePlaceholder" v-model="dateValue" />
      <label for="action-search" class="sr-only">Search General</label>
      <input id="action-search" class="focus:ring-jobhunGreen hover:ring-emerald-500 border-0 bg-gray-100 rounded-lg"
        type="text" :placeholder="generalPlaceholder" v-model="generalValue" />
      <button v-if="isMobile"
        class="group w-12 p-3 justify-center flex items-center bg-gray-300 hover:bg-gray-400 rounded-lg"
        aria-label="Search" type="submit">
        <svg class="w-4 h-4 shrink-0 fill-current text-black group-hover:text-white" viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
          <path
            d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
        </svg>
      </button>
    </div>
  </form>
  <button v-if="!isMobile" class="group w-12 justify-center flex items-center bg-gray-300 hover:bg-gray-400 rounded-lg"
    aria-label="Search" @click="clickSearchButton" type="submit">
    <svg class="w-4 h-4 shrink-0 fill-current text-black group-hover:text-white" viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
      <path
        d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
    </svg>
  </button>
</template>