<template>
  <div class="TheDashboard" v-bind:class="{'loading' : isLoadingFile}">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link :to="{ name: 'dashboard' }" class="navbar-brand col-sm-3 col-md-2 mr-0">Plano Departamental</router-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <p class="nav-link" v-on:click="showModalUser"><i class="fas fa-user"></i> Usuário</p>
          <p class="nav-link" v-on:click="showModalNovoPlano"><i class="fas fa-plus-square"></i> Novo </p>
          <p class="nav-link" v-on:click="showModalLoad"><i class="fas fa-folder-open"></i> Carregar</p>
          <p class="nav-link" v-on:click="showModalSave"><i class="fas fa-file"></i> Salvar</p>
          <p class="nav-link" v-on:click="showModalDownload"><i class="fas fa-save"></i> Download</p>
          <router-link :to="{ name: 'logout' }" class="nav-link"><i class="fas fa-sign-out-alt"></i> Logout</router-link>
        </li>
      </ul>
    </nav>
    <b-modal id="modal-download" ref="modalDownload" title="Selecione um Arquivo">
      <p v-for="(value) in files" :key="'1'+value" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px">
        <b-button variant="success" v-on:click="download(filename);">Carregar Arquivo</b-button>
      </div>
    </b-modal>

    <b-modal id="modal-novo-plano" ref="modalNovoPlano" title="Informe o ano do novo plano">
      <b-form-group label="Ano" label-for="NovoAno" label-cols-sm="4" label-cols-lg="3">
        <b-form-input id="NovoAno" type="text" v-model="planoForm.ano" style="margin-right: 10px; width: 60px;"></b-form-input>
      </b-form-group>
      <b-form-group label="Observações" label-for="ObsNovoPlano" label-cols-sm="4" label-cols-lg="3">
        <b-form-textarea id="ObsNovoPlano" type="text" v-model="planoForm.obs" style="margin-right: 10px;"></b-form-textarea>
      </b-form-group>
      <div slot="modal-footer">

            <b-button v-on:click="novoPlano()" variant= "success">Criar Plano</b-button>
        </div>
    </b-modal>


      <b-modal id="modal-download-all" ref="modalDownloadAll" title="Download iniciado">
      <p v-if="downloadState >= 0" v-bind:class="{loadingEllipsis : downloadState===0}">Preparando arquivos</p>
      <p v-if="downloadState >= 1" v-bind:class="{loadingEllipsis : downloadState===1}">Tabelas criadas</p>
      <p v-if="downloadState >= 2" v-bind:class="{loadingEllipsis : downloadState===2}">Relatórios criados</p>
      <p v-if="downloadState >= 3" v-bind:class="{loadingEllipsis : downloadState===3}">Arquivo .zip criado</p>
      <p v-if="downloadState >= 4">Download concluído</p>
      <div slot="modal-footer">
      </div>
    </b-modal>
    <b-modal id="modal-load" ref="modalLoad" title="Selecione um Arquivo">
      <p v-for="(value) in files" :key="'2'+value" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px">
        <b-button variant="success" v-on:click="restorebd(filename);">Carregar Arquivo</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-save" ref="modalSave" title="Escolha um nome para o arquivo">
      <p v-for="(value) in files" :key="'3'+value" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px">
        <b-button variant="success" v-on:click="bddump(filename);">Salvar Arquivo</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-user" ref="modalUser" title="Usuário" ok-only ok-title="Cancelar" ok-variant="secondary">
      <template v-if="userModalMode === 0">
        <b-button v-on:click="createMode()">Criar Usuário</b-button>
        <br/><br/>
        <b-button v-on:click="editMode()">Editar Usuário</b-button>
      </template>
      <template v-if="userModalMode === 1">
        <label for="nome">Nome: </label>
        <input type="text" id="nome" v-model="userForm.nome">
        <br/>
        <label for="login">Login: </label>
        <input type="text" id="login" v-model="userForm.login">
        <br/>
        <label for="senha">Senha: </label>
        <input type="text" id="senha" v-model="userForm.senha">
        <div slot="modal-footer">
          <b-button variant="success" v-on:click="createUser()">Criar</b-button>
          <b-button v-on:click="cancelMode()">Cancelar</b-button>
        </div>
      </template>
      <template v-if="userModalMode === 2">
        <label for="nome">Nome: </label>
        <input type="text" id="nome" v-model="userForm.nome">
        <br/>
        <label for="login">Login: </label>
        <input type="text" id="login" v-model="userForm.login">
        <br/>
        <label for="senhaAtual">Senha Atual: </label>
        <input type="text" id="senhaAtual" v-model="userForm.senhaAtual">
        <br/>
        <label for="senha">Senha: </label>
        <input type="text" id="senha" v-model="userForm.senha">
        <div slot="modal-footer">
          <b-button variant="success" v-on:click="editUser()">Editar</b-button>
          <b-button v-on:click="cancelMode()">Cancelar</b-button>
        </div>
      </template>
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
            <ul class="nav flex-column mb-2" v-if="Admin">
              <li class="nav-item">
                <router-link :to="{ name: 'pedidos' }" class="nav-link" v-on:click="loadPage"><i class="fas fa-clipboard"></i> Tabela</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'turmasExternas' }" class="nav-link" v-on:click="loadPage"><i class="fas fa-clipboard"></i> Tabela Externa</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'cargaPos' }" class="nav-link" v-on:click="loadPage"><i class="fas fa-clipboard"></i> Tabela Pós</router-link>
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
              <li class="nav-item">
                <router-link :to="{ name: 'gradeDisciplinas' }" class="nav-link"><i class="fas fa-clipboard"></i> Grades Disciplinas</router-link>
              </li>
            </ul>
            <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted" v-if="Admin">Gerenciar</h6>
            <ul class="nav flex-column" v-if="Admin">
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
               <li class="nav-item">
                 <router-link :to="{ name: 'salas' }" class="nav-link"><i class="fas fa-clipboard"></i>Salas</router-link>
               </li>

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
import userService from '../common/services/usuario'
import _ from 'lodash'
import downloadService from '../common/services/download'
import xlsxService from '../common/services/xlsx'
import novoPlanoService from '../common/services/novoPlano'
import planoService from '../common/services/plano'
import {saveAs} from 'file-saver'

