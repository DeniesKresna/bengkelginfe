<script setup>
import {ref} from 'vue'
import vSelect from 'vue-select'
import DateSingle from '../../../components/DateSingle.vue'
import PageHeader from '../../../partials/mine/PageHeader.vue';
import {convertRawIntToRupiah} from '../../../utils/Helper'
import _ from 'lodash';
import ModalBasic from '../../../components/ModalBasic.vue';
import {useRouter} from 'vue-router';
const router = useRouter()

import { useExecutionStore } from "./store";
const executionStore = useExecutionStore();

import AddCar from '../car/Add.vue'
import AddCustomer from '../customer/Add.vue'

import { useUserStore } from "../user/store";
const userStore = useUserStore();

import { useCarStore } from "../car/store";
const carStore = useCarStore();

import { useCustomerStore } from "../customer/store";
const customerStore = useCustomerStore();

const module = "Create Execution"

const data = ref({
    executer_id: null,
    car_id: null,
    customer_id:null,
    description:"",
    price:0,
    paid:0,
    paid_off:0,
    paid_at:null,
    executed_at: null,
    finish_at:null
})

const formValidation = () => {
    if(data.value.car_id == null){
        alert("Car cannot be null")
        return
    }
    if(data.value.customer_id == null){
        alert("phone cannot be null")
        return
    }
    if(data.value.description == ""){
        alert("description cannot be null")
        return
    }
    if(data.value.executed_at == null){
        alert("execution date cannot be null")
        return
    }
    createData()
}

const createData = async() => {
  const res = await executionStore.createExecution(data.value)
  if(res != null){
    if(res.responseCode == "00") {
        alert("success adding execution")
        router.push("/dashboard/execution")
    }else{
        alert(res.responseDesc)
    }
  }
}

// employee search
const employeeOptions = ref([])
const getEmployeeListFilterName = async(search, loading) =>{
    if(search.length < 3){
        if(search.length == 0) {
            employeeOptions.value = []
        }
        return
    }

    loading(true)
    
    employeeOptions.value = []
    const res = await userStore.getUserListFilterName({
        name: search
    })
    if(res != null){
        if(res.responseCode == "00" && res.responseData != null) {
            employeeOptions.value = res.responseData
        }
    }
   
    loading(false)
}

const nameDebounce = _.debounce((search, loading) => {
    getEmployeeListFilterName(search, loading)
}, 1000)

const executerLabel = ref("")
const changeExecuterLabel = (payload) => {
    executerLabel.value = payload.name
}

// plat search
const carOptions = ref([])
const getCarListFilterPlat = async(search, loading) =>{
    if(search.length < 4){
        if(search.length == 0) {
            carOptions.value = []
        }
        return
    }

    loading(true)
    
    carOptions.value = []
    const res = await carStore.getCarListFilterPlat({
        plat: search
    })
    if(res != null){
        if(res.responseCode == "00" && res.responseData != null) {
            carOptions.value = res.responseData
        }
    }
   
    loading(false)
}

const carDebounce = _.debounce((search, loading) => {
    getCarListFilterPlat(search, loading)
}, 1000)

const modalCreateCarOpen = ref(false)
const createCarData = (newCar) => {
    carLabel.value=newCar.plat
    data.value.car_id=newCar.id
    modalCreateCarOpen.value=false
}

const carLabel = ref("")
const changeCarLabel = (payload) => {
    carLabel.value = payload.plat
}

// customer search
const customerOptions = ref([])
const getCustomerListFilterName = async(search, loading) =>{
    if(search.length < 3){
        if(search.length == 0) {
            customerOptions.value = []
        }
        return
    }

    loading(true)
    
    customerOptions.value = []
    const res = await customerStore.getCustomerListFilterName({
        name: search
    })
    if(res != null){
        if(res.responseCode == "00" && res.responseData != null) {
            customerOptions.value = res.responseData
        }
    }
   
    loading(false)
}

const customerDebounce = _.debounce((search, loading) => {
    getCustomerListFilterName(search, loading)
}, 1000)

const modalCreateCustomerOpen = ref(false)
const createCustomerData = (newCustomer) => {
    customerLabel.value = newCustomer.name
    data.value.customer_id=newCustomer.id
    modalCreateCustomerOpen.value=false
}

const customerLabel = ref("")
const changeCustomerLabel = (payload) => {
    customerLabel.value = payload.name
}

