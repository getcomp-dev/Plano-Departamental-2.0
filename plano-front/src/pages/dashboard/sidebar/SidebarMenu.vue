<template>
  <div class="sidebar-menu">
    <h3
      v-if="menuTitle !== ''"
      class="title pr-3 pl-2 mt-3 mb-1 text-muted d-flex justify-content-between align-items-center"
    >
      {{ menuTitle }}
    </h3>
    <ul class="nav flex-column mb-2" v-if="menuPages.length">
      <li
        v-for="page in menuPages"
        :key="page.routeName"
        @click="$store.commit('CLOSE_SIDEBAR')"
      >
        <router-link :to="{ name: page.routeName }" class="nav-link">
          <i class="icon-nav-link fas" :class="page.icon"></i>
          {{ page.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu",
  props: {
    menuPages: { type: Array, default: () => [] },
    menuTitle: {
      type: String,
      default: "",
    },
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
  color: inherit;
  font-weight: 500;
  font-size: 12px;
  height: 30px;
  padding: 5px;
  padding-left: 8px;
  transition: all 100ms ease;
}
.sidebar-menu .nav li .nav-link:focus {
  transition: border 100ms ease;
  box-shadow: none !important;
  border-left: var(--light-blue) 10px solid !important;
  outline: #007bff40 solid 2px !important;
  outline-offset: -1px !important;
}
.sidebar-menu .nav li .nav-link:hover {
  background-color: #0079fa;
  color: #fff !important;
}
.sidebar-menu .nav li .nav-link.active {
  background-color: #0055af;
  border-left: var(--light-blue) 10px solid;
  color: white;
}
.sidebar-menu .nav li .nav-link .icon-nav-link {
  color: inherit;
  width: 18px !important;
  height: 18px !important;
  text-align: start;
}
</style>
