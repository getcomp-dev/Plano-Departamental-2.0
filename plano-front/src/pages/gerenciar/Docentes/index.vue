<template>
  <div class="main-component row">
    <PageHeader :title="'Docentes'">
      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="$refs.modalAjuda.toggle()"
      >
        <font-awesome-icon :icon="['fas','question']" />
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
                  handleClickInDocente(docente)
                "
                :class="[
                  { 'bg-selected': docenteClickadoId == docente.id },
                  'clickable',
                ]"
              >
                <td style="width:240px;" class="t-start">{{ docente.nome }}</td>
                <td style="width:120px;" class="t-start">{{ docente.apelido }}</td>
                <td style="width:65px">{{ booleanToText(docente.ativo) }}</td>
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
        @btn-salvar="editDocente"
        @btn-delete="openModalDelete"
        @btn-add="addDocente"
        @btn-clean="cleanDocente"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Nome</label>

              <input
                id="nome"
                type="text"
                class="form-control form-control-sm input-maior"
                @input="docenteForm.nome=$event.target.value.toUpperCase()"
                :value="docenteForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 mr-4 px-0">
              <label required for="apelido" class="col-form-label">Apelido</label>
              <input
                id="apelido"
                type="text"
                class="form-control form-control-sm input-medio"
                @input="docenteForm.apelido=$event.target.value.toUpperCase()"
                :value="docenteForm.apelido"
              />
            </div>

            <div class="form-check form-check-inline col m-0 mr-4 mt-4 px-0">
              <label for="ativo" class="form-check-label mr-2">Ativo</label>
              <input
                id="ativo"
                type="checkbox"
                value="1"
                class="form-check-input"
                v-model="docenteForm.ativo"
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
                    <th style="width:225px" class="t-start">Perfis</th>
                  </template>
                  <template #tbody>
                    <tr
                      v-for="perfil in AllPerfis"
                      :key="'perfil-id' + perfil.id"
                      @click="toggleItemInArray(perfil.id,perfisAssociados)"
                    >
                      <td style="width:25px">
                        <input
                          type="checkbox"
                          class="form-check-input position-static m-0"
                          v-model="perfisAssociados"
                          :value="perfil.id"
                        />
                      </td>
                      <td style="width:225px" class="t-start">{{ perfil.nome }}</td>
                    </tr>
                  </template>
                </BaseTable>
              </div>
            </div>
          </template>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEdit" @btn-deletar="deleteDocente">
      <li v-if="isEdit" class="list-group-item">
        <span>
          Tem certeza que deseja excluír o docente
          <b>{{ docenteForm.nome }}</b>?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhum docente selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para adicionar docentes:</b> Com o cartão à direita em branco,
        preencha-o. Em seguida, clique em Adicionar
        <i
          class="fas fa-plus icon-green px-1"
        ></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para editar ou deletar um docente:</b>Na tabela, clique no
        docente que deseja alterar. Logo após, no cartão à direita, altere
        as informações que desejar e clique em Salvar
        <i
          class="fas fa-check icon-green px-1"
        ></i>
        ou, para excluí-lo, clique em Deletar
        <i class="fas fa-times icon-gray px-1"></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
        em Cancelar
        <i class="fas fa-times icon-gray px-1"></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para alterar a ordenação:</b> Clique em Nome ou Apelido no
        cabeçalho da tabela para ordenação alfabética do mesmo.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import docenteService from "@/common/services/docente";
import docentePerfilService from "@/common/services/docentePerfil";
import { toggleOrdination, toggleItemInArray } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";

const emptyDocente = {
  id: null,
  nome: null,
  apelido: null,
  creditos: 0,
  ativo: 1,
};
const emptyPerfil = {
  DocenteId: null,
  Perfil: null,
};

