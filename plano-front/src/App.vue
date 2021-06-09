<template>
  <div id="app">
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
    />

    <notifications
      group="general"
      position="bottom right"
      :duration="5000"
      :max="5"
      :closeOnClick="false"
    />

    <transition name="fade-transition" mode="out-in" appear>
      <router-view></router-view>
    </transition>

    <LoadingView />
    <ModalOverlay />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LoadingView, ModalOverlay } from "@/components/layout";

export default {
  name: "App",
  components: { LoadingView, ModalOverlay },
  computed: {
    ...mapGetters(["notificationsQueue"]),
  },

  watch: {
    notificationsQueue: {
      handler(notificationsQueue) {
        const queueTop = notificationsQueue[notificationsQueue.length - 1];
        this.$notify({ ...queueTop });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
#app .vue-notification.warn {
  background: #fa9e2d;
  border-left-color: #e07e06;
}
</style>
