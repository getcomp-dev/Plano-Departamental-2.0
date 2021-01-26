<template>
  <section class="sidebar-menu">
    <div
      v-if="sectionTitle"
      class="section-title"
      :class="[{ 'is-open': isOpen }, { 'has-current-page': hasCurrentPage }]"
      @click="isOpen = !isOpen"
      v-prevent-click-selection
    >
      <font-awesome-icon :icon="['fas', icon]" />
      {{ sectionTitle }}
      <ButtonArrow class="ml-auto" :state="isOpen" />
    </div>

    <ul class="nav flex-column" v-if="pages.length && isOpen">
      <li
        v-for="page in pages"
        :key="page.path"
        :class="['nav-link', { 'is-active': $route.path === page.path }]"
        @click="changeRoute(page.path)"
      >
        {{ page.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { ButtonArrow } from "@/components/ui";
import { preventClickSelection } from "@/common/mixins";

export default {
  name: "SidebarSection",
  components: { ButtonArrow },
  mixins: [preventClickSelection],
  props: {
    pages: { type: Array, default: () => [] },
    sectionTitle: { type: String, default: "" },
    icon: { type: String, default: "" },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  beforeMount() {
    const hasPageActive = this.pages.find((route) => route.path === this.$route.path);
    if (hasPageActive || !this.sectionTitle) this.isOpen = true;
  },

  methods: {
    ...mapActions(["closeSidebar"]),

    changeRoute(path) {
      if (path !== this.$route.path) {
        this.$router.push({ path });
      }

      setTimeout(() => {
        this.closeSidebar();
      }, 400);
    },
  },
  computed: {
    hasCurrentPage() {
      const pageFound = this.pages.find((page) => page.path === this.$route.path);
      return pageFound ? true : false;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theme";
@import "@/assets/styles/mixins";

.sidebar-menu {
  font-size: 12px;
  color: #333;

  > .section-title {
    @include base-transition(all);
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0 5px;
    margin: 0;
    font-family: Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    background-color: #ebebeb;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
      filter: brightness(90%);
      color: #000;
    }
    &.is-open {
      filter: brightness(100%);
      background-color: #c3c3c3;
      color: #000;
    }
    &::after {
      content: "";
      position: absolute;
      z-index: 10;
      top: 50%;
      right: 25px;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: transparent;
      transition: all 400ms ease;
    }
    &:not(.is-open).has-current-page::after {
      background-color: $clr-blue;
    }

    > svg {
      color: currentColor;
      width: 18px;
      height: 12px;
      margin-right: 4px;
      text-align: start;
    }
  }

  ul.nav {
    padding-bottom: 10px;
    color: #333;
  }

  ul.nav > li.nav-link {
    position: relative;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 5px;
    padding-left: 27px; // espaço a esquerda igual do section-title
    letter-spacing: 0.5px;
    transition: all 100ms ease;
    &:hover {
      cursor: pointer;
      background-color: $clr-lightblue;
      color: #fff;
      &::before {
        filter: brightness(160%);
      }
      &::after {
        background-color: #fff;
      }
    }
    // backgorund line
    &::before {
      content: "";
      position: absolute;
      z-index: 5;
      top: 0;
      left: 13px;
      width: 2px;
      height: 100%;
      background-color: #62676e;
      transition: all 400ms ease;
    }
    // circle
    &::after {
      content: "";
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 14px;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #6e6e6e;
      transition: all 400ms ease;
    }
  }

  ul.nav > li.nav-link.is-active {
    color: #fff;
    background-color: $clr-blue;
    transition: all 100ms ease;
    cursor: default;
    &::before {
      filter: brightness(160%);
    }
    &::after {
      background-color: #fff;
    }
  }
}

.sidebar-menu:first-of-type {
  > ul.nav {
    padding: 5px 0;
  }
}
</style>
