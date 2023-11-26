<script setup>
import LayoutProfile from './LayoutProfile.vue'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from '../../layout/store'

const dataUserStore = useLayoutStore()
await dataUserStore.getPengaturanDetailProfileUser()

const { pengaturanProfilUser } = storeToRefs(dataUserStore)
</script>
<template>
    <div class="py-8 md:py-0 mx-auto mb-10">
        <LayoutProfile :dataProfile="pengaturanProfilUser"/>
    </div>
</template>