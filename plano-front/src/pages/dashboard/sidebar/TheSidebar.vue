<template>
  <transition
    enter-active-class="animated animate__slideInLeft sidebar-animation"
    leave-active-class="animated animate__slideOutLeft sidebar-animation"
    mode="out-in"
  >
    <nav v-show="visibility" class="sidebar bg-light col" @click.stop="">
      <SidebarMenu :menuPages="linkDashboard" />

      <SidebarMenu
        :menuTitle="'Plano'"
        :menuPages="Admin ? linksPlanoOrdered : []"
      >
        <template #aside-title>
          <div class="aside-title d-flex align-items-center">
            <i class="far fa-calendar-alt mr-1"></i>
            <select type="text" v-model="Plano" v-on:change="changePlano()">
              <option
                v-for="plano in Planos"
                :value="plano.id"
                :key="plano.id"
                >{{ plano.ano }}</option
              >
            </select>
          </div>
        </template>
      </SidebarMenu>

      <!-- <div class="sidebar-menu">
        <h3
          class="title pr-3 pl-2 mt-3 mb-0 text-muted d-flex justify-content-between align-items-center"
        >
          Plano
          <div class="aside-title d-flex align-items-center">
            <i class="far fa-calendar-alt mr-1"></i>
            <select type="text" v-model="Plano" v-on:change="changePlano()">
              <option
                v-for="plano in Planos"
                :value="plano.id"
                :key="plano.id"
                >{{ plano.ano }}</option
              >
            </select>
          </div>
        </h3>
      </div> -->

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
import SidebarMenu from "./SidebarMenu.vue";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
export default {
  name: "TheSidebar",
  components: {
    SidebarMenu,
  },
  props: {
    year: Number,
    visibility: { type: Boolean, default: false },
  },
  data() {
    return {
      Plano: undefined,
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
        {
          title: "Usuarios",
          routerName: "usuarios",
          icon: "fa-user",
        },
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
        { title: "Planos ", routerName: "planos", icon: "fa-calendar-alt" },
        { title: "Salas ", routerName: "salas", icon: "fa-university" },
      ],
    };
  },
  created() {
    this.Plano = parseInt(localStorage.getItem("Plano"), 10);
  },

  methods: {
    async changePlano() {
      try {
        this.$store.commit(COMPONENT_LOADING);

        setTimeout(async () => {
          await localStorage.setItem("Plano", this.Plano);
          await this.$store.dispatch("fetchAll");
          this.$socket.open();
          this.$store.commit(COMPONENT_LOADED);
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
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

    Planos() {
      return _.orderBy(this.$store.state.plano.Plano, "ano");
    },

    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
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
  z-index: 940;
  font-size: 0.875rem;
  -webkit-box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  transition: all 200ms ease;
}
nav.sidebar .sidebar-menu:last-of-type {
  margin-bottom: 2rem;
}
.sidebar-menu .title {
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
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
.sidebar-animation {
  animation-duration: 0.25s;
  animation-fill-mode: both;
}
.routerview-animation {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
</style>
