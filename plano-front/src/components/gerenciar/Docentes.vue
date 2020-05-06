<template>
  <div class="DashboardDocentes row pr-2" v-if="Admin">
    <PageTitle :title="'Docentes'">
      <template #aside>
        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>
    <div class="w-100 mb-2 border-bottom"></div>

    <div class="p-0 divTable">
      <!-- Inicio da Tabela -->
      <TableMain>
        <template #thead>
          <th
            class="clickable t-start"
            @click="toggleOrdMain('nome')"
            title="Clique para ordenar por nome"
            style="width: 240px;"
          >
            Nome
            <i
              style="font-size: 0.6rem; text-align:right"
              :class="
                ordenacao.order == 'nome'
                  ? ordenacao.type == 'asc'
                    ? 'fas fa-arrow-down fa-sm'
                    : 'fas fa-arrow-up fa-sm'
                  : 'fas fa-arrow-down fa-sm low-opacity'
              "
            ></i>
          </th>
          <th
            class="clickable t-start"
            @click="toggleOrdMain('apelido')"
            title="Clique para ordenar por apelido"
            style="width: 120px;"
          >
            Apelido
            <i
              style="font-size: 0.6rem;"
              :class="
                ordenacao.order == 'apelido'
                  ? ordenacao.type == 'asc'
                    ? 'fas fa-arrow-down fa-sm'
                    : 'fas fa-arrow-up fa-sm'
                  : 'fas fa-arrow-down fa-sm low-opacity'
              "
            ></i>
          </th>
          <th
            style="width:50px"
            class="clickable t-center"
            @click="toggleOrdMain('ativo')"
          >
            Ativo
            <i
              style="font-size: 0.6rem;"
              :class="
                ordenacao.order == 'ativo'
                  ? ordenacao.type == 'asc'
                    ? 'fas fa-arrow-down fa-sm'
                    : 'fas fa-arrow-up fa-sm'
                  : 'fas fa-arrow-down fa-sm low-opacity'
              "
            ></i>
          </th>
        </template>
        <template #tbody>
          <template v-for="docente in Docentes">
            <tr
              :key="'docente-id' + docente.id"
              v-on:click.prevent="handleClickInDocente(docente, DocentePerfis)"
              :class="[
                { 'bg-custom': docenteClickado == docente.id },
                'clickable',
              ]"
            >
              <div class="max-content">
                <td style="width:240px;" class="t-start">
                  {{ docente.nome }}
                </td>
                <td style="width:120px;" class="t-start">
                  {{ docente.apelido }}
                </td>
                <td style="width:50px">
                  {{ textoAtivo(docente.ativo) }}
                </td>
              </div>
            </tr>
          </template>
          <template v-if="Docentes.length == 0">
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum docente
                encontrado!
              </td>
            </tr>
          </template>
        </template>
      </TableMain>
    </div>

    <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
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
                  style="width: 120px !important;"
                />
              </div>

              <!-- <div class="form-group col m-0  px-0"> -->
              <div class="form-check form-check-inline col m-0 mr-4 mt-4 px-0">
                <input
                  type="checkbox"
                  id="ativo"
                  value="1"
                  v-model="docenteForm.ativo"
                  class="form-check-input my-auto"
                />
                <label for="ativo" class="form-check-label">Ativo</label>
              </div>
              <!-- </div> -->
            </div>
            <template v-if="isEdit">
              <div class="border-bottom mt-2 mb-1"></div>
              <small>Perfis Associados ao docente</small>
              <div class="row mb-3 mx-0">
                <div class="form-group col m-0 px-0" style="height: 300px;">
                  <table
                    class="modal-table table table-bordered table-sm"
                    style="max-height: 300px !important; overflow: auto;"
                  >
                    <tr class="thead-light sticky">
                      <div class="max-content" style="font-size:11px!important">
                        <th>
                          <p class="p-header" style="width: 25px;"></p>
                        </th>
                        <th>
                          <p
                            class="p-header"
                            style="width: 275px; text-align: start;"
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
                        <div class="max-content">
                          <td>
                            <div
                              style="width: 25px; height: inherit;"
                              class="px-1"
                            >
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
                            <p style="width: 275px; text-align: start;">
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
                    class="btn-custom btn-modal addbtn"
                    v-on:click.prevent="editDocente"
                    :key="1"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    title="Deletar"
                    class="btn-custom btn-modal delbtn"
                    v-on:click.prevent="deleteDocente"
                    :key="2"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="btn-custom btn-modal cancelbtn"
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
                    class="btn-custom btn-modal addbtn"
                    v-on:click.prevent="addDocente"
                    :key="1"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                  <button
                    type="button"
                    title="Cancelar"
                    class="btn-custom btn-modal cancelbtn"
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
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar docentes:</strong> Com o cartão à direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar um docente:</strong>Na tabela, clique
            no docente que deseja alterar. Logo após, no cartão à direita,
            altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size: 12px;"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para alterar a ordenação:</strong> Clique em Nome ou Apelido
            no cabeçalho da tabela para ordenação alfabética do mesmo.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import docenteService from "@/common/services/docente";