export default {
  name: "DashboardDocente",
  mixins: [toggleOrdination, toggleItemInArray],
  components: { Card, ModalAjuda, ModalDelete },
  data() {
    return {
      docenteForm: this.$_.clone(emptyDocente),
      perfisAssociados: [],
      docenteClickadoId: null,
      perfilsOfCurrentDocente: [],
      ordenacaoDocentesMain: { order: "nome", type: "asc" },
    };
  },

  methods: {
    ...mapActions(["setPartialLoading"]),

    handleClickInDocente(docente) {
      this.cleanDocente();
      this.docenteClickadoId = docente.id;
      this.showDocente(docente);
    },
    cleanDocente() {
      this.docenteClickadoId = null;
      this.docenteForm = this.$_.clone(emptyDocente);
    },
    showDocente(docente) {
      this.docenteForm = this.$_.clone(docente);
      this.updatePerfisAssociados();
    },
    updatePerfisAssociados() {
      this.perfilsOfCurrentDocente = this.$_.map(
        this.$_.filter(this.DocentePerfis, ["DocenteId", this.docenteForm.id]),
        "Perfil"
      );

      this.perfisAssociados = [...this.perfilsOfCurrentDocente];
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    booleanToText(docenteIsAtivo) {
      return docenteIsAtivo ? "Sim" : "-";
    },

    async addDocente() {
      try {
        this.setPartialLoading(true);
        const response = await docenteService.create(this.docenteForm);
        this.cleanDocente();
        this.pushNotification({
          type: "success",
          text: `Docente ${response.Docente.nome} foi criada!`,
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar Docente!",
          text: error.response.data.fullMessage
            ? "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>")
            : "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async editDocente() {
      try {
        this.setPartialLoading(true);

        const response = await docenteService.update(
          this.docenteForm.id,
          this.docenteForm
        );
        await this.editDocentePerfil();

        this.pushNotification({
          type: "success",
          text: `Docente ${response.Docente.nome} foi atualizada!`,
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar Docente",
          text: error.response.data.fullMessage
            ? "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>")
            : "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async deleteDocente() {
      try {
        this.setPartialLoading(true);
        const response = await docenteService.delete(
          this.docenteForm.id,
          this.docenteForm
        );

        this.cleanDocente();
        this.pushNotification({
          type: "success",
          text: `Docente ${response.Docente.nome} foi excluída!`,
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: `Erro ao excluir Docente!`,
          text: "O docente não pode estar vinculado a nenhum perfil",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },

    async editDocentePerfil() {
      //Remove os que não existem em perfisAssociados mas existem em perfilsOfCurrentDocente
      for (let i = 0; i < this.perfilsOfCurrentDocente.length; i++) {
        const perfilIndex = this.$_.indexOf(
          this.perfisAssociados,
          this.perfilsOfCurrentDocente[i]
        );

        if (perfilIndex === -1)
          await this.deletePerfil(this.perfilsOfCurrentDocente[i]);
      }
      //Adiciona os que existem no perfisAssociados mas não existem em perfilsOfCurrentDocente
      for (let i = 0; i < this.perfisAssociados.length; i++) {
        const perfilIndex = this.$_.indexOf(
          this.perfilsOfCurrentDocente,
          this.perfisAssociados[i]
        );

        if (perfilIndex === -1) await this.addPerfil(this.perfisAssociados[i]);
      }
    },
    async addPerfil(perfilId) {
      const newPerfilDocente = this.$_.clone(emptyPerfil);
      newPerfilDocente.Docente = this.docenteForm.id;
      newPerfilDocente.DocenteId = this.docenteForm.id;
      newPerfilDocente.Perfil = perfilId;

      return await docentePerfilService.create(newPerfilDocente);
    },
    async deletePerfil(perfilId) {
      return await docentePerfilService.delete(this.docenteForm.id, perfilId);
    },
  },

  computed: {
    ...mapGetters(["AllDocentes", "AllPerfis"]),

    Docentes() {
      return this.$_.orderBy(
        this.AllDocentes,
        this.ordenacaoDocentesMain.order,
        this.ordenacaoDocentesMain.type
      );
    },

    DocentePerfis() {
      return this.$store.state.docentePerfil.DocentePerfis;
    },

    isEdit() {
      return this.docenteForm.id !== null;
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
