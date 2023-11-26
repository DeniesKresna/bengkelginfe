<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "../../../layout/store";
import { isObjectEmpty } from "../../../../utils/Helper";
import CardExpert from "./CardExpert.vue";
import { useDataExpertStore } from "../../../../stores/store-experts";
import { useOptionsStore } from "../../../../stores/store-options";
import ModalLogin from "./ModalUserLogin.vue";

const router = useRouter();

const layoutStore = useLayoutStore();

const menuKonsultasiStore = useDataExpertStore();
const optionStore = useOptionsStore();

const { expertFeatured } = storeToRefs(menuKonsultasiStore);
menuKonsultasiStore.getDataExpertFeatured();

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

const toFormulirUndangExpert = () => {
  router.push("/proposalundangexpert");
};

const alurLayananUndangExpert = [
  {
    title: "Buat akun/daftarkan dirimu sebagai pengguna Jobhun",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1405.png`,
    escape: true,
  },
  {
    title: "Pilih <i>expert</i> sesuai kebutuhan",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1406.png`,
    escape: true,
  },
  {
    title: 'Pada <i>popup</i> yang muncul pilih layanan "Undang Expert"',
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1407.png`,
    escape: true,
  },
  {
    title: "Isi formulir dengan lengkap",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1411.png`,
    escape: true,
  },
  {
    title: "Klik “Ajukan”",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1408.png`,
    escape: true,
  },
  {
    title:
      "Kamu akan dihubungi oleh tim Jobhun terkait ketersediaan dan skema pembayaran",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1409.png`,
    escape: true,
  },
];

