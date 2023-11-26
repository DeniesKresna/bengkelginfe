<script setup>
import { ref, toRaw, toRefs } from 'vue'
import { validatePicture, getBase64Image } from '../../../utils/Helper'
import { useDataUserStore } from '../../../stores/store-users'

const props = defineProps({
    dataProfile: Object
})

const { dataProfile } = toRefs(props)

const storeUser = useDataUserStore()

const editDataUtama = ref({})

let detailRaw = toRaw(dataProfile.value)

editDataUtama.value = {
    image: detailRaw?.image_url || '',
    first_name: detailRaw?.first_name || '',
    last_name: detailRaw?.last_name || '',
    email: detailRaw?.email || '',
    phone: detailRaw?.phone || '',
    old_password: detailRaw?.old_password || '',
    new_password: detailRaw?.new_password || '',
    new_password2: detailRaw?.confirm_new_password || ''
}

const isImageChanged = ref(false)

const choosePhoto = () => {
    document.getElementById("fileUpload").click()
}

const validateImageRatio = async (e) => {
    var ratio = "1:1";
    var maxSize = 1 * 1024 * 1024;
    var validationRes = await validatePicture(e, ratio, maxSize);
    if (!validationRes.isOk) {
        alert(validationRes.message);
        return;
    }
    isImageChanged.value = true;
    let base64img = await getBase64Image(validationRes.theImage)
    editDataUtama.value.image = base64img
}

const isInputNumber = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
    } else {
        return true;
    }
}

const emit = defineEmits(['updateProfileName']);

const isLoading1 = ref(false);
const isLoading2 = ref(false);

const validationEditDataUtama = async () => {
    try {
        if (editDataUtama.value.first_name != "" && 
            editDataUtama.value.last_name != "" && 
            editDataUtama.value.email != "" && 
            editDataUtama.value.phone != "") {
            isLoading1.value = true
            const userData = {
                first_name: editDataUtama.value.first_name,
                last_name: editDataUtama.value.last_name,
                email: editDataUtama.value.email,
                phone: editDataUtama.value.phone,
                image: editDataUtama.value.image
            }
            if (await storeUser.editUser(userData) != null) {
                emit('updateProfileName', userData)
            }
            isLoading1.value = false
        }
    } catch (error) {
        isLoading1.value = false
    }

}

const validationEditKataSandi = async () => {
    try {
        if (editDataUtama.value.old_password != "" && editDataUtama.value.new_password != "" && editDataUtama.value.new_password2 != "") {
            if (editDataUtama.value.new_password != editDataUtama.value.new_password2) {
                alert('Kata sandi tidak sesuai')
            } else {
                isLoading2.value = true
                const editedPasswordData = {
                    old_password: editDataUtama.value.old_password,
                    new_password: editDataUtama.value.new_password,
                    new_password2: editDataUtama.value.new_password2,
                }
                if (await storeUser.editUserPassword(editedPasswordData)) {
                    return
                }
            }
        }
        isLoading2.value = false
    } catch (error) {
        isLoading2.value = false
    }
}

const showPasswordOld = ref(false)
const showPasswordNew = ref(false)
const showPasswordConfirm = ref(false)

const toggleShowOldPassword = (event)=>{
    event.stopPropagation();
    showPasswordOld.value = !showPasswordOld.value
}

const toggleShowNewPassword = (event) => {
    event.stopPropagation();
    showPasswordNew.value = !showPasswordNew.value
}

