<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "../../../../pages/layout/store";
import { isObjectEmpty } from "../../../../utils/Helper";
import CardExpert from "./CardExpert.vue";
import { useDataExpertStore } from "../../../../stores/store-experts";
import { useOptionsStore } from "../../../../stores/store-options";
import AccordionCustom from "./AccordionCustom.vue";
import { bidang } from "../../../../utils/Constants";
import ModalLogin from "./ModalUserLogin.vue";

const router = useRouter();

const layoutStore = useLayoutStore();
const menuKonsultasiStore = useDataExpertStore();

const dataAccordion = [
  {
    title: "Siapa saja yang bisa mendaftar konsultasi?",
    desc: "Siapapun bisa mendaftar. Kamu dapat memilih expert yang sesuai dengan kebutuhanmu.",
  },
  {
    title: "Apa saja topik yang dapat didiskusikan?",
    desc: "Kamu dapat mendiskusikan berbagai topik sesuai kebutuhanmu. Selain topik pengembangan karier secara umum, kamu juga bisa membahas materi spesifik sesuai permasalahan yang kamu alami.",
  },
  {
    title: "Apa saja yang bisa dibahas di sesi konsultasi?",
    desc: "Kamu bebas memilih untuk membahas materi secara teori, praktik, studi kasus, hingga <i>tools</i> dengan topik yang kamu inginkan. Jika masih bingung dengan topik dan mentor yang sesuai, kamu juga bisa menghubungi tim Jobhun untuk mendapatkan rekomendasi.",
    escape: "true",
  },
  {
    title: "Tools apa yang dibutuhkan dalam pelaksanaan konsultasi?",
    desc: "Saat pelaksanaan konsultasi, peserta dan expert menggunakan platform Zoom untuk melakukan video conference.",
  },
  {
    title: "Kapan sesi konsultasi dilaksanakan?",
    desc: "Sesi konsultasi dilaksanakan sesuai dengan permintaan peserta. Kamu bisa melihat ketersediaan waktu konsultasi dari expert melalui deskripsi mentor di halaman profil. Kamu dapat menyesuaikannya dengan jadwalmu.",
  },
  {
    title: "Apakah sesi konsultasi dapat dipindahkan jadwalnya?",
    desc: "Peserta boleh mengajukan pindah jadwal selama satu kali dengan catatan diinformasikan pada tim Jobhun maksimal 2 hari sebelum sesi konsultasi, kemudian menunggu expert menyetujui perubahan tersebut.",
  },
  {
    title: "Apakah boleh mendaftar konsultasi dengan dua expert sekaligus?",
    desc: "Kamu boleh mendaftar sesi konsultasi dengan jumlah expert tidak terbatas. Tetapi kamu tidak bisa melakukan sesi konsultasi dengan dua expert dalam satu sesi konsultasi yang sama.",
  },
  {
    title:
      "Apakah boleh mendaftar konsultasi dengan teman/grup untuk mengikuti sesi konsultasi yang sama?",
    desc: "Kamu diperbolehkan untuk mengajukan permintaan ini kepada tim Jobhun. Jelaskan kebutuhan ini pada Customer Service kami.",
  },
  {
    title: "Apakah boleh refund jika sudah melakukan pembayaran?",
    desc: "Biaya yang telah dibayarkan tidak bisa dikembalikan, kecuali sesi konsultasi dibatalkan dari pihak Jobhun. Proses refund akan berlangsung maksimal 14 hari kerja.",
  },
];

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
    title: 'Pada <i>popup</i> yang muncul pilih layanan "Konsultasi"',
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1407.png`,
    escape: true,
  },
  {
    title: "Mengisi formulir secara lengkap",
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
      "Pengguna akan dihubungi oleh tim Jobhun terkait ketersediaan  dan skema pembayaran",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Group-1409.png`,
    escape: true,
  },
];

const detaiLayananKonsultasi = [
  {
    title: "Konsultasi Eksklusif Tanpa Batas",
    desc: "Kamu bebas melakukan konsultasi secara privat/grup dengan <i>expert</i> pilihan yang berpengalaman. Tanyakan hal-hal yang ingin kamu ketahui seputar karier dan dapatkan jawaban yang kredibel dan solutif.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-06.png`,
    escape: true,
  },
  {
    title: "Bebas Pilih Expert Sesuai Rencana Kariermu",
    desc: "Jobhun menghadirkan <i>expert</i> dari berbagai bidang dan industri agar kamu bisa memilih sesuai dengan rencana karier impianmu.",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-07.png`,
    escape: true,
  },
  {
    title: "Fleksibilitas Waktu dan Materi",
    desc: "Konsultasi akan dilakukan melalui <i>platform video conference</i> sesuai dengan waktu yang telah kamu tentukan. Diskusikan berbagai hal dari teori, praktik, penggunaan <i>tools</i>, studi kasus, hingga tips berkarier seperti para <i>expert</i>!",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-08.png`,
    escape: true,
  },
  {
    title: "Expert yang Berpengalaman dan Memiliki Kompetensi",
    desc: "Dapatkan <i>expert</i> yang bersedia memandumu meraih jalan sukses sesuai dengan aspirasi kariermu. Jadilah lebih percaya diri!",
    image: `https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/UX-illustration-Jobhun-04.png`,
    escape: true,
  },
];

