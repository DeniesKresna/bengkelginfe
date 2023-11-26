<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ModalBasic from '../../../../../components/ModalBasic.vue'
import IconCheck from '../../../../../partials/icons/icon-circle-check.vue'

const router = useRouter()

const props = defineProps({
    isUserAjukan: Boolean,
})

const emit = defineEmits(['close-modal'])

const closeModal = () => {
    emit("close-modal")
    router.push({ path: '/layanan/konsultasi' })
}
</script>
<template>
    <div class="m-1.5">
        <ModalBasic :modalOpen="props.isUserAjukan" @close-modal="closeModal()">
            <div class="mb-5">
                <div class="items-center flex">
                    <div class="mx-auto mt-5 mb-5">
                        <IconCheck height="100px" class="fill-jobhunGreen" />
                    </div>
                </div>
                <div class="mx-auto text-center px-8">
                    <span class="text-sm text-black">
                        Pengajuan telah terkirim!
                        <br>
                        Untuk langkah selanjutnya, tim marketing Jobhun akan segera menghubungimu. Harap bersabar ya Jobhuners 🙂
                    </span>
                </div>
            </div>
        </ModalBasic>
    </div>
</template>