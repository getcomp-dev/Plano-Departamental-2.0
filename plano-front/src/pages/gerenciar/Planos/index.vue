<template>
  <div class="main-component">
    <PageHeader :title="'Planos'">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="ano"
              width="70"
              align="start"
            >
              Ano
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="nome"
              width="150"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th width="300" align="start">Observação</v-th>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="isEditable"
              orderType="desc"
              width="70"
            >
              Editável
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoMainPlanos"
              orderToCheck="visible"
              orderType="desc"
              width="70"
            >
              Visível
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="plano in PlanosOrdered"
              :key="plano.id"
              :class="{ 'bg-selected': plano.id === planoSelectedId }"
              @click="handleClickInPlano(plano)"
            >
              <v-td width="70" align="start">{{ plano.ano }}</v-td>
              <v-td width="150" align="start">{{ plano.nome }}</v-td>
              <v-td width="300" align="start" :title="plano.obs">{{ plano.obs }}</v-td>
              <v-td width="70">{{ generateBooleanText(plano.isEditable) }}</v-td>
              <v-td width="70">{{ generateBooleanText(plano.visible) }}</v-td>
            </tr>

            <tr v-if="!PlanosOrdered.length">
              <v-td width="680" colspan="5">
                <b>Nenhum plano encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Plano'"
        :toggleFooter="isEditing"
        :isPlano="isEditing"
        @btn-salvar="handleEditPlano"
        @btn-delete="openModalDelete"
        @btn-add="openModalNovoPlano"
        @btn-clean="cleanPlano"
        @btn-copy="copyPlanoSelected(planoForm)"
      >
        <template #form-group>
          <div class="row w-100 m-0 mb-2">
            <div class="form-group col-9 m-0 p-0 pr-3">
              <label required for="planoNome">Nome</label>
              <input
                type="text"
                id="planoNome"
                v-model="planoForm.nome"
                class="form-control w-100"
                @keypress="limitStringLength"
              />
            </div>

            <div class="form-group col-3 m-0 p-0">
              <label required for="ano">Ano</label>
              <select
                id="planoAno"
                class="form-control w-100"
                v-model.number="planoForm.ano"
              >
                <option v-for="ano in AnosDoPlano" :key="'ano' + ano" :value="ano">
                  {{ ano }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="planoObs">Observações</label>
              <textarea
                id="planoObs"
                cols="38"
                rows="5"
                v-model="planoForm.obs"
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col-6 m-0 p-0 pr-2">
              <label required for="planoEditavel">Editável</label>
              <select
                id="planoEditavel"
                v-model.number="planoForm.isEditable"
                class="form-control"
              >
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>

            <div class="form-group col-6 m-0 p-0 pl-2">
              <label required for="planoVisivel">Visível</label>
              <select
                id="planoVisivel"
                v-model.number="planoForm.visible"
                class="form-control"
              >
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalNovoPlano ref="modalNovoPlano" :plano="planoForm" />

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditing"
      @btn-deletar="handleDeletePlano"
    >
      <li class="list-group-item">
        <span v-if="isEditing">
          Tem certeza que deseja excluír o plano
          <b>{{ planoForm.ano + " - " + planoForm.nome }}</b>
          ?
        </span>
        <span v-else class="list-group-item">Nenhum plano selecionado.</span>
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
        Clique na linha da tabela do plano que deseja alterar. Em seguida, no cartão à
        direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela do plano que deseja remover. Em seguida, no cartão à
        direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Copiar:</b>
        Clique na linha da tabela do plano que deseja copiar. Em seguida, no cartão à
        direita, clique em Copiar
        <font-awesome-icon :icon="['fas', 'copy']" class="icon-lightblue" />
        .
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
import { mapGetters, mapActions } from "vuex";
import { generateBooleanText } from "@/common/mixins";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { Card } from "@/components/ui";
import copyPlanoService from "@/common/services/copyPlano";
import planoService from "@/common/services/plano";
import ModalNovoPlano from "./ModalNovoPlano/index";
const emptyPlano = {
  ano: 2019,
  nome: "",
  obs: "",
  isEditable: true,
  visible: true,
};

export default {
  name: "Planos",
  mixins: [generateBooleanText],
  components: {
    ModalAjuda,
    ModalDelete,
    Card,
    ModalNovoPlano,
  },
  data() {
    return {
      planoForm: this.$_.clone(emptyPlano),
      planoSelectedId: null,
      ordenacaoMainPlanos: { order: "ano", type: "asc" },
    };
  },

  methods: {
    ...mapActions(["deletePlano", "editPlano"]),

    limitStringLength($event) {
      if ($event.target.value.length >= 12) $event.preventDefault();
    },
    handleClickInPlano(plano) {
      this.cleanPlano();
      this.planoSelectedId = plano.id;
      this.planoForm = this.$_.clone(plano);
    },
    cleanPlano() {
      this.planoSelectedId = null;
      this.planoForm = this.$_.clone(emptyPlano);
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    openModalNovoPlano() {
      if (
        this.planoForm.ano === "" ||
        this.planoForm.ano === null ||
        this.planoForm.nome === "" ||
        this.planoForm.nome === null
      )
        this.pushNotification({
          type: "error",
          text: `Campos obrigatórios inválidos ou incompletos.`,
        });
      else {
        this.$refs.modalNovoPlano.open();
      }
    },

    async handleEditPlano() {
      try {
        this.setPartialLoading(true);
        await this.editPlano(this.planoForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar plano",
          text: error.message || "",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async handleDeletePlano() {
      try {
        this.setPartialLoading(true);
        await this.deletePlano(this.planoForm);
        this.cleanPlano();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao deletar plano",
          text: "Tente novamente",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    copyPlanoSelected(oldPlano) {
      let newPlano = {
        nome: `Cópia de '${oldPlano.nome}'`,
        ano: oldPlano.ano,
        obs: `Cópia do plano '${oldPlano.nome} - ${oldPlano.ano}'`,
      };
      planoService.create(newPlano).then((plano) => {
        copyPlanoService
          .copyPlano(oldPlano.id, plano.Plano.id)
          .then((response) => {
            this.$notify({
              group: "general",
              title: `Sucesso!`,
              text: `O Plano ${oldPlano.nome} foi copiado!`,
              type: "success",
            });
          })
          .catch((error) => {
            this.error = "<b>Erro ao copiar plano</b>";
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
      });
    },
  },

  computed: {
    ...mapGetters(["AllPlanos", "AnosDoPlano"]),

    PlanosOrdered() {
      const { order, type } = this.ordenacaoMainPlanos;
      return this.$_.orderBy(this.AllPlanos, order, type);
    },
    isEditing() {
      return this.planoSelectedId != null;
    },
  },
};
</script>

<style scoped>
::v-deep .card input[type="text"],
::v-deep .card select {
  width: 100%;
  height: 25px !important;
  padding: 0px 5px !important;
  font-size: 12px !important;
  text-align: start;
}
textarea {
  padding: 5px;
  font-size: 12px;
}
</style>
