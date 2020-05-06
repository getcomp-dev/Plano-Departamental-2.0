<template>
  <nav
    id="Navbar"
    class="sidebar col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-block d-md-block bg-light"
  >
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li @click="$emit('toggle')" class="nav-item">
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
        <li @click="$emit('toggle')" class="nav-item">
          <router-link
            :to="{ name: 'pedidos' }"
            class="nav-link"
            v-on:click="loadPage"
          >
            <i class="icon-nav-link fas fa-clipboard"></i> Tabela Interna
          </router-link>
        </li>
        <li v-if="Admin" @click="$emit('toggle')" class="nav-item">
          <router-link
            :to="{ name: 'turmasExternas' }"
            class="nav-link"
            v-on:click="loadPage"
          >
            <i class="icon-nav-link fas fa-clipboard"></i> Tabela Externa
          </router-link>
        </li>
        <li v-if="Admin" @click="$emit('toggle')" class="nav-item">
          <router-link
            :to="{ name: 'cargaPos' }"
            class="nav-link"
            v-on:click="loadPage"
          >
            <i class="icon-nav-link fas fa-clipboard"></i> Tabela Pós
          </router-link>
        </li>
        <li v-if="Admin" @click="$emit('toggle')" class="nav-item">
          <router-link
            :to="{ name: 'validacoes' }"
            class="nav-link"
            v-on:click="loadPage"
          >
            <i class="icon-nav-link fas fa-calendar-check"></i> Validações
          </router-link>
        </li>
      </ul>
      <h3 class="sidebar-heading pr-3 pl-2 mt-4 mb-1 text-muted">
        Relatórios
      </h3>
      <ul class="nav flex-column">
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'cargaProfessores' }" class="nav-link">
            <i class="icon-nav-link fas fa-clipboard"></i> Carga Professores
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'relatorioDisciplinas' }" class="nav-link">
            <i class="icon-nav-link fas fa-clipboard"></i> Plano Departamental
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'gradeDisciplinas' }" class="nav-link">
            <i class="icon-nav-link fas fa-clipboard"></i> Grades Disciplinas
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'horarios' }" class="nav-link">
            <i class="icon-nav-link fas fa-calendar-alt"></i> Horários - Cursos
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'laboratoriosAlocacao' }" class="nav-link">
            <i class="icon-nav-link fas fa-calendar-alt"></i> Horários -
            Laboratórios
          </router-link>
        </li>
      </ul>
      <h3 class="sidebar-heading pr-3 pl-2 mt-4 mb-1 text-muted" v-if="Admin">
        Gerenciar
      </h3>
      <ul class="nav flex-column mb-4" v-if="Admin">
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'cursos' }" class="nav-link">
            <i class="icon-nav-link fas fa-graduation-cap"></i> Cursos
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'docentes' }" class="nav-link">
            <i class="icon-nav-link fas fa-users"></i> Docentes
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'grades' }" class="nav-link">
            <i class="icon-nav-link fas fa-sitemap"></i> Grades
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'gradeEdit' }" class="nav-link">
            <i class="icon-nav-link fas fa-sitemap"></i> Disciplinas na Grade
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'perfis' }" class="nav-link">
            <i class="icon-nav-link fas fa-th"></i> Perfis
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'disciplinas' }" class="nav-link">
            <i class="icon-nav-link fas fa-table"></i> Disciplina
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'salas' }" class="nav-link">
            <i class="icon-nav-link fas fa-clipboard"></i> Salas
          </router-link>
        </li>
        <li @click="$emit('toggle')" class="nav-item">
          <router-link :to="{ name: 'history' }" class="nav-link">
            <i class="icon-nav-link fas fa-clipboard"></i> Logs
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