const userExperience = {
  desc: `Bela merupakan <i>fresh graduate</i> yang ingin berkarier sebagai Content Writer di startup. 
    Ia merupakan lulusan Sistem Informasi. Minhun memberikan rekomendasi pada Bela untuk melakukan 
    konsultasi dengan salah satu Content Writer di startup untuk mengetahui lebih dalam <i>role</i> pekerjaan 
    impiannya, hingga bagaimana cara membangun karier di bidang tersebut. Minhun juga merekomendasikan 
    Bela untuk mentoring dengan expert berlatar belakang UX Writer untuk mengecek potensi belajar menulis 
    di aplikasi/platform digital yang masih relevan dengan ilmu yang dipelajari Bela di bangku kuliah. 
    Setelah mengikuti kedua mentoring tersebut, Bela memutuskan untuk mencoba keduanya. Minhun memberikan 
    Bela rekomendasi untuk melakukan mentoring dengan HR di startup dan melakukan review CV, portfolio, 
    hingga tips untuk membangun karier. Sekarang Bela sudah bekerja menjadi UX Writer di salah satu startup di Indonesia.`,
  name: "Bella, Fresh Graduate",
  escape: true,
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
          class="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-2 gap-6 items-center mt-10"
        >
          <div
            class="border-gray-300 border-2 bg-transparent w-full h-full text-center p-3 rounded-md"
            style="position: relative"
            v-for="(detail, i) in detaiLayananKonsultasi"
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
          Alur Konsultasi di Jobhun
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
      <hr class="mt-14 mb-10" />
      <div>
        <h1 class="text-xl md:text-2xl text-black text-center font-bold">
          Jumlah Expert Saat Ini
        </h1>
        <h1 class="text-xl md:text-5xl text-black text-center font-bold">
          322
        </h1>
        <h1 class="text-xl md:text-2xl text-black text-center font-bold mt-10">
          Bidang yang bisa dipilih
        </h1>
      </div>
      <div class="mt-10">
        <div class="grid lg:grid-cols-4 grid-cols-2">
          <span v-for="(bidang, i) in bidang" :key="i" class="">
            {{ bidang }}
          </span>
        </div>
      </div>
      <hr class="mt-14 mb-10" />
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Pengalaman Pengguna Setelah Konsultasi di Jobhun
        </h1>
        <div class="items-center mt-10">
          <div
            class="border-gray-300 border-2 bg-transparent w-full h-full p-7 rounded-md"
            style="position: relative"
          >
            <div class="">
              <img
                src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/ICON-12.png"
                class="h-20 items-start -mt-16"
              />
            </div>
            <div class="ml-20">
              <div
                class="text-md text-black bottom"
                v-if="userExperience.hasOwnProperty('escape')"
                v-html="userExperience.desc"
              ></div>
              <div class="text-md text-black bottom" v-else>
                <p>{{ userExperience.desc }}</p>
              </div>
              <div class="font-bold text-black text-md mt-2">
                {{ userExperience.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-14 mb-10" />
      <div>
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Pilih Expert
        </h1>
        <div class="">
          <div
            class="px-0 lg:px-8 py-8 w-full lg:max-w-5xl md:max-w-2xl max-w-md mx-auto"
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
      <hr class="mt-14 mb-10" />
      <div class="mb-10">
        <h1 class="text-2xl md:text-3xl text-black text-center font-bold mt-14">
          Pertanyaan yang Sering Diajukan
        </h1>
        <div class="mt-10">
          <AccordionCustom v-for="(data, index) in dataAccordion" :key="index">
            <template v-slot:title>
              <span class="text-md text-black font-medium text-start">
                {{ data.title }}
              </span>
            </template>
            <template v-slot:content>
              <p
                class="text-sm text-black"
                v-if="data.hasOwnProperty('escape')"
                v-html="data.desc"
              ></p>
              <p class="text-sm text-black" v-else>
                {{ data.desc }}
              </p>
            </template>
          </AccordionCustom>
        </div>
      </div>
      <div class="">
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
            to="/proposalkonsultasi"
            class="mt-5 items-center bg-jobhunGreen hover:bg-emerald-600 text-white px-7 py-3 rounded text-sm my-auto"
            >Ajukan</router-link
          >
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