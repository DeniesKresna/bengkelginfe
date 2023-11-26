<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCourseStore } from "../../../../stores/store-course";
import { useLayoutStore } from "../../../../pages/layout/store";
import CardClass from "./CardClass.vue";
import CardExpert from "./CardExpert.vue";
import { useDataExpertStore } from "../../../../stores/store-experts";
import { isObjectEmpty } from "../../../../utils/Helper";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import ModalLogin from "./ModalUserLogin.vue";

const imgExpertJobhun =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/expert-berasal-dari.png";
const imgPartnerJobhun =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/alumni-jobhun-bekerja-di.png";

const router = useRouter();

const menuKonsultasiStore = useDataExpertStore();
const { expertFeatured } = storeToRefs(menuKonsultasiStore);
menuKonsultasiStore.getDataExpertFeatured();

const courseStore = useCourseStore();
const { coursesFeatured } = storeToRefs(courseStore);
courseStore.getDataCourseFeatured();

const layoutStore = useLayoutStore();
const isSessionEmpty = computed(() =>
  isObjectEmpty(layoutStore.sessionFirstName)
);

const isUserLogin = ref(false);

const tempNextRoute = ref("");

const openModalLogin = (nextRoute) => {
  tempNextRoute.value = nextRoute;
  isUserLogin.value = true;
};

const closeLoginModal = () => {
  isUserLogin.value = false;
  tempNextRoute.value = "";
};

const toFormulirPelatihan = () => {
  router.push("/proposalpelatihan");
};

const alurLayananKonsultasi = [
  {
    title: "Buat akun/daftarkan dirimu sebagai pengguna Jobhun",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1405.png`,
    escape: true,
  },
  {
    title: "Pilih layanan Pelatihan",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1406.png`,
    escape: true,
  },
  {
    title: "Pilih <i>expert</i> sesuai kebutuhan",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1407.png`,
    escape: true,
  },
  {
    title: "Pilih layanan “Pelatihan”",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1411.png`,
    escape: true,
  },
];

const alurLayananKonsultasi2 = [
  {
    title: "Mengisi formulir secara lengkap",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1408.png`,
    escape: true,
  },
  {
    title: "Klik “Ajukan”",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1409.png`,
    escape: true,
  },
  {
    title:
      "Pengguna akan dihubungi oleh tim Jobhun terkait ketersediaan expert dan skema pembayaran",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1410.png`,
    escape: true,
  },
];

const detaiLayananPelatihan = [
  {
    title: "Formula Khusus untuk Persiapan Karier",
    desc: "Kamu akan belajar teori berdasarkan kebutuhan industri saat ini dan praktik langsung untuk menghasilkan portofolio yang bisa menunjang karier.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-01.png`,
    escape: true,
  },
  {
    title: "Interaksi secara Langsung dengan Expert",
    desc: "Saat kelas, kamu dapat berinteraksi secara langsung dan intensif dengan <i>expert</i>. Tanya sepuasnya seputar materi sampai kamu benar-benar paham.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-02.png`,
    escape: true,
  },
  {
    title: "Portofolio Penunjang Karier",
    desc: "Hasil dari praktik yang kamu lakukan selama pelatihan dapat menjadi portofolio yang menunjang karier. Kamu juga akan mendapatkan sertifikat yang dapat digunakan saat melamar kerja.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-03.png`,
    escape: true,
  },
  {
    title: "Expert Berpengalaman & Berkualitas",
    desc: "<i>Expert</i> yang mengajar merupakan ahli profesional di bidangnya dan telah memiliki segudang pengalaman. <i>Expert</i> Jobhun juga berasal dari perusahaan-perusahaan ternama.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-04.png`,
    escape: true,
  },
  {
    title: "Biaya Terjangkau & Berbagai Pilihan Pembayaran",
    desc: "Biaya pelatihan di Jobhun memiliki harga di bawah rata-rata namun tetap berkualitas. Metode pembayaran pun dapat dilakukan di berbagai <i>platform</i> dari tunai hingga cicilan.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-05.png`,
    escape: true,
  },
];

