<template>
  <div id="app">
    <notifications
      group="general"
      position="top right"
      classes="vue-notification"
    />
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
}

#app {
  height: 100%;
}

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
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
.clickable {
  cursor: pointer;
}
.p-header {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.low-opacity {
  opacity: 0.4;
}
</style>
