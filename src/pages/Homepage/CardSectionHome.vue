<script setup>
import CardMentor from "./CardExpertHome.vue";
import CardClass from "../../pages/Homepage/MenuLayananNavBar/Pelatihan/CardClass.vue";
import { useDataExpertStore } from "../../stores/store-experts";
import { useCourseStore } from "../../stores/store-course";
import { storeToRefs } from "pinia";

// store expert
const dataExpertsHomepageStore = useDataExpertStore();
const { expertFeatured } = storeToRefs(dataExpertsHomepageStore);
dataExpertsHomepageStore.getDataExpertFeatured();
const limit = 8;

// store course
const courseStore = useCourseStore();
const { coursesFeatured } = storeToRefs(courseStore);
courseStore.getDataCourseFeatured();
</script>
<template>
  <div class="">
    <div class="py-8 w-full max-w-6xl mx-auto">
      <h1 class="text-2xl md:text-3xl text-black text-center font-bold">
        Rekomendasi experts unggulan
      </h1>
      <div
        class="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-3 xl:gap-8 md:gap-4 gap-6 mt-10 lg:px-14 px-10"
      >
        <div v-for="(expert, index) in expertFeatured" :key="index">
          <CardMentor :expertFeatured="expert" v-if="index < limit" />
        </div>
      </div>
      <div class="text-end text-sm px-14 mt-5">
        <router-link to="/experts/cariexpert"
          >Cari experts lainnya -&gt;</router-link
        >
      </div>
    </div>
    <div>
      <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
        Rekomendasi Pelatihan Reguler
      </h1>
      <div class="">
        <div class="px-0 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <div
            class="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 mt-10 px-14 lg:px-16 md:px-20"
          >
            <div v-for="(course, index) in coursesFeatured" :key="course">
              <CardClass :course="course" v-if="index < 3" />
            </div>
          </div>
          <div class="text-end text-sm px-14 lg:px-16 md:px-20 mt-10">
            <router-link to="/layanan/pelatihan/carikelas"
              >Cari kelas lainnya -&gt;</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>