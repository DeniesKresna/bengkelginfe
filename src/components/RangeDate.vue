<template>
  <div class="grid md:grid-cols-1 md:w-2/5">
    <div class="max-w-md">
      <flat-pickr
        class="form-input pl-9 border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm"
        :config="config"
        v-model="selectedDates"
        placeholder="Sesuaikan jadwal"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const props = defineProps({
  config: Object, // Konfigurasi Flatpickr
  value: Array, // Value untuk tanggal yang dipilih
});

const selectedDates = ref(props);

onMounted(() => {
  const datePicker = new Flatpickr(refs.datePicker, {
    mode: "range",
    ...props.config,
    onChange: (selectedDates) => {
      selectedDates.sort((a, b) => a - b);
      selectedDates.value = selectedDates;
    },
  });
});
</script>
