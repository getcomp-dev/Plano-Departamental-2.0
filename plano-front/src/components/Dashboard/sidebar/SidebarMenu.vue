<template>
  <div class="sidebar-menu">
    <h3
      v-if="menuTitle !== ''"
      class="title pr-3 pl-2 mt-4 mb-1 text-muted d-flex justify-content-between align-items-center"
    >
      {{ menuTitle }}
      <slot name="aside-title"></slot>
    </h3>
    <ul class="nav flex-column mb-2">
      <li
        v-for="page in menuPages"
        :key="page.routerName"
        @click="emitCloseSidebar()"
      >
        <router-link :to="{ name: page.routerName }" class="nav-link">
          <i class="icon-nav-link fas" :class="page.icon"></i>
          {{ page.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  name: "SidebarMenu",
  props: {
    menuPages: { type: Array, default: () => [] },
    menuTitle: {
      type: String,
      default: "",
    },
  },
  methods: {
    emitCloseSidebar() {
      EventBus.$emit("close-sidebar");
    },
  },
};
</script>
