<template>
  <div class="DashboardDocentes row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-12 titulo">Lista Docentes</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>
    <!-- Fim do Titulo -->

    <!-- Grid Esquerdo -->

    <!-- Inicio da Tabela -->
    <div class="p-0 divTable">
      <table class="table table-hover table-sm">
        <thead class="thead-light">
          <tr>
            <div style="width: 415px " class="sticky">
              <th scope="col">
                <p
                  @click="toggleOrdenacaoNome()"
                  title="Clique para ordenar por nome"
                  class="p-header clickable-header"
                  style="width: 240px; text-align: start;"
                >
                  Nome
                  <i
                    v-if="ordenacao=='nome'"
                    style="font-size:0.6rem"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  @click="toggleOrdenacaoApelido()"
                  title="Clique para ordenar por apelido"
                  class="p-header clickable-header"
                  style="width: 130px"
                >
                  Apelido
                  <i
                    v-if="ordenacao=='apelido'"
                    style="font-size:0.6rem"
                    class="fas fa-arrow-down fa-sm"
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 45px">Ativo</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Docentes.length > 0">
            <tr
              v-for="docente in Docentes"
              :key="docente.id"
              v-on:click.prevent="showDocentes(docente, DocentePerfis)"
              :class="{'bg-custom':docenteClickado == docente.nome}"
              style="cursor: pointer"
            >
              <div style="width: 415px">
                <td>
                  <p style="width: 240px; text-align: start!important">{{docente.nome}}</p>
                </td>
                <td>
                  <p style="width: 130px">{{docente.apelido}}</p>
                </td>
                <td>
                  <div style="width: 45px">
                    <input
                      class="form-check-input position-static noHover"
                      v-on:click.prevent="showDocentes(docente, DocentePerfis)"
                      type="checkbox"
                      v-model="docente.ativo"
                    />
                  </div>
                </td>
              </div>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum docente encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- Fim da Tabela -->
    </div>
    <!-- Fim do Grid Esquerdo -->

    <!-- Grid Direito -->
    <div class="div-card p-0 mt-0 mb-2 col-lg-6 col-md-6 col-sm-12 col-12">
      <div class="card mr-4 ml-auto">
        <div class="card-header">
          <template v-if="isEdit">
            <h1 class="card-title">Docente</h1>
          </template>
          <template v-else>
            <h1 class="card-title">Docente</h1>
          </template>
        </div>

        <div class="card-body">
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>

          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 mr-4 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="inputMaior form-control form-control-sm"
                  id="nome"
                  v-model="docenteForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 mr-4 px-0">
                <label for="apelido" class="col-form-label">Apelido</label>
                <input
                  type="text"
                  id="apelido"
                  v-model="docenteForm.apelido"
                  class="form-control form-control-sm"
                  style="width: 120px!important"
                />
              </div>

              <div class="form-group col m-0 mr-4 px-0">
                <div class="form-check" style="margin-top:28px">
                  <input
                    type="checkbox"
                    id="ativo"
                    value="1"
                    v-model="docenteForm.ativo"
                    class="form-check-input my-auto"
                    style="margin-top: 2px"
                  />
                  <label for="ativo" class="form-check-label">Ativo</label>
                </div>
              </div>
            </div>
            <template v-if="isEdit">
              <div class="border-bottom my-2"></div>
              <div class="row mb-3 mx-0">
                <div
                  class="form-group col m-0 px-0 border"
                  style="height: 250px; border-color: rgba(0,0,0,0.125);"
                >
                  <div
                    class="alert p-1 alert-secondary m-0 text-center rounded-0 w-100"
                    role="alert"
                  >Perfis:</div>
                  <div class="px-2 py-1" style="height: 218px!important; overflow-y: scroll">
                    <template v-for="perfil in Perfis">
                      <div :key="perfil.nome+perfil.id" class="form-check w-100 mb-1 p-0">
                        <input
                          id="checkPerfis"
                          type="checkbox"
                          :value="perfil.id"
                          v-model="perfisAssociados"
                          v-on:change="managePerfil(perfil.id)"
                          class="form-check-input position-static m-0"
                        />
                        <label for="checkPerfis" class="col-form-label p-0">{{perfil.nome}}</label>
                      </div>
                    </template>
                  </div>
                  <!--
                <b-form-checkbox-group
                  stacked
                  v-model="perfisAssociados"
                  style="overflow-y: scroll; height: 185px; font-size:11px;"
                >
                  <b-form-checkbox
                    v-for="perfil in Perfis"
                    :key="perfil.id+'ID'+perfil.nome+'nome'"
                    :value="perfil.id"
                    v-on:change="managePerfil(perfil.id)"
                  >{{perfil.nome}}</b-form-checkbox>
                </b-form-checkbox-group>
                  -->
                </div>
              </div>
            </template>

            <div class="form-group row">
              <template v-if="isEdit">
                <div style="display: flex; margin-right: 0; margin-left: auto">
                  <button
                    type="button"
                    title="Salvar"
                    class="addbtn"
                    v-on:click.prevent="editDocente"
                    :key="1"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    title="Deletar"
                    class="delbtn"
                    v-on:click.prevent="deleteDocente"
                    :key="3"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click="clearClick(), cleanDocente()"
                    :key="2"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </template>
              <template v-else>
                <div style="display: flex; margin-right: 0; margin-left: auto">
                  <button
                    type="button"
                    title="Adicionar"
                    class="addbtn"
                    v-on:click.prevent="addDocente"
                    :key="1"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanDocente"
                    :key="2"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </template>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Fim do Grid Direito -->
  </div>
