<template>
  <div class="DashboardDocentes row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-2 col-md-4 col-sm-5 col-9 px-0 pr-1 titulo">
          Lista Docentes
        </h1>

        <div
          class="form-group form-group-top col-xl-10 col-md-8 col-sm-7 col-3 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
            <i class="fas fa-question"></i>
          </b-button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>
    <!-- Fim do Titulo -->

    <!-- Grid Esquerdo -->

    <!-- Inicio da Tabela -->
    <div class="row p-0 m-0">
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
                      v-if="ordenacao == 'nome'"
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
                      v-if="ordenacao == 'apelido'"
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
                :key="'docente-id' + docente.id"
                v-on:click.prevent="showDocentes(docente, DocentePerfis)"
                :class="{ 'bg-custom': docenteClickado == docente.nome }"
                style="cursor: pointer"
              >
                <div style="width: 415px">
                  <td>
                    <p style="width: 240px; text-align: start!important">
                      {{ docente.nome }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 130px">{{ docente.apelido }}</p>
                  </td>
                  <td>
                    <div style="width: 45px">
                      <input
                        class="form-check-input position-static noHover"
                        v-on:click.prevent="
                          showDocentes(docente, DocentePerfis)
                        "
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
                  <i class="fas fa-exclamation-triangle"></i> Nenhum docente
                  encontrado!
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- Fim da Tabela -->
      </div>
    </div>
    <!-- Fim do Grid Esquerdo -->
    <!-- Grid Direito -->
    <div class="div-card p-0 mt-0 mb-4 col-auto">
      <div class="card mr-3 ml-auto">
        <div class="card-header">
          <h1 class="card-title">Docente</h1>
        </div>

        <div class="card-body">
          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <template v-if="!isEdit">
                  <input
                    type="text"
                    :class="{ inputMaior: isEdit }"
                    class="form-control form-control-sm"
                    id="nome"
                    v-model="docenteForm.nome"
                  />
                </template>
                <template v-else>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="nome"
                    v-model="docenteForm.nome"
                  />
                </template>
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
                  class="form-group col m-0 px-0 border rounded-top"
                  style="height: 302px; border-color: rgba(0,0,0,0.125);"
                >
                  <table
                    class="table table-sm"
                    style=" max-height:300px!important; overflow:auto;"
                  >
                    <tr class="thead-light">
                      <div class="sticky2 border" style="width:300px;">
                        <th scope="col" class="border-top-0">
                          <p class="p-header" style="width: 25px;"></p>
                        </th>
                        <th scope="col" class="border-top-0">
                          <p
                            class="p-header"
                            style="width: 275px; text-align: start"
                          >
                            Perfis
                          </p>
                        </th>
                      </div>
                    </tr>
                    <tbody>
                      <tr
                        v-for="perfil in Perfis"
                        :key="'perfil-id' + perfil.id"
                      >
                        <div style="width: 300px">
                          <td style="padding:0;broder:0;margin:0!important">
                            <div style="width:25px;">
                              <input
                                type="checkbox"
                                :value="perfil.id"
                                v-model="perfisAssociados"
                                v-on:change="managePerfil(perfil.id)"
                                class="form-check-input position-static m-0"
                              />
                            </div>
                          </td>
                          <td>
                            <p style="width:275px; text-align:start">
                              {{ perfil.nome }}
                            </p>
                          </td>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>

            <div class="row mb-0 mt-3 mx-0">
              <template v-if="isEdit">
                <div class="d-flex mr-0 ml-auto">
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
                    :key="2"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click="clearClick(), cleanDocente()"
                    :key="3"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </template>
              <template v-else>
                <div class="d-flex mr-0 ml-auto">
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
                    :key="3"
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
    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar docentes:</strong> Com o cartão à direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar um docente:</strong>Na tabela, clique
            no docente que deseja alterar. Logo após, no cartão à direita,
            altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para alterar a ordenação:</strong> Clique em Nome ou Apelido
            no cabeçalho da tabela para ordenação alfabética do mesmo.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
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
  Docente: undefined,
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
            text: `Docente ${response.Docente.nome} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Docente</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },

    editDocente() {
      docenteService
        .update(this.docenteForm.id, this.docenteForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `Docente ${response.Docente.nome} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Docente</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
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
            text: `Docente ${response.Docente.nome} foi excluída!`,
            type: "warn"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Docente</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
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
      let perfilData = _.find(this.$store.state.perfil.Perfis, ["id", perfil]);
      docentePerfilService
        .create(this.docentePerfil)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${perfilData.nome} foi associado ao Docente ${this.docenteForm.apelido}!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao associar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },

    deletePerfil(perfil) {
      let perfilData = _.find(this.$store.state.perfil.Perfis, ["id", perfil]);
      docentePerfilService
        .delete(this.docenteForm.id, perfil)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${perfilData.nome} foi exluído do Docente ${this.docenteForm.apelido}!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },

    managePerfil(perfil) {
      if (_.indexOf(this.perfisAssociados, perfil) === -1) {
        this.deletePerfil(perfil);
      } else {
        this.addPerfil(perfil);
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
  padding: 0 5px 0 5px;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: hidden;
  border: rgba(0, 0, 0, 0.125) solid 1px;
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
  vertical-align: middle !important;
  padding: 0 !important;
  height: 23px !important;
}
table p {
  margin-bottom: 0 !important;
  text-align: center;
  padding-right: 5px !important;
  padding-left: 5px !important;
  font-size: 11px !important;
}
tr thead {
  display: block !important;
}
th {
  padding: 0 !important;
  font-size: 14px !important;
  text-align: center !important;
  height: 18px !important;
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
.sticky2 {
  display: block !important;
  overflow: hidden !important;
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
  width: 250px;
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

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}

/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 32px !important;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  line-height: 50%;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-align: center !important;
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
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}

.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  color: #82a0ff !important;
  background-color: white;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #698dff;
}

.form-group-top {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}

.form-inline .input-group,
.form-inline {
  width: auto;
}
@media screen and (max-width: 705px) {
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
