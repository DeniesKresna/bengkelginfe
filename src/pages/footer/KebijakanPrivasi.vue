<script setup>
    import { listKebijakan } from './dataKebijakanPrivasi';
    
</script>
<template>
    <div class="grid grid-cols-1 gap-10 p-10 md:p-16 lg:pr-28 ">
        <div class="grid grid-col-1 auto-rows-min gap-6" v-for="{title, desc} in listKebijakan">
            <h1 class="text-2xl md:text-3xl xl:text-4xl text-black font-bold" v-if="title.includes('Kebijakan')">{{title}}</h1>
            <h1 class="text-xl md:text-2xl text-black font-bold" v-else>{{title}}</h1>
            <p class="text-sm md:text-base text-black" v-html="desc"></p>
        </div>
    </div>
</template>