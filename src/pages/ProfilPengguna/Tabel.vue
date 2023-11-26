<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { PAGINATION_LIMIT } from '../../../../utils/Constants'
import { useDataExpertStore } from '../../../../stores/store-experts'
import SearchForm from './SearchForm.vue'
import TabelHeader from './TabelHeader.vue'
import PaginationTableExpertPermanent from './PaginationNumeric.vue'

const route = useRoute()
const id = route.params.id

const tableExpertPermanentStore = useDataExpertStore()
await tableExpertPermanentStore.getDataTableExpertPermanent()
const { tableExpertPermanent, pagination } = storeToRefs(tableExpertPermanentStore)

// const bidangStore = useBidangStore()
// const { data, pagination } = storeToRefs(bidangStore)

//===== Delete Expert ==================================================
const confirmDeleteExpert = async () => {
  await tableExpertPermanentStore.deleteDataTableExpertPermanent()
}

//===== Get Data =======================================================
const getData = async (page=1, search="", perPage=PAGINATION_LIMIT) => {
  tableExpertPermanentStore.setPagination({
    page, search, per_page: perPage
  })
  await tableExpertPermanentStore.getDataTableExpertPermanent()
}

//===== Search & Pagination ============================================
const search = ref("")

const searchClick = (searchString) => {
  getData(1, searchString)
}

const changePage = (page) => {
  getData(page, search)
}

//===== Events ========================================================
onMounted(() => {
  getData()
})
</script>

<template>
  <main>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      <!-- Page header -->
      <div class="sm:flex sm:justify-between sm:items-center mb-5">

        <!-- Left: Title -->
        <div class="mb-4 sm:mb-0">
          <!-- <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Bidang ✨</h1> -->
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a href="#"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Pengguna ✨</h1>
              </a>
            </li>
          </ol>
        </div>

        <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <SearchForm placeholder="Cari pengguna" v-model="search" @searchClick="searchClick" />
          <router-link to="/pengguna/formtambahpengguna" class="btn bg-emerald-500 hover:bg-emerald-600 text-white">
            <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path
                d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span class="hidden xs:block ml-2">Tambah pengguna</span>
          </router-link>
        </div>            
      </div>

      <!-- Table -->
      <div class="mt-8">
        <TabelHeader
          :tableExpertPermanent="tableExpertPermanent"
          :total="pagination.total"
          :page="pagination.page"
          :perPage="pagination.per_page"
          :deleteExpert="tableExpertPermanentStore"
        />
      </div>

      <!-- Pagination -->
      <div class="mt-8">
        <PaginationTableExpertPermanent
          :total="pagination.total"
          :perPage="pagination.per_page"
          :page="pagination.page"
          @clickNav="changePage"
        />
        <!-- <PaginationClassic
          :total="pagination.total"
          :perPage="pagination.per_page"
          :page="pagination.page"
          @clickNav="changePage"
        /> -->
      </div>          
    </div>
  </main>
</template>