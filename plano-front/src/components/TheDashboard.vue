<template>
  <div class="TheDashboard" v-bind:class="{'loading' : isLoadingFile}">
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css" />

    <nav class="navbar navbar-dark bg-dark fixed-top shadow">
      <div class="row w-100 m-0">
        <router-link
          :to="{ name: 'dashboard' }"
          class="navbar-brand col-sm-3 col-md-2 col-2 mr-0"
          style="text-align: center;"
        >Plano Departamental</router-link>
        <transition name="custom-classes-transition" mode="out-in">
          <button v-if="show" @click="show=!show" key="save" type="button" class="btn-navbar">
            <i key="save" class="fas fa-times"></i>
          </button>

          <button v-else @click="show=!show" key="edit" type="button" class="btn-navbar">
            <i class="fas fa-bars"></i>
          </button>
        </transition>

        <ul class="navbar-nav listaNavbarTop" style="flex-direction:row;">
          <li class="nav-item">
            <div class="div-nav-top nav-link" v-on:click="showModalUser">
              <i class="icons-top mr-1 fas fa-user"></i>
              <span class="text-nav-top">Usuário</span>
            </div>
          </li>
          <li class="nav-item">
            <div class="div-nav-top nav-link" v-on:click="showModalNovoPlano">
              <i class="icons-top mr-1 fas fa-plus-square"></i>
              <span class="text-nav-top">Novo</span>
            </div>
          </li>
          <li class="nav-item">
            <div class="div-nav-top nav-link" v-on:click="showModalLoad">
              <i class="icons-top mr-1 fas fa-folder-open"></i>
              <span class="text-nav-top">Carregar</span>
            </div>
          </li>
          <li class="nav-item">
            <div class="div-nav-top nav-link" v-on:click="showModalSave">
              <i class="icons-top mr-1 fas fa-file"></i>
              <span class="text-nav-top">Salvar</span>
            </div>
          </li>
          <li class="nav-item">
            <div class="div-nav-top nav-link" v-on:click="showModalDownload">
              <i class="icons-top mr-1 fas fa-save"></i>
              <span class="text-nav-top">Download</span>
            </div>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'logout' }" class="div-nav-top nav-link">
              <i class="icons-top mr-1 fas fa-sign-out-alt"></i>
              <span class="text-nav-top">Logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row m-0" style="max-width:100%; height:100%;">
        <!-- TRANSIÇÃO SIDEBAR -->
        <transition
          name="custom-classes-transition"
          enter-active-class="animated slideInLeft sidebar-animated"
          leave-active-class="animated slideOutLeft sidebar-animated"
        >
          <nav
            v-if="show"
            class="sidebar col-5 col-sm-4 col-md-3 col-lg-2 col-xl-2 d-block d-md-block bg-light"
          >
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'dashboard' }" class="nav-link">
                    <i class="fas fa-home"></i> Dashboard
                  </router-link>
                </li>
              </ul>

              <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              >
                <span>Plano</span>
                <a class="d-flex align-items-center" href="#">
                  <i class="far fa-calendar-alt mr-1"></i>
                  {{year}}
                </a>
              </h6>
              <ul class="nav flex-column mb-2">
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'pedidos' }" class="nav-link" v-on:click="loadPage">
                    <i class="fas fa-clipboard"></i> Tabela
                  </router-link>
                </li>
                <li v-if="Admin" @click="show=false" class="nav-item">
                  <router-link
                    :to="{ name: 'turmasExternas' }"
                    class="nav-link"
                    v-on:click="loadPage"
                  >
                    <i class="fas fa-clipboard"></i> Tabela Externa
                  </router-link>
                </li>
                <li v-if="Admin" @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'cargaPos' }" class="nav-link" v-on:click="loadPage">
                    <i class="fas fa-clipboard"></i> Creditação Pós
                  </router-link>
                </li>
                <li v-if="Admin" @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'horarios' }" class="nav-link">
                    <i class="fas fa-calendar-alt"></i> Horários
                  </router-link>
                </li>
                <!--<li v-if="Admin" @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'turmas' }" class="nav-link">
                    <i class="fas fa-bars"></i> Turmas
                  </router-link>
                </li>-->
              </ul>
              <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted">Relatórios</h6>
              <ul class="nav flex-column">
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'cargaProfessores' }" class="nav-link">
                    <i class="fas fa-clipboard"></i> Carga Professores
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'horariosResumo' }" class="nav-link">
                    <i class="fas fa-clipboard"></i> Horários - Resumo
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'laboratoriosAlocacao' }" class="nav-link">
                    <i class="fas fa-clipboard"></i> Alocação - Laboratórios
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'gradeDisciplinas' }" class="nav-link">
                    <i class="fas fa-clipboard"></i> Grades Disciplinas
                  </router-link>
                </li>
              </ul>
              <h6 class="sidebar-heading px-3 mt-4 mb-1 text-muted" v-if="Admin">Gerenciar</h6>
              <ul class="nav flex-column mb-4" v-if="Admin">
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'cursos' }" class="nav-link">
                    <i class="fas fa-graduation-cap"></i> Cursos
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'docentes' }" class="nav-link">
                    <i class="fas fa-users"></i> Docentes
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'grades' }" class="nav-link">
                    <i class="fas fa-sitemap"></i> Grades
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'perfis' }" class="nav-link">
                    <i class="fas fa-th"></i> Perfis
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'disciplinas' }" class="nav-link">
                    <i class="fas fa-table"></i>Disciplina
                  </router-link>
                </li>
                <li @click="show=false" class="nav-item">
                  <router-link :to="{ name: 'salas' }" class="nav-link">
                    <i class="fas fa-clipboard"></i>Salas
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
        </transition>

        <main @click="show=false" role="main" class="col-12 pl-2 pr-0 pt-0 pl-0" v-if="!isLoading">
          <router-view></router-view>
        </main>

        <div id="loading" v-if="isLoading">
          <div class="cube1"></div>
          <div class="cube2"></div>
        </div>
      </div>
    </div>

    <b-modal id="modal-download" ref="modalDownload" title="Selecione um Arquivo">
      <p v-for="(value) in files" :key="'1'+value" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="download(filename);">Carregar Arquivo</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-novo-plano" ref="modalNovoPlano" title="Informe o ano do novo plano">
      <b-form-group label="Ano" label-for="NovoAno" label-cols-sm="4" label-cols-lg="3">
        <b-form-input
          id="NovoAno"
          type="text"
          v-model="planoForm.ano"
          style="margin-right: 10px; width: 60px;"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Observações"
        label-for="ObsNovoPlano"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-textarea
          id="ObsNovoPlano"
          type="text"
          v-model="planoForm.obs"
          style="margin-right: 10px;"
        ></b-form-textarea>
      </b-form-group>
      <div slot="modal-footer">
        <b-button disabled v-on:click="novoPlano()">Criar Plano</b-button>
        <!-- variant "success"-->
      </div>
    </b-modal>
    <b-modal id="modal-download-all" ref="modalDownloadAll" title="Download iniciado">
      <p
        v-if="downloadState >= 0"
        v-bind:class="{loadingEllipsis : downloadState===0}"
      >Preparando arquivos</p>
      <p
        v-if="downloadState >= 1"
        v-bind:class="{loadingEllipsis : downloadState===1}"
      >Tabelas criadas</p>
      <p
        v-if="downloadState >= 2"
        v-bind:class="{loadingEllipsis : downloadState===2}"
      >Relatórios criados</p>
      <p
        v-if="downloadState >= 3"
        v-bind:class="{loadingEllipsis : downloadState===3}"
      >Arquivo .zip criado</p>
      <p v-if="downloadState >= 4">Download concluído</p>
      <div slot="modal-footer"></div>
    </b-modal>
    <b-modal id="modal-load" ref="modalLoad" title="Selecione um Arquivo">
      <p v-for="(value) in files" :key="'2'+value" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="restorebd(filename);">Carregar Arquivo</b-button>
      </div>
    </b-modal>
    <b-modal id="modal-save" ref="modalSave" title="Escolha um nome para o arquivo">
      <p v-for="(value) in files" :key="'3'+value" v-on:click="selectFile(value)">{{value}}</p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="bddump(filename);">Salvar Arquivo</b-button>
      </div>
    </b-modal>
    <b-modal
      id="modal-user"
      ref="modalUser"
      title="Usuário"
      ok-only
      ok-title="Cancelar"
      ok-variant="secondary"
    >
      <template v-if="userModalMode === 0">
        <b-button v-on:click="createMode()">Criar Usuário</b-button>
        <br />
        <br />
        <b-button v-on:click="editMode()">Editar Usuário</b-button>
      </template>
      <template v-if="userModalMode === 1">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="userForm.nome" />
        <br />
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="userForm.login" />
        <br />
        <label for="senha">Senha:</label>
        <input type="text" id="senha" v-model="userForm.senha" />
        <div slot="modal-footer">
          <b-button variant="success" v-on:click="createUser()">Criar</b-button>
          <b-button v-on:click="cancelMode()">Cancelar</b-button>
        </div>
      </template>
      <template v-if="userModalMode === 2">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="userForm.nome" />
        <br />
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="userForm.login" />
        <br />
        <label for="senhaAtual">Senha Atual:</label>
        <input type="text" id="senhaAtual" v-model="userForm.senhaAtual" />
        <br />
        <label for="senha">Senha:</label>
        <input type="text" id="senha" v-model="userForm.senha" />
        <div slot="modal-footer">
          <b-button variant="success" v-on:click="editUser()">Editar</b-button>
          <b-button v-on:click="cancelMode()">Cancelar</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { COMPONENT_LOADING, COMPONENT_LOADED } from "../vuex/mutation-types";
