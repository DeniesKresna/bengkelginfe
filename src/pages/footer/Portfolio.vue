<script setup>
    import { listPortofolio } from './data';
</script>
<template>
    <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
        <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
            <div class="lg:w-1/2 my-auto md:mx-10">
                <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">Portofolio Jobhun</h1>
                <p class="xl:text-xl md:text-lg text-black">
                    Sebagai platform penyedia experts terbaik untuk berbagai macam kebutuhan pengembangan karier, Jobhun telah bekerjasama dengan berbagai klien dari universitas, brand ternama, perusahaan swasta, BUMN, hingga pemerintah.
                </p>
            </div>
            <div class="lg:block hidden w-1/2">
                <img class="h-full w-full object-cover" loading="lazy" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner.png" alt="">
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[70vw] gap-16 justify-center">
            <div class="grid grid-cols-1 md:grid-cols-[max-content_1fr] justify-center gap-16" v-for="{url, title, desc} in listPortofolio">
                <div class="self-start flex flex-col gap-4">
                    <img class="w-96" v-for="item in url" :src="item" alt="" loading="lazy">
                </div>
                <div>
                    <h1 class="text-2xl md:text-3xl text-black font-bold mb-8">{{title}}</h1>
                    <p class="text-md" v-html="desc"></p>
                </div>
            </div>
        </div>
    </div>
</template>