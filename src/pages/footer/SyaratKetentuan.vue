<script setup>
    import { listSyarat } from './dataSyaratKetentuan';
    
</script>
<template>
    <div class="grid grid-cols-1 gap-10 p-10 md:p-16 lg:pr-28 ">
        <div class="grid grid-col-1 auto-rows-min gap-6">
            <h2 class="text-2xl md:text-3xl xl:text-4xl text-black font-bold">Syarat dan Ketentuan</h2>
            <h1 class="text-xl md:text-2xl text-black font-bold">Selamat datang di Jobhun!</h1>
            <p class="text-sm md:text-base text-black">
                Syarat dan ketentuan berikut menjelaskan peraturan dan ketentuan penggunaan website PT Jobhun Membangun Indonesia dengan alamat <strong>jobhun.id</strong>.
                <br><br>
                Dengan mengakses website ini, kami menganggap Anda telah menyetujui syarat dan ketentuan ini. Jangan lanjutkan penggunaan Jobhun jika Anda menolak untuk menyetujui semua syarat dan ketentuan yang tercantum di halaman ini.
            </p>
        </div>
        <div class="grid grid-col-1 auto-rows-min gap-6" v-for="{title, desc} in listSyarat">
            <h1 class="text-xl md:text-2xl text-black font-bold">{{title}}</h1>
            <p class="text-sm md:text-base text-black" v-html="desc"></p>
        </div>
    </div>
</template>