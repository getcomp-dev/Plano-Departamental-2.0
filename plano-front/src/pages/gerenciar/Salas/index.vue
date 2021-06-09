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
              title="Nome da Sala"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoSalasMain"
              orderToCheck="laboratorio"
              orderType="desc"
              width="95"
              align="start"
            >
              Laboratório
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoSalasMain"
              orderToCheck="lotacao_maxima"
              orderType="desc"
              width="110"
              title="Lotação maxima da Sala"
            >
              Lotação max.
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="sala in SalasOrdered"
              :key="sala.id"
              :class="['clickable', { 'bg-selected': salaSelectedId === sala.id }]"
              @click="handleClickInSala(sala)"
            >
              <v-td width="100" align="start">{{ sala.nome }}</v-td>
              <v-td width="95">{{ booleanToText(sala.laboratorio) }}</v-td>
              <v-td width="110">{{ sala.lotacao_maxima }}</v-td>
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
        title="Sala"
        width="320"
        :toggleFooter="isEditing"
        @btn-salvar="handleUpdateSala"
        @btn-delete="$refs.modalDelete.open()"
        @btn-add="handleCreateSala"
        @btn-clean="clearSalaForm"
      >
        <template #body>
          <div class="row">
            <div class="col-7">
              <VInput label="Nome" v-model="salaForm.nome" :validation="$v.salaForm.nome" />
            </div>
            <div class="col">
              <VInput
                label="Lotação Máx."
                inputType="number"
                v-model.number="salaForm.lotacao_maxima"
                :validation="$v.salaForm.lotacao_maxima"
              />
            </div>
          </div>

          <VCheckbox
            label="Laboratório"
            v-model.number="salaForm.laboratorio"
            :validation="$v.salaForm.laboratorio"
          />
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteSala">
      <li class="list-group-item">
        <span v-if="isEditing">
          Tem certeza que deseja excluír a sala
          <b>{{ salaForm.nome }}</b>
          ?
        </span>
        <span v-else>Nenhuma sala selecionada.</span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar sala:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar sala:</b>
        Clique na linha da tabela da sala que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar sala:</b>
        Clique na linha da tabela da sala que deseja remover. Em seguida, no cartão à direita,
        clique em Remover
        <font-awesome-icon :icon="['fas', 'trash-alt']" class="icon-red" />
        e confirme a remoção na janela que será aberta.
      </li>
      <li class="list-group-item">
        <b>Limpar formulário:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { orderBy } from "lodash-es";
import { required, integer, minValue } from "vuelidate/lib/validators";
import salaService from "@/services/sala";
import { booleanToText } from "@utils";
import { makeEmptySala } from "@utils/factories";
import { Card, VInput, VCheckbox } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";

export default {
  name: "GeneriarSalas",
  components: { Card, ModalAjuda, ModalDelete, VInput, VCheckbox },
  data() {
    return {
      salaSelectedId: null,
      salaForm: makeEmptySala(),
      ordenacaoSalasMain: { order: "nome", type: "asc" },
    };
  },
  validations: {
    salaForm: {
      nome: { required },
      laboratorio: { required, integer },
      lotacao_maxima: { required, integer, minValue: minValue(0) },
    },
  },

  methods: {
    booleanToText,

    handleClickInSala(sala) {
      this.salaSelectedId = sala.id;
      this.salaForm = { ...sala };
    },
    clearSalaForm() {
      this.salaSelectedId = null;
      this.salaForm = makeEmptySala();
      this.$nextTick(() => this.$v.$reset());
    },
    async handleCreateSala() {
      this.$v.salaForm.$touch();
      if (this.$v.salaForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const response = await salaService.create(this.salaForm);
        this.clearSalaForm();
        this.pushNotification({
          type: "success",
          text: `A Sala ${response.Sala.nome} foi criada!`,
        });
      } catch (error) {
        let errorMsg = "";
        if (error.response.data.fullMessage) {
          errorMsg += error.response.data.fullMessage.replace("\n", "<br/>");
        }
        this.pushNotification({
          type: "error",
          title: "Erro ao criar sala",
          text: errorMsg,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleUpdateSala() {
      this.$v.salaForm.$touch();
      if (this.$v.salaForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const response = await salaService.update(this.salaForm.id, this.salaForm);
        this.pushNotification({
          type: "success",
          text: `A Sala ${response.Sala.nome} foi atualizada!`,
        });
      } catch (error) {
        let errorMsg = "";
        if (error.response.data.fullMessage) {
          errorMsg += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
        }
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar sala",
          text: errorMsg,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteSala() {
      try {
        this.setLoading({ type: "partial", value: true });
        const response = await salaService.delete(this.salaForm.id, this.salaForm);
        this.clearSalaForm();
        this.pushNotification({
          type: "success",
          text: `A Sala ${response.Sala.nome} foi excluída!`,
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: "Erro ao excluir Sala",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllSalas"]),

    SalasOrdered() {
      return orderBy(this.AllSalas, this.ordenacaoSalasMain.order, this.ordenacaoSalasMain.type);
    },
    isEditing() {
      return this.salaForm.id != null;
    },
  },
};
</script>
