<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ModalBasic from '../../components/ModalBasic.vue'
import IconKonsultasi from '../../partials/icons/icon-konsultasi.vue'
import IconPelatihan from '../../partials/icons/icon-pelatihan.vue'
import IconUndangExpert from '../../partials/icons/icon-undang-expert.vue'
import IconRekrutExpert from '../../partials/icons/icon-rekrut-expert.vue'
import { serviceMap } from '../../utils/DataHelper'

const router = useRouter()

const props = defineProps({
    isPreviewMentor: Boolean,
    expertID: {
        required: true,
        value: Number
    },
    service: Array
})

const { expertID } = props

const emit = defineEmits(['close-modal'])

const closeModal = ()=> {
    emit("close-modal")
}

const scrollTo = (id) => {
    router.push({ path: `/experts/detailexpert/${expertID}`, query: { section: id } })
}
</script>
<template>
    <div class="m-1.5">
        <ModalBasic :modalOpen="props.isPreviewMentor" @close-modal="closeModal()">
            <div class="px-5 pt-4 pb-1">
                <div class="text-sm">
                    <div class="mb-4 font-bold text-lg text-black">Layanan</div>
                    <ul class="space-y-2 mb-4">
                        <li v-for="(layanan, index) in service" :key="index">
                            <button @click="scrollTo(layanan)" 
                                class="w-full h-full text-left py-3 px-4 rounded bg-white border-2 border-gray-300 hover:border-jobhunGreen shadow-sm duration-150 ease-in-out">
                                <div class="items-center flex">
                                    <div class="flex-none w-1/6 mx-2">
                                        <IconKonsultasi height="30px" class="mx-5" v-if="layanan == 'consultation'" />
                                        <IconPelatihan height="30px" class="mx-5" v-if="layanan == 'training'" />
                                        <IconUndangExpert height="30px" class="mx-5" v-if="layanan == 'invite-expert'" />
                                        <IconRekrutExpert height="30px" class="mx-5" v-if="layanan == 'recruit-expert'" />
                                    </div>
                                    <div class="shrink w-full" v-if="layanan == 'consultation'">
                                        <div class="flex flex-wrap items-center justify-between mb-0.5">
                                            <span class="font-bold text-black text-md">
                                                Konsultasi
                                            </span>
                                        </div>
                                    </div>
                                    <div class="shrink w-full" v-else-if="layanan == 'training'">
                                        <div class="flex flex-wrap items-center justify-between mb-0.5">
                                            <span class="font-bold text-black text-md">
                                                Pelatihan
                                            </span>
                                        </div>
                                    </div>
                                    <div class="shrink w-full" v-else-if="layanan == 'invite-expert'">
                                        <div class="flex flex-wrap items-center justify-between mb-0.5">
                                            <span class="font-bold text-black text-md">
                                                Undang Expert
                                            </span>
                                        </div>
                                    </div>
                                    <div class="shrink w-full" v-else>
                                        <div class="flex flex-wrap items-center justify-between mb-0.5">
                                            <span class="font-bold text-black text-md">
                                                Rekrut Expert
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </ModalBasic>
    </div>
    
</template>