<script setup>
import { storeToRefs } from "pinia";
import { toRefs, ref } from "vue";
import ModalDelete from "./ModalDeleteKonsultasi.vue";
import {
  convertApiDateToWebDate,
  convertServiceStatus,
  convertPaymentStatus,
} from "../../../utils/Helper";
import { useDataKonsultasiStore } from "../../../stores/store-konsultasi";
import { useLayoutStore } from "../../layout/store";

// Store Layout
const layoutStore = useLayoutStore();
const { session } = storeToRefs(layoutStore);

const props = defineProps({
  tableExpertConsultation: {
    default: {},
    type: Object,
  },
  index: Number,
});

const { tableExpertConsultation, index } = toRefs(props);

const storeConsultation = useDataKonsultasiStore();

const deleteConsul = ref(false);

const openModalDeleteConsul = () => {
  deleteConsul.value = true;
};

const emit = defineEmits(["dataDeleted"]);

const deleteData = async () => {
  try {
    await storeConsultation.deleteDataTableConsultation(
      tableExpertConsultation.value.id
    );
    emit("dataDeleted");
    deleteConsul.value = false;
  } catch (error) {}
};

const colorButtonServiceStatus = () => {
  if (tableExpertConsultation.value.status === "Belum dimulai") {
    return "bg-gray-300 text-black";
  } else if (tableExpertConsultation.value.status == "Sedang berjalan") {
    return "bg-jobhunYellow text-black";
  } else if (tableExpertConsultation.value.status == "Selesai") {
    return "bg-jobhunGreen text-white";
  }
};

const colorButtonPaymentStatus = () => {
  if (tableExpertConsultation.value.status_paid == "Belum dibayar") {
    return "bg-gray-300 text-black";
  } else if (tableExpertConsultation.value.status_paid == "Belum lunas") {
    return "bg-jobhunYellow text-black";
  } else if (tableExpertConsultation.value.status_paid == "Lunas") {
    return "bg-jobhunGreen text-white";
  }
};
</script>

<template>
  <tr>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">{{ index + 1 }}</div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">
        {{ tableExpertConsultation.user.name }}
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">
        {{ tableExpertConsultation.expert.name }}
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <div class="font-medium text-black">
        {{ convertApiDateToWebDate(tableExpertConsultation.created_at) }}
      </div>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <button class="h-6 w-28 rounded-sm" :class="colorButtonPaymentStatus()">
        <span class="text-xs">
          <div>
            {{ convertPaymentStatus(tableExpertConsultation.status_paid) }}
          </div>
        </span>
      </button>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      <button class="h-6 w-28 rounded-sm" :class="colorButtonServiceStatus()">
        <span class="text-xs">
          <div>{{ convertServiceStatus(tableExpertConsultation.status) }}</div>
        </span>
      </button>
    </td>
    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
      <div class="space-x-1 inline-flex">
        <router-link
          :to="'/konsultasi/detail/' + tableExpertConsultation.id"
          class="my-auto pl-1"
        >
          <button class="h-8 w-20 bg-gray-300 hover:bg-gray-400 rounded-sm">
            <span class="text-black font-normal"> Detail </span>
          </button>
        </router-link>
        <button
          v-if="session.role_id === 1"
          @click.prevent="openModalDeleteConsul()"
          class="text-rose-500 hover:text-rose-900 rounded-full"
        >
          <span class="sr-only">Delete</span>
          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
            <path
              d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z"
            />
          </svg>
        </button>
        <ModalDelete
          :deleteConsul="deleteConsul"
          @close-modal="deleteConsul = false"
          :name="tableExpertConsultation.user.name"
          @delete-button="deleteData"
        />
      </div>
    </td>
  </tr>
</template>