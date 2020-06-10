<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Perfis'">
      <template #aside>
        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>
    <div class="row w-100 m-0 p-0">
      <div class="div-table">
        <BaseTable :tableHeight="'max-content'">
          <template #thead>
            <th
              @click="toggleOrder('nome')"
              style="width: 350px"
              class="clickable t-start"
            >
              Nome
              <i :class="setIconByOrder('nome')"></i>
            </th>
            <th
              @click="toggleOrder('abreviacao')"
              style="width: 90px;"
              class="clickable"
            >
              Abreviação
              <i :class="setIconByOrder('abreviacao')"></i>
            </th>
            <th style="width: 60px;">
              Cor
            </th>
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
                <td style="width: 350px;" class="t-start">
                  {{ perfil.nome }}
                </td>
                <td style="width: 90px">
                  {{ perfil.abreviacao }}
                </td>
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

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <Card :title="'Perfil'">
          <template #form-group>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="input-maior form-control form-control-sm"
                  id="nome"
                  v-model="perfilForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 mr-4 px-0">
                <label for="abreviacao" class="col-form-label"
                  >Abreviação</label
                >
                <input
                  type="text"
                  class="form-control form-control-sm"
                  style="width:100px"
                  id="abreviacao"
                  v-model="perfilForm.abreviacao"
                />
              </div>
              <div class="form-group col m-0 mr-4 px-0">
                <label for="cor" class="col-form-label">Cor</label>
                <input
                  type="color"
                  class="input-menor form-control form-control-sm"
                  id="cor"
                  v-model="perfilForm.cor"
                />
              </div>
            </div>
          </template>
          <template #footer>
            <template v-if="isEdit">
              <button
                type="button"
                title="Salvar"
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="editPerfil"
                :key="1"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                type="button"
                title="Deletar"
                class="btn-custom btn-icon delbtn"
                v-on:click.prevent="deletePerfil()"
                :key="3"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="clearClick(), cleanPerfil()"
                :key="2"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template v-else>
              <button
                type="button"
                title="Adicionar"
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="addPerfil()"
                :key="1"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanPerfil()"
                :key="2"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
          </template>
        </Card>
      </div>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      title="Ajuda"
      scrollable
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar perfis: </strong> Com o cartão à direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar um perfil: </strong>Na tabela, clique
            no perfil que deseja alterar. Logo após, no cartão à direita, altere
            as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para alterar a ordenação:</strong> Clique em Nome ou
            Abreviação no cabeçalho da tabela para ordenação alfabética do
            mesmo.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import perfilService from "@/common/services/perfil";
import PageTitle from "@/components/PageTitle";
import BaseTable from "@/components/BaseTable";
import Card from "@/components/Card";

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined,
  cor: "#ff0000",
};

export default {
  name: "DashboardPerfis",
  components: {
    PageTitle,
    BaseTable,
    Card,
  },
  data() {
    return {
      perfilForm: _.clone(emptyPerfil),
      error: undefined,
      perfilSelectedId: "",
      ordenacao: { order: "nome", type: "asc" },
    };
  },
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "general",
        title: "Erro",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
        type: "error",
      });
      this.$router.push({ name: "dashboard" });
    }
  },
  methods: {
    setIconByOrder(orderToCheck) {
      if (this.ordenacao.order === orderToCheck) {
        return this.ordenacao.type == "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
    handleClickInPerfil(perfil) {
      console.log(perfil.id);
      this.perfilSelectedId = perfil.id;
      console.log(this.perfilSelectedId);
      this.showPerfil(perfil);
    },
    toggleOrder(newOrder, type = "asc") {
      if (this.ordenacao.order != newOrder) {
        this.ordenacao.order = newOrder;
        this.ordenacao.type = type;
      } else {
        this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
      }
    },
    clearClick() {
      this.perfilSelectedId = "";
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
            type: "warn",
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
    cleanPerfil() {
      this.perfilForm = _.clone(emptyPerfil);
      this.error = undefined;
    },
    showPerfil(perfil) {
      this.cleanPerfil();
      this.perfilForm = _.clone(perfil);
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },
  },
  computed: {
    Perfis() {
      return _.orderBy(
        this.$store.state.perfil.Perfis,
        this.ordenacao.order,
        this.ordenacao.type
      );
    },
    isEdit() {
      return this.perfilForm.id !== undefined;
    },
    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.card .input-menor {
  width: 60px;
  text-align: center;
}
.card .input-menor2 {
  width: 40px;
  margin-right: 10px;
  text-align: center;
}
.card .input-maior {
  width: 240px;
  text-align: start;
}
@media screen and (max-width: 849px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
