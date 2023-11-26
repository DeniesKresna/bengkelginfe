<script setup>
import { ref, reactive } from "vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import Multiselect from "@vueform/multiselect";
import { useOptionsStore } from "../../stores/store-options";

const router = useRouter();
const route = useRoute();
const optionStore = useOptionsStore();

const { listSector, listDomicile, listService, listTitle } =
  storeToRefs(optionStore);

const searchInHomepage = reactive({
  search: "",
  profession: "",
  sectors: [],
});

onMounted(() => {
  searchInHomepage.search = route.query.keywordSearch;
  searchInHomepage.profession = route.query.keywordProffesion;
  //   searchInHomepage.sectors = route.query.keywordSector;
  const keywordSector = route.query.keywordSector;
  searchInHomepage.sectors = Array.isArray(keywordSector)
    ? keywordSector
    : [keywordSector];
});

const homepageSearch = () => {
  router.push({
    path: "/experts/cariexpert",
    query: {
      keywordSearch: searchInHomepage.search,
      keywordProffesion: searchInHomepage.profession,
      keywordSector: searchInHomepage.sectors.join(","),
    },
  });
};
</script>
<template>
  <div class="flex-auto max-w-9xl min-w-0 mx-auto px-8 lg:px-8 pt-6 lg:pt-8">
    <div class="flex justify-center">
      <div class="lg:w-1/2 my-auto xs:mx-10">
        <div class="w-full max-w-1xl mx-auto">
          <div class="mb-5">
            <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold">
              Temukan Experts Terbaik untuk Berbagai Kebutuhan Pengembangan
              Karier
            </h1>
          </div>
        </div>
        <div class="w-full max-w-1xl">
          <div class="mb-5">
            <p class="xl:text-2xl md:text-lg text-2lg text-black">
              Di Jobhun, kamu bisa menemukan experts terbaik untuk kebutuhan
              konsultasi, pelatihan, narasumber acara, hingga proyek lepas.
            </p>
          </div>
        </div>
        <div class="relative w-full max-w-1xl columns-2xl mt-5">
          <form class="relative">
            <input
              id="action-search"
              placeholder="Nama atau perusahaan"
              class="form-input shadow py-2.5 my-3 focus:outline-none focus:bg-white focus:border-emerald-500 md:w-48 sm:w-48 xs:w-48 mr-3 h-12"
              type="search"
              v-model="searchInHomepage.search"
            />
            <input
              id="action-search"
              placeholder="Profesi"
              class="form-input shadow py-2.5 my-3 focus:outline-none focus:bg-white focus:border-emerald-500 md:w-48 sm:w-48 xs:w-48 mr-3 h-12"
              type="search"
              v-model="searchInHomepage.profession"
            />
            <Multiselect
              v-model="searchInHomepage.sectors"
              :close-on-select="true"
              mode="multiple"
              placeholder="Bidang"
              :searchable="true"
              class="form-input p-2.5 ms-ring shadow my-3 focus:outline-none focus:bg-white focus:border-emerald-500 h-12 w-48 ml-0 mr-3 inline-flex"
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
              @click.prevent="homepageSearch"
              class="bg-jobhunGreen text-sm h-11 hover:bg-emerald-600 text-white px-5 rounded"
            >
              Cari
            </button>
          </form>
        </div>
      </div>
      <div class="lg:block hidden w-1/2">
        <div class="mb-5">
          <img
            src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/BANNER-WEB-JOBHUN1-34-min.png"
            alt=""
            class="h-full w-full object-contain z-20"
          />
        </div>
      </div>
    </div>
  </div>
</template>