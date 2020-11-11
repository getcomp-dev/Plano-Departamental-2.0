<template>
  <transition name="loading-transition">
    <div
      v-show="onLoading.fetching || onLoading.partial || onLoading.table"
      class="container-loading"
      @click.stop
      @keydown.stop
      @keypress.stop
    >
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheLoadingView",
  computed: {
    ...mapGetters(["onLoading"]),
  },
};
</script>

<style scoped>
.container-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2005;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(250, 250, 250, 0.397);
  backdrop-filter: blur(0.5px);
  cursor: wait;
}
.lds-ring {
  position: fixed;
  display: inline-block;
  width: 64px;
  height: 64px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lds-ring div {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 64px;
  border: 8px solid var(--dark-gray);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--dark-gray) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* transition */
.loading-transition-enter-active {
  animation: fadeIn 200ms ease;
}
.loading-transition-leave-active {
  animation: fadeOut 200ms ease;
}
</style>
