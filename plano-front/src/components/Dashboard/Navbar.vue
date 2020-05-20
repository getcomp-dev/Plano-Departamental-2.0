<template>
  <nav
    id="Navbar"
    class="sidebar col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-block d-md-block bg-light"
  >
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li @click="$emit('close-sidebar')" class="nav-item">
          <router-link :to="{ name: 'dashboard' }" class="nav-link">
            <i class="icon-nav-link fas fa-home"></i> Dashboard
          </router-link>
        </li>
      </ul>

      <h3
        class="sidebar-heading d-flex justify-content-between align-items-center pr-3 pl-2 mt-4 mb-1 text-muted"
      >
        <span>Plano</span>
        <a class="d-flex align-items-center" href="#">
          <i class=" far fa-calendar-alt mr-1"></i>
          <span>{{ year }}</span>
        </a>
      </h3>
      <ul class="nav flex-column mb-2" v-if="Admin">
        <li
          v-for="page in linksPlanoOrdered"
          :key="page.routerName"
          @click="$emit('close-sidebar')"
          class="nav-item"
        >
          <router-link :to="{ name: page.routerName }" class="nav-link">
            <i class="icon-nav-link fas" :class="page.icon"></i>
            {{ page.title }}
          </router-link>
        </li>
      </ul>

      <h3 class="sidebar-heading pr-3 pl-2 mt-4 mb-1 text-muted">
        Relatórios
      </h3>
      <ul class="nav flex-column">
        <li
          v-for="page in linksRelatoriosOrdered"
          :key="page.routerName"
          @click="$emit('close-sidebar')"
          class="nav-item"
        >
          <router-link :to="{ name: page.routerName }" class="nav-link">
            <i class="icon-nav-link fas" :class="page.icon"></i>
            {{ page.title }}
          </router-link>
        </li>
      </ul>

      <h3 class="sidebar-heading pr-3 pl-2 mt-4 mb-1 text-muted" v-if="Admin">
        Gerenciar
      </h3>
      <ul class="nav flex-column mb-4" v-if="Admin">
        <li
          v-for="page in linksGenrenciarOrdered"
          :key="page.routerName"
          @click="$emit('close-sidebar')"
          class="nav-item"
        >
          <router-link :to="{ name: page.routerName }" class="nav-link">
            <i class="icon-nav-link fas" :class="page.icon"></i>
            {{ page.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import _ from "lodash";
export default {
  name: "Navbar",
  data() {
    return {
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
          title: "Grades Disciplinass",
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
      linksGenrenciar: [
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
  props: {
    year: Number,
  },
  methods: {
    loadPage() {
      this.$store.commit(COMPONENT_LOADING);
    },
  },
  computed: {
    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
    linksPlanoOrdered() {
      return this.linksPlano;
    },
    linksRelatoriosOrdered() {
      return _.orderBy(this.linksRelatorios, "title");
    },
    linksGenrenciarOrdered() {
      return _.orderBy(this.linksGenrenciar, "title");
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  margin-top: 30px; /* Height of navbar */
  padding-right: 0px;
  padding-left: 0px;
  max-width: 200px;
  -webkit-box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);
  font-size: 0.875rem;
}
.nav-link {
  font-weight: 500;
  color: #333;
  font-size: 12px;
  height: 30px;
  padding: 5px;
  padding-left: 8px;
}
.icon-nav-link {
  color: inherit;
  width: 18px !important;
  height: 18px !important;
  text-align: start;
}

.sidebar-heading {
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.nav li {
  border-top: rgb(248, 249, 250) solid 0.1px;
  border-bottom: rgb(248, 249, 250) solid 0.1px;
}
.nav li:hover {
  background-color: #0079fa;
  color: white;
}
.sidebar .nav-link:hover {
  color: white;
}
.sidebar .nav-link.active:hover {
  background-color: #0055af;
}

/* pagina ativa */
.sidebar .nav-link.active {
  background-color: #0055af;
  color: white;
  border-left: #0079fa 10px solid;
}

.sidebar-sticky {
  position: relative;
  top: 0;
  padding-top: 0.5rem;
  height: -webkit-calc(100vh - 30px);
  height: -moz-calc(100vh - 30px);
  height: calc(100vh - 30px);
  padding-bottom: 1rem;
  overflow-x: hidden;
  overflow-y: auto !important; /* Scrollable contents if viewport is shorter than content. */
}
@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

/* SCROLL BAR CUSTOM */
.sidebar-sticky ::-webkit-scrollbar-track {
  background-color: #f4f4f4 !important;
}
.sidebar-sticky::-webkit-scrollbar {
  width: 6px !important;
  background: #f4f4f4 !important;
}
.sidebar-sticky::-webkit-scrollbar-thumb {
  background: #666 !important;
}
/* ========================== */
[role="main"]::-webkit-scrollbar-track {
  background-color: #f4f4f4 !important;
}
[role="main"]::-webkit-scrollbar {
  width: 6px !important;
  background: #f4f4f4 !important;
}
[role="main"]::-webkit-scrollbar-thumb {
  background: #666 !important;
}
</style>
