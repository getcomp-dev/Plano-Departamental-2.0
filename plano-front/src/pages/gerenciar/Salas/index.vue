<template>
  <div class="main-component row">
    <PageHeader :title="'Salas'">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable>
          <template #thead>
            <th
              style="width: 82px"
              class="clickable t-start"
              @click="toggleOrder(ordenacaoSalasMain, 'nome')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoSalasMain, 'nome')"></i>
            </th>
            <th
              style="width: 90px"
              class="clickable"
              @click="toggleOrder(ordenacaoSalasMain, 'laboratorio', 'desc')"
            >
              Laboratório
              <i :class="setIconByOrder(ordenacaoSalasMain, 'laboratorio')"></i>
            </th>
            <th
              style="width: 100px"
              class="clickable"
              @click="toggleOrder(ordenacaoSalasMain, 'lotacao_maxima', 'desc')"
            >
              Lotação Max.
              <i :class="setIconByOrder(ordenacaoSalasMain, 'lotacao_maxima')"></i>
            </th>
          </template>
          <template #tbody>
            <template v-for="sala in Salas">
              <tr
                :key="sala.id"
                v-on:click.prevent="handleClickInSala(sala)"
                :class="[{ 'bg-selected': salaClickada === sala.nome }, 'clickable']"
              >
                <td style="width: 82px" class="t-start">{{ sala.nome }}</td>

                <td style="width: 90px">
                  {{ booleanToText(sala.laboratorio) }}
                </td>
                <td style="width: 100px">{{ sala.lotacao_maxima }}</td>
              </tr>
            </template>
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
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                type="text"
                class="input-menor form-control form-control-sm"
                id="nome"
                v-model="salaForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="lotacao_maxima" class="col-form-label"
                >Lotação Máx.</label
              >
              <input
                type="text"
                class="input-menor form-control form-control-sm"
                id="lotacao_maxima"
                @keypress="maskOnlyNumber"
                v-model="salaForm.lotacao_maxima"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-check form-check-inline col m-0 px-0 pl-1">
              <label class="form-check-label mr-2" for="laboratorio"
                >Laboratório</label
              >
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
          <b>{{ salaForm.nome }}</b
          >?
        </span>
        <span v-else>Nenhuma sala selecionada.</span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Editar:</b> Clique na linha da tabela da sala que deseja alterar. Em
        seguida, no cartão à direita, altere as informações que desejar e clique em
        Salvar <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b> Clique na linha da tabela da sala que deseja remover. Em
        seguida, no cartão à direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" /> e
        confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar:</b> No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />, para limpar
        as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b> Clique no cabeçalho da tabela, na coluna desejada, para
        alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import salaService from "@/common/services/sala";
import { toggleOrdination, maskOnlyNumber } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { mapGetters } from "vuex";

const emptySala = {
  id: undefined,
  nome: undefined,
  laboratorio: undefined,
  lotacao_maxima: undefined,
};

export default {
  name: "DashboardSalas",
  mixins: [toggleOrdination, maskOnlyNumber],
  components: {
    Card,
    ModalAjuda,
    ModalDelete,
  },
  data() {
    return {
      error: undefined,
      salaForm: this.$_.clone(emptySala),
      salaClickada: null,
      ordenacaoSalasMain: { order: "nome", type: "asc" },
    };
  },

  methods: {
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    booleanToText(isLab) {
      return isLab ? "Sim" : "-";
    },
    handleClickInSala(sala) {
      this.salaClickada = sala.nome;
      this.showSala(sala);
    },
    cleanSala() {
      this.salaClickada = null;
      this.salaForm = this.$_.clone(emptySala);
      this.error = null;
    },
    showSala(sala) {
      this.cleanSala();
      this.salaForm = this.$_.clone(sala);
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

    Salas() {
      return this.$_.orderBy(
        this.AllSalas,
        this.ordenacaoSalasMain.order,
        this.ordenacaoSalasMain.type
      );
    },
    isEdit() {
      return this.salaForm.id !== undefined;
    },
  },
};
</script>

<style scoped>
.card .input-menor {
  min-width: 100px;
  text-align: start;
}
</style>
