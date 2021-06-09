<template>
  <transition name="fade-transition">
    <div v-if="onAnyLoading" class="container-loading" @click.stop @keydown.stop @keypress.stop>
      <div class="loading-spin">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span v-if="onLoading.progress" class="progress-text">
        {{ loadingProgress.currentPercentage }}%
      </span>

      <div class="content">
        <portal-target name="loading-content" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LoadingView",
  computed: {
    ...mapGetters(["onLoading", "loadingProgress"]),

    onAnyLoading() {
      return Object.values(this.onLoading).some((loading) => loading === true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";

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

  .content {
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: center;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loading-spin {
    position: fixed;
    display: inline-block;
    width: 70px;
    height: 70px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    div {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 70px;
      height: 70px;
      border: 8px solid $clr-darkgray;
      border-radius: 50%;
      animation: loading-spining 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: $clr-darkgray transparent transparent transparent;
      &:nth-child(1) {
        animation-delay: -0.45s;
      }
      &:nth-child(2) {
        animation-delay: -0.3s;
      }
      &:nth-child(3) {
        animation-delay: -0.15s;
      }
    }
  }

  .progress-text {
    font-weight: bold;
    transition: all ease 200ms;
    font-size: 15px;
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 2px 2px 2px #000, 0 0 25px #000, 0 0 5px #000;
  }
}

@keyframes loading-spining {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
