<script setup>
    import { listProblemB2B, listSolusiB2B } from './dataSolusiB2B';
</script>
<template>
    <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
        <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
            <div class="lg:w-1/2 my-auto md:mx-10">
                <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">Solusi dari Jobhun untuk Berbagai Kebutuhan Perusahaan</h1>
                <p class="xl:text-xl md:text-lg text-black">
                    Bangun proses tumbuh kembang perusahaanmu bersama Jobhun yang menyediakan beberapa program yang berkaitan dengan pengembangan karier, mulai dari pelatihan hingga penyediaan <i>expert</i> terbaik yang sudah berpengalaman dibidangnya.
                </p>
            </div>
            <div class="lg:block hidden w-1/2">
                <img class="h-full w-full object-cover" loading="lazy" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/solusi-b2b-banner.png" alt="">
            </div>
        </div>
        <div class="grid grid-cols-1 gap-8 items-center">
            <h1 class="text-2xl md:text-3xl text-black text-center font-bold">
                Ingin Upgrade dan Mengembangkan Kualitas Perusahaan Anda?
            </h1>
            <p class="text-slate-800 text-center">Beberapa permasalahan dalam perusahaan saat ini</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div class="flex flex-col gap-4 items-center text-center px-6 py-4 border-3 border-solid border-gray-200 rounded-md" v-for="{title, desc} in listProblemB2B">
                    <h1 class="text-black text-md md:text-xl font-bold" v-html="title"></h1>
                    <p class="text-md text-black" v-html="desc"></p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-8 items-center">
            <h1 class="text-2xl md:text-3xl text-black text-center font-bold">
                Program Terbaik Jobhun untuk Perusahaan
            </h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div class="flex flex-col gap-4 items-center text-center px-6 py-4 border-3 border-solid border-gray-200 rounded-md" v-for="{title, desc} in listSolusiB2B">
                    <h1 class="text-black text-md md:text-xl font-bold" v-html="title"></h1>
                    <p class="text-md text-black" v-html="desc"></p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 gap-8 items-center">
            <h1 class="text-2xl md:text-3xl text-black text-center font-bold z-10">
                Mereka Telah Memulainya Bersama Kami
            </h1>
            <div class="w-full">
                <img src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/partner.png" alt="" class="w-full object-cover">
            </div>
        </div>
        <div class="grid grid-cols-1 gap-8 items-center">
            <h1 class="text-2xl md:text-3xl text-black text-center font-bold z-10">
                Diskusikan kebutuhan perusahaan Anda dengan tim marketing Jobhun
            </h1>
            <a href="https://api.whatsapp.com/send?phone=6281252982369" class="bg-jobhunGreen text-sm hover:bg-emerald-600 text-white px-14 py-2 rounded justify-self-center">
                Tertarik
            </a>
        </div>
    </div>
</template>