<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleAccordion = ()=>{
    isOpen.value = !isOpen.value
}
</script>
<template>
    <div class="px-4 py-4 mt-4 rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-black hover:shadow-md transition-all duration-200 transform">
        <button
          @click="toggleAccordion()"
          class="flex items-center justify-between w-full group mb-1"
          :aria-expanded="isOpen"
        >
          <slot name="title" class="text-sm text-slate-800 font-medium" />
          <svg
            class="w-3 transition-all duration-200 transform"
            :class="{
                'rotate-180': isOpen,
                'rotate-0': !isOpen,
            }"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 10"
            aria-hidden="true"
          >
            <path
              d="M15 1.2l-7 7-7-7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div v-show="isOpen">
          <slot name="content" />
        </div>
      </div>
</template>
<style>

</style>