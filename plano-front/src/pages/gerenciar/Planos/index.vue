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
              :class="{ 'bg-selected': plano.id === planoSelectedId }"
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
        @btn-salvar="handleEditPlano()"
        @btn-delete="openModalDelete()"
        @btn-add="openModalNovoPlano()"
        @btn-clean="cleanPlano()"
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
            <b>{{ planoForm.nome + " - " + planoForm.ano }}</b> ?
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
          @click="handleDeletePlano"
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
            <i class="fas fa-times icon-red"></i> presente na tabela, em seguida
            confirme se é realmente o plano que deseja exluir e clique no botão
            deletar ou cancelar.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { toggleOrdination } from "@/common/mixins";
import { PageHeader, Card } from "@/components/ui";
import ModalNovoPlano from "./ModalNovoPlano";

const emptyPlano = {
  ano: "",
  nome: "",
  obs: "",
};

export default {
  name: "Planos",
  mixins: [toggleOrdination],
  components: {
    PageHeader,

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
    ...mapActions([
      "pushNotification",
      "setPartialLoading",
      "setCurrentPlanoId",
      "deletePlano",
      "editPlano",
    ]),

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
      this.$refs.modalDeletePlano.open();
    },

    closeModalDelete() {
      this.$refs.modalDeletePlano.close();
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
        this.closeModalDelete();
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
  },
  computed: {
    ...mapGetters(["allPlanos", "AnosDoPlano"]),

    PlanosOrdered() {
      const { order, type } = this.ordenacaoMainPlanos;
      return this.$_.orderBy(this.allPlanos, order, type);
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