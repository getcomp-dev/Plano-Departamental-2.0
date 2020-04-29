<template>
  <div class="DashboardDisciplinas row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-2 col-md-4 col-sm-5 col-7 px-0 pr-1 titulo">
          Disciplinas
        </h1>

        <div
          class="form-group col-xl-10 col-md-8 col-sm-7 col-5 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
            <i class="fas fa-question"></i>
          </b-button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>
    <!-- Grid Esquerdo -->
    <div class="divTable">
      <!-- Inicio da Tabela -->
      <table class="main-table table table-sm table-hover table-bordered ">
        <thead class="thead-light sticky">
          <tr>
            <div style="font-size: 11px;" class=" max-content">
              <th scope="col">
                <p
                  @click="toggleOrdMain('nome')"
                  style="width: 300px; text-align:start"
                  class="p-header clickable"
                  title="Clique para ordenar por nome"
                >
                  Nome
                  <i
                    style="font-size:0.6rem; text-align:right"
                    :class="
                      ordenacao.order == 'nome'
                        ? ordenacao.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  style="width: 82px; text-align:start"
                  @click="toggleOrdMain('codigo')"
                  class="p-header clickable"
                  title="Clique para ordenar por código"
                >
                  Código
                  <i
                    style="font-size:0.6rem; text-align:right"
                    :class="
                      ordenacao.order == 'codigo'
                        ? ordenacao.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p style="width: 30px;" class="p-header" title="Carga Teórica">
                  C.T.
                </p>
              </th>
              <th scope="col">
                <p style="width: 30px;" class="p-header" title="Carga Prática">
                  C.P.
                </p>
              </th>
              <th scope="col">
                <p style="width: 230px;text-align: start" class="p-header">
                  Perfil
                </p>
              </th>
              <th scope="col">
                <p style="width: 30px" class="p-header">EAD</p>
              </th>
              <th scope="col">
                <p style="width: 70px" class="p-header">Lab</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-for="disciplina in Disciplinas">
            <tr
              :key="disciplina.id"
              v-on:click.prevent="
                showDisciplina(disciplina), clickada(disciplina.codigo)
              "
              :class="[
                { 'bg-custom': disciplinaClickada === disciplina.codigo },
                'clickable',
              ]"
            >
              <div class="max-content">
                <td>
                  <p style="width: 300px; text-align: start">
                    {{ disciplina.nome }}
                  </p>
                </td>
                <td>
                  <p style="width: 82px; text-align: start">
                    {{ disciplina.codigo }}
                  </p>
                </td>
                <td>
                  <p style="width: 30px">{{ disciplina.cargaTeorica }}</p>
                </td>
                <td>
                  <p style="width: 30px">{{ disciplina.cargaPratica }}</p>
                </td>
                <template v-for="perfil in Perfis">
                  <td v-if="perfil.id === disciplina.Perfil" :key="perfil.id">
                    <p style="width: 230px; text-align: start">
                      {{ perfil.nome }}
                    </p>
                  </td>
                </template>
                <td>
                  <div style="width: 30px;">
                    <input
                      type="checkbox"
                      class="form-check-input position-static noHover"
                      v-model="disciplina.ead"
                      v-on:click.prevent="
                        showDisciplina(disciplina), clickada(disciplina.nome)
                      "
                      value
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 70px">
                    {{ textoLab(disciplina.laboratorio) }}
                  </p>
                </td>
              </div>
            </tr>
          </template>
          <template v-if="Disciplinas.length == 0">
            <tr>
              <td colspan="3" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhuma disciplina
                encontrada!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- Fim da tabela -->
    </div>

    <!-- Fim do Grid Esquerdo -->
    <!-- Grid Direito -->
    <div
      class="div-card p-0 mt-3 mb-2 ml-auto col-lg-4 col-md-12 col-sm-12 col-12"
    >
      <div class="card ml-auto mr-3">
        <div class="card-header">
          <h2 class="card-title">Disciplina</h2>
        </div>

        <div class="card-body">
          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  id="nome"
                  class="form-control form-control-sm"
                  style="width: 288px"
                  v-model="disciplinaForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="codigo" class="col-form-label">Código</label>
                <input
                  type="text"
                  id="codigo"
                  class="form-control form-control-sm"
                  style="width: 85px!important; text-align:center!important"
                  v-model="disciplinaForm.codigo"
                />
              </div>
            </div>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="cargaTeorica" class="col-form-label"
                  >Carga Teórica</label
                >
                <input
                  type="text"
                  id="cargaTeorica"
                  class="form-control form-control-sm"
                  style="width: 70px!important; text-align:center!important"
                  @keypress="onlyNumber"
                  v-model="disciplinaForm.cargaTeorica"
                />
              </div>

              <div class="form-group m-0 col px-0">
                <label for="cargaPratica" class="col-form-label"
                  >Carga Prática</label
                >
                <input
                  type="text"
                  id="cargaPratica"
                  class="form-control form-control-sm"
                  style="width: 70px!important; text-align:center!important"
                  @keypress="onlyNumber"
                  v-model="disciplinaForm.cargaPratica"
                />
              </div>
            </div>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="perfil" class="col-form-label">Perfil</label>
                <select
                  type="text"
                  id="perfil"
                  class="form-control form-control-sm"
                  style="width: 288px!important; text-align: start"
                  v-model="disciplinaForm.Perfil"
                >
                  <option v-if="Perfis.length === 0" type="text" value
                    >Nenhum Perfil Encontrado</option
                  >
                  <option
                    v-for="perfil in Perfis"
                    :key="perfil.id"
                    :value="perfil.id"
                    >{{ perfil.nome }}</option
                  >
                </select>
              </div>
            </div>

            <div class="row mb-2 mt-3 mx-0">
              <div class="form-check form-check-inline col m-0 px-0 pl-1">
                <input
                  type="checkbox"
                  id="ead"
                  value="1"
                  class="form-check-input"
                  style="margin-top: 2px"
                  v-model="disciplinaForm.ead"
                />
                <label for="ead" class="form-check-label">EAD</label>
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="laboratorio" class="col-form-label"
                  >Laboratório</label
                >
                <select
                  type="text"
                  class="form-control form-control-sm selectMenor"
                  id="laboratorio"
                  v-model="disciplinaForm.laboratorio"
                >
                  <option value="0">Não</option>
                  <option value="1">Obrigatório</option>
                  <option value="2">Desejável</option>
                </select>
              </div>
            </div>

            <div class="row mb-0 mt-3 mx-0">
              <div class="d-flex mr-0 ml-auto">
                <template v-if="isEdit">
                  <button
                    type="button"
                    title="Salvar"
                    class="addbtn"
                    v-on:click.prevent="editDisciplina"
                    :key="1"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    title="Deletar"
                    type="button"
                    class="delbtn"
                    v-on:click.prevent="deleteDisciplina"
                    :key="2"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanDisciplina"
                    :key="3"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </template>

                <template v-else>
                  <button
                    type="button"
                    title="Adicionar"
                    class="addbtn"
                    v-on:click.prevent="addDisciplina"
                    :key="1"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanDisciplina"
                    :key="3"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </template>
              </div>
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
            <strong>Para adicionar disciplinas:</strong> Com o cartão à direita
            em branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar uma disciplina:</strong>Na tabela,
            clique na disciplina que deseja alterar. Logo após, no cartão à
            direita, altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para alterar a ordenação:</strong> Clique em Nome ou Código
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
import disciplinaService from "@/common/services/disciplina";

