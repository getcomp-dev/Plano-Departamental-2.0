<template>
  <transition name="sidebar-transition">
    <nav v-show="sidebarVisibility" class="sidebar" @click.stop>
      <SidebarSection :pages="PagesHome" />
      <SidebarSection
        v-if="currentUser.isAdmin && currentPlano.isEditable"
        sectionTitle="Plano"
        :pages="PagesPlano"
        icon="clipboard"
      />
      <SidebarSection sectionTitle="Relatórios" :pages="PagesRelatorios" icon="file-alt" />
      <SidebarSection
        v-if="currentUser.isSuperAdmin"
        sectionTitle="Gerenciar"
        :pages="PagesGerenciar"
        icon="sitemap"
      />
      <SidebarSection sectionTitle="Histórico" :pages="PagesHistorico" icon="search" />
      <SidebarSection sectionTitle="Validações" :pages="PagesValidacoes" icon="calendar-check" />
    </nav>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarSection from "./SidebarSection.vue";

export default {
  name: "Sidebar",
  components: { SidebarSection },

  computed: {
    ...mapGetters([
      "sidebarVisibility",
      "PagesHome",
      "PagesPlano",
      "PagesRelatorios",
      "PagesGerenciar",
      "PagesHistorico",
      "PagesValidacoes",
      "currentUser",
      "currentPlano",
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins";
@import "@/assets/styles/theme";

.sidebar {
  @include base-transition(all);
  @include custom-scrollbar(7px);
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  z-index: 940;
  width: 230px;
  height: calc(100vh - var(--navbar-height));
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding: 0;
  padding-bottom: 10px;
  box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.4);
}

/* transition */
.sidebar-transition-enter-active {
  animation: slideInLeft 0.25s;
  animation-fill-mode: both;
}
.sidebar-transition-leave-active {
  animation: slideOutLeft 0.25s;
  animation-fill-mode: both;
}
</style>
