<template>
  <div class="TheDashboard" v-bind:class="{ loading: isLoadingFile }">
    <TheNavbar
      :sidebarVisibility="sidebarVisibility"
      v-on:toggle-sidebar="toggleSidebar"
      v-on:show-modal-download="showModalDownload"
      v-on:show-modal-save="showModalSave"
      v-on:show-modal-load="showModalLoad"
      v-on:show-modal-novo-plano="showModalNovoPlano"
      v-on:show-modal-user="showModalUser"
    />

    <div class="container-fluid">
      <transition
        name="custom-transition"
        enter-active-class="animated slideInLeft sidebar-animation"
        leave-active-class="animated slideOutLeft sidebar-animation"
      >
        <TheSidebar v-if="sidebarVisibility" :year="year" />
      </transition>
      <main
        @click="closeSideBar()"
        role="main"
        class="col-12 p-0 px-2"
        v-if="!isLoading"
      >
        <router-view></router-view>
      </main>

      <div id="loading" v-if="isLoading">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
    </div>

    <b-modal
      id="modal-download"
      ref="modalDownload"
      title="Selecione um Arquivo"
    >
      <p
        v-for="value in files"
        :key="'1--' + value"
        v-on:click="selectFile(value)"
      >
        {{ value }}
      </p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="download(filename)"
          >Carregar Arquivo</b-button
        >
      </div>
    </b-modal>
    <b-modal
      id="modal-novo-plano"
      ref="modalNovoPlano"
      title="Informe o ano do novo plano"
    >
      <b-form-group
        label="Ano"
        label-for="NovoAno"
        label-cols-sm="4"
        label-cols-lg="3"
      >
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
    <b-modal
      id="modal-download-all"
      ref="modalDownloadAll"
      title="Download iniciado"
    >
      <p
        v-if="downloadState >= 0"
        v-bind:class="{ loadingEllipsis: downloadState === 0 }"
      >
        Preparando arquivos
      </p>
      <p
        v-if="downloadState >= 1"
        v-bind:class="{ loadingEllipsis: downloadState === 1 }"
      >
        Tabelas criadas
      </p>
      <p
        v-if="downloadState >= 2"
        v-bind:class="{ loadingEllipsis: downloadState === 2 }"
      >
        Relatórios criados
      </p>
      <p
        v-if="downloadState >= 3"
        v-bind:class="{ loadingEllipsis: downloadState === 3 }"
      >
        Arquivo .zip criado
      </p>
      <p v-if="downloadState >= 4">Download concluído</p>
      <div slot="modal-footer"></div>
    </b-modal>
    <b-modal id="modal-load" ref="modalLoad" title="Selecione um Arquivo">
      <p
        v-for="value in files"
        :key="'2--' + value"
        v-on:click="selectFile(value)"
      >
        {{ value }}
      </p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="restorebd(filename)"
          >Carregar Arquivo</b-button
        >
      </div>
    </b-modal>
    <b-modal
      id="modal-save"
      ref="modalSave"
      title="Escolha um nome para o arquivo"
    >
      <p
        v-for="value in files"
        :key="'3--' + value"
        v-on:click="selectFile(value)"
      >
        {{ value }}
      </p>
      <div slot="modal-footer">
        <input type="text" v-model="filename" style="margin-right: 10px" />
        <b-button variant="success" v-on:click="bddump(filename)"
          >Salvar Arquivo</b-button
        >
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
    <link
      href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
      rel="stylesheet"
      type="text/css"
    />
  </div>
</template>

<script>
import _ from "lodash";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
import bddumpService from "@/common/services/bddump";
import userService from "@/common/services/usuario";
import downloadService from "@/common/services/download";
import xlsxService from "@/common/services/xlsx";
import novoPlanoService from "@/common/services/novoPlano";
import planoService from "@/common/services/plano";
import { saveAs } from "file-saver";
import { EventBus } from "@/event-bus.js";
import TheNavbar from "./TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";

const emptyUser = {
  nome: undefined,
  login: undefined,
  senha: undefined,
  senhaAtual: undefined,
};
const emptyPlano = {
  ano: undefined,
  obs: undefined,
};

export default {
  name: "TheDashboard",
  components: { TheSidebar, TheNavbar },

  data: function() {
    return {
      files: [],
      filename: "",
      isLoadingFile: false,
      userModalMode: 0,
      userForm: _.clone(emptyUser),
      downloadState: 0,
      planoForm: _.clone(emptyPlano),
      sidebarVisibility: false,
    };
  },
  created() {
    this.$store.commit(COMPONENT_LOADING);
    this.$store
      .dispatch("fetchAll")
      .then(() => {
        this.$socket.open();
        this.$store.commit(COMPONENT_LOADED);
      })
      .catch((response) => {
        console.log("ERRORRR");
        console.log(response);
      });

    this.$store.commit("setYear", 2019);
  },
  mounted() {
    EventBus.$on("close-sidebar", this.closeSideBar);
  },
  beforeDestroy() {
    EventBus.$off("close-sidebar");
    this.$socket.close();
  },
  methods: {
    toggleSidebar() {
      this.sidebarVisibility = !this.sidebarVisibility;
    },
    closeSideBar() {
      this.sidebarVisibility = false;
    },
    bddump: function(filename) {
      bddumpService
        .createDump({ filename: filename })
        .then(() => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O dump foi criado!`,
            type: "success",
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
        .then((response) => {
          if (response.success == true) {
            this.$notify({
              group: "general",
              type: "success",
              text: `O banco foi restaurado com sucesso`,
            });
            this.$store.dispatch("fetchAll");
            this.hideModalLoad();
            this.returnFiles();
            this.isLoadingFile = false;
          } else {
            this.$notify({
              group: "general",
              type: "danger",
              text: "Falha ao restaurar o banco",
            });
          }
        })
        .catch(() => {
          this.error = "<b>Erro ao carregar dump</b>";
        });
    },

    download: async function() {
      return new Promise((resolve) => {
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
                        Authorization: `Bearer ${this.$store.state.auth.token}`,
                      },
                    })
                      .then((r) => r.blob())
                      .then((blob) => {
                        saveAs(blob, "data.zip");
                        this.downloadState++;
                        resolve();
                      })
                      .catch((e) => console.log(e));
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    },

    startDownload: async function() {
      await this.download();
    },

    returnFiles: function() {
      bddumpService.returnFiles().then((response) => {
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
    },
  },
  computed: {
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
  },
};
</script>

<style scoped>
.TheDashboard {
  width: 100% !important;
  height: 100%;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.container-fluid {
  max-width: 100%;
  margin: 0;
  padding: 0;
  margin-top: var(--navbar-height);
  height: 100%;
  transition: all 200ms ease;
}
[role="main"] {
  overflow-y: auto !important;
  height: -webkit-calc(100vh - var(--navbar-height));
  height: -moz-calc(100vh - var(--navbar-height));
  height: calc(100vh - var(--navbar-height));
  transition: all 200ms ease;
}
.loading {
  cursor: progress;
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

.sidebar-animation {
  -webkit-animation-duration: 0.3s;
  -moz-animation-duration: 0.3s;
  -o-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
}

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
</style>