const detaiLayananUndangExpert = [
  {
    title: "Expert dari Berbagai Bidang",
    desc: "Bisnis, IT, <i>public speaking</i>, <i>marketing</i>, <i>videography</i>, dan masih banyak lagi <i>expert</i> dengan latar belakang bidang profesional yang bisa kamu temukan di Jobhun. Semua <i>expert</i> Jobhun sudah dikurasi berdasarkan pengalaman yang dimiliki.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-04.png`,
    escape: true,
  },
  {
    title: "<i>Budget</i> Terbatas Bukan Masalah",
    desc: "Punya <i>budget</i> terbatas? Jangan khawatir! Kamu tetap bisa menemukan <i>expert</i> berkualitas dengan menyesuaikan <i>budget</i> yang dimiliki.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-05.png`,
    escape: true,
  },
  {
    title: "Mudah, Tak Perlu Hubungi <i>Expert</i>",
    desc: "Sulit menghubungi <i>expert</i> yang diinginkan? Cukup konsultasikan kualifikasi apa saja yang dibutuhkan dan Jobhun akan membantumu terhubung dengan <i>expert</i> yang sesuai!",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-09.png`,
    escape: true,
  },
];

const portfolios = [
  {
    title: "Penyediaan Expert untuk Pelatihan di Sinar Muda Indonesia",
    desc: `Sinar Muda Indonesia adalah salah satu Lembaga Pendidikan dan Pengembangan Profesi yang merumuskan jurusan dan kurikulum terbarukan, untuk menghasilkan lulusan yang mampu memenuhi tuntutan dan peluang dunia kerja terkini. <br><br>
            Jobhun bekerjasama dengan Sinar Muda Indonesia dalam menyediakan berbagai mentor di bidang kreatif dan digital, seperti <i>copywriting</i>, <i>digital marketing</i>, <i>videography</i>, <i>public speaking</i>, dan lainnya.`,
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Sinar-Muda-Indonesia.png`,
    escape: true,
  },
  {
    title: "Penyedia Expert untuk Kuliah Umum di Universitas Ciputra",
    desc: "Bekerjasama dengan Universitas Ciputra, Jobhun menyediakan berbagai mentor bisnis untuk beberapa program di Universitas Ciputra, seperti <i>mentoring</i> bisnis, kompetisi bisnis, dan webinar.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/uc.png`,
    escape: true,
  },
  {
    title: "Penyedia Expert untuk Kuliah Umum di Universitas Kristen Petra",
    desc: "Bekerjasama dengan Universitas Kristen Petra, Jobhun menyediakan berbagai mentor bisnis untuk beberapa kursus bisnis.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/uk-petra.png`,
    escape: true,
  },
  {
    title: "Perancang dan Penyedia Expert untuk Pelatihan di StudentsxCEOs",
    desc: 'Bekerjasama dengan StudentsxCEO Jawa Timur, Jobhun menyelenggarakan "SxC Academy" untuk topik-topik seperti <i>UI/UX Designer</i>, <i>Business Development</i>, dan <i>Digital Marketing</i>. Jobhun menyediakan silabus dan mentor untuk program ini.',
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/studentxceohitam.png`,
    escape: true,
  },
];

const isMobile = ref(false);

function checkIfMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});
</script>
<template>
  <div class="">
    <div class="px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Mengapa Harus Menggunakan Layanan Ini?
        </h1>
        <div
          class="grid grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-6 items-center mt-10"
        >
          <div
            class="border-gray-300 border-2 bg-transparent w-full h-full text-center p-3 rounded-md"
            style="position: relative"
            v-for="(detail, i) in detaiLayananUndangExpert"
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
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-24">
          Alur Mengundang Expert di Jobhun
        </h1>
        <div
          class="grid grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-6 items-center mt-10 py-5"
        >
          <div
            class="bg-transparent w-full h-full text-center p-3 rounded-md mt-10"
            style="position: relative"
            v-for="(alur, i) in alurLayananUndangExpert"
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
        <h1 class="text-xl md:text-2xl text-black text-center font-bold mt-20">
          Portofolio
        </h1>
        <div
          class="grid grid-cols-1 xl:grid-cols-1 md:grid-cols-1 gap-6 items-center mt-10"
        >
          <div
            class="border-gray-300 border-2 bg-transparent w-full p-3 rounded-md flex flex-col"
            style="position: relative"
            v-for="(portfolio, i) in portfolios"
            :key="i"
          >
            <div class="flex items-center p-5">
              <div class="w-56" v-if="!isMobile">
                <img :src="portfolio.image" class="h-18 lg:h-28" />
              </div>
              <div class="w-full text-center md:text-start">
                <img
                  :src="portfolio.image"
                  class="mx-auto h-32"
                  v-if="isMobile"
                />
                <p
                  class="text-md font-bold text-black bottom flex justify-center md:justify-start"
                  v-if="portfolio.hasOwnProperty('escape')"
                  v-html="portfolio.title"
                ></p>
                <p v-else class="text-md font-bold text-black">
                  {{ portfolio.title }}
                </p>
                <p
                  class="text-md bottom"
                  v-if="portfolio.hasOwnProperty('escape')"
                  v-html="portfolio.desc"
                ></p>
                <p v-else class="text-md">
                  {{ portfolio.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <h1 class="text-xl md:text-2xl text-black text-center font-bold mt-24">
          Klien Kami
        </h1>
        <div class="flex justify-center -mx-32 md:mx-0">
          <img
            src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Logo-Web-Baru-04.jpg"
            alt="Logo Klien"
            class="h-full"
          />
        </div>
      </div>
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-18">
          Pilih Expert
        </h1>
        <div class="">
          <div
            class="px-0 lg:px-8 py-8 w-full lg:max-w-5xl md:max-w-2xl mx-auto"
          >
            <div
              class="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 mt-10"
            >
              <div v-for="(expert, index) in expertFeatured" :key="expert">
                <CardExpert :expert="expert" v-if="index < 6" />
              </div>
            </div>
            <div class="text-end text-sm mt-5">
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
            @click="openModalLogin('/proposalundangexpert')"
            v-if="isSessionEmpty"
            class="h-12 mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm my-auto"
            type="submit"
          >
            Ajukan
          </button>
          <button
            v-else
            @click="toFormulirUndangExpert"
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
<style>
</style>