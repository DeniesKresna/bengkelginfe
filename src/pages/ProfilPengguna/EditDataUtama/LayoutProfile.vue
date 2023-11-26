<script setup>
import { computed, ref } from 'vue'
import PinLocation from '../../../partials/icons/icon-pin-location.vue'
import ProfileOverview from './EditDataUtama.vue'

const props = defineProps({
    dataProfile: {
        default: {},
        type: Object
    },
})

const { dataProfile } = props

const dataProfileProffesion = computed(() => dataProfile.profession + " at " + dataProfile.company)

const dataProfileImage = computed(() => dataProfile.image_url)

const openTab = ref(1)

const handleCustomEvent = (payload) => {
    dataProfile.first_name = payload.first_name
    dataProfile.last_name = payload.last_name
    dataProfile.image_url = payload.image_url
}
</script>
<template>
    <div class="flex h-96 bg-slate-200 -z-20 -mt-10 md:mt-0">
        <img class="object-cover h-full w-full object-top" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner-ilustrasi-01-min.png"
            alt="Profile background" />
    </div>
    <div class="lg:px-60 px-10 mb-10">
        <div class="mb-6 sm:mb-3 md:flex">
            <div class="flex flex-col xs:-mt-10 md:-mt-1 items-center md:w-1/4 xl:w-1/4 sm:flex-row sm:justify-between sm:items-end">
                <div class="flex flex-row -mt-10 mb-4 sm:mb-0">
                    <img v-if="dataProfile.image_url === ''" class="rounded-full ring-8 ring-white xl:w-[200px] xl:h-[200px] sm:w-[100px] sm:h-[100px] sm:mx-auto h-48 w-48" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/dummy-profile.png"/>
                    <img v-else class="rounded-full ring-8 ring-white xl:w-[200px] xl:h-[200px] sm:w-[100px] sm:h-[100px] sm:mx-auto h-48 w-48" :src="dataProfileImage"/>
                </div>
            </div>
            <div class="text-sm mt-5 ml-5 shrink w-full">
                <h1 class="text-2xl sm:text-left text-center text-slate-800 font-bold">
                    {{ dataProfile.first_name + " " + dataProfile.last_name }} ✨
                </h1>
                <div class="sm:text-left text-center text-slate-800" v-if="dataProfile.role_id === 3">
                    <p class="inline-flex" v-if="dataProfileProffesion != ' at '">
                        {{ dataProfileProffesion }}
                    </p>
                </div>
                <div class="sm:text-left text-center text-slate-800" v-if="dataProfile.role_id === 3">
                    <div class="inline-flex items-center">
                        <PinLocation height="30px"/>
                        <p>{{ dataProfile.domicile }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-10 border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
                <li class="mr-2">
                    <button class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-jobhunGreen " 
                        v-bind:class="{ 'text-black': openTab !== 1, 'text-jobhunGreen border-jobhunGreen': openTab === 1}"
                        >Profil Pengguna
                    </button>
                </li>
            </ul>
        </div>
        <div class="shrink w-full">
            <div class="rounded-lg">
                <ProfileOverview 
                :dataProfile="dataProfile"
                @updateProfileName="handleCustomEvent"
                />
            </div>
        </div>
    </div>
</template>