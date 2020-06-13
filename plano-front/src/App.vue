<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <notifications
      group="general"
      position="bottom right"
      :duration="5000"
      :closeOnClick="false"
      classes="vue-notification"
    />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,
body {
  height: 100%;
  padding: 0 !important;
}
#app {
  height: 100%;
}
</style>
