<script setup>
import { toRaw, ref, toRefs } from 'vue'
import { useDataUserStore } from '../../../stores/store-users'

const props = defineProps({
    dataProfile: Object
})

const { dataProfile } = toRefs(props)

const storeUser = useDataUserStore()

const editDataTambahan = ref({})

let detailRaw = toRaw(dataProfile.value)

editDataTambahan.value = {
    profession: detailRaw.profession,
    company: detailRaw.company,
    domicile: detailRaw.domicile
}

const emit = defineEmits(['updateProfileAdditionalData'])

const isLoading1 = ref(false)

const validationEditDataTambahan = async () => {
    try {
        if (editDataTambahan.value.profession != "" &&
            editDataTambahan.value.company != "" &&
            editDataTambahan.value.domicile != "") {
            isLoading1.value = true
            if (await storeUser.editProfileUserDataTambahan(editDataTambahan.value) != null) {
                emit('updateProfileAdditionalData', editDataTambahan.value)
            }
            isLoading1.value = false
        }
    } catch (error){
        isLoading1.value = false
    }
}
</script>
<template>
    <form @submit.prevent="validationEditDataTambahan()">
        <div class="p-1 mb-3 shrink w-full space-y-10">
            <div class="max-w rounded-lg border border-gray-200 shadow-md p-5">
                <div class="flex justify-between items-center">
                    <div class="font-bold text-xl text-black">
                        Data Tambahan
                    </div>
                    <button type="submit"
                        class="h-9 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm flex justify-end items-center">
                        Simpan
                    </button>
                </div>
                <div class="flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-8">
                    <div class="">
                        <div class="">
                            <label class="block text-sm font-medium mb-1 text-black">Profesi</label>
                            <input
                                class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                type="text" v-model="editDataTambahan.profession" />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Perusahaan</label>
                            <input
                                class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                type="text" v-model="editDataTambahan.company" />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Lokasi</label>
                            <input
                                class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                type="text" v-model="editDataTambahan.domicile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<style>
.loader {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #fff;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>