const testimonies = ref([
  {
    name: "Rully Pramesti",
    description:
      "Terima kasih Jobhun, materinya sangat mendalam tidak seperti layanan-layanan yang lain. Benar-benar belajar dari 0 sampai yang deep. Tidak ada kritik, malah saya ingin ambil kelas lain lagi",
    mentee: "Mentee Jobhun Academy: SEO Specialist",
  },
  {
    name: "Rully Pramesti",
    description:
      "Terima kasih Jobhun, materinya sangat mendalam tidak seperti layanan-layanan yang lain. Benar-benar belajar dari 0 sampai yang deep. Tidak ada kritik, malah saya ingin ambil kelas lain lagi",
    mentee: "Mentee Jobhun Academy: SEO Specialist",
  },
  {
    name: "Rully Pramesti",
    description:
      "Terima kasih Jobhun, materinya sangat mendalam tidak seperti layanan-layanan yang lain. Benar-benar belajar dari 0 sampai yang deep. Tidak ada kritik, malah saya ingin ambil kelas lain lagi",
    mentee: "Mentee Jobhun Academy: SEO Specialist",
  },
  {
    name: "Rully Pramesti",
    description:
      "Terima kasih Jobhun, materinya sangat mendalam tidak seperti layanan-layanan yang lain. Benar-benar belajar dari 0 sampai yang deep. Tidak ada kritik, malah saya ingin ambil kelas lain lagi",
    mentee: "Mentee Jobhun Academy: SEO Specialist",
  },
  {
    name: "Rully Pramesti",
    description:
      "Terima kasih Jobhun, materinya sangat mendalam tidak seperti layanan-layanan yang lain. Benar-benar belajar dari 0 sampai yang deep. Tidak ada kritik, malah saya ingin ambil kelas lain lagi",
    mentee: "Mentee Jobhun Academy: SEO Specialist",
  },
  {
    name: "Rully Pramesti",
    description:
      "Terima kasih Jobhun, materinya sangat mendalam tidak seperti layanan-layanan yang lain. Benar-benar belajar dari 0 sampai yang deep. Tidak ada kritik, malah saya ingin ambil kelas lain lagi",
    mentee: "Mentee Jobhun Academy: SEO Specialist",
  },
]);

