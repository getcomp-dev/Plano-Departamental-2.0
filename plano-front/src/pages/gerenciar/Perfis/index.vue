<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable styles="height:max-content">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoPerfisMain"
              orderToCheck="nome"
              width="350"
              align="start"
              title="Nome do Perfil"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoPerfisMain"
              orderToCheck="abreviacao"
              width="90"
              align="start"
              title="Abreviação do Perfil"
            >
              Abreviação
            </v-th-ordination>
            <v-th width="65" title="Cor do Perfil">Cor</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="perfil in PerfisOrdered"
              :key="perfil.id"
              :class="['clickable', { 'bg-selected': perfilSelecionadoId === perfil.id }]"
              @click="handleClickInPerfil(perfil)"
            >
              <v-td width="350" align="start">{{ perfil.nome }}</v-td>
              <v-td width="90" align="start">{{ perfil.abreviacao }}</v-td>
              <v-td width="65" type="content">
                <div
                  :style="{
                    backgroundColor: perfil.cor,
                    width: '50px',
                    height: '12px',
                    border: '1px black solid',
                  }"
                ></div>
              </v-td>
            </tr>

            <tr v-if="!PerfisOrdered.length">
              <v-td width="505" colspan="3">
                <b>Nenhum perfil encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        title="Perfil"
        width="350"
        :toggleFooter="isEditing"
        @btn-salvar="handleUpdatePerfil"
        @btn-delete="$refs.modalDelete.open()"
        @btn-add="handleCreatePerfil"
        @btn-clean="clearPerfilForm"
      >
        <template #body>
          <VInput label="Nome" v-model="perfilForm.nome" :validation="$v.perfilForm.nome" />
          <div class="row">
            <div class="col">
              <VInput
                label="Abreviação"
                v-model="perfilForm.abreviacao"
                :validation="$v.perfilForm.abreviacao"
              />
            </div>
            <div class="col">
              <VInput
                inputType="color"
                label="Cor"
                v-model="perfilForm.cor"
                :validation="$v.perfilForm.cor"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeletePerfil">
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír o perfil
          <b>{{ perfilForm.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhum perfil selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Adicionar perfil:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar perfil:</b>
        Clique na linha da tabela do perfil que deseja alterar. Em seguida, no cartão à direita,
        altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar perfil:</b>
        Clique na linha da tabela do perfil que deseja remover. Em seguida, no cartão à direita,
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
import { required, maxLength } from "vuelidate/lib/validators";
import perfilService from "@/services/perfil";
import { makeEmptyPerfil } from "@utils/factories";
import { Card, VInput } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";

export default {
  name: "DashboardPerfis",
  components: { ModalAjuda, Card, ModalDelete, VInput },
  data() {
    return {
      perfilForm: makeEmptyPerfil(),
      perfilSelecionadoId: null,
      ordenacaoPerfisMain: { order: "nome", type: "asc" },
    };
  },
  validations: {
    perfilForm: {
      nome: { required },
      abreviacao: { required, maxLength: maxLength(10) },
      cor: { required },
    },
  },

  methods: {
    handleClickInPerfil(perfil) {
      this.clearPerfilForm();
      this.perfilSelecionadoId = perfil.id;
      this.showPerfil(perfil);
    },
    clearClick() {
      this.perfilSelecionadoId = null;
    },
    clearPerfilForm() {
      this.clearClick();
      this.perfilForm = makeEmptyPerfil();
      this.$nextTick(() => this.$v.$reset());
    },
    showPerfil(perfil) {
      this.perfilForm = { ...perfil };
    },
    async handleCreatePerfil() {
      this.$v.perfilForm.$touch();
      if (this.$v.perfilForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const response = await perfilService.create(this.perfilForm);
        this.clearPerfilForm();
        this.pushNotification({
          type: "success",
          text: `O Perfil ${response.Perfil.nome} foi criado!`,
        });
      } catch (error) {
        let errorMsg = "<b>Erro ao criar Perfil</b>";
        if (error.response.data.fullMessage) {
          errorMsg += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
        }
        this.pushNotification({ type: "error", text: errorMsg });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleUpdatePerfil() {
      this.$v.perfilForm.$touch();
      if (this.$v.perfilForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const response = await perfilService.update(this.perfilForm.id, this.perfilForm);
        this.pushNotification({
          type: "success",
          text: `O Perfil ${response.Perfil.nome} foi atualizado!`,
        });
      } catch (error) {
        let errorMsg = "<b>Erro ao atualizar Perfil</b>";
        if (error.response.data.fullMessage) {
          errorMsg += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
        }
        this.pushNotification({ type: "error", text: errorMsg });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeletePerfil() {
      try {
        this.setLoading({ type: "partial", value: true });
        const response = await perfilService.delete(this.perfilForm.id, this.perfilForm);
        this.clearPerfilForm();
        this.pushNotification({
          type: "success",
          text: `O Perfil ${response.Perfil.nome} foi excluído!`,
        });
      } catch (error) {
        this.pushNotification({ type: "error", text: "<b>Erro ao excluir Perfil</b>" });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllPerfis"]),

    PerfisOrdered() {
      return orderBy(this.AllPerfis, this.ordenacaoPerfisMain.order, this.ordenacaoPerfisMain.type);
    },
    isEditing() {
      return this.perfilForm.id != null;
    },
  },
};
</script>
