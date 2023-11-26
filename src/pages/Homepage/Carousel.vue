<script setup>
    import 'tw-elements';
    import { Splide, SplideSlide } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css/core';
    import '@splidejs/splide/dist/css/themes/splide-default.min.css';


    const items = [
        { 
            img: "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/klien-baru.png",
            id: 0,
        },
        {
            img: "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/mitra_baru.png",
            id: 1,
        },
        {
            img: "https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/Logo-Web-Baru-03.png",
            id: 2,
        },
    ]

    const options = {
        rewind: true,
        gap: '2rem',
        type: 'loop',
        padding: '1rem',
        focus: 'center',
        autoplay: true,
    }
</script>
<template>
    <div class="xl:px-80 sm:px-10 md:px-20 mt-5">
        <Splide :options="options" class="">
            <SplideSlide v-for="(item, i) in items" :key="i">
                <img :src="item.img" class="shadow-xl border-jobhunGreen">
            </SplideSlide>
        </Splide>
    </div>
</template>