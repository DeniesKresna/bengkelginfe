<template>
  <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const props = defineProps({
  value: String,
});

const editor = ClassicEditor;
const editorData = ref(props.value);
const editorConfig = {
  // The configuration of the editor.
};

watch(editorData, (newValue) => {
  editorData.value = newValue;
});

const emit = defineEmits(["update:value"]);
watch(editorData, (newData) => {
  emit("update:value", newData);
});
</script>
