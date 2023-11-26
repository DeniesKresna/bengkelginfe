<template>
  <div class="max-w-md">
    <flat-pickr
      class="form-input pl-9 text-black border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-2.5 text-sm"
      :config="config"
      aria-readonly="true"
      v-model="modelValue"
      placeholder="Tanggal pengajuan"
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
</template>

<script>
import flatPickr from "vue-flatpickr-component";

export default {
  name: "Datepicker",
  props: ["align", "value"],
  data(props) {
    return {
      modelValue: null,
      config: {
        wrap: true,
        allowInput: false,
        readonly: true,
        altInput: false,
        altFormat: "F j, Y",
        static: true,
        monthSelectorType: "static",
        dateFormat: "M j, Y",
        prevArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onReady: (selectedDates, dateStr, instance) => {
          instance.element.value = dateStr.replace("to", "-");
          const customClass = props.align ? props.align : "";
          instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
        },
        onChange: (selectedDates, dateStr, instance) => {
          const newValue = dateStr.replace("to", "-");
          instance.element.value = newValue;
          this.$emit("update:modelValue", newValue);
        },
      },
    };
  },
  components: {
    flatPickr,
  },
};
</script>