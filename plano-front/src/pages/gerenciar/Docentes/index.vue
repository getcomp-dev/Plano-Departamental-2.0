<template>
  <div class="main-component row">
    <PageHeader :title="'Docentes'">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoDocentesMain"
              orderToCheck="nome"
              width="240"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDocentesMain"
              orderToCheck="apelido"
              width="120"
              align="start"
            >
              Apelido
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDocentesMain"
              orderToCheck="nomesiga"
              width="240"
              align="start"
            >
              Nome SIGA
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDocentesMain"
              orderToCheck="ativo"
              orderType="desc"
              width="65"
            >
              Ativo
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="docente in DocentesOrdered"
              :key="docente.id + docente.apelido"
              :class="[{ 'bg-selected': docenteClickadoId == docente.id }, 'clickable']"
              @click="handleClickInDocente(docente)"
            >
              <v-td width="240" align="start">{{ docente.nome }}</v-td>
              <v-td width="120" align="start">{{ docente.apelido }}</v-td>
              <v-td width="240" align="start" :title="docente.nomesiga">
                {{ docente.nomesiga }}
              </v-td>
              <v-td width="65">{{ generateBooleanText(docente.ativo) }}</v-td>
            </tr>

            <tr v-if="!DocentesOrdered.length">
              <v-td width="665" colspan="3">
                <b>Nenhum docente encontrado</b>
              </v-td>
            </tr>
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
                @input="docenteForm.nome = $event.target.value.toUpperCase()"
                :value="docenteForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col-8 m-0 px-0">
              <label required for="apelido" class="col-form-label">Apelido</label>
              <input
                id="apelido"
                type="text"
                class="form-control form-control-sm input-medio"
                @input="docenteForm.apelido = $event.target.value.toUpperCase()"
                :value="docenteForm.apelido"
              />
            </div>

            <div class="form-check form-check-inline col-auto m-0 mt-4 px-0">
              <label for="ativo" class="form-check-label mr-2">Ativo</label>
              <input id="ativo" type="checkbox" value="1" v-model="docenteForm.ativo" />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nomesiga" class="col-form-label">Nome SIGA</label>

              <input
                id="nomesiga"
                type="text"
                class="form-control form-control-sm input-maior"
                @input="docenteForm.nomesiga = $event.target.value.toUpperCase()"
                :value="docenteForm.nomesiga"
              />
            </div>
          </div>

          <template v-if="isEdit">
            <div class="border-bottom mt-2 mb-1"></div>
            <small>Perfis Associados ao docente</small>

            <div class="row mb-3 mx-0">
              <div class="div-table">
                <BaseTable type="main" :styles="'max-height: 300px'">
                  <template #thead>
                    <v-th width="25" />
                    <v-th width="225" align="start">Perfis</v-th>
                  </template>

                  <template #tbody>
                    <tr
                      v-for="perfil in AllPerfis"
                      :key="perfil.id + perfil.abreviacao"
                      @click="toggleItemInArray(perfil.id, perfisAssociados)"
                    >
                      <v-td width="25" type="content">
                        <input
                          type="checkbox"
                          style="width: 11px"
                          v-model="perfisAssociados"
                          :value="perfil.id"
                        />
                      </v-td>
                      <v-td width="225" align="start" :title="perfil.nome">
                        {{ perfil.nome }}
                      </v-td>
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
          <b>{{ docenteForm.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhum docente selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique na linha da tabela do docente que deseja alterar. Em seguida, no cartão à
        direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela do docente que deseja remover. Em seguida, no cartão à
        direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das
        informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import docenteService from "@/common/services/docente";
import docentePerfilService from "@/common/services/docentePerfil";
import { toggleItemInArray, generateBooleanText } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";
const emptyDocente = {
  id: null,
  nome: null,
  apelido: null,
  nomesiga: null,
  creditos: 0,
  ativo: 1,
};
const emptyPerfil = {
  DocenteId: null,
  Perfil: null,
};

export default {
  name: "DashboardDocente",
  mixins: [toggleItemInArray, generateBooleanText],
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

    async addDocente() {
      try {
        this.setPartialLoading(true);
        if (!this.docenteForm.nomesiga) {
          this.docenteForm.nomesiga = this.docenteForm.nome;
        }
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

        if (perfilIndex === -1) await this.deletePerfil(this.perfilsOfCurrentDocente[i]);
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

    DocentesOrdered() {
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
