<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { isVariableEmpty } from '../utils/Helper'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '../pages/layout/store'

const props = defineProps({
  align: String,
})

const dropdownOpen = ref(false)
const trigger = ref(null)
const dropdown = ref(null)

const layoutStore = useLayoutStore()

const { session, role, sessionFirstName } = storeToRefs(layoutStore)

const signOut = ()=> {
  layoutStore.signOut()
}

const clickHandler = ({ target }) => {
  if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
  dropdownOpen.value = false
}

const keyHandler = ({ keyCode }) => {
  if (!dropdownOpen.value || keyCode !== 27) return
  dropdownOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', clickHandler)
  document.addEventListener('keydown', keyHandler)
})

onUnmounted(() => {
  document.removeEventListener('click', clickHandler)
  document.removeEventListener('keydown', keyHandler)
})

const isSessionEmpty = computed(() => isVariableEmpty(sessionFirstName.value))
</script>

<template>
  <div class="relative inline-flex" v-if="!isSessionEmpty">
    <button
      ref="trigger"
      class="inline-flex justify-center items-center group rounded-full"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <img v-if="session.image_url == ''" class="w-8 h-8 rounded-full" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/dummy-profile.png" width="32" height="32" alt="User" />
      <img v-else class="w-8 h-8 rounded-full" :src="session.image_url" width="32" height="32" alt="User" />
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg  mt-1" :class="align === 'right' ? 'right-0' : 'left-0'">
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
          <router-link to="/profilpengguna" class="truncate text-sm font-medium text-black">{{ session.first_name }}</router-link>
          <!-- <div class="text-xs text-slate-500 italic">{{ role.name }}</div> -->
        </div>
        <ul
          ref="dropdown"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >
          <li>
            <router-link class="font-medium text-sm text-black hover:text-jobhunGreen flex items-center py-1 px-3" 
            to="/dashboard" @click="dropdownOpen = false">Dashboard</router-link>
          </li>
          <li>
            <router-link class="font-medium text-sm text-black hover:text-jobhunGreen flex items-center py-1 px-3" 
            to="/profilpengguna" @click="dropdownOpen = false">Pengaturan</router-link>
          </li>
          <li>
            <router-link class="font-medium text-sm text-black hover:text-jobhunGreen flex items-center py-1 px-3" 
            to="/" @click="signOut">Keluar</router-link>
          </li>
        </ul>
      </div> 
    </transition>
  </div>
  <div class="relative inline-flex" v-else>
    <button ref="trigger" class="inline-flex justify-center items-center group">
      <router-link class="font-medium text-sm text-black hover:text-jobhunGreen duration-300 flex items-center py-1 px-3"
        to="/signin" @click="dropdownOpen = false">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-gray-700" alt="Masuk/Daftar">
          <path
            d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z" />
        </svg>
      </router-link>
    </button>
  </div>
</template>