<script setup>
import { useCourseStore } from "../../stores/store-course";
import Banner from "./Banner.vue";
import CardMentors from "./CardSectionHome.vue";
import Carousel from "./Carousel.vue";
import StickyChat from "./StickyChat.vue";
</script>
<template>
  <div class="relative flex flex-col overflow-y-auto">
    <Banner />
    <CardMentors />
    <Carousel />
    <StickyChat />
  </div>
</template>
<style>
.button-size {
  padding: 11px 15px 11px 15px;
}

.button-size {
  padding: 11px 23px 11px 23px;
}
</style>