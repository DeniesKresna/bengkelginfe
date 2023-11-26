<script setup>
import {ref, watch} from 'vue'
const emit = defineEmits(["onUpdateData"])

const props = defineProps({
    data: {
        type: Object,
        default: {
            name: "",
            role_id: "",
        }
    },
})

const data = ref(props.data)
watch(() => props.data, (newVal) => {
  data.value = newVal;
});

const formValidation = () => {
    if(data.value.name == ""){
        alert("name cannot be null")
        return
    }
    if(data.value.role_id == ""){
        alert("role cannot be null")
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
                <label class="block text-sm font-medium mb-1 text-black">Name</label>
                <div class="flex">
                    <input type="text" placeholder="Denies Kresna" v-model="data.name" class="w-full"/>
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
                        Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>