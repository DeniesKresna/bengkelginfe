<script setup>
import {ref, toRaw} from 'vue'
import Pagination from '../../../components/PaginationNumeric.vue'
import LoadingDotsVsTheBars from '../../component/LoadingDotsVsTheBars.vue'
import { useExecutionStore } from "./store";
import {convertApiDateToWebDateWithoutTime} from "../../../utils/Helper"
import {useRouter} from "vue-router"
const router = useRouter()

const executionStore = useExecutionStore();

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

const editData = (payload) => {
  router.push("/dashboard/execution/edit/" + payload.id)
}

const checkPaidOff = (payload) => {
  if(payload == 1){
    return "Lunas"
  }
  return "Belum Lunas"
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
                        <div class="font-semibold text-left"><a href="#" @click="sortData('e.id')">No.</a></div>
                      </label>
                    </div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('c.plat')">Plat</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('cu.name')">Pelanggan</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('e.description')">Keterangan</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('e.price')">Harga</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('e.paid_off')">Lunas</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('e.paid_at')">Dibayar pada</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('e.executed_at')">Dieksekusi pada</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('e.executed_at')">Selesai pada</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left"><a href="#" @click="sortData('u.name')">Dikerjakan oleh</a></div>
                  </th>
                  <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-semibold text-left">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-slate-200" v-if="props.data.length > 0">
                <tr v-for="(row, index) in props.data">
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">{{ ((props.page - 1) * props.limit) + 1 + index}}</div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.plat }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.customer_name }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.description }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.price }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ checkPaidOff(row.paid_off) }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ convertApiDateToWebDateWithoutTime(row.paid_at) }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ convertApiDateToWebDateWithoutTime(row.executed_at) }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ convertApiDateToWebDateWithoutTime(row.finish_at) }}
                    </div>
                  </td>
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div class="font-medium text-black">
                      {{ row.executer_name }}
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
                  <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" colspan="11">
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
</div>
</template>