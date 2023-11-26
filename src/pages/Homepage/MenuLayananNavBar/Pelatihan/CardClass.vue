<script setup>
import {
  convertApiDateToHumanDate,
  formatCurrency,
  capitalizeWord,
} from "../../../../utils/Helper";

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});

const { course } = props;

const convertCourseTime = (start_time, end_time) => {
  return (
    convertApiDateToHumanDate(start_time) +
    " - " +
    convertApiDateToHumanDate(end_time)
  );
};
</script>
<template>
  <router-link :to="'/pelatihan/detailkelas/' + course.id">
    <div class="card-container">
      <div
        class="grid grid-cols-1 bg-white shadow-md hover:shadow-xl rounded-xl col-span-full"
      >
        <img
          class="rounded-t-xl w-full h-48 object-cover"
          :src="course.image_url"
        />
        <div
          class="grid grid-cols-1 justify-items-center px-4 py-6 text-center"
        >
          <h1 class="text-lg font-bold text-black">
            {{ capitalizeWord(course.program) }}: {{ course.name }}
          </h1>
          <p class="text-md text-slate-400 mt-3">
            {{ convertCourseTime(course.start_time, course.end_time) }}
          </p>
          <h2 class="text-md font-medium mt-3">
            {{ formatCurrency(course.price) }}
          </h2>
          <ul class="jutify-center text-center mx-auto items-center gap-2 mt-3">
            <li class="mx-auto">
              <div class="space-x-1 line-clamp-1 hover:line-clamp-none">
                <div
                  class="inline-flex text-sm md:text-xs font-medium bg-gray-200 text-black rounded-2xl text-center px-2 py-0.5 my-1"
                >
                  {{ course.type }}
                </div>
              </div>
            </li>
            <li class="flex items-center">
              <div class="space-x-1 line-clamp-1 hover:line-clamp-none">
                <div
                  v-for="bidang in course.sectors"
                  :key="bidang"
                  class="inline-flex text-sm md:text-xs font-medium bg-gray-200 text-black rounded-2xl text-center px-2 py-0.5 my-1"
                >
                  {{ bidang }}
                </div>
              </div>
            </li>
          </ul>
          <div class="card-button mt-3">
            <router-link
              :to="'/pelatihan/detailkelas/' + course.id"
              class="bg-jobhunGreen text-sm hover:bg-emerald-600 text-white px-5 py-2 rounded"
            >
              Detail Kelas
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style>
.card-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 0;
  height: 100%;
}

.card-button {
  text-align: center;
  padding: 1rem;
}
</style>