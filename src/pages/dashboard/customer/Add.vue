<script setup>
import {ref} from 'vue'
import { useCustomerStore } from "./store";
const customerStore = useCustomerStore();

const emit = defineEmits(["onCreateData"])

const data = ref({
    name: "",
    email: "",
    phone:"",
    address:""
})

const formValidation = () => {
    if(data.value.name == ""){
        alert("name cannot be null")
        return
    }
    if(data.value.phone == ""){
        alert("phone cannot be null")
        return
    }
    createData()
}

const createData = async() => {
  const res = await customerStore.createCustomer(data.value)
  if(res != null){
    if(res.responseCode == "00") {
        emit("onCreateData", res.responseData)
    }else{
      alert(res.responseDesc)
    }
  }
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
                <label class="block text-sm font-medium mb-1 text-black">Phone</label>
                <div class="flex">
                    <input type="text" placeholder="081357006009" v-model="data.phone" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Address</label>
                <div class="flex">
                    <textarea placeholder="Eastern Park Residence BD-31" v-model="data.address" class="w-full" line="3">
                    </textarea>
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