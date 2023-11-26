<script setup>
import {ref, watch} from 'vue'
const emit = defineEmits(["onUpdateData"])

const props = defineProps({
    data: {
        type: Object,
        default: {
            id: "",
            plat: "",
            car_type: ""
        }
    },
})

const data = ref(props.data)
watch(() => props.data, (newVal) => {
  data.value = newVal;
});

const formValidation = () => {
    if(data.value.car_type == ""){
        alert("car type cannot be null")
        return
    }
    if(data.value.plat == ""){
        alert("plat cannot be null")
        return
    }
    emit("onUpdateData", data.value)
}
</script>
<template>
    <form @submit.prevent="formValidation()">
        <div class="flex-auto min-w-0 mx-auto mb-6 pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0">
            <div>
                <label class="block text-sm font-medium mb-1 text-black">ID</label>
                <div class="flex">
                    <input :readonly="true" type="text" placeholder="AB 3201 AF" v-model="data.id" class="w-full bg-slate-200"/>
                </div>
            </div>
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
                        Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>