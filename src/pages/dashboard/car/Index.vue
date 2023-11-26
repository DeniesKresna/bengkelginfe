<script setup>
import {ref, onMounted, toRaw} from 'vue'
import PageHeader from '../../../partials/mine/PageHeader.vue';
import ModalBasic from '../../../components/ModalBasic.vue';
import Table from './Table.vue'
import Add from './Add.vue'

import { useCarStore } from "./store";
const carStore = useCarStore();

const maxData = 20

const filter = ref({
    'plat':"",
    'car_type':""
})
const module = "Car"

const data = ref([])
const isLoading = ref(false)

const getData = async(filter={}, limit=maxData, page=1, orders=["id desc"]) => {
  isLoading.value = true

  let paging = {
    limit: limit,
    page: page,
    orders: orders,
    data: filter
  }

  const res = await carStore.searchCar(paging)
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

const modalCreateOpen = ref(false)
const createData = () => {
  getData()
  modalCreateOpen.value=false
}

</script>
<template>
  <main>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <PageHeader :module="module" @onTriggerCreate="modalCreateOpen = true"/>
      <div class="sm:flex sm:items-center justify-end mb-5">
        <div class="flex gap-2">
          <form class="relative" @submit.prevent="clickSearchButton">
              <div class="grid md:gap-x-3 gap-y-3 md:grid-cols-4 grid-cols-1">
                  <input class="focus:ring-jobhunGreen hover:ring-emerald-500 border-0 bg-gray-100 rounded-lg"
                      type="text" placeholder="plat" v-model="filter.plat" @keyup.enter="getData(filter)"/>
                  <input class="focus:ring-jobhunGreen hover:ring-emerald-500 border-0 bg-gray-100 rounded-lg"
                      type="text" placeholder="car_type" v-model="filter.car_type" @keyup.enter="getData(filter)" />
              </div>
          </form>
        </div>
      </div>
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

      <!-- create data -->
      <ModalBasic 
        id="createCar"
        :modalOpen = modalCreateOpen
        title = "Create Car"
        @close-modal="modalCreateOpen = false"
      >
        <Add @onCreateData="createData"/>
      </ModalBasic>
    </div>
  </main>
</template>