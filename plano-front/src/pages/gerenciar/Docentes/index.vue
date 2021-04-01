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
              :currentOrder="ordenacaoDocentesMain"
              orderToCheck="nome"
              width="240"
              align="start"
              title="Nome do Docente"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDocentesMain"
              orderToCheck="apelido"
              width="120"
              align="start"
              title="Apelido do Docente"
            >
              Apelido
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
              :key="docente.id"
              :class="[{ 'bg-selected': docenteSelecionadoId == docente.id }, 'clickable']"
              @click="handleClickInDocente(docente)"
            >
              <v-td width="240" align="start">{{ docente.nome }}</v-td>
              <v-td width="120" align="start">{{ docente.apelido }}</v-td>
              <v-td width="65">{{ booleanToText(docente.ativo) }}</v-td>
            </tr>

            <tr v-if="!DocentesOrdered.length">
              <v-td width="425" colspan="3">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="icon-red" />
                <b>Nenhum docente encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Docente'"
        width="320"
        :toggleFooter="isEditing"
        @btn-salvar="handleUpdateDocente"
        @btn-delete="$refs.modalDelete.open()"
        @btn-add="handleCreateDocente"
        @btn-clean="clearForm"
      >
        <template #body>
          <VInput label="Nome" v-model="docenteForm.nome" :validation="$v.docenteForm.nome" />

          <div class="row">
            <div class="col-8">
              <VInput
                label="Apelido"
                v-model="docenteForm.apelido"
                :validation="$v.docenteForm.apelido"
              />
            </div>
            <div class="col">
              <VCheckbox label="Ativo" v-model="docenteForm.ativo" inlineRow />
            </div>
          </div>

          <template v-if="isEditing">
            <div class="border-bottom mt-2 mb-1"></div>
            <small>Perfis Associados ao docente</small>

            <div class="row mx-0">
              <div class="div-table">
                <BaseTable type="main" styles="max-height: 300px">
                  <template #thead>
                    <v-th width="25" />
                    <v-th width="235" align="start">Perfis</v-th>
                  </template>

                  <template #tbody>
                    <tr
                      v-for="perfil in AllPerfis"
                      :key="perfil.id + perfil.abreviacao"
                      @click="toggleItemInArray(perfil.id, perfisDocenteForm)"
                    >
                      <v-td width="25" type="content">
                        <input
                          type="checkbox"
                          style="width: 11px"
                          v-model="perfisDocenteForm"
                          :value="perfil.id"
                        />
                      </v-td>
                      <v-td width="235" align="start" :title="perfil.nome">
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

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteDocente">
      <li v-if="isEditing" class="list-group-item">
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
        <b>Adicionar docente:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar docente:</b>
        Clique na linha da tabela do docente que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar docente:</b>
        Clique na linha da tabela do docente que deseja remover. Em seguida, no cartão à direita,
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
import { orderBy } from "lodash-es";
import { required, maxLength } from "vuelidate/lib/validators";
import { toggleItemInArray } from "@mixins";
import { booleanToText } from "@utils";
import { makeEmptyDocente } from "@utils/factories";
import { Card, VInput, VCheckbox } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";

export default {
  name: "DashboardDocente",
  mixins: [toggleItemInArray],
  components: { Card, VInput, VCheckbox, ModalAjuda, ModalDelete },
  data() {
    return {
      docenteForm: makeEmptyDocente(),
      perfisDocenteForm: [],
      docenteSelecionadoId: null,
      ordenacaoDocentesMain: { order: "nome", type: "asc" },
    };
  },
  validations: {
    docenteForm: {
      nome: { required },
      apelido: { required, maxLength: maxLength(15) },
    },
  },

  methods: {
    ...mapActions(["createDocente", "updateDocente", "deleteDocente"]),
    booleanToText,

    handleClickInDocente(docente) {
      this.docenteSelecionadoId = docente.id;
      this.docenteForm = { ...docente };
      const perfisDoDocente = this.DocentesPerfis.filter(
        (docentePerfil) => docentePerfil.DocenteId === this.docenteForm.id
      );
      this.perfisDocenteForm = perfisDoDocente.map((perfilDocente) => perfilDocente.Perfil);
    },
    clearForm() {
      this.docenteSelecionadoId = null;
      this.docenteForm = makeEmptyDocente();
      this.$nextTick(() => this.$v.$reset());
    },
    async handleCreateDocente() {
      this.$v.docenteForm.$touch();
      if (this.$v.docenteForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.createDocente({ data: this.docenteForm, notify: true });
        this.clearForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar Docente!",
          text: error.response.data.fullMessage
            ? "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>")
            : "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleUpdateDocente() {
      this.$v.docenteForm.$touch();
      if (this.$v.docenteForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.updateDocente({
          data: { docente: this.docenteForm, docentePerfisIds: this.perfisDocenteForm },
          notify: true,
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar Docente",
          text: error.message
            ? error.message
            : error.response.data.fullMessage
              ? "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>")
              : "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteDocente() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.deleteDocente({ data: this.docenteForm, notify: true });
        this.clearForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir Docente!",
          text: "O docente não pode estar vinculado a nenhum perfil",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllDocentes", "DocentesPerfis", "AllPerfis"]),

    DocentesOrdered() {
      return orderBy(
        this.AllDocentes,
        this.ordenacaoDocentesMain.order,
        this.ordenacaoDocentesMain.type
      );
    },
    isEditing() {
      return this.docenteForm.id !== null;
    },
  },
};
</script>
