<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Docentes'">
      <template #aside>
        <BaseButton
          title="Ajuda"
          :type="'icon'"
          :color="'lightblue'"
          @click="$refs.modalAjuda.toggle()"
        >
          <i class="fas fa-question"></i>
        </BaseButton>
      </template>
    </PageTitle>

    <div class="row w-100 m-0">
      <div class="p-0 div-table">
        <BaseTable>
          <template #thead>
            <th
              class="clickable t-start"
              @click="toggleOrder(ordenacaoDocentesMain, 'nome')"
              title="Clique para ordenar por nome"
              style="width: 240px;"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoDocentesMain, 'nome')"></i>
            </th>
            <th
              class="clickable t-start"
              @click="toggleOrder(ordenacaoDocentesMain, 'apelido')"
              title="Clique para ordenar por apelido"
              style="width: 120px;"
            >
              Apelido
              <i :class="setIconByOrder(ordenacaoDocentesMain, 'apelido')"></i>
            </th>
            <th
              style="width:65px"
              class="clickable t-center"
              @click="toggleOrder(ordenacaoDocentesMain, 'ativo', 'desc')"
            >
              Ativo
              <i :class="setIconByOrder(ordenacaoDocentesMain, 'ativo')"></i>
            </th>
          </template>
          <template #tbody>
            <template v-for="docente in Docentes">
              <tr
                :key="'docente-id' + docente.id"
                v-on:click.prevent="
                  handleClickInDocente(docente, DocentePerfis)
                "
                :class="[
                  { 'bg-selected': docenteClickado == docente.id },
                  'clickable',
                ]"
              >
                <td style="width:240px;" class="t-start">
                  {{ docente.nome }}
                </td>
                <td style="width:120px;" class="t-start">
                  {{ docente.apelido }}
                </td>
                <td style="width:65px">
                  {{ booleanToText(docente.ativo) }}
                </td>
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
        </BaseTable>
      </div>

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <Card :title="'Docente'">
          <template #form-group>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>

                <input
                  type="text"
                  class="form-control form-control-sm input-maior"
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
                  class="form-control form-control-sm input-medio"
                />
              </div>

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
                    <thead class="thead-light sticky">
                      <tr>
                        <div
                          class="max-content sticky"
                          style="font-size:11px!important"
                        >
                          <th>
                            <p class="p-header" style="width: 25px;"></p>
                          </th>
                          <th>
                            <p
                              class="p-header"
                              style="width: 225px; text-align: start;"
                            >
                              Perfis
                            </p>
                          </th>
                        </div>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="perfil in Perfis"
                        :key="'perfil-id' + perfil.id"
                      >
                        <div class="max-content">
                          <td>
                            <div style="width: 25px; height: inherit;">
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
                            <p style="width: 225px; text-align: start;">
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
          </template>
          <template #footer>
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
          </template>
        </Card>
      </div>
    </div>

    <!-- MODAL AJUDA -->
    <BaseModal
      ref="modalAjuda"
      :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
    >
      <template #modal-body>
        <ul class="list-ajuda list-group">
          <li class="list-group-item">
            <b>Para adicionar docentes:</b> Com o cartão à direita em branco,
            preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para editar ou deletar um docente:</b>Na tabela, clique no
            docente que deseja alterar. Logo após, no cartão à direita, altere
            as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size: 12px;"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
            em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para alterar a ordenação:</b> Clique em Nome ou Apelido no
            cabeçalho da tabela para ordenação alfabética do mesmo.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import docenteService from "@/common/services/docente";
import docentePerfilService from "@/common/services/docentePerfil";
import { toggleOrdination, redirectNotAdmin } from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseButton,
  BaseModal,
  Card,
} from "@/components/index.js";

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
  mixins: [toggleOrdination, redirectNotAdmin],
  components: { PageTitle, BaseTable, Card, BaseButton, BaseModal },
  data() {
    return {
      docenteForm: _.clone(emptyDocente),
      perfisAssociados: [],
      error: undefined,
      docentePerfil: _.clone(emptyPerfil),
      docenteClickado: "",
      ordenacaoDocentesMain: { order: "nome", type: "asc" },
    };
  },
  methods: {
    clearClick() {
      this.docenteClickado = "";
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
            text: `O Perfil ${perfilData.nome} foi associado ao Docente ${
              this.docenteForm.apelido
            }!`,
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
            text: `O Perfil ${perfilData.nome} foi exluído do Docente ${
              this.docenteForm.apelido
            }!`,
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
    booleanToText(docenteIsAtivo) {
      return docenteIsAtivo ? "Sim" : "-";
    },
  },
  computed: {
    Docentes() {
      return _.orderBy(
        this.$store.state.docente.Docentes,
        this.ordenacaoDocentesMain.order,
        this.ordenacaoDocentesMain.type
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
.card .input-maior {
  width: 250px;
}
.card .input-medio {
  width: 120px;
}
@media screen and (max-width: 771px) {
  .div-card {
    margin-left: 0px !important;
  }
}

/* ==== MODAL TABLE ==== */
.modal-table {
  display: block;
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
</style>
