<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Rating from "../../../../components/Ratings.vue";
import ModalCariExpert from "../../../Homepage/ModalLayananExpert.vue";
import { serviceMap } from "../../../../utils/DataHelper";

const router = useRouter();

const props = defineProps({
  expert: {
    type: Object,
    required: true,
  },
});

const { expert } = props;

const isPreviewMentor = ref(false);

const openPreviewMentor = () => {
  isPreviewMentor.value = true;
};
</script>
<template>
  <router-link :to="'/experts/detailexpert/' + expert.id">
    <div
      class="col-span-full md:col-span-6 xl:col-span-4 bg-white shadow-lg hover:shadow-xl rounded-sm border border-slate-200 xs:max-w-xs xs:mx-auto"
    >
      <div class="flex flex-col h-full">
        <img class="w-full h-full" :src="expert.image" />
        <div class="p-5">
          <div class="">
            <header class="mb-3">
              <router-link
                class="text-lg md:text-sm xl:text-xl text-slate-800 font-semibold truncate"
                :to="'/experts/detailexpert/' + expert.id"
                style="
                  display: block;
                  text-overflow: ellipsis;
                  width: 100%;
                  overflow: hidden;
                  white-space: nowrap;
                "
              >
                {{ expert.name }}
              </router-link>
              <!-- <ModalCariExpert :isPreviewMentor="isPreviewMentor" :expertID="expert.id" :service="expert.available_services"
                            @close-modal="isPreviewMentor = false" /> -->
            </header>
            <ul class="text-sm space-y-2 mb-5">
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192c0-44.2-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80s80-35.8 80-80zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"
                  />
                </svg>
                <p class="truncate">{{ expert.profession }}</p>
              </li>
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15 15V5l-5-5H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h12c.6 0 1-.4 1-1zM3 2h6v4h4v8H3V2z"
                  />
                </svg>
                <a class="space-x-1 line-clamp-1 hover:line-clamp-none">
                  <div
                    v-for="bidang in expert.sectors"
                    :key="bidang"
                    class="inline-flex text-sm md:text-xs font-medium bg-emerald-100 text-jobhunGreen rounded-md text-center px-2 py-0.5 my-1"
                  >
                    {{ bidang }}
                  </div>
                </a>
              </li>
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM96 128H0V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128zM48 352c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V128H544zm64 208c0 8.8-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16z"
                  />
                </svg>
                <a class="space-x-1 line-clamp-1 hover:line-clamp-none">
                  <div
                    v-for="service in expert.available_services"
                    :key="service"
                    class="inline-flex text-sm md:text-xs font-medium bg-emerald-100 text-jobhunGreen rounded-md text-center px-2 py-0.5 my-1"
                  >
                    {{ serviceMap[service] }}
                  </div>
                </a>
              </li>
            </ul>
            <Rating :ratingValues="expert.star" />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>