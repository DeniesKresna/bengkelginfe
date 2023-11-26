<script setup>
import { toRefs, ref } from "vue"
import {services} from "../../utils/Constants"
import {convertApiDateToWebDate} from "../../utils/Helper"

const props = defineProps({
  tableDetailTransactionUser: {
    default: {},
    type: Object
  },
  index: Number,
})
const { tableDetailTransactionUser, index } = toRefs(props)

const getServiceLabel = (key = "consultation") => {
  const s = services.find((item) => item.value === key)
  return s.label
}
</script>

<template>
  <tr>  
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">{{ getServiceLabel(tableDetailTransactionUser.service)}}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">{{ convertApiDateToWebDate(tableDetailTransactionUser.created_at) }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">{{ tableDetailTransactionUser.status }}, {{ tableDetailTransactionUser.status_paid }}</div>
    </td>
  </tr>  
</template>