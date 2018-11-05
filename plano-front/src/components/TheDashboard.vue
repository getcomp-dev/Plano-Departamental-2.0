<template>
  <div class="TheDashboard">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link :to="{ name: 'dashboard' }" class="navbar-brand col-sm-3 col-md-2 mr-0">Plano Departamental</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <p class="nav-link" v-on:click="showModalLoad"><i class="fas fa-folder-open"></i> Carregar</p>
          <p class="nav-link" v-on:click="showModalSave"><i class="fas fa-save"></i> Salvar</p>
          <router-link :to="{ name: 'logout' }" class="nav-link"><i class="fas fa-sign-out-alt"></i> Logout</router-link>
        </li>
      </ul>
    </nav>
    <b-modal id="modal-load" ref="modalLoad" title="Selecione um Arquivo">
      <p v-for="(value) in files" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px">
        <b-button variant="success" v-on:click="restorebd(filename);">Carregar Arquivo</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-save" ref="modalSave" title="Escolha um nome para o arquivo">
      <p v-for="(value) in files" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px">
        <b-button variant="success" v-on:click="bddump(filename);">Salvar Arquivo</b-button>
      </div>
    </b-modal>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-1 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'dashboard' }" class="nav-link"><i class="fas fa-home"></i> Dashboard</router-link>
              </li>
            </ul>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Plano</span>
              <a class="d-flex align-items-center" href="#">
                <i class="far fa-calendar-alt mr-1"></i> {{year}}
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link :to="{ name: 'pedidos' }" class="nav-link" v-on:click="loadPage"><i class="fas fa-clipboard"></i> Tabela</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'horarios' }" class="nav-link"><i class="fas fa-calendar-alt"></i> Horários</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'turmas' }" class="nav-link"><i class="fas fa-bars"></i> Turmas</router-link>
              </li>
             <!--
              <li class="nav-item">
                <router-link :to="{ name: 'relatorios' }" class="nav-link"><i class="fas fa-chart-line"></i> Relatórios</router-link>
              </li>
             -->
            </ul>
            <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted">Relatórios</h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'cargaProfessores' }" class="nav-link"><i class="fas fa-clipboard"></i> Carga Professores</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'horariosResumo' }" class="nav-link"><i class="fas fa-clipboard"></i> Horários - Resumo</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'laboratoriosAlocacao' }" class="nav-link"><i class="fas fa-clipboard"></i> Laboratórios - Alocação</router-link>
              </li>
            </ul>
            <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted">Gerenciar</h6>
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'cursos' }" class="nav-link"><i class="fas fa-graduation-cap"></i> Cursos</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'docentes' }" class="nav-link"><i class="fas fa-users"></i> Docentes</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'grades' }" class="nav-link"><i class="fas fa-sitemap"></i> Grades</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'perfis' }" class="nav-link"><i class="fas fa-th"></i> Perfis</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'disciplinas' }" class="nav-link"><i class="fas fa-table"></i>Disciplina</router-link>
              </li>
              <!--
               <li class="nav-item">
                 <router-link :to="{ name: 'prototipo' }" class="nav-link"><i class="fas fa-clipboard"></i>Protótipo</router-link>
               </li>
              -->
            </ul>
          </div>
        </nav>

        <div id="loading" v-if="isLoading">
          <div class="cube1"></div>
          <div class="cube2"></div>
        </div>

        <main role="main" class="col-md-11 ml-sm-auto col-lg-11 px-4" v-if="!isLoading">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import {COMPONENT_LOADING, COMPONENT_LOADED} from '../vuex/mutation-types'
import bddumpService from '../common/services/bddump'
import _ from 'lodash'

export default {
  name: 'TheDashboard',

  data: function () {
      return {
          files:[],
          filename:""
      }
  },

  computed: {
    year () {
      return this.$store.state.year
    },

    httpRequestCount () {
      return this.$store.state.httpRequestCount
    },

    isLoading () {
      return this.$store.state.isLoading
    }

  },

  created () {
    this.$store.commit(COMPONENT_LOADING)
    this.$store.dispatch('fetchAll').then(() => {
      this.$socket.open()
      this.$store.commit(COMPONENT_LOADED)
    }).catch(response => {
      console.log("ERRORRR")
      console.log(response)
    })
  },

  beforeDestroy () {
    this.$socket.close()
  },

  methods:{
      loadPage () {
          this.$store.commit(COMPONENT_LOADING)
      },

      bddump: function(filename) {
          bddumpService.createDump({filename: filename}).then((response)=> {
              this.$notify({
                  group: 'general',
                  title: `Sucesso!`,
                  text: `O dump foi criado!`,
                  type: 'success'
              })
              this.returnFiles()
          }).catch(error => {
              this.error = '<b>Erro ao criar dump</b>'
          })
          this.hideModalSave()
      },

      restorebd: function(filename) {
          bddumpService.restoredump(filename).then(()=> {
              this.$store.dispatch('fetchAll')
              this.hideModalLoad()
              this.returnFiles()
          }).catch(error => {
              this.error = '<b>Erro ao carregar dump</b>'
          })
      },
      returnFiles: function () {
          bddumpService.returnFiles().then((response)=> {
              this.files = response.Files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)})
              _.pull(this.files, "drop_all.sql")
              _.forEach(this.files, function(value, index, array) {array[index] = value.slice(0, -4)})
              //console.log(this.files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)}))
          })
      },

      showModalLoad () {
          this.filename=""
          this.returnFiles()
          this.$refs.modalLoad.show()
      },

      showModalSave () {
          this.filename=""
          this.returnFiles()
          this.$refs.modalSave.show()
      },

      hideModalLoad () {
          this.$refs.modalLoad.hide()
      },

      hideModalSave () {
          this.$refs.modalSave.hide()
      },

      selectFile(filename){
          this.filename = filename
      }
  }

}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  font-size: .875rem;

}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .fas {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .fas,
.sidebar .nav-link.active .fas {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

[role="main"] {
  padding-top: 48px; /* Space for fixed navbar */
}

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.navbar-nav > .nav-item > .nav-link {
  display: inline !important;
  margin-left: 10px;
}

.navbar-nav > .nav-item > .nav-link:hover {
  cursor: pointer;
}

/* Page Loading */
#loading {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  height: 64px;
  margin-left: -32px;
  margin-top: -32px;
  z-index: 99999;
}

.cube1, .cube2 {
  background-color: #333;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
  }
  100% {
    -webkit-transform: rotate(-360deg)
  }
}

@keyframes cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

</style>