<template>
  <div class="px-4 py-4 mt-4 rounded-lg border border-slate-200" v-for="(data, index) in dataAccordion" :key="index">
    <button
      class="flex items-center justify-between w-full group mb-1"
      @click="toggle(index)"
    >
      <div class="text-sm text-slate-800 font-medium">
        {{ data.title }}
      </div>
      <svg class="w-8 h-8 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3" :class="{ 'rotate-180': open === index  }" viewBox="0 0 32 32">
        <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
      </svg>
    </button>
    <div class="text-sm" v-if="open === index">
      <span>
        {{ data.desc }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const trigger = ref(null)
const dropdown = ref(null)

const props = defineProps({
  dataAccordion: {
    type: Object,
    required: true
  },
})

const { dataAccordion } = props

const selected = ref('')

const toggle = (index)=>{
  open.value = index
}
</script>