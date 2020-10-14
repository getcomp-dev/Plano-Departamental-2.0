<template>
  <div id="app">
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
    />

    <transition name="router-view-animation" mode="out-in" appear>
      <router-view></router-view>
    </transition>

    <TheLoadingView />

    <notifications
      group="general"
      position="bottom right"
      :duration="5000"
      :max="5"
      :closeOnClick="false"
      classes="vue-notification"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { TheLoadingView } from "@/components/layout";

export default {
  name: "App",
  components: { TheLoadingView },
  computed: {
    ...mapState({
      queue: (state) => state.notifications.queue,
    }),
  },

  watch: {
    queue: {
      handler(queue) {
        const queueTop = queue[queue.length - 1];

        this.$notify({ ...queueTop, group: "general" });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
.vue-notification {
  padding: 10px;
  margin-top: 15px;
  margin-right: 15px;
  font-size: 12px;
  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
}
.vue-notification .warn {
  background: #ffb648;
  border-left-color: #f48a06;
}
.vue-notification .error {
  background: #e54d42;
  border-left-color: #b82e24;
}
.vue-notification .success {
  background: #68cd86;
  border-left-color: #42a85f;
}
</style>
