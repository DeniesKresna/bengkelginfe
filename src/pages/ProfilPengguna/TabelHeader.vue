<script setup>
import { toRefs, computed } from 'vue'
import TabelData from './TabelData.vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
// import { PAGINATION_LIMIT } from '../../../../../utils/Constants'
// import { useDataExpertStore } from '../../../../../stores/store-experts'

// const route = useRoute()
// const id = route.params.id

// const tableExpertPermanentStore = useDataExpertStore()
// await tableExpertPermanentStore.getDataTableExpertPermanent()
// const { getDataTableExpertPermanent, pagination } = storeToRefs(tableExpertPermanentStore)

const props = defineProps({
  page: Number,
  perPage: Number,
  tableDetailTransactionUser: Array,
  total: Number
})

const { page, perPage, tableDetailTransactionUser, total } = toRefs(props)

  const adjustingIndex = computed(()=> perPage.value * (page.value-1))
</script>

<template>
  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead class="text-md text-black bg-slate-50">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Jenis Layanan</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Tanggal</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Status</div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-200">
            <TabelData
              v-for="(usersTransaction, index) in tableDetailTransactionUser"
              :key="usersTransaction.id"
              :value="usersTransaction.id"
              :tableDetailTransactionUser="usersTransaction"
              :index="index + adjustingIndex"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>