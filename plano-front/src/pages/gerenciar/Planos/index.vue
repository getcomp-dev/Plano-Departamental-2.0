<template>
  <div class="main-component">
    <PageHeader :title="'Planos'">
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
      <BaseButton template="file-upload" @click="toggleAsideModal('importPlano')" />
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <th
              style="width: 70px"
              class="t-start clickable"
              @click="toggleOrder(ordenacaoMainPlanos, 'ano')"
            >
              Ano
              <i :class="setIconByOrder(ordenacaoMainPlanos, 'ano')"></i>
            </th>
            <th
              style="width: 150px"
              class="t-start clickable"
              @click="toggleOrder(ordenacaoMainPlanos, 'nome')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoMainPlanos, 'nome')"></i>
            </th>
            <th
              style="width: 300px"
              class="t-start clickable"
              @click="toggleOrder(ordenacaoMainPlanos, 'obs')"
            >
              Observação
              <i :class="setIconByOrder(ordenacaoMainPlanos, 'obs')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="plano in PlanosOrdered"
              :key="plano.id"
              @click="handleClickInPlano(plano)"
              :class="{ 'bg-selected': plano.id === planoSelectedId }"
            >
              <td style="width: 70px" class="t-start">{{ plano.ano }}</td>
              <td style="width: 150px" class="t-start">{{ plano.nome }}</td>
              <td style="width: 300px" class="t-start">{{ plano.obs }}</td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Plano'"
        :toggleFooter="isEdit"
        :isPlano="isEdit"
        @btn-salvar="handleEditPlano"
        @btn-delete="openModalDelete"
        @btn-add="openModalNovoPlano"
        @btn-clean="cleanPlano"
        @btn-copy="copyPlano(planoForm)"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="planoNome">Nome</label>
              <input
                type="text"
                id="planoNome"
                v-model="planoForm.nome"
                @keypress="limitNomeLength"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="ano">Ano</label>
              <select
                id="planoAno"
                v-model.number="planoForm.ano"
                class="form-control input-ano"
              >
                <option
                  v-for="year in AnosDoPlano"
                  :key="'anos' + year"
                  :value="year"
                  >{{ year }}</option
                >
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="planoObs">Observações</label>
              <textarea
                id="planoObs"
                cols="30"
                rows="3"
                v-model="planoForm.obs"
                class="form-control"
              ></textarea>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalNovoPlano ref="modalNovoPlano" :plano="planoForm" />

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEdit"
      @btn-deletar="handleDeletePlano"
    >
      <li class="list-group-item">
        <span v-if="isEdit">
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
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Editar:</b> Clique na linha da tabela do plano que deseja alterar. Em
        seguida, no cartão à direita, altere as informações que desejar e clique em
        Salvar <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />.
      </li>
      <li class="list-group-item">
        <b>Deletar:</b> Clique na linha da tabela do plano que deseja remover. Em
        seguida, no cartão à direita, clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" /> e
        confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Copiar:</b> Clique na linha da tabela do plano que deseja copiar. Em
        seguida, no cartão à direita, clique em Copiar
        <font-awesome-icon :icon="['fas', 'copy']" class="icon-lightblue" /> .
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

    <ModalImportPlano ref="modalImportPlano" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toggleOrdination, toggleAsideModal } from "@/common/mixins";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { Card } from "@/components/ui";
import copyPlanoService from "../../../common/services/copyPlano";
import planoService from "../../../common/services/plano";
import ModalNovoPlano from "./ModalNovoPlano";
import ModalImportPlano from "./ModalImportPlano";

const emptyPlano = {
  ano: "",
  nome: "",
  obs: "",
};

export default {
  name: "Planos",
  mixins: [toggleOrdination, toggleAsideModal],
  components: {
    ModalAjuda,
    ModalDelete,
    Card,
    ModalNovoPlano,
    ModalImportPlano,
  },
  data() {
    return {
      asideModalsRefs: ["modalImportPlano", "modalAjuda"],
      planoForm: this.$_.clone(emptyPlano),
      planoSelectedId: null,
      ordenacaoMainPlanos: { order: "ano", type: "asc" },
    };
  },

  methods: {
    ...mapActions(["deletePlano", "editPlano"]),

    limitNomeLength($event) {
      if ($event.target.value.length >= 10) $event.preventDefault();
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
    copyPlano(oldPlano) {
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
    isEdit() {
      return this.planoSelectedId != null;
    },
  },
};
</script>

<style scoped>
::v-deep .card input[type="text"],
::v-deep .card input[type="password"] {
  width: 200px !important;
  height: 25px !important;
  padding: 0px 5px !important;
  font-size: 12px !important;
  text-align: start;
}
.card select {
  width: 100px;
  font-size: 12px !important;
  height: 25px !important;
  padding: 0px 5px !important;
}
textarea {
  padding: 5px !important;
  font-size: 12px !important;
}
</style>
