<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "../../../layout/store";
import { isObjectEmpty } from "../../../../utils/Helper";
import CardExpert from "./CardExpert.vue";
import { useDataExpertStore } from "../../../../stores/store-experts";
import { useOptionsStore } from "../../../../stores/store-options";
import ModalLogin from "./ModalUserLogin.vue";

const router = useRouter();
const route = useRoute();

const layoutStore = useLayoutStore();
const session = computed(() => layoutStore.session);

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

const toFormulirRekrutExpert = () => {
  router.push("/proposalrekrutexpert");
};

const alurLayananKonsultasi = [
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
    title: 'Pada <i>popup</i> yang muncul pilih layanan "Rekrut Expert"',
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

const detaiLayananRekrutExpert = [
  {
    title: "<i>Expert</i> dengan Berbagai <i>Skill</i>",
    desc: "<i>Expert</i> Jobhun adalah talenta terpilih yang ahli dalam bidangnya. Temukan <i>expert</i> sesuai dengan <i>skill</i> yang dibutuhkan untuk mengerjakan proyek, seperti <i>digital marketing</i>, <i>finance</i>, fotografi, dan masih banyak lagi.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-04.png`,
    escape: true,
  },
  {
    title: "Negosiasi <i>Fee</i> Sesuai Anggaran Perusahaan",
    desc: "Punya anggaran tertentu untuk merekrut? Konsultasikan dengan Jobhun dan dapatkan talenta berkualitas serta ahli dibidangnya sesuai dengan anggaran perusahaan.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-05.png`,
    escape: true,
  },
  {
    title: "Rekrut Tanpa Repot",
    desc: "Hemat waktu dan tenaga dengan rekrut <i>expert</i> melalui Jobhun. Diskusikan kebutuhan perusahaan dan biarkan Jobhun yang melakukan semua proses perekrutan hingga mendapatkan talenta yang tepat.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-07.png`,
    escape: true,
  },
  {
    title: "Antisipasi Risiko Bad <i>Hire</i>",
    desc: "Jobhun memastikan talenta yang direkrut memiliki kemampuan sesuai dengan ekspektasi perusahaan agar dapat menyelesaikan pekerjaan secara berkualitas.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-10.png`,
    escape: true,
  },
];

const portfolios = [
  {
    title:
      "Penyaluran Expert untuk Proyek di Pruf Communications Hub x Sequoia Capital",
    desc: "Pruf Ritz—agensi di bidang bahasa dan terjemahan—bermitra dengan Jobhun untuk menyediakan talenta digital untuk beberapa proyek. Jobhun menyediakan talenta digital di bidang desainer grafis yang mampu membuat proyek desain untuk klien Pruf Ritz.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/prufritz.png`,
    escape: true,
  },
  {
    title: "Penyaluran Expert untuk Proyek di Substitute Makerspace",
    desc: "Substitute Makerspace merekrut talenta yang bisa mengembangkan website sederhana dalam bentuk <i>landing page</i> dan mendesain katalog pameran. Jobhun membantu Substitute Makerspace untuk menemukan talenta terbaik yang merupakan alumni dari program Jobhun.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/substitute.png`,
    escape: true,
  },
  {
    title: "Penyaluran Expert untuk Pekerjaan Full Time di IDN Media",
    desc: "Bercita-cita memiliki karier sebagai penulis, Naufal yang menempuh pendidikan Sosiologi mengambil kelas <i>Content Writer</i> di Jobhun untuk meningkatkan kemampuan menulisnya dan mendapatkan sertifikasi. Melalui kelas itu, Naufal memiliki portofolio menulis di IDN Times yang diajarkan oleh mentor Jobhun dari IDN Times. Setelah lulus dari Jobhun Academy: Content Writer pada Agustus 2019, Naufal mendapatkan pekerjaan penuh waktu pertamanya sebagai Penulis Kreatif. Saat ini, Naufal menjadi Community Editor di IDN Media.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/IDN-Media.png`,
    escape: true,
  },
];
</script>
<template>
  <div class="">
    <div class="px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Mengapa Harus Menggunakan Layanan Ini?
        </h1>
        <div
          class="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-6 items-center mt-10"
        >
          <div
            class="border-gray-300 border-2 bg-transparent w-full h-full text-center p-3 rounded-md"
            style="position: relative"
            v-for="(detail, i) in detaiLayananRekrutExpert"
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
          Alur Rekrut Expert di Jobhun
        </h1>
        <div
          class="grid grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-6 items-center mt-10 py-5"
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
              <div class="w-56">
                <img :src="portfolio.image" class="h-18 lg:h-28" />
              </div>
              <div class="w-full">
                <p
                  class="text-md font-bold text-black bottom flex"
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
          Mitra yang pernah bekerjasama
        </h1>
        <div class="flex justify-center -mx-24 md:mx-0">
          <img
            src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Logo-Web-Baru-05.png"
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
              class="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-6 mt-108"
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
            @click="openModalLogin('/proposalrekrutexpert')"
            v-if="isSessionEmpty"
            class="h-12 mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm my-auto"
            type="submit"
          >
            Ajukan
          </button>
          <router-link
            v-else
            to="/proposalrekrutexpert"
            class="mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 py-3 rounded text-sm my-auto"
            >Ajukan</router-link
          >
          <!-- <button v-else @click="toFormulirRekrutExpert"
                        class="h-12 mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 rounded text-sm my-auto"
                        type="submit">
                        Ajukan
                    </button> -->
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