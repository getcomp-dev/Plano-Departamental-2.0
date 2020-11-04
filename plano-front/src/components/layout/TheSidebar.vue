<template>
  <transition name="sidebar-animation">
    <nav v-show="sidebarVisibility" class="sidebar bg-light" @click.stop="">
      <SidebarMenu :menuPages="routesHome" />
      <SidebarMenu
        v-if="Admin && currentPlano.isEditable"
        menuTitle="Plano"
        :menuPages="routesPlano"
      />
      <SidebarMenu menuTitle="Relatórios" :menuPages="routesRelatorios" />
      <SidebarMenu v-if="SuperAdmin" menuTitle="Gerenciar" :menuPages="routesGerenciar" />
      <SidebarMenu menuTitle="Histórico" :menuPages="routesHistorico" />
    </nav>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarMenu from "./SidebarMenu.vue";

export default {
  name: "TheSidebar",
  components: { SidebarMenu },

  computed: {
    ...mapGetters([
      "sidebarVisibility",
      "Admin",
      "SuperAdmin",
      "routesHome",
      "routesPlano",
      "routesRelatorios",
      "routesGerenciar",
      "routesHistorico",
      "currentPlano",
    ]),
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  z-index: 940;
  height: calc(100vh - var(--navbar-height));
  width: 100%;
  max-width: 210px;

  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem 0;
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

/* animation */
.sidebar-animation-enter-active {
  animation: slideInLeft 0.25s;
  animation-fill-mode: both;
}
.sidebar-animation-leave-active {
  animation: slideOutLeft 0.25s;
  animation-fill-mode: both;
}
</style>