const toggleShowConfirmPassword = (event) => {
    event.stopPropagation();
    showPasswordConfirm.value = !showPasswordConfirm.value
}
</script>
<template>
    <form @submit.prevent="validationEditDataUtama()">
        <div class="p-1 mb-3 shrink w-full space-y-10">
            <div class="max-w rounded-lg border border-gray-200 shadow-md p-5">
                <div class="grid md:grid-cols-2 grid-cols-1 items-center">
                    <div class="font-bold text-xl text-black">
                        Data Utama
                    </div>
                    <div class="flex md:justify-end xs:my-2">
                        <button v-if="!isLoading1" type="submit" class="h-9 bg-jobhunGreen hover:bg-emerald-600 text-white px-5 rounded text-sm md:flex items-center">
                            Simpan profil
                        </button>
                        <button v-if="isLoading1" type="submit" class="h-9 bg-jobhunGreen hover:bg-emerald-600 text-white px-5 rounded text-sm md:flex items-center">
                            <span class="loader"></span>
                        </button>
                    </div>
                </div>
                <div class="grid grid-flow-row md:flex flex-auto max-w-4xl min-w-0 mx-auto pt-6 lg:px-8 px-6 lg:pt-8">
                    <div class="flex-none md:w-1/1">
                        <div class="mb-4 sm:mb-0">
                            <img v-if="editDataUtama.image === ''" class="border-2 w-32 h-32 rounded-full" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/dummy-profile.png" />
                            <img v-else class="border-2 w-32 h-32 rounded-full" :src="editDataUtama.image" />
                            <p class="mt-1 text-xs text-gray-500">*ukuran maksimal 1MB</p>
                            <p class="mt-1 text-xs text-gray-500">*foto 1:1</p>
                        </div>
                        <div class="md:flex md:flex-col ">
                            <input type="file" @change="validateImageRatio" ref="file" style="display: none" id="fileUpload">
                            <button @click.prevent="choosePhoto"
                                class="h-7 w-full md:mt-5 sm:mt-4 mt-0 md:mb-0 sm:mb-0 mb-4 bg-gray-500 hover:bg-emerald-600 text-white px-5 rounded text-sm mx-auto">
                                Unggah foto
                            </button>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-1 md:flex-auto md:max-w-4xl md:min-w-0 md:mx-auto md:px-8 px-0 md:mt-0 mt-4">
                        <div class="">
                            <label class="block text-sm font-medium mb-1 text-black">Nama depan</label>
                            <input 
                                class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                required type="text" v-model="editDataUtama.first_name" />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Nama belakang</label>
                            <input
                                class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                required type="text" v-model="editDataUtama.last_name" />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Email</label>
                            <input
                                class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                required type="email" v-model="editDataUtama.email" />
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Nomor Whatsapp</label>
                            <input class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full"
                                required  @keypress="isInputNumber($event)" type="text" v-model="editDataUtama.phone" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <!-- Sunting Kata Sandi -->
    <form @submit.prevent="validationEditKataSandi()">
        <div class="p-1 mb-3 shrink w-full space-y-10">
            <div class="max-w rounded-lg border border-gray-200 shadow-md p-5">
                <div class="grid md:grid-cols-2 grid-cols-1 items-center">
                    <div class="font-bold text-xl text-black">
                        Ganti Kata Sandi
                    </div>
                    <div class="flex md:justify-end xs:my-2">
                        <button v-if="!isLoading2" type="submit" class="h-9 bg-jobhunGreen hover:bg-emerald-600 text-white px-5 rounded text-sm md:flex items-center">
                            Simpan kata sandi
                        </button>
                        <button v-if="isLoading2" type="submit" class="h-9 bg-jobhunGreen hover:bg-emerald-600 text-white px-5 rounded text-sm md:flex items-center">
                            <span class="loader"></span>
                        </button>
                    </div>
                </div>
                <div class="grid grid-flow-row max-w-4xl flex-auto min-w-0 lg:px-8 px-6 lg:pt-8">
                    <div class="grid md:grid-cols-1 md:max-w-4xl md:min-w-0 md:px-8 px-0 md:mt-0 mt-4">
                        <div class="justify-start">
                            <label class="block text-sm font-medium mb-1 text-black">Kata sandi lama</label>
                            <div class="relative w-full">
                                <input v-if="showPasswordOld" type="text" v-model="editDataUtama.old_password" class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                                <input v-else type="password" v-model="editDataUtama.old_password" class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                                <button type="button" @click.stop="toggleShowOldPassword($event)" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg v-if="!showPasswordOld" class="w-5 h-5 hover:text-gray-200 text-white" fill="currentColor" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <svg v-else class="w-5 h-5 hover:text-gray-200 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Kata sandi baru</label>
                            <div class="relative w-full">
                                <input v-if="showPasswordNew" type="text" v-model="editDataUtama.new_password" class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                                <input v-else type="password" v-model="editDataUtama.new_password" class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                                <button type="button" @click.stop="toggleShowNewPassword($event)" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg v-if="!showPasswordNew" class="w-5 h-5 hover:text-gray-200 text-white" fill="currentColor" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <svg v-else class="w-5 h-5 hover:text-gray-200 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium mb-1 text-black">Ketik ulang kata sandi</label>
                            <div class="relative w-full">
                                <input v-if="showPasswordConfirm" type="text" v-model="editDataUtama.new_password2" class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                                <input v-else type="password" v-model="editDataUtama.new_password2" class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                                <button type="button" @click.stop="toggleShowConfirmPassword($event)" class="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <svg v-if="!showPasswordConfirm" class="w-5 h-5 hover:text-gray-200 text-white" fill="currentColor" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <svg v-else class="w-5 h-5 hover:text-gray-200 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                            </div>
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