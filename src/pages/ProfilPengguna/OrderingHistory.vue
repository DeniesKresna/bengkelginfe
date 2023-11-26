<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { PAGINATION_LIMIT } from '../../utils/Constants'
import { useDataUserStore } from '../../stores/store-users'
import TabelHeader from './TabelHeader.vue'
import PaginationTableExpertPermanent from './PaginationNumeric.vue'

const tableDetailTransactionUserStore = useDataUserStore()
const { listTransactionUser, listTransactionUserPagination } = storeToRefs(tableDetailTransactionUserStore)

//===== Get Data =======================================================
const getData = async (page = 1, search = "", perPage = PAGINATION_LIMIT) => {
    tableDetailTransactionUserStore.setListTransactionUserPagination({
        page, search, per_page: perPage
    })
    await tableDetailTransactionUserStore.getDataTransactionUser()
}

//===== Search ============================================
const changePage = (page) => {
    getData(page, search)
}

onMounted(() => {
    getData()
})
</script>
<template>
    <div class="p-1 mb-3 shrink w-full space-y-10">
        <div class="">
        <TabelHeader
            :tableDetailTransactionUser="listTransactionUser"
            :total="listTransactionUserPagination.total"
            :page="listTransactionUserPagination.page"
            :perPage="listTransactionUserPagination.per_page"
        />
        </div>
        <div class="">
            <PaginationTableExpertPermanent
                :total="listTransactionUserPagination.total"
                :perPage="listTransactionUserPagination.per_page"
                :page="listTransactionUserPagination.page"
                @clickNav="changePage"
            />
        </div>    
    </div>
</template>