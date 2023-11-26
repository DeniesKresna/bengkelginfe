<script setup>
    import { listBudaya, listCerita, listLoker } from './data';
</script>
<template>
    <div class="grid gap-12 md:gap-20 grid-cols-1 px-6 lg:px-8 py-8">
        <div class="flex justify-center max-w-9xl min-w-0 mx-auto">
            <div class="lg:w-1/2 my-auto md:mx-10">
                <h1 class="xl:text-5xl md:text-4xl text-3xl text-black font-bold mb-5">Karier</h1>
                <p class="xl:text-xl md:text-lg text-black">
                    Jobhun memiliki misi untuk membantu para talenta di Indonesia dalam membangun dan mengembangkan karier mereka. Mari bersama-sama Jobhun mewujudkan misi tersebut serta memaksimalkan potensi yang dimiliki.
                    <br><br>
                    Jobhun adalah tempat yang tepat untuk kamu yang mau lebih dari sekadar bekerja, ingin membangun karier sambil berkarya, dan ikut berkontribusi membantu pengembangan karier para talenta di Indonesia.
                </p>
            </div>
            <div class="lg:block hidden w-1/2">
                <img class="h-full w-full object-cover" loading="lazy" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/banner.png" alt="">
            </div>
        </div>
        <div class="">
            <h2 class="text-2xl md:text-3xl text-black text-center font-bold mb-10">Budaya dan Prinsip Kerja di Jobhun</h2>
            <div class="bg-jobhunYellow text-center w-full p-10 shadow-xl grid auto-rows-min grid-cols-1 md:grid-cols-5 gap-6">
                <div class="grid grid-col-1 auto-rows-min justify-items-center gap-5 text-center" v-for="{url, title, desc} in listBudaya">
                    <img class="w-24 h-24 md:w-28 md:h-28 object-cover" :src="url" alt="">
                    <h1 class="text-black text-md font-bold">{{title}}</h1>
                    <p v-html="desc" class="text-md"></p>
                </div>
            </div>
        </div>
        <div>
            <h2 class="text-2xl md:text-3xl text-black text-center font-bold mb-10">Cerita Jobhun Squad</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-28 px-5 md:px-20 mt-28">
                <div class="grid grid-col-1 auto-rows-min p-6 md:p-8 pl-20 md:pl-24 gap-5 bg-gray-200 rounded-lg relative" v-for="{url, title, desc} in listCerita">
                    <div class="bg-gray-200 rounded-full p-4 absolute left-4 -top-20">
                        <img src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/kutip.svg" alt="">
                    </div>
                    <img class="w-24 h-24 md:w-28 md:h-28 rounded-full absolute -left-8 md:-left-10 -top-4" :src="url" alt="">
                    <h1 class="text-black text-md md:text-xl font-bold">{{title}}</h1>
                    <p class="text-md" v-html="desc"></p>
                </div>
            </div>
        </div>
        <div class="px-5 md:px-20">
            <h2 class="text-2xl md:text-3xl text-black text-center font-bold mb-10">Lowongan kerja di Jobhun</h2>
            <table class="w-full table-auto border-collapse border-spacing-6">
                <thead>
                    <tr class="text-[9px] sm:text-sm lg:text-lg font-bold">
                        <th class="p-4 md:p-6">Nama Posisi</th>
                        <th>Divisi</th>
                        <th>Lokasi</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center text-[9px] sm:text-sm lg:text-lg border-2 border-solid  rounded-md" v-for="{posisi, divisi, lokasi} in listLoker">
                        <td class="p-4 md:p-6 w-[30%]">{{ posisi }}</td>
                        <td>{{ divisi }}</td>
                        <td>{{ lokasi }}</td>
                        <td><router-link to="/lowongan/1" class="px-6 py-2 bg-gray-300 rounded text-black font-semibold">Detail</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>