<template>
  <div class="main-component row">
    <PageHeader :title="'Perfis'">
      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="$refs.modalAjuda.toggle()"
      >
        <font-awesome-icon :icon="['fas','question']" />
      </BaseButton>
    </PageHeader>

    <div class="page-content">
      <div class="div-table">
        <BaseTable :styles="'height:max-content'">
          <template #thead>
            <th
              @click="toggleOrder(ordenacaoPerfisMain, 'nome')"
              style="width: 350px"
              class="clickable t-start"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoPerfisMain, 'nome')"></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoPerfisMain, 'abreviacao')"
              style="width: 90px;"
              class="clickable"
            >
              Abreviação
              <i :class="setIconByOrder(ordenacaoPerfisMain, 'abreviacao')"></i>
            </th>
            <th style="width: 60px;">Cor</th>
          </template>
          <template #tbody>
            <template v-for="perfil in Perfis">
              <tr
                :key="perfil.id"
                @click="handleClickInPerfil(perfil)"
                :class="[
                  'clickable',
                  {
                    'bg-selected': perfilSelectedId === perfil.id,
                  },
                ]"
              >
                <td style="width: 350px;" class="t-start">{{ perfil.nome }}</td>
                <td style="width: 90px">{{ perfil.abreviacao }}</td>
                <td style="width: 60px">
                  <div
                    :style="{ 'background-color': perfil.cor }"
                    style="width: 49px; height: 80%; border: 1px black solid"
                  ></div>
                </td>
              </tr>
            </template>
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
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                id="nome"
                type="text"
                class="input-maior form-control form-control-sm"
                @input="perfilForm.nome= $event.target.value.toUpperCase()"
                :value="perfilForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col-8 m-0 px-0">
              <label required for="abreviacao" class="col-form-label">Abreviação</label>
              <input
                type="text"
                class="form-control form-control-sm"
                style="width:150px"
                id="abreviacao"
                v-model="perfilForm.abreviacao"
              />
            </div>
            <div class="form-group col m-0 px-0">
              <label for="cor" class="col-form-label">Cor</label>
              <input
                type="color"
                style="width:100%"
                class="form-control form-control-sm"
                id="cor"
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
          <b>{{ perfilForm.nome}}</b>?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhum perfil selecionado.</li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para adicionar perfis:</b> Com o cartão à direita em branco,
        preencha-o. Em seguida, clique em Adicionar
        <i
          class="fas fa-plus icon-green px-1"
          style="font-size:12px"
        ></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para editar ou deletar um perfil:</b>Na tabela, clique no perfil
        que deseja alterar. Logo após, no cartão à direita, altere as
        informações que desejar e clique em Salvar
        <i
          class="fas fa-check icon-green px-1"
          style="font-size:12px"
        ></i>
        ou, para excluí-lo, clique em Deletar
        <i
          class="far fa-trash-alt icon-red px-1"
          style="font-size: 12px"
        ></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
        em Cancelar
        <i
          class="fas fa-times icon-gray px-1"
          style="font-size: 12px"
        ></i>
        .
      </li>
      <li class="list-group-item">
        <b>Para alterar a ordenação:</b> Clique em Nome ou Abreviação no
        cabeçalho da tabela para ordenação alfabética do mesmo.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import perfilService from "@/common/services/perfil";
import { toggleOrdination } from "@/common/mixins";
import { Card } from "@/components/ui";
import { ModalAjuda, ModalDelete } from "@/components/modals";
import { mapGetters } from "vuex";

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined,
  cor: "#ff0000",
};

export default {
  name: "DashboardPerfis",
  mixins: [toggleOrdination],
  components: {
    ModalAjuda,
    Card,
    ModalDelete,
  },
  data() {
    return {
      error: undefined,
      perfilForm: this.$_.clone(emptyPerfil),
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
      this.perfilForm = this.$_.clone(emptyPerfil);
      this.error = undefined;
    },
    showPerfil(perfil) {
      this.perfilForm = this.$_.clone(perfil);
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
      return this.$_.orderBy(
        this.AllPerfis,
        this.ordenacaoPerfisMain.order,
        this.ordenacaoPerfisMain.type
      );
    },

    isEdit() {
      return this.perfilForm.id !== undefined;
    },
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 240px;
  text-align: start;
}
</style>
