<script setup>
import {ref} from 'vue'
import DateSingle from '../../../components/DateSingle.vue'
const emit = defineEmits(["onCreateData"])

const data = ref({
    'executer_name':"",
    'car_plat':"",
    'customer_name':"",
    'customer_phone':"",
    'customer_email':"",
    'price':[0, 10000000000],
    'paid':[0, 10000000000],
    'paid_off':null,
    'paid_from':null,
    'paid_to':null,
    'executed_from':null,
    'executed_to':null,
    'finish_from':null,
    'finish_to':null,
})

const formValidation = () => {
    emit("onFilterChange", data.value)
}
</script>
<template>
    <form @submit.prevent="formValidation()">
        <div class="flex-auto min-w-0 mx-auto mb-6 pt-6 lg:px-8 px-6 lg:pt-4 md:mt-0">
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Executer Name</label>
                <div class="flex">
                    <input type="text" placeholder="Admin" v-model="data.executer_name" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Plat Number</label>
                <div class="flex">
                    <input type="text" placeholder="AB 4096 CY" v-model="data.car_plat" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Customer Name</label>
                <div class="flex">
                    <input type="text" placeholder="Denies Kresna" v-model="data.customer_name" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Customer Phone</label>
                <div class="flex">
                    <input type="text" placeholder="081357006009" v-model="data.customer_phone" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Customer Email</label>
                <div class="flex">
                    <input type="text" placeholder="denieskresna@yahoo.com" v-model="data.customer_email" class="w-full"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Price</label>
                <div class="flex">
                    <input type="number" placeholder="100000" v-model="data.price[0]" class="w-1/3"/>
                    &nbsp;-&nbsp;
                    <input type="number" placeholder="200000" v-model="data.price[1]" class="w-1/3"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Paid</label>
                <div class="flex">
                    <input type="number" placeholder="100000" v-model="data.paid[0]" class="w-1/3"/>
                    &nbsp;-&nbsp;
                    <input type="number" placeholder="200000" v-model="data.paid[1]" class="w-1/3"/>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Paid Off</label>
                <div class="flex">
                    <select v-model="data.paid_off" class="w-full">
                        <option :value="0">Not Yet Paid</option>
                        <option :value="1">Paid Off</option>
                    </select>
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Paid From</label>
                <div class="flex">
                    <DateSingle v-model="data.paid_from" placeholder="from" />
                    -
                    <DateSingle v-model="data.paid_to" placeholder="to" />
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Executed From</label>
                <div class="flex">
                    <DateSingle v-model="data.executed_from" placeholder="from" />
                    -
                    <DateSingle v-model="data.executed_to" placeholder="to" />
                </div>
            </div>
            <div class="mt-4">
                <label class="block text-sm font-medium mb-1 text-black">Finish From</label>
                <div class="flex">
                    <DateSingle v-model="data.finish_from" placeholder="from" />
                    -
                    <DateSingle v-model="data.finish_to" placeholder="to" />
                </div>
            </div>
            <div class="mt-4">
                <div class="flex justify-end">
                    <div>
                        <button
                        type="submit"
                        class="h-9 mt-5 bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm"
                        >
                        Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>