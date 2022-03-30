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
              :currentOrder="ordenacaoHorarios"
              orderToCheck="horario"
              width="90"
              title="Dia e Horário"
            >
              Horário
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoHorarios"
              orderToCheck="ativo"
              width="70"
              title="Horário Ativo"
            >
              Ativo
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="horario in HorariosOrdered"
              :key="horario.id + horario.horario"
              @click="handleClickInHorario(horario)"
              class=""
              :class="['clickable', { 'bg-selected': horarioSelecionado === horario.id }]"
            >
              <v-td width="90">{{ horario.horario }}</v-td>
              <v-td v-if="horario.ativo" width="70">Sim</v-td>
              <v-td v-else width="70">-</v-td>
            </tr>

            <tr v-if="!HorariosOrdered.length">
              <v-td width="580" colspan="5">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="icon-red" />
                <b>Nenhum horário encontrado!</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        title="Horário"
        width="320"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditHorario"
        @btn-delete="openModalDelete"
        @btn-add="handleCreateHorario"
        @btn-clean="clearForm"
      >
        <template #body>
          <VInput label="Nome" v-model="horarioForm.horario" :validation="$v.horarioForm.horario" />
          <!-- <VInput label="Dia e Horário" v-model="horarioForm.horario"/> -->

          <VCheckbox label="Ativo" v-model="horarioForm.ativo" />
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteHorario">
      <li v-if="isEditing" class="list-group-item">
        <span v-html="modalDeleteText"></span>
      </li>
      <li v-else class="list-group-item">Nenhuma horário selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar horário:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar horário:</b>
        Clique na linha da tabela do horário que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar horário:</b>
        Clique na linha da tabela do horário que deseja remover. Em seguida, no cartão à direita,
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
import { mapActions, mapGetters } from "vuex";
import { ModalDelete, ModalAjuda } from "@/components/modals";
import { required } from "vuelidate/lib/validators";
import { Card, VInput, VCheckbox } from "@/components/ui";
import { makeEmptyHorario } from "@utils/factories";
import { orderBy } from "lodash-es";

export default {
  name: "DashboardHorarios",
  components: { Card, VInput, ModalDelete, ModalAjuda, VCheckbox },
  data() {
    return {
      modalDeleteText: "",
      horarioSelecionado: "",
      horarioForm: makeEmptyHorario(),
      ordenacaoHorarios: { order: "horario", type: "asc" },
    };
  },
  validations: {
    horarioForm: {
      horario: { required },
      ativo: { required },
    },
  },

  methods: {
    ...mapActions(["createHorario", "editHorario", "deleteHorario"]),

    handleClickInHorario(horario) {
      this.horarioSelecionado = horario.id;
      this.horarioForm = { ...horario };
    },
    clearForm() {
      this.horarioSelecionado = "";
      this.horarioForm = makeEmptyHorario();
      this.$nextTick(() => this.$v.$reset());
    },
    openModalDelete() {
      this.modalDeleteText = `Tem certeza que deseja excluír o horário
      <b>${this.horarioForm.horario}</b>?`;

      this.$refs.modalDelete.open();
    },

    async handleCreateHorario() {
      this.$v.horarioForm.$touch();
      if (this.$v.horarioForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.createHorario({ ...this.horarioForm });
        this.clearForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar novo horário!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleEditHorario() {
      this.$v.horarioForm.$touch();
      if (this.$v.horarioForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.editHorario({ ...this.horarioForm });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao editar horário!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteHorario() {
      this.$v.horarioForm.$touch();
      if (this.$v.horarioForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteHorario({ ...this.horarioForm });
        this.clearForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao deletar horário!",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllHorarios"]),

    HorariosOrdered() {
      return orderBy(this.AllHorarios, this.ordenacaoHorarios.order, this.ordenacaoHorarios.type);
    },
    isEditing() {
      return this.horarioForm.id !== null;
    },
  },
};
</script>
