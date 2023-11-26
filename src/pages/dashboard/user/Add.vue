<script setup>
import {ref} from 'vue'
const emit = defineEmits(["onCreateData"])

const data = ref({
    name: "",
    email: "",
    phone:"",
    role_id:""
})

const formValidation = () => {
    if(data.value.name == ""){
        alert("name cannot be null")
        return
    }
    if(data.value.email == ""){
        alert("email cannot be null")
        return
    }
    if(data.value.password == ""){
        alert("password cannot be null")
        return
    }
    if(data.value.role_id == ""){
        alert("role cannot be null")
        return
    }
    emit("onCreateData", data)
}
</script>
<template>
    <form @submit.prevent="formValidation()">
        <div class="flex-auto min-w-0 mx-auto mb-6 pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0">
            <div>
                <label class="block text-sm font-medium mb-1 text-black">Name</label>
                <div class="flex">
                    <input type="text" placeholder="Denies Kresna" v-model="data.name" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Email</label>
                <div class="flex">
                    <input type="text" placeholder="denieskresna@yahoo.com" v-model="data.email" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Password</label>
                <div class="flex">
                    <input type="password" placeholder="password" v-model="data.password" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Role</label>
                <div class="flex">
                    <select v-model="data.role_id">
                        <option :value="1">Administrator</option>
                        <option :value="3">Employee</option>
                    </select>
                </div>
            </div>
            <div class="mt-4">
                <div class="flex justify-end">
                    <div>
                        <button
                        type="submit"
                        class="h-9 mt-5 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm"
                        >
                        Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>