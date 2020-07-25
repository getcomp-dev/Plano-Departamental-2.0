<template>
  <div class="main-component row">
    <PageHeader :title="'Salas'">
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
        <BaseTable>
          <template #thead>
            <th
              style="width: 82px"
              class="clickable t-start"
              @click="toggleOrder(ordenacaoSalasMain, 'nome')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoSalasMain, 'nome')"></i>
            </th>
            <th
              style="width: 90px"
              class="clickable"
              @click="toggleOrder(ordenacaoSalasMain, 'laboratorio', 'desc')"
            >
              Laboratório
              <i :class="setIconByOrder(ordenacaoSalasMain, 'laboratorio')"></i>
            </th>
            <th
              style="width: 100px"
              class="clickable"
              @click="toggleOrder(ordenacaoSalasMain, 'lotacao_maxima', 'desc')"
            >
              Lotação Max.
              <i
                :class="setIconByOrder(ordenacaoSalasMain, 'lotacao_maxima')"
              ></i>
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

      <Card
        :title="'Sala'"
        :toggleFooter="isEdit"
        @btn-salvar="editSala()"
        @btn-delete="deleteSala()"
        @btn-add="addSala()"
        @btn-clean="cleanSala()"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Nome</label>
              <input
                type="text"
                class="input-menor form-control form-control-sm"
                id="nome"
                v-model="salaForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="lotacao_maxima" class="col-form-label"
                >Lotação Máx.</label
              >
              <input
                type="text"
                class="input-menor form-control form-control-sm"
                id="lotacao_maxima"
                @keypress="onlyNumber"
                v-model="salaForm.lotacao_maxima"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-check form-check-inline col m-0 px-0 pl-1">
              <label class="form-check-label mr-2" for="laboratorio"
                >Laboratório</label
              >
              <input
                type="checkbox"
                id="laboratorio"
                class="form-check-input"
                v-model="salaForm.laboratorio"
                value="1"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>

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
            <b>Para adicionar sala: </b> Com o cartão à direita em branco,
            preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para editar ou deletar uma sala: </b>Na tabela, clique na sala
            que deseja alterar. Logo após, no cartão à direita, altere as
            informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-la, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
            em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import salaService from "@/common/services/sala";
import { toggleOrdination } from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseButton,
  Card,
  BaseModal,
} from "@/components/ui";

const emptySala = {
  id: undefined,
  nome: undefined,
  laboratorio: undefined,
  lotacao_maxima: undefined,
};

export default {
  name: "DashboardSalas",
  mixins: [toggleOrdination],
  components: {
    PageHeader,
    BaseTable,
    Card,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      salaForm: _.clone(emptySala),
      error: undefined,
      salaClickada: "",
      ordenacaoSalasMain: { order: "nome", type: "asc" },
    };
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
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
          this.error = "";
          if (error.response.data.fullMessage) {
            this.error += error.response.data.fullMessage.replace(
              "\n",
              "<br/>"
            );
          }
          this.$notify({
            group: "general",
            title: "Erro ao criar sala!",
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
        this.ordenacaoSalasMain.order,
        this.ordenacaoSalasMain.type
      );
    },

    isEdit() {
      return this.salaForm.id !== undefined;
    },
  },
};
</script>

<style scoped>
.card .input-menor {
  min-width: 100px;
  text-align: start;
}
</style>