const emptyDisciplina = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  cargaTeorica: undefined,
  cargaPratica: undefined,
  Perfil: undefined,
  ead: undefined,
  laboratorio: undefined,
};

export default {
  name: "DashboardDisciplina",

  data() {
    return {
      disciplinaForm: _.clone(emptyDisciplina),
      error: undefined,
      disciplinaClickada: "",
      ordenacao: { order: "nome", type: "asc" },
    };
  },

  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    toggleOrdMain(ord) {
      if (this.ordenacao.order != ord) {
        this.ordenacao.order = ord;
        this.ordenacao.type = "asc";
      } else {
        this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
      }
    },

    clickada(discip) {
      this.disciplinaClickada = discip;
    },
    clearClick() {
      this.disciplinaClickada = "";
    },
    addDisciplina() {
      disciplinaService
        .create(this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Disciplina</b>";
          console.log(error.response);
          if (error.response.data.fullMessage) {
            for (var e = 0; e < error.response.data.errors.length; e++) {
              if (error.response.data.errors[e].message.search("null") !== -1)
                this.error +=
                  "<br/>" +
                  error.response.data.errors[e].field +
                  " não pode ser vazio";
              else if (
                error.response.data.errors[e].message.search("unique") !== -1 &&
                error.response.data.errors[e].field.search("codigo") !== -1
              )
                this.error += "<br/>Disciplina já existe";
            }
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    editDisciplina() {
      disciplinaService
        .update(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    deleteDisciplina() {
      disciplinaService
        .delete(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi excluída!`,
            type: "success",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    cleanDisciplina() {
      this.clearClick();
      this.disciplinaForm = _.clone(emptyDisciplina);
      this.error = undefined;
    },

    showDisciplina(disciplina) {
      this.cleanDisciplina();
      this.disciplinaForm = _.clone(disciplina);
    },

    textoLab(lab) {
      if (lab == 0) return "Não";
      if (lab == 1) return "Obrigatório";
      if (lab == 2) return "Opcional";
    },
  },

  computed: {
    Disciplinas() {
      return _.orderBy(
        this.$store.state.disciplina.Disciplinas,
        this.ordenacao.order,
        this.ordenacao.type
      );
    },

    Perfis() {
      return this.$store.state.perfil.Perfis;
    },

    isEdit() {
      return this.disciplinaForm.id !== undefined;
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

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardDisciplinas {
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

/* main-table */
.divTable {
  overflow: hidden;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
.main-table {
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
.main-table .p-header {
  height: 18px;
}
.main-table p {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 22px !important;
}
.main-table tr thead {
  display: block !important;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}
/* fim table */

.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
/* ====== CARD ====== */
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.div-card {
  top: -15px;
}
.card {
  width: 342px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
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
.card select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px 0px 5px !important;
  text-align: center;
}
.selectMenor {
  min-width: 100px;
  max-width: 100px;
  text-align: start !important;
}
.selectMaior {
  min-width: 200px;
  max-width: 200px;
  text-align: start !important;
}
.card input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
}
.inputMenor2 {
  max-width: 40px;
  min-width: 40px;
  margin-right: 10px;
  text-align: center;
}
.selectMaior2 {
  max-width: 300px;
  min-width: 300px;
  text-align: start;
}
/* =================== */

/* Firefox */
@-moz-document url-prefix() {
  .main-table select {
    height: 25px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  .main-table input {
    height: 25px !important;
    text-align: start;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
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
  background-color: white;
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
@media screen and (max-width: 1095px) {
  .div-card {
    margin-left: 0px !important;
    top: 0 !important;
  }
  .card {
    margin-left: 0px !important;
  }
}
</style>
