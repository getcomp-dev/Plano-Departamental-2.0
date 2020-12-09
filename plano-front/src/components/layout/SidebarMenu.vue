<template>
  <div class="sidebar-menu">
    <h3
      v-if="menuTitle !== ''"
      class="title pr-3 pl-2 mt-3 mb-1 text-muted d-flex justify-content-between align-items-center"
    >
      {{ menuTitle }}
    </h3>
    <ul class="nav flex-column mb-2" v-if="menuPages.length">
      <li v-for="page in menuPages" :key="page.path" @click="closeSidebar">
        <router-link :to="{ path: page.path }" class="nav-link">
          <font-awesome-icon :icon="['fas', page.icon]" />
          <span>
            {{ page.title }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SidebarMenu",
  props: {
    menuPages: { type: Array, default: () => [] },
    menuTitle: { type: String, default: "" },
  },

  methods: {
    ...mapActions(["closeSidebar"]),
  },
};
</script>

<style scoped>
.sidebar-menu .title {
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.sidebar-menu .nav li {
  color: #333;
  transition: all 100ms ease;
}

.sidebar-menu .nav li .nav-link {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 5px;
  padding-left: 8px;
  font-weight: 500;
  font-size: 12px;
  color: inherit;
  transition: all 100ms ease;
}
.sidebar-menu .nav > li .nav-link:focus {
  transition: border 100ms ease;
  box-shadow: none !important;
  border-left: var(--light-blue) 10px solid !important;
  outline: #007bff40 solid 2px !important;
  outline-offset: -1px !important;
}
.sidebar-menu .nav > li .nav-link:hover {
  background-color: #0079fa;
  color: #fff !important;
}
.sidebar-menu .nav > li .nav-link.active {
  background-color: #0055af;
  border-left: var(--light-blue) 10px solid;
  color: white;
}
.sidebar-menu .nav > li .nav-link > svg {
  color: inherit;
  font-size: 12px;
  width: 18px;
  margin-right: 3px;
  text-align: start;
}
</style>
