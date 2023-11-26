<script setup>
import { toRefs, computed } from "vue";
import TabelData from "./TabelData.vue";

const props = defineProps({
  page: Number,
  perPage: Number,
  tableConsultation: Array,
  total: Number,
});

const { page, perPage, tableConsultation, total } = toRefs(props);

const adjustingIndex = computed(() => perPage.value * (page.value - 1));

const emit = defineEmits(["passDataDeleted"]);

const reloadData = () => {
  emit("passDataDeleted");
};
</script>

<template>
  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <div>
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <thead class="text-md text-black bg-slate-50">
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <div class="font-semibold text-left">No.</div>
                  </label>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Nama Pengguna</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Experts yang diajukan</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Tanggal pengajuan</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Pembayaran</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left">Status</div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div class="font-semibold text-left"></div>
              </th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-200">
            <TabelData
              v-for="(expertConsultation, index) in tableConsultation"
              :key="expertConsultation.id"
              :value="expertConsultation.id"
              :tableExpertConsultation="expertConsultation"
              :index="index + adjustingIndex"
              @dataDeleted="reloadData"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>