const settings = {
  itemsToShow: 1.5,
  snapAlign: "center",
};
const breakpoints = {
  700: {
    itemsToShow: 2.5,
    snapAlign: "center",
  },
  1024: {
    itemsToShow: 4,
    snapAlign: "start",
  },
};
</script>
<template>
  <div class="">
    <div class="px-8 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Mengapa Harus Menggunakan Layanan Ini?
        </h1>
        <div
          class="justify-center grid grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-6 items-center content-center mt-10"
        >
          <div
            class="border-gray-300 border-2 bg-transparent w-full h-full text-center p-3 rounded-md"
            style="position: relative"
            v-for="(detail, i) in detaiLayananPelatihan"
            :key="i"
          >
            <div class="py-3">
              <img :src="detail.image" class="h-20 lg:h-32 mx-auto" />
            </div>
            <div
              class="text-md font-bold text-black bottom"
              v-if="detail.hasOwnProperty('escape')"
              v-html="detail.title"
            ></div>
            <div v-else class="text-md font-bold text-black">
              {{ detail.title }}
            </div>
            <div
              class="text-md bottom"
              v-if="detail.hasOwnProperty('escape')"
              v-html="detail.desc"
            ></div>
            <div v-else class="text-md">
              {{ detail.desc }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Beberapa expert Jobhun berasal dari
        </h1>
        <div class="flex justify-center">
          <img :src="imgExpertJobhun" class="w-full px-36 mt-5" alt="" />
        </div>
        <div class="text-xl md:text-1xl text-black text-center mt-5">
          dan perusahaan ternama lainnya
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          4000+ peserta telah mengikuti pelatihan di Jobhun
        </h1>
        <div class="flex justify-center mt-5">
          <Carousel v-bind="settings" :breakpoints="breakpoints" class="p-5">
            <Slide
              v-for="(testimonie, index) in testimonies"
              :key="index"
              class="px-5"
            >
              <div
                class="px-4 py-14 rounded-md shadow-lg text-start carousel-card"
              >
                <p class="font-bold text-black">
                  {{ `"` + testimonie.description + `"` }}
                </p>
                <p class="mt-5 text-sm text-black">{{ testimonie.name }}</p>
                <p class="text-sm text-black">{{ testimonie.mentee }}</p>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Alumni pelatihan Jobhun telah bekerja di beberapa perusahaan berikut
        </h1>
        <div class="flex justify-center">
          <img :src="imgPartnerJobhun" class="w-full px-36 mt-5" alt="" />
        </div>
        <div class="text-xl md:text-1xl text-black text-center mt-5">
          dan perusahaan ternama lainnya
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Kelas apa yang kamu cari?
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
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Kelas yang Kamu Cari Tidak Ada? Pesan Kelas Privat/Grup Sesuai
          Kebutuhanmu!
        </h1>
        <div class="text-xl md:text-2xl text-black text-center mt-5">
          Alur pengajuan pelatihan di Jobhun
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-24">
          Alur Konsultasi di Jobhun
        </h1>
        <div
          class="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-6 items-center mt-10 py-5"
        >
          <div
            class="bg-transparent w-full h-full text-center p-3 rounded-md mt-10"
            style="position: relative"
            v-for="(alur, i) in alurLayananKonsultasi"
            :key="i"
          >
            <div class="my-5">
              <img :src="alur.image" class="h-20 mx-auto" />
            </div>
            <div
              class="text-md font-bold text-black bottom px-5"
              v-if="alur.hasOwnProperty('escape')"
              v-html="alur.title"
            ></div>
            <div v-else class="text-md font-bold text-black">
              {{ alur.title }}
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-6 items-center mt-10 py-5"
        >
          <div
            class="bg-transparent w-full h-full text-center p-3 rounded-md mt-10"
            style="position: relative"
            v-for="(alur, i) in alurLayananKonsultasi2"
            :key="i"
          >
            <div class="my-5">
              <img :src="alur.image" class="h-20 mx-auto" />
            </div>
            <div
              class="text-md font-bold text-black bottom px-5"
              v-if="alur.hasOwnProperty('escape')"
              v-html="alur.title"
            ></div>
            <div v-else class="text-md font-bold text-black">
              {{ alur.title }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Pilihan Expert
        </h1>
        <div class="">
          <div
            class="px-0 lg:px-8 py-8 w-full lg:max-w-5xl md:max-w-2xl mx-auto"
          >
            <div
              class="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-5 mt-10"
            >
              <div v-for="(expert, index) in expertFeatured" :key="expert">
                <CardExpert :expert="expert" v-if="index < 6" />
              </div>
            </div>
            <div
              class="text-end text-sm mt-5 lg:max-w-5xl md:max-w-2xl max-w-md"
            >
              <router-link to="/experts/cariexpert"
                >Cari experts lainnya -&gt;</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="mt-18">
        <div class="flex justify-center mx-auto">
          <button
            @click="openModalLogin('/proposalpelatihan')"
            v-if="isSessionEmpty"
            class="h-12 mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm my-auto"
            type="submit"
          >
            Ajukan
          </button>
          <button
            v-else
            @click="toFormulirPelatihan"
            class="h-12 mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm my-auto"
            type="submit"
          >
            Ajukan
          </button>
          <ModalLogin
            :isUserLogin="isUserLogin"
            @close-modal="closeLoginModal"
            :nextRoute="tempNextRoute"
          />
        </div>
      </div>
    </div>
  </div>
</template>