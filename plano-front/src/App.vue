<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <notifications
      group="general"
      position="bottom right"
      classes="vue-notification"
    />
    <notifications
      group="second"
      position="bottom right"
      :duration="5000"
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
}
#app {
  height: 100%;
}
.cube1,
.cube2 {
  background-color: #333;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  -moz-animation: cubemove 1.8s infinite ease-in-out;
  -o-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}
.cube2 {
  -webkit-animation-delay: -0.9s;
  -moz-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@-moz-keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@-o-keyframes cubemove {
  25% {
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
