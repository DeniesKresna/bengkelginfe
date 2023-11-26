<script setup>
    import { listProgram } from './data';
</script>
<template>
    <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
        <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
            <div class="lg:w-1/2 my-auto md:mx-10">
                <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">Program Jobhun</h1>
                <p class="xl:text-xl md:text-lg text-black">
                    Jobhun memiliki beragam program menarik yang bantu kamu mewujudkan karier impian
                </p>
            </div>
            <div class="lg:block hidden w-1/2">
                <img class="h-full w-full object-cover" loading="lazy" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner.png" alt="">
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[70vw] gap-16 justify-center">
            <div class="grid grid-cols-1 gap-10 justify-items-center px-6 py-12 border-2 border-solid border-gray-200 rounded shadow-md" v-for="{title, desc, url} in listProgram">
                <div class="text-center">
                    <h1 class="text-2xl md:text-3xl text-black font-bold mb-8">{{title}}</h1>
                    <p class="text-md lg:px-32">{{desc}}</p>
                </div>
                <img class="w-full md:w-[50rem] h-[12.2rem] md:h-[28.2rem] object-cover rounded-sm" :src="url" alt="" loading="lazy">
            </div>
        </div>
    </div>
</template>