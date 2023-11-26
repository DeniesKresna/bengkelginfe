<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PinLocation from '../../../partials/icons/icon-pin-location.vue'
import ProfileOverview from './EditDataTambahan.vue'

const props = defineProps({
    dataProfile: Object
})

const { dataProfile } = props

const route = useRoute()

onMounted(()=>{
    let querySection = route.query.section
    if(querySection == null){
        return
    }
    let sectionID = document.getElementById(querySection)
    if(sectionID == null){
        return
    }
    document.getElementById(querySection).scrollIntoView({
        block: 'center'
    })
})

const openTab = ref(1)
const toggleTabs = (tabNumber) => (openTab.value = tabNumber)

const dataProfileProffesion = computed(() => {
    if (dataProfile.profession && dataProfile.company) {
        return dataProfile.profession + " at " + dataProfile.company
    } else if (dataProfile.profession) {
        return dataProfile.profession;
    } else if (dataProfile.company) {
        return dataProfile.company
    }
})

const dataProfileImage = computed(() => dataProfile.image_url)

const handleAdditionDataEvent = (payload) => {
    dataProfile.profession = payload.profession
    dataProfile.company = payload.company
    dataProfile.domicile = payload.domicile
}
</script>
<template>
    <div class="flex h-96 bg-slate-200 -z-20 -mt-10 md:mt-0">
        <img class="object-cover h-full w-full object-top" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner-ilustrasi-01-min.png"
            alt="Profile background" />
    </div>
    <div class="lg:px-60 px-10 mb-10">
        <div class="mb-6 sm:mb-3 md:flex">
            <div class="flex flex-col -mt-10 items-center md:w-1/4 sm:flex-row sm:justify-between sm:items-end">
                <div class="flex flex-row -mt-1 mb-4 sm:mb-0">
                    <img v-if="dataProfile.image_url === ''" class="rounded-full ring-8 ring-white xl:w-[200px] xl:h-[200px] sm:w-[100px] sm:h-[100px] sm:mx-auto h-48 w-48" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/dummy-profile.png" width="200" height="200"/>
                    <img v-else class="rounded-full ring-8 ring-white xl:w-[200px] xl:h-[200px] sm:w-[100px] sm:h-[100px] sm:mx-auto h-48 w-48" :src="dataProfileImage"/>
                </div>
            </div>
            <div class="text-sm mt-5 ml-5 shrink w-full">
                <h1 class="text-2xl sm:text-left text-center text-slate-800 font-bold">
                    {{ dataProfile.first_name + " " + dataProfile.last_name }} ✨
                </h1>
                <div class="sm:text-left text-center text-slate-800">
                    <p class="inline-flex" v-if="dataProfileProffesion">
                        {{ dataProfileProffesion }}
                    </p>
                </div>
                <div class="sm:text-left text-center text-slate-800">
                    <div class="inline-flex items-center" v-if="dataProfile.domicile != null">
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
                        @click="toggleTabs(1)"
                        v-bind:class="{ 'text-black': openTab !== 1, 'text-jobhunGreen border-jobhunGreen': openTab === 1}"
                        >Profil Pengguna
                    </button>
                </li>
            </ul>
        </div>
        <div class="shrink w-full">
            <div class="rounded-lg">
                <ProfileOverview :dataProfile="dataProfile" @updateProfileAdditionalData="handleAdditionDataEvent"/>
            </div>
        </div>
    </div>
</template>