import docentePerfilService from "@/common/services/docentePerfil";
import PageTitle from "@/components/PageTitle";
import TableMain from "@/components/TableMain";

const emptyDocente = {
  id: undefined,
  nome: undefined,
  apelido: undefined,
  creditos: 0,
  ativo: 1,
};

const emptyPerfil = {
  Docente: undefined,
  Perfil: undefined,
};

export default {
  name: "DashboardDocente",
  components: { PageTitle, TableMain },
  data() {
    return {
      docenteForm: _.clone(emptyDocente),
      perfisAssociados: [],
      error: undefined,
      docentePerfil: _.clone(emptyPerfil),
      docenteClickado: "",
      ordenacao: { order: "nome", type: "asc" },
    };
  },
  methods: {
    clearClick() {
      this.docenteClickado = "";
    },
    toggleOrdMain(ord) {
      if (this.ordenacao.order != ord) {
        this.ordenacao.order = ord;
        this.ordenacao.type = "asc";
      } else {
        this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
      }
    },
    addDocente() {
      docenteService
        .create(this.docenteForm)
        .then((response) => {
          this.cleanDocente();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `Docente ${response.Docente.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Docente</b>";
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
    editDocente() {
      docenteService
        .update(this.docenteForm.id, this.docenteForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `Docente ${response.Docente.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Docente</b>";
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
    deleteDocente() {
      docenteService
        .delete(this.docenteForm.id, this.docenteForm)
        .then((response) => {
          this.cleanDocente();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `Docente ${response.Docente.nome} foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Docente</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    cleanDocente() {
      this.docenteForm = _.clone(emptyDocente);
      this.error = undefined;
    },
    handleClickInDocente(docente, docentePerfis) {
      this.docenteClickado = docente.id;
      this.showDocentes(docente, docentePerfis);
    },
    showDocentes(docente, docentePerfis) {
      this.cleanDocente();
      this.docenteForm = _.clone(docente);
      this.perfisAssociados = [];
      for (var i = 0; i < docentePerfis.length; i++) {
        if (docentePerfis[i].DocenteId === docente.id) {
          this.perfisAssociados.push(docentePerfis[i].Perfil);
        }
      }
    },
    addPerfil(perfil) {
      this.docentePerfil.Docente = this.docenteForm.id;
      this.docentePerfil.Perfil = perfil;
      let perfilData = _.find(this.$store.state.perfil.Perfis, ["id", perfil]);
      docentePerfilService
        .create(this.docentePerfil)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${perfilData.nome} foi associado ao Docente ${this.docenteForm.apelido}!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao associar Perfil</b>";
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
    deletePerfil(perfil) {
      let perfilData = _.find(this.$store.state.perfil.Perfis, ["id", perfil]);
      docentePerfilService
        .delete(this.docenteForm.id, perfil)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${perfilData.nome} foi exluído do Docente ${this.docenteForm.apelido}!`,
            type: "success",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    managePerfil(perfil) {
      if (_.indexOf(this.perfisAssociados, perfil) === -1) {
        this.deletePerfil(perfil);
      } else {
        this.addPerfil(perfil);
      }
    },
    textoAtivo(docenteIsAtivo) {
      return docenteIsAtivo ? "Sim" : "-";
    },
  },

  computed: {
    Docentes() {
      return _.orderBy(
        this.$store.state.docente.Docentes,
        this.ordenacao.order,
        this.ordenacao.type
      );
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
    },
  },
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardDocentes {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}

/* ====== CARD ====== */
.card {
  width: max-content;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card-body {
  font-size: 12px !important;
  padding-top: 15px;
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
.card input {
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

/* ==== MODAL TABLE ==== */
.modal-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
.modal-table tr thead {
  display: block;
}
.modal-table th {
  padding: 0 !important;
  text-align: center !important;
  height: 18px !important;
}

.modal-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: start;
  height: 18px !important;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table td {
  border-top: 0;
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  /* height: 22px !important; */
}
.modal-table p {
  margin: 0 !important;
  text-align: center;
  padding: 0 !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.modal-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
}
/* FIM MODAL TABLE */
/* =================== */

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
@media screen and (max-width: 695px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