import bddumpService from "../common/services/bddump";
import userService from "../common/services/usuario";
import _ from "lodash";
import downloadService from "../common/services/download";
import xlsxService from "../common/services/xlsx";
import novoPlanoService from "../common/services/novoPlano";
import planoService from "../common/services/plano";
import { saveAs } from "file-saver";

const emptyUser = {
  nome: undefined,
  login: undefined,
  senha: undefined,
  senhaAtual: undefined
};

const emptyPlano = {
  ano: undefined,
  obs: undefined
};

export default {
  name: "TheDashboard",

  data: function() {
    return {
      files: [],
      filename: "",
      isLoadingFile: false,
      userModalMode: 0,
      userForm: _.clone(emptyUser),
      downloadState: 0,
      planoForm: _.clone(emptyPlano),
      show: false
    };
  },

  computed: {
    falso() {
      return !this.show;
    },
    year() {
      if (!_.isEmpty(this.$store.state.plano.Plano)) {
        if (typeof this.$store.state.plano.Plano[0].ano === "string")
          this.planoForm.ano =
            parseInt(this.$store.state.plano.Plano[0].ano) + 1;
        else this.planoForm.ano = this.$store.state.plano.Plano[0].ano + 1;
        return this.$store.state.plano.Plano[0].ano;
      } else return 2019;
    },

    httpRequestCount() {
      return this.$store.state.httpRequestCount;
    },

    isLoading() {
      return this.$store.state.isLoading;
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    }
  },

  created() {
    this.$store.commit(COMPONENT_LOADING);
    this.$store
      .dispatch("fetchAll")
      .then(() => {
        this.$socket.open();
        this.$store.commit(COMPONENT_LOADED);
      })
      .catch(response => {
        console.log("ERRORRR");
        console.log(response);
      });

    this.$store.commit("setYear", 2019);
  },

  beforeDestroy() {
    this.$socket.close();
  },

  methods: {
    loadPage() {
      this.$store.commit(COMPONENT_LOADING);
    },
    toggleNavbar() {
      this.show = !this.show;
    },
    bddump: function(filename) {
      bddumpService
        .createDump({ filename: filename })
        .then(() => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O dump foi criado!`,
            type: "success"
          });
          this.returnFiles();
        })
        .catch(() => {
          this.error = "<b>Erro ao criar dump</b>";
        });
      this.hideModalSave();
    },

    novoPlano: async function() {
      await this.download();
      let ano;
      if (!_.isEmpty(this.$store.state.plano.Plano)) {
        ano = this.$store.state.plano.Plano[0].ano;
      } else ano = 2019;

      planoService.update(ano, this.planoForm).then(() => {
        novoPlanoService.criarNovoPlano().then(() => {
          this.$store.dispatch("fetchAll");
          this.$refs.modalNovoPlano.hide();
        });
        console.log("novo ano: " + this.planoForm.ano);
      });
    },

    restorebd: function(filename) {
      this.isLoadingFile = true;
      bddumpService
        .restoredump(filename)
        .then(response => {
          if (response.success == true) {
            this.$notify({
              group: "general",
              type: "success",
              text: `O banco foi restaurado com sucesso`
            });
            this.$store.dispatch("fetchAll");
            this.hideModalLoad();
            this.returnFiles();
            this.isLoadingFile = false;
          } else {
            this.$notify({
              group: "general",
              type: "danger",
              text: "Falha ao restaurar o banco"
            });
          }
        })
        .catch(() => {
          this.error = "<b>Erro ao carregar dump</b>";
        });
    },

    download: async function() {
      return new Promise(resolve => {
        this.downloadState = 0;
        let pedidos = this.$store.state.pedido.Pedidos;
        xlsxService
          .downloadTable({ pedidos: pedidos })
          .then(() => {
            console.log("Tabela Gerada");
            this.downloadState++;
            downloadService
              .generatePdf()
              .then(() => {
                console.log("PDFs Gerados");
                this.downloadState++;
                downloadService
                  .download()
                  .then(() => {
                    console.log("done");
                    this.downloadState++;
                    fetch("http://200.131.219.57:3000/api/download/all", {
                      method: "GET",
                      headers: {
                        Authorization: `Bearer ${this.$store.state.auth.token}`
                      }
                    })
                      .then(r => r.blob())
                      .then(blob => {
                        saveAs(blob, "data.zip");
                        this.downloadState++;
                        resolve();
                      })
                      .catch(e => console.log(e));
                  })
                  .catch(e => console.log(e));
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      });
    },

    startDownload: async function() {
      await this.download();
    },

    returnFiles: function() {
      bddumpService.returnFiles().then(response => {
        this.files = response.Files.filter(function(elm) {
          return elm.match(/.*\.(sql)/gi);
        });
        _.pull(this.files, "drop_all.sql");
        _.forEach(this.files, function(value, index, array) {
          array[index] = value.slice(0, -4);
        });
        //console.log(this.files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)}))
      });
    },

    createUser() {
      userService.create(this.userForm).then(() => {
        console.log("usuário criado");
        this.hideModalUser();
        this.userModalMode = 0;
      });
    },

    editUser() {
      userService
        .update(this.$store.state.auth.Usuario.id, this.userForm)
        .then(() => {
          console.log("usuário editado");
          this.hideModalUser();
          this.userModalMode = 0;
        });
    },

    showModalNovoPlano() {
      this.$refs.modalNovoPlano.show();
    },

    showModalLoad() {
      this.filename = "";
      this.returnFiles();
      this.$refs.modalLoad.show();
    },

    showModalDownload() {
      this.$refs.modalDownloadAll.show();
      this.startDownload();
    },

    showModalSave() {
      this.filename = "";
      this.returnFiles();
      this.$refs.modalSave.show();
    },

    showModalUser() {
      this.$refs.modalUser.show();
    },

    hideModalLoad() {
      this.$refs.modalLoad.hide();
    },

    hideModalSave() {
      this.$refs.modalSave.hide();
    },

    hideModalUser() {
      this.$refs.modalUser.hide();
    },

    selectFile(filename) {
      this.filename = filename;
    },

    createMode() {
      this.userModalMode = 1;
    },

    editMode() {
      console.log(this.$store.state.auth.Usuario);
      this.userForm.nome = this.$store.state.auth.Usuario.nome;
      this.userForm.login = this.$store.state.auth.Usuario.login;
      this.userModalMode = 2;
    },

    cancelMode() {
      this.userModalMode = 0;
    }
  }
};
</script>

<style scoped>
/* prefixed */
.TheDashboard {
  max-width: 100% !important;
  height: 100%;
  overflow: hidden !important;
  margin: 0 !important;
}
.loading {
  cursor: progress;
}
/*=== side bar ===*/
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
.nav li a i {
  padding-left: 0.3em;
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
.nav-link {
  font-size: 12px;
  height: 30px;
  padding: 5px!important;
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
.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}
.sidebar .nav-link .fas {
  margin-right: 4px;
  color: #999;
}
.sidebar .nav-link:hover .fas,
.sidebar .nav-link.active .fas {
  color: inherit;
}
.sidebar-heading {
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
}
/* SCROLL BAR CUSTOM */
.sidebar-sticky ::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}
.sidebar-sticky::-webkit-scrollbar {
  width: 6px;
  background: #f4f4f4;
}
.sidebar-sticky::-webkit-scrollbar-thumb {
  background: #666;
}
/* ========= */

.container-fluid {
  max-width: 100%;
  margin: 0px;
  padding-right: 0px;
  padding-left: 0px;
}
[role="main"] {
  margin-top: 32px; /* Space for fixed navbar */
  overflow-y: auto !important;
  height: -webkit-calc(100vh - 32px);
  height: -moz-calc(100vh - 32px);
  height: calc(100vh - 32px);
}

.navbar-brand {
  height: 30px;
  color: rgb(213, 214, 216);
  font-size: 15px;
  padding: 3px 12px 5px 10px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  -moz-box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}
.navbar-brand:hover {
  color: rgb(255, 255, 255);
}
.navbar {
  padding: 0;
  margin: 0;
  height: 30px;
  border-width: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}
.listaNavbarTop {
  margin-left: auto;
  padding: 0;
}
.div-nav-top {
  margin-right: 5px;
  margin-left: 0px;
}

.navbar-nav > .nav-item > .nav-link:hover {
  cursor: pointer;
}
.navbar-nav {
  height: 30px;
}

/*Download Files Loading*/
.loadingEllipsis:after {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
  -webkit-animation: ellipsis steps(4, end) 900ms infinite;
  -moz-animation: ellipsis steps(4, end) 900ms infinite;
  -o-animation: ellipsis steps(4, end) 900ms infinite;
  animation: ellipsis steps(4, end) 900ms infinite;
  content: "\2026"; /* ascii code for the ellipsis character */
  width: 0px;
}

@-moz-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

@-o-keyframes ellipsis {
  to {
    width: 1.25em;
  }
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

.cube1,
.cube2 {
  background-color: #333;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  -moz-animation: cubemove 1.8s infinite ease-in-out;
  -o-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  -moz-animation-delay: -0.9s;
  -o-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@-moz-keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

@-o-keyframes cubemove {
  25% {
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes cubemove {
  25% {
    -moz-transform: translateX(42px) rotate(-90deg) scale(0.5);
    -o-transform: translateX(42px) rotate(-90deg) scale(0.5);
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-179deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-179deg);
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    -moz-transform: translateX(42px) translateY(42px) rotate(-180deg);
    -o-transform: translateX(42px) translateY(42px) rotate(-180deg);
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -moz-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -o-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -moz-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}

/* Remove seleção do usuario da nav bar*/
.navbar {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn-navbar {
  width: 40px;
  padding: 0 6px 0 6px;
  height: 30px;
  margin-left: 0px;
  color: #cccdcf;
  background-color: rgba(0, 0, 0, 0.25);
  font-size: 20px;
  border: 1px;
}
.btn-navbar:hover {
  color: white;
}

.aplicaCor {
  background-color: rgb(226, 226, 226);
  color: rgba(0, 0, 0, 0.753);
}

.sidebar-animated {
  -webkit-animation-duration: 0.3s;
  -moz-animation-duration: 0.3s;
  -o-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
}

@media screen and (max-width: 425px) {
  [role="main"] {
    margin-top: 62px;
  }
  .sidebar {
    margin-top: 62px;
  }
  .listaNavbarTop {
    margin-left: 0;
    width: 100%;
  }
  .navbar {
    /*Aumenta a altura da navbar */
    height: 60px !important;
  }
}
/* SUMIR ICONES DA NAVBAR TOP */
@media screen and (max-width: 640px) {
  .text-nav-top {
    display: none;
  }
  .icons-top {
    margin-right: 10px !important;
  }
}
/* #ffe1c6 COR ENGENHARIA DE SOFTWARE */
</style>