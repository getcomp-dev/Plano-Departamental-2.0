<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoSalasMain"
              orderToCheck="nome"
              width="100"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoSalasMain"
              orderToCheck="laboratorio"
              orderType="desc"
              width="90"
              align="start"
            >
              Laboratório
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoSalasMain"
              orderToCheck="lotacao_maxima"
              orderType="desc"
              width="100"
            >
              Lotação max.
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="sala in SalasOrdered"
              :key="sala.id"
              :class="[{ 'bg-selected': salaSelected === sala.id }, 'clickable']"
              @click="handleClickInSala(sala)"
            >
              <v-td width="100" align="start">{{ sala.nome }}</v-td>
              <v-td width="90">{{ generateBooleanText(sala.laboratorio) }}</v-td>
              <v-td width="100">{{ sala.lotacao_maxima }}</v-td>
            </tr>

            <tr v-if="!SalasOrdered.length">
              <v-td width="290" colspan="3">
                <b>Nenhuma sala encontrada</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Sala'"
        :toggleFooter="isEdit"
        @btn-salvar="editSala"
        @btn-delete="openModalDelete"
        @btn-add="addSala"
        @btn-clean="cleanSala"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="salaNome" class="col-form-label">Nome</label>
              <input
                id="salaNome"
                type="text"
                class="form-control form-control-sm input-md"
                @change="salaForm.nome = normalizeInputText($event)"
                :value="salaForm.nome"
              />
            </div>

            <div class="form-group col m-0 px-0">
              <label required for="lotacaoMaxima" class="col-form-label">
                Lotação Máx.
              </label>
              <input
                id="lotacaoMaxima"
                type="number"
                min="0"
                class="form-control form-control-sm text-center input-md"
                @keypress="maskOnlyNumber"
                v-model.number="salaForm.lotacao_maxima"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-check form-check-inline col m-0 px-0">
              <label class="form-check-label mr-2" for="laboratorio">Laboratório</label>
              <input
                type="checkbox"
                id="laboratorio"
                class="form-check-input"
                v-model="salaForm.laboratorio"
                value="1"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEdit" @btn-deletar="deleteSala">
      <li class="list-group-item">
        <span v-if="isEdit">
          Tem certeza que deseja excluír a sala
          <b>{{ salaForm.nome }}</b>
          ?
        </span>
        <span v-else>Nenhuma sala selecionada.</span>
      </li>
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
        Clique na linha da tabela da sala que deseja alterar. Em seguida, no cartão à
        direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela da sala que deseja remover. Em seguida, no cartão à
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
import { clone, orderBy } from "lodash-es";
import salaService from "@/common/services/sala";
import { generateBooleanText, maskOnlyNumber, normalizeInputText } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";

const emptySala = {
  id: null,
  nome: null,
  laboratorio: 0,
  lotacao_maxima: 0,
};

export default {
  name: "DashboardSalas",
  mixins: [maskOnlyNumber, generateBooleanText, normalizeInputText],
  components: {
    Card,
    ModalAjuda,
    ModalDelete,
  },
  data() {
    return {
      error: null,
      salaSelected: null,
      salaForm: clone(emptySala),
      ordenacaoSalasMain: { order: "nome", type: "asc" },
    };
  },

  methods: {
    openModalDelete() {
      this.$refs.modalDelete.open();
    },

    handleClickInSala(sala) {
      this.showSala(sala);
      this.salaSelected = sala.id;
    },
    cleanSala() {
      this.salaSelected = null;
      this.salaForm = clone(emptySala);
      this.error = null;
    },
    showSala(sala) {
      this.cleanSala();
      this.salaForm = clone(sala);
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
          this.error = "";
          if (error.response.data.fullMessage) {
            this.error += error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: "Erro ao criar sala!",
            text: this.error,
            type: "error",
          });
        });
    },
    editSala() {
      if (this.salaForm.lotacao_maxima === "") this.salaForm.lotacao_maxima = 0;
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
            type: "success",
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
  },

  computed: {
    ...mapGetters(["AllSalas"]),

    SalasOrdered() {
      return orderBy(
        this.AllSalas,
        this.ordenacaoSalasMain.order,
        this.ordenacaoSalasMain.type
      );
    },
    isEdit() {
      return this.salaForm.id != null;
    },
  },
};
</script>
