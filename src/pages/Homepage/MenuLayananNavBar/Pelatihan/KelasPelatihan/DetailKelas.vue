<script setup>
import { storeToRefs } from "pinia";
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import IconLove from "../../../../../partials/icons/icon-love.vue";
import IconShare from "../../../../../partials/icons/icon-share.vue";
import { useCourseStore } from "../../../../../stores/store-course";
import { useLayoutStore } from "../../../../layout/store";
import { formatCurrency } from "../../../../../utils/Helper";
import ModalLogin from "../../../../Experts/DetailExpert/ModalIsUserLogin.vue";
import {
  isVariableEmpty,
  copyLinkToClipboard,
  capitalizeWord,
  isObjectEmpty,
} from "../../../../../utils/Helper";
import SkeletonLoading from "./SkeletonLoading.vue";

const route = useRoute();
const id = route.params.id;

const courseStore = useCourseStore();

const { prodKelasReguler } = storeToRefs(courseStore);

// taken from Expert/detailexpert/layanan
const tempNextRoute = ref("");

const layoutStore = useLayoutStore();
const { session, sessionFirstName } = storeToRefs(layoutStore);

let isSessionEmpty = computed(() => {
  const token = localStorage.getItem("token");
  return token !== null;
});

const sessionPayment = computed(() =>
  isObjectEmpty(layoutStore.sessionFirstName)
);

const isUserLogin = ref(false);

const openModalLogin = (nextRoute) => {
  tempNextRoute.value = nextRoute;
  isUserLogin.value = true;
};

const closeLoginModal = () => {
  isUserLogin.value = false;
  tempNextRoute.value = "";
  isLoading.value = false;
  isLoading2.value = false;
};
// payment method
const isLoading = ref(false);

const toPayment = async () => {
  isLoading.value = true;
  if (sessionPayment.value) {
    openModalLogin("/pelatihan/detailkelas/" + prodKelasReguler.value.id);
    return;
  } else {
    isLoading.value = false;
  }
  isLoading.value = true;
  const courseResponse = await courseStore.createPayment(
    prodKelasReguler.value.code
  );
  if (courseResponse != "") {
    window.location.replace(courseResponse);
    return;
  }
  isLoading.value = false;
};

// copy link
const copiedLink = ref(false);
const copyButtonText = computed(() =>
  copiedLink.value ? "Link Tersalin!" : "Bagikan"
);
const buttonStyle = computed(() =>
  copiedLink.value ? "bg-jobhunGreen text-white" : "hover:bg-gray-100"
);

const copyLink = () => {
  copyLinkToClipboard();
  copiedLink.value = true;
  setTimeout(() => {
    copiedLink.value = false;
  }, 2000);
};

const isInterest = ref(prodKelasReguler.value.interest);

const isLoading2 = ref(false);

const toggleInterest = async (id) => {
  try {
    isLoading2.value = true;
    if (sessionPayment.value) {
      openModalLogin("/pelatihan/detailkelas/" + prodKelasReguler.value.id);
      return;
    } else {
      isLoading2.value = false;
    }
    if (prodKelasReguler.value.interest === true) {
      await courseStore.notInterestCourse(id);
      console.log("Materi ini tidak menjadi favorit lagi.");
    } else {
      await courseStore.interestCourse(id);
      console.log("Materi ini menjadi favorit!");
    }
    isInterest.value = !isInterest.value;
    await loadData();
    isLoading.value = false;
  } catch (error) {
    console.error("Error:", error);
  }
};

watch(
  () => prodKelasReguler.value.interest,
  (newValue) => {
    isInterest.value = newValue;
  }
);

const isLoadingSkeleton = ref(false);

const loadData = async () => {
  if (isSessionEmpty.value) {
    isLoadingSkeleton.value = true;
    const courseResponse = await courseStore.getDataCoursePublishedByIDInterest(
      id
    );
    if (courseResponse != null) {
      prodKelasReguler.value = courseResponse;
      isInterest.value = courseResponse.interest;
    }
    isLoadingSkeleton.value = false;
  } else {
    isLoadingSkeleton.value = true;
    const courseResponse = await courseStore.getDataCoursePublishedByID(id);
    if (courseResponse != null) {
      prodKelasReguler.value = courseResponse;
      isInterest.value = courseResponse.interest;
    }
    isLoadingSkeleton.value = false;
  }
};

