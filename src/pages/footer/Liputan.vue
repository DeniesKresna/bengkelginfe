<script setup>
    import { listLiputan } from './dataLiputan';
</script>
<template>
    <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
        <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
            <div class="lg:w-1/2 my-auto md:mx-10">
                <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">Liputan Media</h1>
                <p class="xl:text-xl md:text-lg text-black">
                    Jobhun telah diliput oleh beberapa media lokal dan nasional dalam berbagai pembahasan, mulai dari layanan, penghargaan, kegiatan, hingga kolaborasi.
                </p>
            </div>
            <div class="lg:block hidden w-1/2">
                <img class="h-full w-full object-cover" loading="lazy" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner.png" alt="">
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div class="flex flex-col gap-4 items-center text-center px-6 py-4 border-3 border-solid border-gray-200 rounded-md" v-for="{title, url, tanggal, linkHref} in listLiputan">
                <img class="w-56 object-cover" :src="url" alt="" loading="lazy">
                <h1 class="text-xl text-black font-bold">{{title}}</h1>
                <a :href="linkHref" target="_blank" class="text-md hover:underline">Baca selengkapnya  >></a>
                <p class="text-md text-black ">{{tanggal}}</p>
            </div>
        </div>
    </div>
</template>