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
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
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
