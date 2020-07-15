<template>
  <transition
    enter-active-class="animated animate__slideInLeft sidebar-animation"
    leave-active-class="animated animate__slideOutLeft sidebar-animation"
  >
    <nav v-show="sidebarVisibility" class="sidebar bg-light col" @click.stop="">
      <SidebarMenu :menuPages="linkDashboard" />

      <SidebarMenu
        :menuTitle="'Plano'"
        :menuPages="Admin ? linksPlanoOrdered : []"
      />

      <SidebarMenu
        :menuTitle="'Relatórios'"
        :menuPages="linksRelatoriosOrdered"
      />
      <SidebarMenu
        v-if="Admin"
        :menuTitle="'Gerenciar'"
        :menuPages="linksGerenciarOrdered"
      />
    </nav>
  </transition>
</template>

<script>
import _ from "lodash";
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
        { routeName: "dashboard", icon: "fa-home", title: "Dashboard" },
      ],
      linksPlano: [
        {
          title: "Graduação - DCC",
          routeName: "pedidos",
          icon: "fa-clipboard",
        },
        {
          title: "Graduação - Outros",
          routeName: "turmasExternas",
          icon: "fa-clipboard",
        },
        {
          title: "Pós Graduação",
          routeName: "cargaPos",
          icon: "fa-clipboard",
        },
        {
          title: "Validações",
          routeName: "validacoes",
          icon: "fa-calendar-check",
        },
      ],
      linksRelatorios: [
        {
          title: "Carga Professores",
          routeName: "cargaProfessores",
          icon: "fa-file-alt",
        },
        {
          title: "Grades Disciplinas",
          routeName: "gradeDisciplinas",
          icon: "fa-file-alt",
        },
        {
          title: "Horários - Cursos",
          routeName: "horarios",
          icon: "fa-file-alt",
        },
        {
          title: "Horários - Laboratórios",
          routeName: "laboratoriosAlocacao",
          icon: "fa-file-alt",
        },
        {
          title: "Plano Departamental",
          routeName: "relatorioDisciplinas",
          icon: "fa-file-alt",
        },
      ],
      linksGerenciar: [
        {
          title: "Usuarios",
          routeName: "usuarios",
          icon: "fa-user",
        },
        { title: "Cursos ", routeName: "cursos", icon: "fa-graduation-cap" },
        {
          title: "Disciplinas ",
          routeName: "disciplinas",
          icon: "fa-calendar-alt",
        },
        {
          title: "Disciplinas na Grade ",
          routeName: "gradeEdit",
          icon: "fa-table",
        },
        { title: "Docentes ", routeName: "docentes", icon: "fa-users" },
        { title: "Grades ", routeName: "grades", icon: "fa-sitemap" },
        { title: "Log ", routeName: "history", icon: "fa-history" },
        { title: "Perfis ", routeName: "perfis", icon: "fa-th-list" },
        { title: "Planos ", routeName: "planos", icon: "fa-calendar-alt" },
        { title: "Salas ", routeName: "salas", icon: "fa-university" },
      ],
    };
  },
  computed: {
    ...mapGetters(["sidebarVisibility", "Admin"]),

    linksPlanoOrdered() {
      return this.linksPlano;
    },
    linksRelatoriosOrdered() {
      return _.orderBy(this.linksRelatorios, "title");
    },
    linksGerenciarOrdered() {
      return _.orderBy(this.linksGerenciar, "title");
    },
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