</template>

<script>
import _ from "lodash";
import docenteService from "../../common/services/docente";
import docentePerfilService from "../../common/services/docentePerfil";

const emptyDocente = {
  id: undefined,
  nome: undefined,
  apelido: undefined,
  creditos: 0,
  ativo: 1
};

const emptyPerfil = {
  Doncente: undefined,
  Perfil: undefined
};

export default {
  name: "DashboardDocente",

  data() {
    return {
      docenteForm: _.clone(emptyDocente),
      perfisAssociados: [],
      error: undefined,
      docentePerfil: _.clone(emptyPerfil),
      docenteClickado: "",
      ordenacao: "nome"
    };
  },

  methods: {
    clearClick() {
      this.docenteClickado = "";
    },
    toggleOrdenacaoNome() {
      this.ordenacao = "nome";
    },
    toggleOrdenacaoApelido() {
      this.ordenacao = "apelido";
    },

    addDocente() {
      docenteService
        .create(this.docenteForm)
        .then(response => {
          this.cleanDocente();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Docente ${response.Docente.nome} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Docente</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editDocente() {
      docenteService
        .update(this.docenteForm.id, this.docenteForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Docente ${response.Docente.nome} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Docente</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deleteDocente() {
      docenteService
        .delete(this.docenteForm.id, this.docenteForm)
        .then(response => {
          this.cleanDocente();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Docente ${response.Docente.nome} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Docente</b>";
        });
    },

    cleanDocente() {
      this.docenteForm = _.clone(emptyDocente);
      this.error = undefined;
    },

    showDocentes(docente, docentes) {
      this.docenteClickado = docente.nome;
      this.cleanDocente();
      this.docenteForm = _.clone(docente);
      this.perfisAssociados = [];
      for (var i = 0; i < docentes.length; i++) {
        if (docentes[i].DocenteId === docente.id) {
          this.perfisAssociados.push(docentes[i].Perfil);
        }
      }
    },

    addPerfil(perfil) {
      this.docentePerfil.Docente = this.docenteForm.id;
      this.docentePerfil.Perfil = perfil;
      docentePerfilService
        .create(this.docentePerfil)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil} foi associado ao Docente ${this.docenteForm.apelido}!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao associar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deletePerfil(perfil) {
      docentePerfilService
        .delete(this.docenteForm.id, perfil)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil} foi exluído do Docente ${this.docenteForm.apelido}!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
        });
    },

    managePerfil(perfil) {
      if (_.indexOf(this.perfisAssociados, perfil) === -1) {
        this.addPerfil(perfil);
      } else {
        this.deletePerfil(perfil);
      }
    }
  },

  computed: {
    Docentes() {
      return _.orderBy(this.$store.state.docente.Docentes, this.ordenacao);
    },

    Perfis() {
      return this.$store.state.perfil.Perfis;
    },

    DocentePerfis() {
      return this.$store.state.docentePerfil.DocentePerfis;
    },

    isEdit() {
      return this.docenteForm.id !== undefined;
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardDocentes {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
/* Tabela Lucas */
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.125);
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
}
table p {
  margin-bottom: 0;
  text-align: center;
  padding-right: 5px;
  padding-left: 5px;
}
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
table tbody tr div {
  height: 22px !important;
}
table input {
  height: 11px !important;
  text-align: center !important;
}
input[type="checkbox"] {
  width: 16px !important;
  height: 14px !important;
  text-align: center !important;
}
table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
}
input[type="text"] {
  height: 25px !important;
  font-size: 11px !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  z-index: 3 !important;
}
/* Fim Tabela Lucas */

/* ====== CARD ====== */
.div-card {
  margin-left: auto;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
}
.card label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important;
}
.selectMaior2 {
  width: 300px;
  text-align: start;
}
input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  width: 60px;
  text-align: center;
}
.inputMenor2 {
  width: 40px;
  margin-right: 10px;
  text-align: center;
}
.inputMaior {
  width: 220px;
  text-align: start;
}
.clickable-header {
  cursor: pointer;
  padding-left: 5px;
}

/* =================== */
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}
.noHover {
  pointer-events: none;
}

/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  transition: all 0.3s ease 0s;
}
i.fas,
i.far {
  font-size: 25px;
}
.addbtn {
  background-color: white;
  color: #a0e7a0;
}
.addbtn:hover {
  background-color: white;
  cursor: pointer;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}
.cancelbtn {
  color: #cfcfc4;
}
.cancelbtn:hover {
  cursor: pointer;
  color: #b8b4a8;
}
.cancelbtn:focus {
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}

.delbtn {
  background-color: white;
  color: #ff817b;
}
.delbtn:hover {
  cursor: pointer;
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}

@media screen and (max-width: 849px) {
  .div-card {
    margin-left: 0px !important;
    margin-top: 20px !important;
    top: 0 !important;
  }
  .card {
    margin-left: 0px !important;
  }
}
</style>