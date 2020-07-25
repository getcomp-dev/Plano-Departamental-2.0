<template>
  <div class="main-component">
    <PageHeader :title="'Planos'">
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
              style="width: 70px"
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
              :class="{ 'bg-selected': plano.id === planoSelected }"
            >
              <td style="width: 70px" class="t-start">{{ plano.ano }}</td>
              <td style="width: 70px" class="t-start">{{ plano.nome }}</td>
              <td style="width: 300px" class="t-start">{{ plano.obs }}</td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Plano'"
        :toggleFooter="isEdit"
        @btn-salvar="editPlano()"
        @btn-delete="openModalDelete()"
        @btn-add="openModalNovoPlano()"
        @btn-clean="cleanPlano()"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="ano">Ano </label>
              <select
                id="planoAno"
                v-model.number="planoForm.ano"
                class="form-control input-ano"
              >
                <option
                  v-for="year in AnosDoPlano"
                  :key="'anos' + year"
                  :value="year"
                >
                  {{ year }}</option
                >
              </select>
            </div>
          </div>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="planoNome">Nome</label>
              <input
                type="text"
                id="planoNome"
                v-model="planoForm.nome"
                class="form-control"
              />
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

    <BaseModal
      ref="modalDeletePlano"
      :modalOptions="{
        title: 'Deletar plano',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:450px; font-size:14px'"
    >
      <template #modal-body>
        <p class="w-100 m-0">
          <template v-if="isEdit">
            Tem certeza que deseja deletar o plano
            <b>{{ planoForm.ano }}</b> ?
          </template>
          <template v-else>
            Nenhum plano selecionado!
          </template>
        </p>
      </template>
      <template #modal-footer>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'gray'"
          @click="closeModalDelete"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'red'"
          @click="deletePlano"
        >
          Deletar
        </BaseButton>
      </template>
    </BaseModal>
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
            <b>Para excluir um plano:</b> clique no ícone de deletar
            <i class="fas fa-times delbtn"></i> presente na tabela, em seguida
            confirme se é realmente o plano que deseja exluir e clique no botão
            deletar ou cancelar.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import planoService from "@/common/services/plano";
import { toggleOrdination, notification } from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseModal,
  BaseButton,
  PasswordInput,
  Card,
} from "@/components/ui";
import ModalNovoPlano from "./ModalNovoPlano";

const emptyPlano = {
  ano: "",
  nome: "",
  obs: "",
};

export default {
  name: "Planos",
  mixins: [notification, toggleOrdination],
  components: {
    BaseTable,
    PageHeader,
    BaseButton,
    Card,
    PasswordInput,
    BaseModal,
    ModalNovoPlano,
  },
  data() {
    return {
      planoForm: _.clone(emptyPlano),
      planoSelected: null,
      ordenacaoMainPlanos: { order: "ano", type: "asc" },
    };
  },
  methods: {
    handleClickInPlano(plano) {
      this.cleanPlano();
      this.planoSelected = plano.id;
      this.showPlano(plano);
    },
    showPlano(plano) {
      this.planoForm = _.clone(plano);
    },
    cleanPlano() {
      this.planoSelected = null;
      this.planoForm = _.clone(emptyPlano);
    },
    openModalDelete() {
      this.$refs.modalDeletePlano.open();
    },
    closeModalDelete() {
      this.$refs.modalDeletePlano.close();
    },
    validatePlano(plano) {
      if (plano.ano === "" || plano.ano === null) {
        this.showNotification({
          type: "error",
          message: `Campos obrigatórios inválidos ou incompletos.`,
        });
        return false;
      } else return true;
    },
    openModalNovoPlano() {
      if (!this.validatePlano(this.planoForm)) return;

      this.$refs.modalNovoPlano.open();
    },
    async editPlano() {
      const plano = _.clone(this.planoForm);

      if (!this.validatePlano(plano)) {
        this.showNotification({
          type: "error",
          message: `Campo ano inválido.`,
        });
        return;
      }

      try {
        await planoService.update(plano.id, plano);
        this.showNotification({
          type: "success",
          message: `Plano atualizado.`,
        });
      } catch (error) {
        this.showNotification({
          type: "error",
          message: "Erro ao atualizar plano",
        });
      }
    },
    async deletePlano() {
      const plano = _.clone(this.planoForm);

      try {
        await planoService.delete(plano.id, plano);
        this.showNotification({
          type: "success",
          message: `Plano ${plano.ano} foi removido.`,
        });
        this.closeModalDelete();
        this.cleanPlano();
      } catch (error) {
        this.showNotification({
          type: "error",
          message: error,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["allPlanos", "AnosDoPlano"]),

    PlanosOrdered() {
      const { order, type } = this.ordenacaoMainPlanos;
      return _.orderBy(this.allPlanos, order, type);
    },
    isEdit() {
      return this.planoSelected != null;
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
