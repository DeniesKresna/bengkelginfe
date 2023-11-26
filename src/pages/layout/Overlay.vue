<template>
  <div>
    <div v-if="isLoading" class="overlay">
      <transition name="fade">
        <div class="absolute inset-0 flex items-center justify-center z-50">
          <div class="loader-black"></div>
          <div class="blur-overlay"></div>
        </div>
      </transition>
    </div>
    <div :class="{ 'content-loading': isLoading }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean,
  },
};
</script>
  
<style>
.loader-black {
  border: 4px solid #000000;
  border-top: 4px solid #48b391;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  position: relative;
  z-index: 1;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.blur-overlay {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
  