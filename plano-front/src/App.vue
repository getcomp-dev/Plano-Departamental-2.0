<template>
  <div id="app">
    <notifications group="general"
                   position="top right"
                   classes="vue-notification"/>
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
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
  background: #44A4FC;
  border-left: 5px solid #187FE7;

}

.vue-notification .warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification .error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification .success {
  background: #68CD86;
  border-left-color: #42A85F;
}

</style>
