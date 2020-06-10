<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Salas'">
      <template #aside>
        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn mt-1"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="row w-100 m-0 p-0">
      <div class="div-table p-0">
        <BaseTable>
          <template #thead>
            <th
              style="width: 82px"
              class="clickable t-start"
              @click="toggleOrder('nome')"
            >
              Nome
              <i :class="setIconByOrder('nome')"></i>
            </th>
            <th
              style="width: 90px"
              class="clickable"
              @click="toggleOrder('laboratorio', 'desc')"
            >
              Laboratório
              <i :class="setIconByOrder('laboratorio')"></i>
            </th>
            <th
              style="width: 100px"
              class="clickable"
              @click="toggleOrder('lotacao_maxima', 'desc')"
            >
              Lotação Max.
              <i :class="setIconByOrder('lotacao_maxima')"></i>
            </th>
          </template>
          <template #tbody>
            <template v-for="sala in Salas">
              <tr
                :key="sala.id"
                v-on:click.prevent="showSala(sala), clickada(sala.nome)"
                :class="[
                  { 'bg-selected': salaClickada === sala.nome },
                  'clickable',
                ]"
              >
                <td style="width: 82px" class="t-start">
                  {{ sala.nome }}
                </td>

                <td style="width: 90px">
                  {{ booleanToText(sala.laboratorio) }}
                </td>
                <td style="width: 100px">
                  {{ sala.lotacao_maxima }}
                </td>
              </tr>
            </template>
          </template>
        </BaseTable>
      </div>

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <Card :title="'Sala'">
          <template #form-group>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="input-menor form-control form-control-sm"
                  id="nome"
                  v-model="salaForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mt-3 mx-0">
              <div class="form-check form-check-inline col m-0 px-0 pl-1">
                <input
                  type="checkbox"
                  id="laboratorio"
                  class="form-check-input"
                  v-model="salaForm.laboratorio"
                  value="1"
                />
                <label class="form-check-label" for="laboratorio"
                  >Laboratório</label
                >
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="lotacao_maxima" class="col-form-label"
                  >Lotação Máx.</label
                >
                <input
                  type="text"
                  class="input-menor form-control form-control-sm"
                  id="lotacao_maxima"
                  v-model="salaForm.lotacao_maxima"
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
                v-on:click.prevent="editSala"
                :key="1"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                type="button"
                title="Deletar"
                class="btn-custom btn-icon delbtn"
                v-on:click.prevent="deleteSala"
                :key="3"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanSala"
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
                v-on:click.prevent="addSala"
                :key="1"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanSala"
                :key="2"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
          </template>
        </Card>
      </div>
    </div>

    <!-- MODAL AJUDA -->
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar sala: </strong> Com o cartão à direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar uma sala: </strong>Na tabela, clique
            na sala que deseja alterar. Logo após, no cartão à direita, altere
            as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-la, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import salaService from "@/common/services/sala";
import PageTitle from "@/components/PageTitle";
import BaseTable from "@/components/BaseTable";
import Card from "@/components/Card";

const emptySala = {
  id: undefined,
  nome: undefined,
  laboratorio: undefined,
  lotacao_maxima: undefined,
};

export default {
  name: "DashboardSalas",
  components: {
    PageTitle,
    BaseTable,
    Card,
  },
  data() {
    return {
      salaForm: _.clone(emptySala),
      error: undefined,
      salaClickada: "",
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
    toggleOrder(newOrder, type = "asc") {
      if (this.ordenacao.order != newOrder) {
        this.ordenacao.order = newOrder;
        this.ordenacao.type = type;
      } else {
        this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
      }
    },
    setIconByOrder(orderToCheck) {
      if (this.ordenacao.order === orderToCheck) {
        return this.ordenacao.type == "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
    booleanToText(isLab) {
      return isLab ? "Sim" : "-";
    },
    clickada(salaNome) {
      this.salaClickada = salaNome;
    },
    clearClick() {
      this.salaClickada = "";
    },

    addSala() {
      salaService
        .create(this.salaForm)
        .then((response) => {
          this.cleanSala();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Sala</b>";
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

    editSala() {
      if (this.salaForm.lotacao_maxima === "") this.salaForm.lotacao_maxima = 0;
      salaService
        .update(this.salaForm.id, this.salaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Sala</b>";
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

    deleteSala() {
      salaService
        .delete(this.salaForm.id, this.salaForm)
        .then((response) => {
          this.cleanSala();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Sala</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    cleanSala() {
      this.clearClick();
      this.salaForm = _.clone(emptySala);
      this.error = undefined;
    },

    showSala(sala) {
      this.cleanSala();
      this.salaForm = _.clone(sala);
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
    Salas() {
      return _.orderBy(
        this.$store.state.sala.Salas,
        this.ordenacao.order,
        this.ordenacao.type
      );
    },

    isEdit() {
      return this.salaForm.id !== undefined;
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
  min-width: 100px;
  text-align: start;
}
@media screen and (max-width: 337px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
