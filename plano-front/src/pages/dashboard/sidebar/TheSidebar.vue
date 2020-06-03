<template>
  <nav class="sidebar d-block d-md-block bg-light col">
    <SidebarMenu :menuPages="linkDashboard" />

    <SidebarMenu
      v-if="Admin"
      :menuTitle="'Plano'"
      :menuPages="linksPlanoOrdered"
    >
      <template #aside-title>
        <a class="d-flex align-items-center" href="#">
          <i class=" far fa-calendar-alt mr-1"></i>
          <span>{{ year }}</span>
        </a>
      </template>
    </SidebarMenu>

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
</template>

<script>
import _ from "lodash";
import SidebarMenu from "./SidebarMenu.vue";

export default {
  name: "TheSidebar",
  components: {
    SidebarMenu,
  },
  props: {
    year: Number,
  },
  data() {
    return {
      linkDashboard: [
        { routerName: "dashboard", icon: "fa-home", title: "Dashboard" },
      ],
      linksPlano: [
        {
          title: "Graduação - DCC",
          routerName: "pedidos",
          icon: "fa-clipboard",
        },
        {
          title: "Graduação - Outros",
          routerName: "turmasExternas",
          icon: "fa-clipboard",
        },
        {
          title: "Pós Graduação",
          routerName: "cargaPos",
          icon: "fa-clipboard",
        },
        {
          title: "Validações",
          routerName: "validacoes",
          icon: "fa-calendar-check",
        },
      ],
      linksRelatorios: [
        {
          title: "Carga Professores",
          routerName: "cargaProfessores",
          icon: "fa-file-alt",
        },
        {
          title: "Grades Disciplinas",
          routerName: "gradeDisciplinas",
          icon: "fa-file-alt",
        },
        {
          title: "Horários - Cursos",
          routerName: "horarios",
          icon: "fa-file-alt",
        },
        {
          title: "Horários - Laboratórios",
          routerName: "laboratoriosAlocacao",
          icon: "fa-file-alt",
        },
        {
          title: "Plano Departamental",
          routerName: "relatorioDisciplinas",
          icon: "fa-file-alt",
        },
      ],
      linksGerenciar: [
        { title: "Cursos ", routerName: "cursos", icon: "fa-graduation-cap" },
        {
          title: "Disciplinas ",
          routerName: "disciplinas",
          icon: "fa-calendar-alt",
        },
        {
          title: "Disciplinas na Grade ",
          routerName: "gradeEdit",
          icon: "fa-table",
        },
        { title: "Docentes ", routerName: "docentes", icon: "fa-users" },
        { title: "Grades ", routerName: "grades", icon: "fa-sitemap" },
        { title: "Log ", routerName: "history", icon: "fa-history" },
        { title: "Perfis ", routerName: "perfis", icon: "fa-th-list" },
        { title: "Salas ", routerName: "salas", icon: "fa-university" },
      ],
    };
  },
  computed: {
    linksPlanoOrdered() {
      return this.linksPlano;
    },

    linksRelatoriosOrdered() {
      return _.orderBy(this.linksRelatorios, "title");
    },

    linksGerenciarOrdered() {
      return _.orderBy(this.linksGerenciar, "title");
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
nav.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: -webkit-calc(100vh - var(--navbar-height));
  height: -moz-calc(100vh - var(--navbar-height));
  height: calc(100vh - var(--navbar-height));
  max-width: 200px;
  margin-top: var(--navbar-height);
  padding: 0.5rem 0;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  z-index: 100;
  font-size: 0.875rem;
  -webkit-box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  transition: all 200ms ease;
}
nav.sidebar .sidebar-menu:last-of-type {
  margin-bottom: 2rem;
}
nav.sidebar .title {
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
}
nav.sidebar .nav li {
  color: #333;
  border-top: rgb(248, 249, 250) solid 0.1px;
  border-bottom: rgb(248, 249, 250) solid 0.1px;
  transition: all 100ms ease;
}
nav.sidebar .nav li .nav-link {
  color: inherit;
  font-weight: 500;
  font-size: 12px;
  height: 30px;
  padding: 5px;
  padding-left: 8px;
}
nav.sidebar .nav li:hover {
  background-color: #0079fa;
  color: #fff !important;
}
nav.sidebar .nav li .nav-link.active {
  background-color: #0055af;
  color: white;
  border-left: #0079fa 10px solid;
}
nav.sidebar .nav li .nav-link .icon-nav-link {
  color: inherit;
  width: 18px !important;
  height: 18px !important;
  text-align: start;
}

/* SCROLL BAR CUSTOM */
nav.sidebar.sidebar ::-webkit-scrollbar-track {
  background-color: #f4f4f4 !important;
}
nav.sidebar.sidebar::-webkit-scrollbar {
  width: 6px !important;
  background: #f4f4f4 !important;
}
nav.sidebar.sidebar::-webkit-scrollbar-thumb {
  background: #666 !important;
}
</style>
