<template>
  <div id="app">
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
    />
    <transition name="animate__zoomIn" mode="out-in">
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
  overflow: hidden;
  font-family: arial !important;
  height: 100%;
  padding: 0 !important;
}

#app {
  height: 100%;
}
</style>
