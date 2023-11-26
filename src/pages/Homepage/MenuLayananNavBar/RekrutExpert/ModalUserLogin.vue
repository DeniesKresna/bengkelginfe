<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ModalBasic from '../../../../components/ModalBasic.vue'
import IconUser from '../../../../partials/icons/icon-profile-modal.vue'

const router = useRouter()

const props = defineProps({
    isUserLogin: Boolean,
    nextRoute: String
})

const emit = defineEmits(['close-modal'])

const closeModal = ()=> {
    emit("close-modal")
}

const toSignIn = () => {
    console.log(props.nextRoute)
    sessionStorage.setItem('nextRoute', props.nextRoute)
    router.push({ path: '/signin'})
}

// const scrollTo = (id) => {
//     router.push({ path: '/experts/detailexpert/' + props.expertID, query: { section: id } })
// }
</script>
<template>
    <div class="m-1.5">
        <ModalBasic :modalOpen="props.isUserLogin" @close-modal="closeModal()">
            <div class="mb-5">
                <div class="items-center flex">
                    <div class="mx-auto mt-5 mb-5">
                        <IconUser height="100px" />
                    </div>
                </div>
                <div class="mx-auto text-center px-8">
                    <span class="text-sm text-black">
                        Kamu harus mendaftar atau masuk ke dalam akun terlebih dahulu.
                    </span>
                </div>
                <div class="mx-auto text-center px-8 mt-3">
                    <span class="text-sm text-black font-bold">
                        Silakan lengkapi profilmu dulu, ya!
                    </span>
                </div>
                <div class="mx-auto text-center px-8">
                    <button @click="toSignIn"
                    class="h-9 mt-3 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm">
                        <span>Masuk</span>
                    </button>
                </div>
            </div>
        </ModalBasic>
    </div>
    
</template>