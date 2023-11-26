<script setup>
    import { listKerjasama } from './data';
    
</script>
<template>
    <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
        <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
            <div class="lg:w-1/2 my-auto md:mx-10">
                <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">Kerja Sama</h1>
                <p class="xl:text-xl md:text-lg text-black">
                    Jobhun telah berkolaborasi dengan 100+ perusahaan/merek/komunitas. Beberapa bentuk kerja sama di Jobhun antara lain kolaborasi konten, kolaborasi event, <i>media partner</i>, <i>company visit</i>, dan kerja sama komersial.
                </p>
            </div>
            <div class="lg:block hidden w-1/2">
                <img class="h-full w-full object-cover" loading="lazy" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner-kerja-sama.png" alt="">
            </div>
        </div>
        <div class="grid grid-col-1 auto-rows-min justify-items-center gap-12">
            <div class="grid grid-col-1 auto-rows-min justify-items-center gap-5 text-center" v-for="{url, title, desc} in listKerjasama">
                <h2 class="text-2xl md:text-3xl text-black text-center font-bold lg:-mt-10 mb-2 md:mb-4" v-if="title.includes('Konten') || title.includes('Acara') || title.includes('Capstone')" v-html="title"></h2>
                <h2 class="text-2xl md:text-3xl text-black text-center font-bold mb-2 md:mb-4" v-else v-html="title"></h2>
                <p class="text-slate-800 text-center md:w-1/2 z-10" v-html="desc"></p>
                <!-- <img class="w-24 h-24 md:w-36 md:h-36 object-cover" v-if="url.includes('unair')" :src="url" alt=""> -->
                <!-- <img class="w-full md:w-[80%] lg:-mt-20 object-cover" v-else-if="url.includes('mitra_kerja_sama') || url.includes('afiliasi') || url.includes('jobhun_visit')" :src="url" alt=""> -->
                <!-- <img class="w-full md:w-[80%] lg:-mt-20 translate-x-4 lg:translate-x-8 object-cover" v-else-if="url.includes('jobhun_expert')" :src="url" alt=""> -->
                <img class="w-full object-cover" :src="url" alt="">
            </div>
            <div class="grid grid-cols-1 gap-8 items-center">
                <h1 class="text-2xl md:text-3xl text-black text-center font-bold z-10">
                    Pengajuan Kerja Sama
                </h1>
                <p class="text-slate-800 text-center">
                    Tertarik bekerjasama dengan Jobhun? <br> 
                    Kirim proposal kerja sama melalui email <span class="text-[#48B391] underline">partnership@jobhun.id</span> atau hubungi <span class="text-[#48B391]">081252982369</span> melalui WhatsApp.
                </p>
        </div>
        </div>
    </div>
</template>