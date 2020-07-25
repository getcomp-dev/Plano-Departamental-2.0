<template>
  <transition
    enter-active-class="animated animate__slideInLeft sidebar-animation"
    leave-active-class="animated animate__slideOutLeft sidebar-animation"
  >
    <nav v-show="sidebarVisibility" class="sidebar bg-light col" @click.stop="">
      <SidebarMenu
        :menuPages="[
          { routeName: 'dashboardHome', icon: 'fa-home', title: 'Dashboard' },
        ]"
      />

      <SidebarMenu :menuTitle="'Plano'" :menuPages="Admin ? routesPlano : []" />
      <SidebarMenu :menuTitle="'Relatórios'" :menuPages="routesRelatorios" />
      <SidebarMenu
        v-if="SuperAdmin"
        :menuTitle="'Gerenciar'"
        :menuPages="routesGerenciar"
      />
    </nav>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarMenu from "./SidebarMenu.vue";

export default {
  name: "TheSidebar",
  components: {
    SidebarMenu,
  },
  data() {
    return {
      linkDashboard: [
        { routeName: "home", icon: "fa-home", title: "Dashboard" },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "sidebarVisibility",
      "Admin",
      "SuperAdmin",
      "routesPlano",
      "routesRelatorios",
      "routesGerenciar",
    ]),
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  height: calc(100vh - var(--navbar-height));
  max-width: 200px;
  padding: 0.5rem 0;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  z-index: 940;
  font-size: 0.875rem;
  box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  transition: all 200ms ease;
}
.sidebar .sidebar-menu:last-of-type {
  margin-bottom: 2.5rem;
}
/* SCROLL BAR CUSTOM */
.sidebar ::-webkit-scrollbar-track {
  background-color: #f4f4f4 !important;
}
.sidebar::-webkit-scrollbar {
  width: 6px !important;
  background: #f4f4f4 !important;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #666 !important;
}
.sidebar-animation {
  animation-duration: 0.25s;
  animation-fill-mode: both;
}
</style>
