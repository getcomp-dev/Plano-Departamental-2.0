<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoPerfisMain"
              orderToCheck="nome"
              width="350"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoPerfisMain"
              orderToCheck="abreviacao"
              width="90"
              align="start"
            >
              Abreviação
            </v-th-ordination>
            <v-th width="60">Cor</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="perfil in Perfis"
              :key="perfil.id"
              :class="['clickable', { 'bg-selected': perfilSelectedId === perfil.id }]"
              @click="handleClickInPerfil(perfil)"
            >
              <v-td width="350" align="start">{{ perfil.nome }}</v-td>
              <v-td width="90">{{ perfil.abreviacao }}</v-td>
              <v-td width="60" type="content">
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

            <tr v-if="!Perfis.length">
              <v-td width="500" colspan="3">
                <b>Nenhum perfil encontrado</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Perfil'"
        :toggleFooter="isEdit"
        @btn-salvar="editPerfil"
        @btn-delete="openModalDelete"
        @btn-add="addPerfil"
        @btn-clean="cleanPerfil"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="perfilNome" class="col-form-label">Nome</label>
              <input
                id="perfilNome"
                type="text"
                class="form-control form-control-sm input-xl"
                @change="perfilForm.nome = normalizeInputText($event)"
                :value="perfilForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="abreviacao" class="col-form-label">Abreviação</label>
              <input
                id="abreviacao"
                type="text"
                class="form-control form-control-sm input-md"
                @keypress="maskLimitLength($event, 10)"
                @change="perfilForm.abreviacao = normalizeInputText($event)"
                :value="perfilForm.abreviacao"
              />
            </div>

            <div class="form-group col m-0 px-0">
              <label for="cor" class="col-form-label">Cor</label>
              <input
                id="cor"
                type="color"
                class="form-control form-control-sm input-md"
                v-model="perfilForm.cor"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

    <ModalDelete ref="modalDelete" :isDeleting="isEdit" @btn-deletar="deletePerfil">
      <li v-if="isEdit" class="list-group-item">
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
        <b>Adicionar:</b>
        Preencha o cartão em branco à direita e em seguida, clique em Adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Editar:</b>
        Clique na linha da tabela do perfil que deseja alterar. Em seguida, no cartão à
        direita, altere as informações que desejar e clique em Salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar:</b>
        Clique na linha da tabela do perfil que deseja remover. Em seguida, no cartão à
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
import { orderBy, clone } from "lodash-es";
import perfilService from "@/common/services/perfil";
import { normalizeInputText, maskLimitLength } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";

const emptyPerfil = {
  id: null,
  nome: null,
  abreviacao: null,
  cor: "#8E79F6",
};

export default {
  name: "DashboardPerfis",
  mixins: [normalizeInputText, maskLimitLength],
  components: {
    ModalAjuda,
    Card,
    ModalDelete,
  },
  data() {
    return {
      error: null,
      perfilForm: clone(emptyPerfil),
      perfilSelectedId: null,
      ordenacaoPerfisMain: { order: "nome", type: "asc" },
    };
  },

  methods: {
    handleClickInPerfil(perfil) {
      this.cleanPerfil();
      this.perfilSelectedId = perfil.id;
      this.showPerfil(perfil);
    },
    clearClick() {
      this.perfilSelectedId = null;
    },
    cleanPerfil() {
      this.clearClick();
      this.perfilForm = clone(emptyPerfil);
      this.error = null;
    },
    showPerfil(perfil) {
      this.perfilForm = clone(perfil);
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },

    addPerfil() {
      perfilService
        .create(this.perfilForm)
        .then((response) => {
          this.cleanPerfil();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi criado!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Perfil</b>";
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
    editPerfil() {
      perfilService
        .update(this.perfilForm.id, this.perfilForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi atualizado!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Perfil</b>";
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
    deletePerfil() {
      perfilService
        .delete(this.perfilForm.id, this.perfilForm)
        .then((response) => {
          this.cleanPerfil();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi excluído!`,
            type: "success",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
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
    ...mapGetters(["AllPerfis"]),

    Perfis() {
      return orderBy(
        this.AllPerfis,
        this.ordenacaoPerfisMain.order,
        this.ordenacaoPerfisMain.type
      );
    },

    isEdit() {
      return this.perfilForm.id != null;
    },
  },
};
</script>
