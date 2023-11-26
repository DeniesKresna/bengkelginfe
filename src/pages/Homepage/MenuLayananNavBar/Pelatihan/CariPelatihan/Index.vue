<script setup>
import { onMounted, ref, toRaw } from "vue";
import { PAGINATION_LIMIT_COURSE_SEARCH } from "../../../../../utils/Constants";
import { storeToRefs } from "pinia";
import Multiselect from "@vueform/multiselect";
import { useCourseStore } from "../../../../../stores/store-course";
import { useOptionsStore } from "../../../../../stores/store-options";
import PaginationNumeric from "../../../../../components/PaginationNumeric.vue";
import CardKelasPelatihan from "./CardKelasPelatihan.vue";

const courseStore = useCourseStore();
const { coursesFeatured, coursePaginationSearch } = storeToRefs(courseStore);

const optionStore = useOptionsStore();
const { listSector } = storeToRefs(optionStore);

const searchPelatihan = ref({
  sectors: [],
  search: "",
});

const deleteSectors = (sector) => {
  let selectedItems = searchPelatihan.value.sectors;
  let index = -1;
  for (let i = 0; i < selectedItems.length; i++) {
    if (sector == selectedItems[i]) {
      index = i;
      break;
    }
  }
  if (index < 0) {
    return;
  }
  selectedItems.splice(index, 1);
  searchPelatihan.value.sectors = selectedItems;
};

// ====== Pagination ======================================================
const loading = ref(false);

const getData = async (
  page = 1,
  perPage = PAGINATION_LIMIT_COURSE_SEARCH,
  search = {}
) => {
  courseStore.setPaginationCariPelatihan({
    page,
    per_page: perPage,
    search,
  });
  try {
    loading.value = true;
    await courseStore.cariPelatihan(searchPelatihan.value);
  } catch (error) {
    console.error("Error fetching data:", error);
    loading.value = false;
    error.value = true;
  }
};

const handleSearchClick = () => {
  getData(1, PAGINATION_LIMIT_COURSE_SEARCH, searchPelatihan.value);
};

const changePage = (page) => {
  getData(page);
};

onMounted(() => {
  getData(1);
});
</script>
<template>
  <div class="grid grid-cols-1 gap-20 p-6 lg:p-8 lg:py-12">
    <div class="grid grid-cols-1 gap-4">
      <div
        class="grid grid-cols-1 lg:grid-cols-[repeat(2,max-content)] gap-2 justify-between items-center"
      >
        <h1 class="text-2xl md:text-3xl text-black font-bold">Cari Kelas</h1>
        <div
          class="grid grid-cols-1 lg:grid-cols-[repeat(2,1fr)_max-content] gap-4"
        >
          <input
            id="action-search"
            name="action-search"
            placeholder="Cari"
            class="form-input shadow py-2.5 focus:outline-none focus:bg-white focus:border-emerald-500 h-11"
            type="search"
            v-model="searchPelatihan.search"
          />
          <Multiselect
            v-model="searchPelatihan.sectors"
            placeholder="Topik"
            :searchable="true"
            :close-on-select="false"
            mode="multiple"
            class="form-input p-2.5 h-11 ms-ring shadow focus:outline-none focus:bg-white focus:border-emerald-500 inline-flex"
            :classes="{
              containerActive: 'ring-0',
              search:
                'w-full border-none inset-0 outline-none focus:ring-0 appearance-none border-0 text-base font-sans bg-white rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
            }"
            :options="listSector"
          >
            <template v-slot:multiplelabel="{ values }">
              <div class="multiselect-multiple-label">
                {{ values.length }} bidang terpilih
              </div>
            </template>
          </Multiselect>
          <button
            @click.prevent="handleSearchClick"
            class="bg-jobhunGreen text-sm hover:bg-emerald-600 text-white h-11 px-5 py-2 rounded"
          >
            Cari
          </button>
        </div>
      </div>
      <div
        class="lg:justify-self-end"
        v-if="searchPelatihan.sectors.length != 0"
      >
        <div class="text-black text-xs justify-end">Bidang</div>
        <div class="flex flex-wrap gap-2">
          <span
            id="badge-dismiss-default"
            v-for="sector in searchPelatihan.sectors"
            :key="sector"
            class="inline-flex items-center py-1 px-2 text-sm font-medium text-white bg-jobhunGreen rounded"
          >
            {{ sector }}
            <button
              type="button"
              @click="deleteSectors(sector)"
              class="inline-flex items-center p-0.5 ml-2 text-sm text-white bg-transparent rounded-sm hover:bg-gray-50 hover:text-black"
              data-dismiss-target="#badge-dismiss-default"
              aria-label="Remove"
            >
              <svg
                class="w-3.5 h-3.5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full lg:w-[85%] lg:justify-self-center"
    >
      <div v-for="(course, index) in coursesFeatured" :key="index">
        <CardKelasPelatihan :course="course" />
      </div>
    </div>
    <div class="text-end text-sm mt-10 px-28">
      <PaginationNumeric
        :total="coursePaginationSearch.total"
        :perPage="coursePaginationSearch.per_page"
        :page="coursePaginationSearch.page"
        @clickNav="changePage"
      />
    </div>
  </div>
</template>