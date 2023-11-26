<script setup>
import {ref, toRaw} from 'vue'
import Pagination from '../../../components/PaginationNumeric.vue'
import LoadingDotsVsTheBars from '../../component/LoadingDotsVsTheBars.vue'
import ModalBasic from '../../../components/ModalBasic.vue';
import Edit from './Edit.vue'
import { useCarStore } from "./store";

const carStore = useCarStore();

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  total: {
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 0
  },
  limit: {
    type: Number,
    default: 20
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['onChangePage','onUpdateData','onSortData'])

const changePage = (payload) => {
  emit("onChangePage", payload)
}

const payloadData = ref({})
const modalUpdateOpen = ref(false)
const editData = (payload) => {
  payloadData.value = structuredClone(toRaw(payload))
  modalUpdateOpen.value = true
}

const updateData = async(payload) => {
  const res = await carStore.updateCar(payload)
  if(res != null){
    if(res.responseCode == "00") {
      modalUpdateOpen.value = false
      emit("onUpdateData")
    }else{
      alert(res.responseDesc)
    }
  }
}

const sortData = (payload) => {
  emit("onSortData", payload)
}

</script>

<template>
<div>
  <!-- Table -->
  <div class="mt-8">
    <div v-if="props.isLoading" class="flex justify-center mt-40 h-screen">
      <LoadingDotsVsTheBars />
    </div>
    <div>
      <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <div>
          <div class="overflow-x-auto">
            <table class="table-auto w-full">
              <thead class="text-md text-black bg-slate-50">
                <tr>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <div class="flex items-center">
                      <label class="inline-flex">
                        <div class="font-semibold text-left"><a href="#" @click="sortData('id')">No.</a></div>
                      </label>
                    </div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('plat')">Plat Number</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('car_type')">Car Type</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-200" v-if="props.data.length > 0">
                <tr v-for="(row, index) in props.data">
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">{{ ((props.page - 1) * props.limit) + 1 + index }}</div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.plat }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.car_type }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <button
                      @click="editData(row)"
                      class="text-rose-500 hover:text-rose-900 rounded-full"
                    >Edit</button>
                  </td>
                </tr>
              </tbody>
              <tbody class="text-sm divide-y divide-slate-200" v-else>
                <tr>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" colspan="4">
                    <div class="font-medium text-black text-center">No Data Found</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-8">
    <Pagination
      :total="props.total"
      :perPage="props.limit"
      :page="props.page"
      @clickNav="changePage"
    />
  </div>
  <!-- create data -->
  <ModalBasic 
    id="updateCar"
    :modalOpen=modalUpdateOpen
    title="Update Car"
    @close-modal="modalUpdateOpen = false"
  >
    <Edit @onUpdateData="updateData" 
    :data="payloadData" />
  </ModalBasic>
</div>
</template>