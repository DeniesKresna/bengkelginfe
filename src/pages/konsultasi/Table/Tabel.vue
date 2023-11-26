<script setup>
import { ref, onMounted, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { PAGINATION_LIMIT } from "../../../utils/Constants";
import { useDataKonsultasiStore } from "../../../stores/store-konsultasi";
import SearchForm from "./SearchForm.vue";
import TabelHeader from "./TabelHeader.vue";
import PaginationTableExpertPermanent from "./../../../components/PaginationNumeric.vue";
import { useLayoutStore } from "../../layout/store";
import LoadingDotsVsTheBars from "../../component/LoadingDotsVsTheBars.vue";

// Store Data Konsultasi
const tableExpertKonsultasiStore = useDataKonsultasiStore();
const { tableKonsultasi, tablePaginationFilter } = storeToRefs(
  tableExpertKonsultasiStore
);

// Store Layout
const layoutStore = useLayoutStore();
const { session } = storeToRefs(layoutStore);

//===== Delete Expert ==================================================
const confirmDeleteExpert = async () => {
  await tableExpertKonsultasiStore.deleteDataTableExpertPermanent();
};

//===== Get Data =======================================================
const isLoading = ref(true);

const getData = async (page = 1, perPage = PAGINATION_LIMIT, search = {}) => {
  isLoading.value = true;
  tableExpertKonsultasiStore.setPaginationTableFilter({
    page,
    per_page: perPage,
    search,
  });
  const newSearch = toRaw(search);
  await tableExpertKonsultasiStore.getDataTableConsultation(newSearch);
  isLoading.value = false;
};

//===== Search & Pagination ============================================
const filterSearch = ref({
  created_at: "",
  status_paid: "",
  status: "",
  search: "",
});

const handleSearchClick = (payload) => {
  getData(1, PAGINATION_LIMIT, payload);
};

const changePage = (page) => {
  getData(page);
};

//===== Reload Data After Delete Expert ===============================
const receiveReloadDataTable = () => {
  getData(1);
};

//===== Events ========================================================
onMounted(() => {
  getData(1);
});
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
              <a
                href="#"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                  Konsultasi ✨
                </h1>
              </a>
            </li>
          </ol>
        </div>
        <div
          v-if="session.role_id === 1"
          class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
        >
          <router-link
            to="/konsultasi/tambahkonsultasi/"
            class="btn bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <svg
              class="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
              />
            </svg>
            <span class="hidden xs:block ml-2">Tambah transaksi</span>
          </router-link>
        </div>
      </div>
      <div class="sm:flex sm:items-center justify-end mb-5">
        <div class="flex gap-2">
          <SearchForm
            :datePlaceholder="'Tanggal pengajuan'"
            :generalPlaceholder="'Cari'"
            v-model:created_at="filterSearch.created_at"
            v-model:search="filterSearch.search"
            v-model:status="filterSearch.status"
            v-model:status_paid="filterSearch.status_paid"
            @searchClick="handleSearchClick"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="mt-8">
        <div v-if="isLoading" class="flex justify-center mt-40 h-screen">
          <LoadingDotsVsTheBars />
        </div>
        <TabelHeader
          v-else
          :tableConsultation="tableKonsultasi"
          :total="tablePaginationFilter.total"
          :page="tablePaginationFilter.page"
          :perPage="tablePaginationFilter.per_page"
          @passDataDeleted="receiveReloadDataTable"
        />
      </div>

      <!-- Pagination -->
      <div class="mt-8">
        <PaginationTableExpertPermanent
          :total="tablePaginationFilter.total"
          :perPage="tablePaginationFilter.per_page"
          :page="tablePaginationFilter.page"
          @clickNav="changePage"
        />
      </div>
    </div>
  </main>
</template>