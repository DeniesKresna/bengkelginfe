<script setup>
const tim =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/tim.jpg";
const jatim =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/jatim.png";
const surabaya =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/surabaya.png";
const yelp =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/yelp.png";
const womenpreneur =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/womenpreneur.png";
const basha =
  "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/basha.png";

class Pencapaian {
  constructor(url, desc) {
    this.url = url;
    this.desc = desc;
  }
}
const achievements = [
  new Pencapaian(
    jatim,
    'Penghargaan "Pemuda Pelopor" untuk Kategori Pengembangan Skill di Provinsi Jawa Timur pada tahun 2021'
  ),
  new Pencapaian(
    surabaya,
    'Penghargaan "Pemuda Utama" untuk Kategori IT di Provinsi Jawa Timur pada tahun 2022'
  ),
  new Pencapaian(
    yelp,
    'Awardee "Youth Economic Leadership Program 2022" dari Bank Indonesia Institute'
  ),
  new Pencapaian(
    womenpreneur,
    'Penghargaan "9 Womenpreneur Berkarya" oleh Lenovo Indonesia x Putri Tanjung'
  ),
  new Pencapaian(
    basha,
    '1 dari 14 entrepreneur Jawa Timur dalam kampanye "Pemuda Pembawa Perubahan" oleh Basha Market x Dekranasda Jawa Timur'
  ),
];
</script>
<template>
  <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
    <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
      <div class="lg:w-1/2 my-auto md:mx-10">
        <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">
          Tentang Jobhun
        </h1>
        <p class="xl:text-xl md:text-lg text-black">
          Jobhun adalah platform penyedia experts terbaik untuk berbagai macam
          kebutuhan pengembangan karier. Jobhun memiliki beragam layanan
          andalan. Mulai dari konsultasi, pelatihan, mengundang experts, hingga
          perekrutan experts.
        </p>
      </div>
      <div class="lg:block hidden w-1/2">
        <img
          class="h-full w-full object-cover"
          loading="lazy"
          src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/tentang-jobhun-banner.png"
          alt=""
        />
      </div>
    </div>
    <div class="lg:mx-24">
      <h2 class="text-2xl md:text-3xl text-black text-center font-bold mb-10">
        Sejarah Jobhun
      </h2>
      <p class="text-slate-800 text-center">
        Jobhun awalnya merupakan platform penyedia lowongan kerja di 2015,
        kemudian kini berubah menjadi platform penyedia experts terbaik untuk
        berbagai kebutuhan pengembangan karier. Pada 2020, resmi menjadi PT
        Jobhun Membangun Indonesia.
      </p>
    </div>
    <div>
      <h2 class="text-2xl md:text-3xl text-black text-center font-bold mb-10">
        Pencapaian
      </h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-[60vw] justify-center gap-10 mt-5"
      >
        <div
          class="grid grid-cols-[1fr] md:grid-cols-[max-content_1fr] justify-center justify-items-center md:justify-items-stretch items-center text-center md:text-left gap-4 md:gap-6 p-5 border-2 border-solid border-gray-300 rounded-md"
          v-for="(achievement, index) in achievements"
          :key="index"
        >
          <img
            class="h-32 lg:h-28"
            loading="lazy"
            :src="achievement.url"
            alt=""
          />
          <p class="text-black text-md">{{ achievement.desc }}</p>
        </div>
      </div>
    </div>
    <div>
      <h2
        class="text-2xl md:text-3xl text-black text-center font-bold mb-10 relative z-10"
      >
        Dukungan Inkubasi
      </h2>
      <img
        class="-mt-4 md:-mt-20"
        loading="lazy"
        src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/companies.png"
        alt=""
      />
    </div>
    <div class="px-4 md:px-12 flex justify-center">
      <img class="rounded-md w-[64.25rem]" loading="lazy" :src="tim" alt="" />
    </div>
  </div>
</template>