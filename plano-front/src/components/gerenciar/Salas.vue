<template>
  <div class="DashboardSalas row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-2 col-md-4 col-sm-5 col-7 px-0 pr-1 titulo">Salas</h1>

        <div
          class="form-group col-xl-10 col-md-8 col-sm-7 col-5 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn mt-1">
            <i class="fas fa-question"></i>
          </b-button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable p-0">
      <!-- Inicio da Tabela -->
      <table class="main-table table table-sm table-hover table-bordered">
        <thead class="thead-light">
          <tr>
            <div class="sticky max-content">
              <th scope="col" class="clickable" v-on:click="toggleOrdMain()">
                <p class="p-header" style="width: 82px">
                  Nome
                  <i
                    style="font-size:0.6rem; text-align:right"
                    :class="
                      ordenacao.type == 'asc'
                        ? 'fas fa-arrow-down fa-sm'
                        : 'fas fa-arrow-up fa-sm'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 75px">Laboratório</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-for="sala in Salas">
            <tr
              :key="sala.id"
              v-on:click.prevent="showSala(sala), clickada(sala.nome)"
              :class="[
                { 'bg-custom': salaClickada === sala.nome },
                'clickable',
              ]"
            >
              <div class="max-content">
                <td>
                  <p style="width: 82px">{{ sala.nome }}</p>
                </td>

                <td>
                  <div style="width: 75px">
                    <input
                      type="checkbox"
                      class="noHover"
                      v-on:click.prevent="showSala(sala), clickada(sala.nome)"
                      v-model="sala.laboratorio"
                    />
                  </div>
                </td>
              </div>
            </tr>
          </template>
          <template v-if="Salas.length === 0">
            <tr>
              <div style="width: 139px">
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhuma sala
                  encontrada!
                </td>
              </div>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- Fim da Tabela -->
      <!-- modal de ajuda -->
      <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
        <div class="modal-body">
          <ul class="listas list-group">
            <li class="list-group-item">
              <strong>Para adicionar sala: </strong> Com o cartão à direita em
              branco, preencha-o. Em seguida, clique em Adicionar
              <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
              .
            </li>
            <li class="list-group-item">
              <strong>Para editar ou deletar uma sala: </strong>Na tabela,
              clique na sala que deseja alterar. Logo após, no cartão à direita,
              altere as informações que desejar e clique em Salvar
              <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
              ou, para excluí-la, clique em Deletar
              <i
                class="far fa-trash-alt delbtn px-1"
                style="font-size: 12px"
              ></i>
              .
            </li>
            <li class="list-group-item">
              <strong>Para deixar o cartão em branco:</strong> No cartão, à
              direita, clique em Cancelar
              <i
                class="fas fa-times cancelbtn px-1"
                style="font-size: 12px"
              ></i>
              .
            </li>
          </ul>
        </div>

        <div slot="modal-footer" style="display: none"></div>
      </b-modal>
    </div>

    <!-- Grid Direito -->
    <div class="div-card p-0 mt-0 mb-2 col-lg-5 col-md-5 col-sm-5 col-6">
      <div class="card mr-3">
        <div class="card-header">
          <h1 class="card-title">Sala</h1>
        </div>

        <div class="card-body">
          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="inputMenor form-control form-control-sm"
                  id="nome"
                  v-model="salaForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mt-3 mx-0">
              <div class="form-check form-check-inline col m-0 px-0 pl-1">
                <input
                  type="checkbox"
                  id="laboratorio"
                  class="form-check-input"
                  v-model="salaForm.laboratorio"
                  value="1"
                />
                <label class="form-check-label" for="laboratorio"
                  >Laboratório</label
                >
              </div>
            </div>

            <div class="row mb-0 mt-3 mx-0">
              <div class="d-flex mr-0 ml-auto">
                <template v-if="isEdit">
                  <button
                    type="button"
                    title="Salvar"
                    class="addbtn"
                    v-on:click.prevent="editSala"
                    :key="1"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    title="Deletar"
                    class="delbtn"
                    v-on:click.prevent="deleteSala"
                    :key="3"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanSala"
                    :key="2"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </template>

                <template v-else>
                  <button
                    type="button"
                    title="Adicionar"
                    class="addbtn"
                    v-on:click.prevent="addSala"
                    :key="1"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanSala"
                    :key="2"
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
  </div>
</template>

<script>
import _ from "lodash";
import salaService from "@/common/services/sala";

const emptySala = {
  id: undefined,
  nome: undefined,
  laboratorio: undefined,
};

export default {
  name: "DashboardSalas",

  data() {
    return {
      salaForm: _.clone(emptySala),
      error: undefined,
      salaClickada: "",
      ordenacao: { type: "asc" },
    };
  },

  methods: {
    clickada(salaNome) {
      this.salaClickada = salaNome;
    },
    clearClick() {
      this.salaClickada = "";
    },

    toggleOrdMain() {
      this.ordenacao.type = this.ordenacao.type === "asc" ? "desc" : "asc";
    },

    addSala() {
      salaService
        .create(this.salaForm)
        .then((response) => {
          this.cleanSala();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Sala</b>";
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

    editSala() {
      salaService
        .update(this.salaForm.id, this.salaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Sala</b>";
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

    deleteSala() {
      salaService
        .delete(this.salaForm.id, this.salaForm)
        .then((response) => {
          this.cleanSala();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Sala</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    cleanSala() {
      this.clearClick();
      this.salaForm = _.clone(emptySala);
      this.error = undefined;
    },

    showSala(sala) {
      this.cleanSala();
      this.salaForm = _.clone(sala);
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
  },

  computed: {
    Salas() {
      return _.orderBy(
        this.$store.state.sala.Salas,
        "nome",
        this.ordenacao.type
      );
    },

    isEdit() {
      return this.salaForm.id !== undefined;
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
.DashboardSalas {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
  -webkit-box-sizing: border-box !important;
  -moz-box-sizing: border-box !important;
  box-sizing: border-box !important;
}

.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 26px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
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
.inputMenor {
  min-width: 100px;
  text-align: start;
}
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
  min-width: 164px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15); /*sugestão sombra*/
  margin-left: auto;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
  padding-left: 14px !important;
}
.card label {
  /* line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important; */
}
.card input[type="text"] {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}

.noHover {
  pointer-events: none;
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
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
  margin-right: 15px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
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

.clickable-header {
  cursor: pointer;
  text-align: start !important;
  padding-left: 5px;
}

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  table input {
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

@media screen and (max-width: 337px) {
  .div-card {
    margin-left: 0 !important;
    top: 10px !important;
  }
  .card {
    margin-left: 0 !important;
  }
}
</style>