const emptyUser = {
    nome: undefined,
    login: undefined,
    senha: undefined,
    senhaAtual: undefined
}

const emptyPlano = {
    ano:undefined,
    obs:undefined
}

export default {
  name: 'TheDashboard',

  data: function () {
      return {
          files:[],
          filename:"",
          isLoadingFile: false,
          userModalMode: 0,
          userForm: _.clone(emptyUser),
          downloadState : 0,
          planoForm : _.clone(emptyPlano)
      }
  },

  computed: {
    year () {
      if(!(_.isEmpty(this.$store.state.plano.Plano))) {
          if(typeof this.$store.state.plano.Plano[0].ano === 'string')
              this.planoForm.ano = parseInt(this.$store.state.plano.Plano[0].ano) + 1
          else
              this.planoForm.ano = this.$store.state.plano.Plano[0].ano + 1
          return this.$store.state.plano.Plano[0].ano
      }else
        return 2019
    },

    httpRequestCount () {
      return this.$store.state.httpRequestCount
    },

    isLoading () {
      return this.$store.state.isLoading
    },

    Admin () {
      if(this.$store.state.auth.Usuario.admin===1){
        return true
      }else{
        return false
      }
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

    this.$store.commit('setYear', 2019)
  },

  beforeDestroy () {
    this.$socket.close()
  },

  methods:{
      loadPage () {
          this.$store.commit(COMPONENT_LOADING)
      },

      bddump: function(filename) {
          bddumpService.createDump({filename: filename}).then(()=> {
              this.$notify({
                  group: 'general',
                  title: `Sucesso!`,
                  text: `O dump foi criado!`,
                  type: 'success'
              })
              this.returnFiles()
          }).catch(() => {
              this.error = '<b>Erro ao criar dump</b>'
          })
          this.hideModalSave()
      },

      novoPlano: async function() {
          await this.download()
          let ano
          if(!(_.isEmpty(this.$store.state.plano.Plano))) {
              ano = this.$store.state.plano.Plano[0].ano
          }else
              ano = 2019

          planoService.update(ano, this.planoForm).then(() => {
              novoPlanoService.criarNovoPlano().then(() => {
                  this.$store.dispatch('fetchAll')
                  this.$refs.modalNovoPlano.hide()
              })
             console.log('novo ano: ' + this.planoForm.ano)
          })
      },

      restorebd: function(filename) {
          this.isLoadingFile = true
          bddumpService.restoredump(filename).then((response)=> {
              if(response.success == true){
                this.$notify({
                    group:'general',
                    type:'success',
                    text: `O banco foi restaurado com sucesso`
                })
                this.$store.dispatch('fetchAll')
                this.hideModalLoad()
                this.returnFiles()
                this.isLoadingFile = false
              }else{
                  this.$notify({
                      group:'general',
                      type:'danger',
                      text:'Falha ao restaurar o banco'
                  })
              }
          }).catch(() => {
              this.error = '<b>Erro ao carregar dump</b>'
          })

      },

      download: async function() {
          return new Promise((resolve) => {
          this.downloadState = 0
          let pedidos = this.$store.state.pedido.Pedidos
          xlsxService.downloadTable({pedidos:pedidos}).then(() => {
              console.log('Tabela Gerada')
              this.downloadState++
              downloadService.generatePdf().then(() => {
                  console.log('PDFs Gerados')
                  this.downloadState++
                  downloadService.download().then(() => {
                      console.log('done')
                      this.downloadState++
                      fetch("http://200.131.219.57:3000/api/download/all", {method:'GET', headers:{'Authorization': `Bearer ${this.$store.state.auth.token}`}}).then(r => r.blob())
                          .then(blob => {
                              saveAs(blob, "data.zip")
                              this.downloadState++
                              resolve()
                          }).catch(e => console.log(e))
                  }).catch(e => console.log(e))
              }).catch(e => console.log(e))
          }).catch(e => console.log(e))
      })
      },

      startDownload: async function () {
          await this.download()
      },

      returnFiles: function () {
          bddumpService.returnFiles().then((response)=> {
              this.files = response.Files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)})
              _.pull(this.files, "drop_all.sql")
              _.forEach(this.files, function(value, index, array) {array[index] = value.slice(0, -4)})
              //console.log(this.files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)}))
          })
      },

      createUser () {
          userService.create(this.userForm).then(() =>{
              console.log("usuário criado")
              this.hideModalUser()
              this.userModalMode = 0
          })
      },

      editUser () {
          userService.update(this.$store.state.auth.Usuario.id, this.userForm).then(() =>{
              console.log("usuário editado")
              this.hideModalUser()
              this.userModalMode = 0
          })
      },

      showModalNovoPlano () {
          this.$refs.modalNovoPlano.show()
      },

      showModalLoad () {
          this.filename=""
          this.returnFiles()
          this.$refs.modalLoad.show()
      },

      showModalDownload () {
          this.$refs.modalDownloadAll.show()
          this.startDownload()
      },

      showModalSave () {
          this.filename=""
          this.returnFiles()
          this.$refs.modalSave.show()
      },

      showModalUser () {
          this.$refs.modalUser.show()
      },

      hideModalLoad () {
          this.$refs.modalLoad.hide()
      },

      hideModalSave () {
          this.$refs.modalSave.hide()
      },

      hideModalUser () {
          this.$refs.modalUser.hide()
      },

      selectFile(filename){
          this.filename = filename
      },

      createMode () {
          this.userModalMode = 1
      },

      editMode () {
          console.log(this.$store.state.auth.Usuario)
          this.userForm.nome = this.$store.state.auth.Usuario.nome
          this.userForm.login = this.$store.state.auth.Usuario.login
          this.userModalMode = 2
      },

      cancelMode () {
          this.userModalMode = 0
      }
  },

}
</script>

<style scoped>
  .loading {
    cursor: progress;
  }

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

/*Download Files Loading*/
  .loadingEllipsis:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 900ms infinite;
    animation: ellipsis steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;
    }
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