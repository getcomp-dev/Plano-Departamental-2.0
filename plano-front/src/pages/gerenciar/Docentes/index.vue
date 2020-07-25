<template>
  <div class="main-component row">
    <PageHeader :title="'Docentes'">
      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="$refs.modalAjuda.toggle()"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
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

      <Card
        :title="'Docente'"
        :toggleFooter="isEdit"
        @btn-salvar="editDocente()"
        @btn-delete="deleteDocente()"
        @btn-add="addDocente()"
        @btn-clean="cleanDocente()"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Nome</label>

              <input
                type="text"
                class="form-control form-control-sm input-maior upper-case"
                id="nome"
                v-model="docenteForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 mr-4 px-0">
              <label required for="apelido" class="col-form-label"
                >Apelido</label
              >
              <input
                type="text"
                id="apelido"
                v-model="docenteForm.apelido"
                class="form-control form-control-sm input-medio upper-case"
              />
            </div>

            <div class="form-check form-check-inline col m-0 mr-4 mt-4 px-0">
              <label for="ativo" class="form-check-label mr-2">Ativo</label>
              <input
                type="checkbox"
                id="ativo"
                value="1"
                v-model="docenteForm.ativo"
                class="form-check-input"
              />
            </div>
          </div>
          <template v-if="isEdit">
            <div class="border-bottom mt-2 mb-1"></div>
            <small>Perfis Associados ao docente</small>
            <div class="row mb-3 mx-0">
              <div class="div-table">
                <BaseTable :type="'modal'" :styles="'max-height: 300px'">
                  <template #thead>
                    <th style="width:25px"></th>
                    <th style="width:225px" class="t-start">
                      Perfis
                    </th>
                  </template>
                  <template #tbody>
                    <tr
                      v-for="perfil in Perfis"
                      :key="'perfil-id' + perfil.id"
                      @click.stop="
                        toggleItemInArray(perfil.id, perfisAssociados),
                          managePerfil(perfil.id)
                      "
                    >
                      <td style="width:25px">
                        <input
                          type="checkbox"
                          v-model="perfisAssociados"
                          :value="perfil.id"
                          @click.stop=""
                          class="form-check-input position-static m-0"
                          @change="managePerfil(perfil.id)"
                        />
                      </td>
                      <td style="width:225px" class="t-start">
                        {{ perfil.nome }}
                      </td>
                    </tr>
                  </template>
                </BaseTable>
              </div>
            </div>
          </template>
        </template>
      </Card>
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
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseButton,
  BaseModal,
  Card,
} from "@/components/ui";

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
  mixins: [toggleOrdination, toggleItemInArray],
  components: { PageHeader, BaseTable, Card, BaseButton, BaseModal },
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
    handleClickInDocente(docente, docentePerfis) {
      this.cleanDocente();
      this.docenteClickado = docente.id;
      this.showDocentes(docente, docentePerfis);
    },
    clearClick() {
      this.docenteClickado = "";
    },
    cleanDocente() {
      this.clearClick();
      this.docenteForm = _.clone(emptyDocente);
      this.error = undefined;
    },

    showDocentes(docente, docentePerfis) {
      this.docenteForm = _.clone(docente);
      this.perfisAssociados = [];
      for (var i = 0; i < docentePerfis.length; i++) {
        if (docentePerfis[i].DocenteId === docente.id) {
          this.perfisAssociados.push(docentePerfis[i].Perfil);
        }
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

    addPerfil(perfil) {
      this.docentePerfil.Docente = this.docenteForm.id;
      this.docentePerfil.Perfil = perfil;
      let perfilData = _.find(this.$store.state.perfil.Perfis, ["id", perfil]);
      docentePerfilService
        .create(this.docentePerfil)
        .then(() => {
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
        .then(() => {
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
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 270px;
}
.card .input-medio {
  width: 150px;
}
</style>
