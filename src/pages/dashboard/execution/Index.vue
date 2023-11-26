<script setup>
import {ref, onMounted, toRaw} from 'vue'
import PageHeader from '../../../partials/mine/PageHeader.vue';
import ModalBasic from '../../../components/ModalBasic.vue';
import Filter from './Filter.vue'
import Table from './Table.vue'
import {downloadFileFromBase64} from '../../../utils/Helper'

import {useRouter, useRoute} from "vue-router"
const router = useRouter()

import { useExecutionStore } from "./store";
const customerStore = useExecutionStore();

const maxData = 20

const filter = ref({
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
const module = "Execution"

const data = ref([])
const isLoading = ref(false)

const getData = async(filt={price:[], paid:[]}, limit=maxData, page=1, orders=[]) => {
  isLoading.value = true

  for(let i=0; i<filt.price.length; i++){
    filt.price[i] = parseInt(filt.price[i])
  }

  for(let i=0; i<filt.paid.length; i++){
    filt.paid[i] = parseInt(filt.paid[i])
  }

  let paging = {
    limit: limit,
    page: page,
    orders: orders,
    data: filt
  }

  const res = await customerStore.searchExecution(paging)
  if(res != null){
    if(res.responseCode == "00") {
      data.value = res.responseData
    }else{
      alert(res.responseDesc)
    }
  }

  isLoading.value = false
}

onMounted(() => {
  getData(filter.value)
})

const changePage = (page) => {
  filter.value.page = page
  getData(filter.value, maxData, page)
}

const currentSort = ref(['id desc'])
const sortData = (column) => {
  let col = "id"
  let mod = "desc"
  const srt = toRaw(currentSort.value)
  if(srt.length > 0){
    let sorts = srt[0].split(" ")
    col = column
    if(column != sorts[0]){
      mod = "asc"
    }else{
      if(sorts[1] == "asc"){
        mod = "desc"
      }else{
        mod = "asc"
      }
    }
  }
  currentSort.value = [col + " " + mod]
  getData(filter.value, maxData, 1, currentSort.value)
}

const toCreatePage = () => {
  router.push('/dashboard/execution/create')
}

const modalFilterOpen = ref(false)
const applyFilter = (payload) => {
  filter.value = payload
  modalFilterOpen.value = false
  getData(filter.value)
}

const downloadExecExcel = async() => {
  let filt = filter.value
  for(let i=0; i<filt.price.length; i++){
    filt.price[i] = parseInt(filt.price[i])
  }

  for(let i=0; i<filt.paid.length; i++){
    filt.paid[i] = parseInt(filt.paid[i])
  }

  let paging = {
    limit: 0,
    page: 0,
    orders: [],
    data: filt
  }

  const res = await customerStore.downloadExecution(paging)
  if(res != null){
    if(res.responseCode == "00") {
      const base64String = res.responseDesc
      downloadFileFromBase64(base64String, "bengkel_execution.xlsx")
    }else{
      alert(res.responseDesc)
    }
  }
}

</script>
<template>
  <main>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <PageHeader :module="module" :withFilter="true" :withDownload="true" @onTriggerCreate="toCreatePage" @onTriggerFilter="modalFilterOpen = true" @onDownloadFilter="downloadExecExcel"/>
      <!-- table -->
      <Table
        :data="data.response_data"
        :total="data.total"
        :limit="data.limit"
        :page="data.page"
        :isLoading="isLoading"
        @onUpdateData = "getData(filter)"
        @onChangePage = "changePage"
        @onSortData = "sortData"
      ></Table>

      <!-- filter data -->
      <ModalBasic 
        id="filterExecution"
        :modalOpen = modalFilterOpen
        title = "Filter Execution"
        @close-modal="modalFilterOpen = false"
      >
        <Filter @onFilterChange="applyFilter"/>
      </ModalBasic>
    </div>
  </main>
</template>