</script>
<template>
<main>
<div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
    <PageHeader :module="module" :noCreate="true"/>
    <form @submit.prevent="formValidation()">
        <div class="flex-auto min-w-0 mx-auto mb-6 pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0">
            <div>
                <label class="block text-sm font-medium mb-1 text-black">Nama Pekerja</label>
                <vSelect
                    v-model="data.executer_id"
                    :options=employeeOptions 
                    placeholder="search here"
                    @search="nameDebounce"
                    @option:selected="changeExecuterLabel"
                    label="name"
                    :reduce="obj => obj.id"
                >
                <template #no-options="{ search, searching, loading }">
                    No data found.
                </template>
                <template #footer v-if="executerLabel != '' && data.executer_id != null">
                    <div style="opacity: 0.9">
                        Picked: {{ executerLabel }}
                    </div>
                </template>
                </vSelect>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Plat Nomor</label>
                <vSelect
                    v-model="data.car_id"
                    :options=carOptions 
                    placeholder="search here"
                    @search="carDebounce"
                    @option:selected="changeCarLabel"
                    label="plat"
                    :reduce="obj => obj.id"
                >
                <template #no-options="{ search, searching, loading }">
                    No data found. <a href="#" @click="modalCreateCarOpen = true" class="text-rose-500 hover:text-rose-900 rounded-full">Create new?</a>
                </template>
                <template #footer v-if="carLabel != '' && data.car_id != null">
                    <div style="opacity: 0.9">
                        Picked: {{ carLabel }}
                    </div>
                </template>
                </vSelect>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Nama Pelanggan</label>
                <vSelect
                    v-model="data.customer_id"
                    :options=customerOptions 
                    placeholder="search here"
                    @search="customerDebounce"
                    @option:selected="changeCustomerLabel"
                    label="name"
                    :reduce="obj => obj.id"
                >
                <template #no-options="{ search, searching, loading }">
                    No data found. <a href="#" @click="modalCreateCustomerOpen = true" class="text-rose-500 hover:text-rose-900 rounded-full">Create new?</a>
                </template>
                <template #footer v-if="customerLabel != '' && data.customer_id != null">
                    <div style="opacity: 0.9">
                        Picked: {{ customerLabel }}
                    </div>
                </template>
                </vSelect>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Keterangan Pekerjaan</label>
                <div class="flex">
                    <textarea v-model="data.description" row="3" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Price</label>
                <div class="flex">
                    <input type="number" placeholder="500000" v-model="data.price" class="w-full"/>
                </div>
                <div class="flex">
                    <span>{{ convertRawIntToRupiah(data.price.toString()) }}</span>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Terbayar</label>
                <div class="flex">
                    <input type="number" placeholder="500000" v-model="data.paid" class="w-full"/>
                </div>
                <div class="flex">
                    <span>{{ convertRawIntToRupiah(data.paid.toString()) }}</span>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Lunas</label>
                <div class="flex">
                    <select v-model="data.paid_off" class="w-full">
                        <option :value="0">Belum Bayar</option>
                        <option :value="1">Lunas</option>
                    </select>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Dibayar pada</label>
                <div class="flex">
                    <DateSingle v-model="data.paid_at" placeholder="" />
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Dieksekusi pada</label>
                <div class="flex">
                    <DateSingle v-model="data.executed_at" placeholder="" />
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Selesai pada</label>
                <div class="flex">
                    <DateSingle v-model="data.finish_at" placeholder="" />
                </div>
            </div>
            <div class="mt-4">
                <div class="flex justify-end">
                    <div> 
                        <button @click="router.push('/dashboard/execution')"
                        type="submit"
                        class="h-9 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-7 rounded text-sm mr-2"
                        >
                        Back To Execution Page
                        </button>
                    </div>
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
    <ModalBasic 
        id="createCarFromExec"
        :modalOpen = modalCreateCarOpen
        title = "Create Car"
        @close-modal="modalCreateCarOpen = false"
      >
        <AddCar @onCreateData="createCarData"/>
    </ModalBasic>
    <ModalBasic 
        id="createCustomerFromExec"
        :modalOpen = modalCreateCustomerOpen
        title = "Create Customer"
        @close-modal="modalCreateCustomerOpen = false"
      >
        <AddCustomer @onCreateData="createCustomerData"/>
      </ModalBasic>
</div>
</main>
</template>

<style scope>

</style>