<script setup>
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import LayoutProfile from "./LayoutProfile.vue";
import { useLayoutStore } from "../layout/store";
import { useDataUserStore } from "../../stores/store-users";

const route = useRoute();
const id = route.params.id;

const dataLayoutStore = useLayoutStore();
await dataLayoutStore.getPengaturanDetailProfileUser();

const { pengaturanProfilUser } = storeToRefs(dataLayoutStore);
</script>
<template>
  <div class="relative flex flex-col overflow-y-auto">
    <LayoutProfile :dataUser="pengaturanProfilUser" />
  </div>
</template>