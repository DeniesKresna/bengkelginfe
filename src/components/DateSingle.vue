<template>
  <div class="max-w-md">
    <flat-pickr
      class="form-input pl-9 text-black border-1 hover:ring-emerald-500 focus:ring-jobhunGreen p-2.5 text-sm"
      :config="config"
      aria-readonly="true"
      v-model="val"
      :placeholder="placeholder"
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

<script setup>
import flatPickr from "vue-flatpickr-component";
import {ref, defineProps, defineEmits, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const val = ref('')

watch(() => props.modelValue, nVal => {
  if(nVal == "1970-01-01T00:00:00.000Z"){
    return
  }
  val.value = nVal
}, {
  immediate: true
})

const handleInput = () => emit('update:modelValue', val.value)

const config = {
  wrap: true,
  allowInput: false,
  readonly: true,
  altInput: true,
  altFormat: "M j, Y",
  static: true,
  monthSelectorType: "static",
  dateFormat: "Z",
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
    emit('update:modelValue', val.value)
  },
}
</script>
<style scoped>
.form-input{
  border-color: #6b7280 !important;
  border-width: 1px !important;
  border-radius: 0px !important;
  padding-top: 0.5rem !important;
  padding-right: 0.75rem !important;
  padding-bottom: 0.5rem !important;
  padding-left: 0.75rem !important;
  font-size: 1rem !important;
  line-height: 1.5rem !important;
  --tw-shadow: 0 0 #0000 !important;
}
</style>