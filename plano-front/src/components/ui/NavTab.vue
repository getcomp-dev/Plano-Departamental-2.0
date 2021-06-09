<template>
  <div class="nav-container">
    <ul class="nav nav-tabs card-header-tabs m-0" ref="navTab">
      <transition name="btn-transition">
        <button
          v-if="withScroll"
          v-show="buttonsVisibility.left && isMouseover"
          class="btn-slide btn-slide-left"
          @click="scrollTo('left')"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </button>
      </transition>

      <li
        v-for="(tab, index) in allTabs"
        :key="index + tab"
        class="nav-item"
        @click="$emit('change-tab', tab)"
      >
        <a
          class="nav-link border border-right-0"
          :class="['clickable', { active: currentTab === tab }]"
        >
          {{ tab }}
        </a>
      </li>

      <transition name="btn-transition">
        <button
          v-if="withScroll"
          v-show="buttonsVisibility.right && isMouseover"
          class="btn-slide btn-slide-right"
          @click="scrollTo('right')"
        >
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </button>
      </transition>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navTab",
  props: {
    currentTab: { type: String, required: true },
    allTabs: { type: Array, required: true },
    withScroll: { type: Boolean, default: false },
  },
  data() {
    return {
      currentScrollPosition: 0,
      isMouseover: false,
      buttonsVisibility: {
        left: false,
        right: true,
      },
    };
  },

  mounted() {
    const { navTab } = this.$refs;
    navTab.handleScroll = () => {
      this.currentScrollPosition = navTab.scrollLeft;
    };
    navTab.handleMouseEnter = () => {
      this.isMouseover = true;
    };
    navTab.handleMouseLeave = () => {
      this.isMouseover = false;
    };

    navTab.addEventListener("scroll", navTab.handleScroll);
    navTab.addEventListener("mouseenter", navTab.handleMouseEnter);
    navTab.addEventListener("mouseleave", navTab.handleMouseLeave);
  },
  beforeDestroy() {
    const { navTab } = this.$refs;
    navTab.removeEventListener("scroll", navTab.handleScroll);
    navTab.removeEventListener("mouseenter", navTab.handleMouseEnter);
    navTab.removeEventListener("mouseleave", navTab.handleMouseLeave);
  },

  methods: {
    scrollTo(direction) {
      const { navTab } = this.$refs;
      const scrollValue = navTab.offsetWidth / 2;

      if (direction === "right") navTab.scrollBy(scrollValue, 0);
      else navTab.scrollBy(-scrollValue, 0);
    },
  },

  watch: {
    currentScrollPosition(currentScrollPosition) {
      const { navTab } = this.$refs;
      const navWidth = navTab.offsetWidth;
      const navMaxScroll = navTab.scrollWidth;

      if (navWidth + currentScrollPosition >= navMaxScroll && navWidth != 0) {
        this.buttonsVisibility.right = false;
      } else {
        this.buttonsVisibility.right = true;
      }

      if (currentScrollPosition <= 0) {
        this.buttonsVisibility.left = false;
      } else {
        this.buttonsVisibility.left = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.nav-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.nav-tabs {
  font-size: 11px !important;
  height: 30px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-color: transparent transparent;
}
.nav-tabs::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}

.btn-slide {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 30px;

  border-radius: 5px;
  border: 2px solid #909090;
  color: #313131;
  background-color: $clr-lightgray;
  font-size: 11px;
  cursor: pointer;
  box-shadow: none !important;
  transition: all 200ms ease;
  box-shadow: none !important;
}

.btn-slide:hover {
  background-color: #f8f8f8;
  color: #000;
  box-shadow: 0px 0px 20px 5px #50505071 !important;
}

.btn-slide-right {
  right: 0;
}
.btn-slide-left {
  left: 0;
}

.nav-item {
  scroll-snap-align: start;
  -webkit-overflow-scrolling: touch;
}
.nav-tabs .nav-link {
  color: $clr-lightblue !important;
  cursor: pointer;
  user-select: none;
}
.nav-tabs li:last-of-type .nav-link {
  border-right: 1px solid #dee2e6 !important;
}
.nav-tabs .nav-link:hover {
  text-decoration: underline;
}
.nav-tabs .nav-link.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default !important;
  text-decoration: none !important;
  transition: background-color 100ms;
}

.btn-transition-enter-active {
  animation: fadeIn 200ms ease;
}
.btn-transition-leave-active {
  animation: fadeOut 200ms ease;
}
</style>
