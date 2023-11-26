<script setup>
import {ref} from 'vue'
import { useCarStore } from "./store";
const carStore = useCarStore();

const emit = defineEmits(["onCreateData"])

const data = ref({
    plat: "",
    car_type: ""
})

const formValidation = () => {
    if(data.value.car_type == ""){
        alert("car type cannot be null")
        return
    }
    if(data.value.plat == ""){
        alert("plat cannot be null")
        return
    }
    createData()
}

const createData = async() => {
  const res = await carStore.createCar(data.value)
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
                <label class="block text-sm font-medium mb-1 text-black">Plat</label>
                <div class="flex">
                    <input type="text" placeholder="AB 3201 AF" v-model="data.plat" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Car Type</label>
                <div class="flex">
                    <input type="text" placeholder="Avanza Merah Keluaran 2012" v-model="data.car_type" class="w-full"/>
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