onMounted(async () => {
  await loadData();
});
</script>
<template>
  <!-- <div v-if="isLoadingSkeleton">
    <SkeletonLoading />
  </div> -->
  <div>
    <div class="px-4 sm:px-6 lg:mx-28 md:mx-20 pt-8 lg:pt-10 flex">
      <div class="text-black pl-10">
        <p class="font-bold text-2xl">
          {{ capitalizeWord(prodKelasReguler.program) }}:
        </p>
        <p class="text-3xl font-bold">
          {{ prodKelasReguler.name }}
        </p>
      </div>
    </div>
    <div class="justify-center px-4 sm:px-6 lg:mx-28 md:mx-20 flex">
      <div class="w-full sm:grid sm:grid-cols-1 lg:grid-cols-2 p-5">
        <div class="p-5">
          <img
            :src="prodKelasReguler.image_url"
            alt=""
            class="rounded-xl w-full"
          />
        </div>
        <div class="p-5">
          <div class="border-2 border-gray-300 p-10 rounded-xl">
            <div class="text-black">
              <p class="font-bold text-md text-3xl">
                {{ formatCurrency(prodKelasReguler.price) }}
              </p>
              <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                <button
                  v-if="!isLoading"
                  @click="toPayment"
                  class="mt-5 flex justify-center bg-jobhunGreen hover:bg-emerald-600 text-white p-2 rounded-xl text-sm text-center mx-2 cursor-pointer"
                >
                  <span class="my-auto"> Daftar </span>
                </button>
                <button
                  v-if="isLoading"
                  class="mt-5 flex justify-center bg-jobhunGreen hover:bg-emerald-600 text-white p-2 rounded-xl text-sm text-center mx-2 cursor-pointer"
                >
                  <span class="loader"></span>
                </button>
                <button
                  v-if="!isLoading2"
                  @click="toggleInterest(id)"
                  class="mt-5 flex justify-center border-gray-300 hover:bg-gray-100 border-2 p-2 rounded-xl text-sm mx-2"
                >
                  <div class="my-auto">
                    <IconLove
                      class="text-black w-5 h-5 my-auto mx-1"
                      :class="{
                        'fill-red-500': isInterest,
                        'text-black': !isInterest,
                      }"
                    />
                  </div>
                  <div class="my-auto">
                    {{ isInterest ? "Hapus Tertarik" : "Tertarik" }}
                  </div>
                </button>
                <button
                  v-if="isLoading2"
                  class="mt-5 flex justify-center border-gray-300 bg-gray-300 border-2 p-2 rounded-xl text-sm mx-2"
                >
                  <span class="loader"></span>
                </button>
                <button
                  class="mt-5 flex justify-center border-gray-300 border-2 p-2 rounded-xl text-sm mx-2"
                  :class="buttonStyle"
                  @click="copyLink"
                >
                  <div class="my-auto" v-if="!copiedLink">
                    <IconShare class="text-black w-4 my-auto mx-1" />
                  </div>
                  <div class="my-auto">{{ copyButtonText }}</div>
                </button>
              </div>
              <div class="mt-5">
                <div class="flex flex-wrap items-center gap-1">
                  <a class="space-x-1">
                    <div
                      class="inline-flex rounded-2xl px-4 py-1 border-[1px] border-solid border-gray-200"
                    >
                      {{ prodKelasReguler.type }}
                    </div>
                  </a>
                  <a class="space-x-1">
                    <div
                      v-for="sector in prodKelasReguler.sectors"
                      :key="sector"
                      class="inline-flex rounded-2xl px-4 py-1 my-1 border-[1px] bg-gray-200"
                    >
                      {{ sector }}
                    </div>
                  </a>
                </div>
              </div>
              <div class="mt-5">
                <div v-html="prodKelasReguler.facility"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="justify-center px-8 sm:px-6 lg:mx-28 md:mx-20 pt-8 lg:pt-10">
      <div class="text-center">
        <span class="font-bold text-2xl text-black"> Detail kelas </span>
      </div>
      <div class="mt-5" v-html="prodKelasReguler.detail"></div>
    </div>
    <div class="justify-center px-8 sm:px-6 lg:mx-28 md:mx-20 pt-10 lg:pt-16">
      <div class="text-center">
        <span class="font-bold text-2xl text-black">
          Expert yang akan mengajar
        </span>
      </div>
      <div class="flex justify-center mt-9">
        <div
          class="w-3/5 grid justify-center grid-cols-1 lg:grid-cols-[repeat(2,max-content)] gap-8"
        >
          <div class="">
            <img
              :src="prodKelasReguler.expert_image"
              alt=""
              class="rounded-full w-64 mx-auto"
            />
          </div>
          <div class="text-center items-center xs:mt-5 md:mt-5 nama-expert">
            <span class="text-black font-bold text-xl">
              {{ prodKelasReguler.expert_name }}
            </span>
            <br />
            <span
              v-if="
                prodKelasReguler.expert_experiences &&
                prodKelasReguler.expert_experiences.length > 0
              "
            >
              {{ prodKelasReguler.expert_experiences[0].title }}
            </span>
            <span v-else> - </span>
          </div>
        </div>
      </div>
    </div>
    <ModalLogin
      :isUserLogin="isUserLogin"
      @close-modal="closeLoginModal"
      :nextRoute="tempNextRoute"
    />
  </div>
</template>
<style>
.nama-expert {
  align-self: center;
}
</style>