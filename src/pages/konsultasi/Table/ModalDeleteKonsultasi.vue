<script setup>
import ModalBasic from "./ModalBasic.vue";
import iconDelete from "../../../partials/icons/icon-delete.vue";

const props = defineProps({
  deleteConsul: Boolean,
  name: String,
});

const emit = defineEmits(["close-modal", "delete-button"]);

const closeModal = () => {
  emit("close-modal");
};

const cancelDelete = () => {
  return closeModal();
};

const deleteConsul = () => {
  emit("delete-button");
};

const deleteData = () => {
  return deleteConsul();
};
</script>
<template>
  <div class="m-1.5">
    <ModalBasic :modalOpen="props.deleteConsul" @close-modal="closeModal()">
      <div class="mb-5">
        <div class="items-center flex">
          <div class="mx-auto">
            <iconDelete class="fill-rose-600 h-28 -mb-3" />
          </div>
        </div>
        <div class="mx-auto text-center px-8">
          <span class="text-sm text-black text-clip">
            Kamu yakin ingin menghapus konsultasi {{ props.name }}?
          </span>
        </div>
        <div class="mx-auto text-center px-8">
          <div class="infline-flex space-x-5">
            <button
              @click.prevent="deleteData()"
              class="h-9 mt-3 bg-gray-300 hover:bg-gray-400 text-black px-7 rounded text-sm"
            >
              <span>Ya</span>
            </button>
            <button
              @click.prevent="cancelDelete()"
              class="h-9 mt-3 bg-gray-300 hover:bg-gray-400 text-black px-7 rounded text-sm"
            >
              <span>Batal</span>
            </button>
          </div>
        </div>
      </div>
    </ModalBasic>
  </div>
</template>