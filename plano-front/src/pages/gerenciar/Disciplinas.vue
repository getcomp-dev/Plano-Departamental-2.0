<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Disciplinas'">
      <template #aside>
        <BaseButton
          title="Ajuda"
          :type="'icon'"
          :color="'lightblue'"
          @click="$refs.modalAjuda.toggle()"
        >
          <i class="fas fa-question"></i>
        </BaseButton>
      </template>
    </PageTitle>

    <div class="page-content">
      <div class="div-table p-0">
        <BaseTable>
          <template #thead>
            <th
              style="width: 82px; text-align:start"
              @click="toggleOrder(ordenacaoMain.disciplinas, 'codigo')"
              class="clickable"
              title="Clique para ordenar por código"
            >
              Código
              <i
                :class="setIconByOrder(ordenacaoMain.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoMain.disciplinas, 'nome')"
              style="width: 300px; text-align:start"
              class="clickable"
              title="Clique para ordenar por nome"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'nome')"></i>
            </th>
            <th
              style="width: 80px"
              class="clickable t-start"
              @click="toggleOrder(ordenacaoMain.perfis, setFixedOrderPerfil)"
            >
              <div class="d-flex justify-content-between align-items-center">
                <i
                  class="fas fa-thumbtack"
                  :class="
                    ordenacaoMain.perfis.order === null ? 'low-opacity' : ''
                  "
                ></i>
                <span>
                  Perfil
                </span>

                <i
                  :class="
                    setIconByOrder(ordenacaoMain.perfis, 'perfilAbreviacao')
                  "
                ></i>
              </div>
            </th>
            <th style="width: 40px" title="Carga Teórica">
              C.T.
            </th>
            <th style="width: 40px" title="Carga Prática">
              C.P.
            </th>

            <th
              style="width: 70px"
              class="clickable"
              @click="toggleOrder(ordenacaoMain.disciplinas, 'ead', 'desc')"
            >
              EAD
              <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'ead')"></i>
            </th>
            <th
              style="width: 70px"
              class="clickable"
              @click="
                toggleOrder(ordenacaoMain.disciplinas, 'laboratorio', 'desc')
              "
            >
              Lab
              <i
                :class="
                  setIconByOrder(ordenacaoMain.disciplinas, 'laboratorio')
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <template v-for="disciplina in DisciplinasOrdered">
              <tr
                :key="'table disciplina:' + disciplina.id"
                @click.prevent="handleClickInDisciplina(disciplina)"
                :class="[
                  { 'bg-selected': disciplinaClickada === disciplina.id },
                  'clickable',
                ]"
              >
                <td style="width: 82px" class="t-start">
                  {{ disciplina.codigo }}
                </td>
                <td style="width: 300px" class="t-start">
                  {{ disciplina.nome }}
                </td>
                <td style="width: 80px" class="t-start">
                  {{ disciplina.perfilAbreviacao }}
                </td>
                <td style="width: 40px">
                  {{ disciplina.cargaTeorica }}
                </td>
                <td style="width: 40px">
                  {{ disciplina.cargaPratica }}
                </td>

                <td style="width: 70px">
                  {{ textoEad(disciplina.ead) }}
                </td>
                <td style="width: 70px">
                  {{ textoLab(disciplina.laboratorio) }}
                </td>
              </tr>
            </template>
          </template>
        </BaseTable>
      </div>

      <Card
        :title="'Disciplina'"
        :toggleFooter="isEdit"
        @btn-salvar="editDisciplina()"
        @btn-delete="deleteDisciplina()"
        @btn-add="addDisciplina()"
        @btn-clean="cleanDisciplina()"
      >
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label for="nome" class="col-form-label">Nome</label>
              <input
                type="text"
                id="nome"
                class="form-control form-control-sm input-maior upper-case"
                v-model="disciplinaForm.nome"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label for="codigo" class="col-form-label">Código</label>
              <input
                type="text"
                id="codigo"
                class="form-control form-control-sm input-medio upper-case"
                v-model="disciplinaForm.codigo"
              />
            </div>
            <div class="form-group m-0 col px-0">
              <label for="perfil" class="col-form-label">Perfil</label>
              <select
                type="text"
                id="perfil"
                style="width:100%"
                class="form-control form-control-sm  "
                v-model="disciplinaForm.Perfil"
              >
                <option v-if="Perfis.length === 0" type="text" value
                  >Nenhum Perfil Encontrado</option
                >
                <option
                  v-for="perfil in Perfis"
                  :key="perfil.id"
                  :value="perfil.id"
                  >{{ perfil.abreviacao }}</option
                >
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group m-0 col px-0">
              <label for="cargaTeorica" class="col-form-label"
                >Carga Teórica</label
              >
              <input
                type="text"
                id="cargaTeorica"
                class="form-control form-control-sm input-medio t-center"
                @keypress="onlyNumber"
                v-model="disciplinaForm.cargaTeorica"
              />
            </div>

            <div class="form-group m-0 col px-0">
              <label for="cargaPratica" class="col-form-label"
                >Carga Prática</label
              >
              <input
                type="text"
                id="cargaPratica"
                class="form-control form-control-sm input-medio t-center"
                @keypress="onlyNumber"
                v-model="disciplinaForm.cargaPratica"
              />
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label for="laboratorio" class="col-form-label"
                >Laboratório</label
              >
              <select
                type="text"
                class="form-control form-control-sm input-medio"
                id="laboratorio"
                v-model="disciplinaForm.laboratorio"
              >
                <option value="0">Não</option>
                <option value="1">Sim</option>
                <option value="2">Desejável</option>
              </select>
            </div>
            <div class="form-group col m-0 px-0">
              <label for="ead" class="col-form-label">EAD</label>
              <select
                type="text"
                class="form-control form-control-sm input-medio"
                id="ead"
                v-model="disciplinaForm.ead"
              >
                <option value="0">Não</option>
                <option value="1">Integral</option>
                <option value="2">Parcial</option>
              </select>
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
            <b>Para adicionar disciplinas:</b> Com o cartão à direita em branco,
            preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para editar ou deletar uma disciplina:</b>Na tabela, clique na
            disciplina que deseja alterar. Logo após, no cartão à direita,
            altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-lo, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
            em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para alterar a ordenação:</b> Clique em Nome ou Código no
            cabeçalho da tabela para ordenação alfabética do mesmo.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import disciplinaService from "@/common/services/disciplina";
import { toggleOrdination, redirectNotAdmin } from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseButton,
  BaseModal,
  Card,
} from "@/components/index.js";

const emptyDisciplina = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  cargaTeorica: undefined,
  cargaPratica: undefined,
  Perfil: undefined,
  ead: undefined,
  laboratorio: undefined,
};

export default {
  name: "DashboardDisciplina",
  mixins: [toggleOrdination, redirectNotAdmin],
  components: { PageTitle, BaseTable, Card, BaseButton, BaseModal },
  data() {
    return {
      disciplinaForm: _.clone(emptyDisciplina),
      error: undefined,
      disciplinaClickada: "",
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: null, type: "asc" },
      },
    };
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    handleClickInDisciplina(disciplina) {
      this.showDisciplina(disciplina);
      this.disciplinaClickada = disciplina.id;
    },
    clearClick() {
      this.disciplinaClickada = "";
    },
    addDisciplina() {
      disciplinaService
        .create(this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Disciplina</b>";
          console.log(error.response);
          if (error.response.data.fullMessage) {
            for (var e = 0; e < error.response.data.errors.length; e++) {
              if (error.response.data.errors[e].message.search("null") !== -1)
                this.error +=
                  "<br/>" +
                  error.response.data.errors[e].field +
                  " não pode ser vazio";
              else if (
                error.response.data.errors[e].message.search("unique") !== -1 &&
                error.response.data.errors[e].field.search("codigo") !== -1
              )
                this.error += "<br/>Disciplina já existe";
            }
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    editDisciplina() {
      disciplinaService
        .update(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
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

    deleteDisciplina() {
      disciplinaService
        .delete(this.disciplinaForm.id, this.disciplinaForm)
        .then((response) => {
          this.cleanDisciplina();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina.nome} foi excluída!`,
            type: "success",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },

    cleanDisciplina() {
      this.clearClick();
      this.disciplinaForm = _.clone(emptyDisciplina);
      this.error = undefined;
    },

    showDisciplina(disciplina) {
      this.cleanDisciplina();
      this.disciplinaForm = _.clone(disciplina);
    },

    textoLab(lab) {
      if (lab == 0) return "-";
      if (lab == 1) return "Sim";
      if (lab == 2) return "Desejável";
    },

    textoEad(ead) {
      if (ead == 0) return "-";
      if (ead == 1) return "Integral";
      if (ead == 2) return "Parcial";
    },
  },
  computed: {
    DisciplinasComPerfil() {
      let disciplinasResultantes = this.$store.state.disciplina.Disciplinas;

      disciplinasResultantes.forEach((disciplina) => {
        _.find(this.Perfis, (perfil) => {
          if (perfil.id === disciplina.Perfil) {
            disciplina.perfilAbreviacao = perfil.abreviacao;
            return true;
          }
        });
      });
      return disciplinasResultantes;
    },
    DisciplinasOrdered() {
      const disciplinasResultantes = _.orderBy(
        this.DisciplinasComPerfil,
        this.ordenacaoMain.disciplinas.order,
        this.ordenacaoMain.disciplinas.type
      );

      if (this.ordenacaoMain.perfis.order !== null) {
        return _.orderBy(
          disciplinasResultantes,
          this.ordenacaoMain.perfis.order,
          this.ordenacaoMain.perfis.type
        );
      }
      return disciplinasResultantes;
    },
    setFixedOrderPerfil() {
      if (this.ordenacaoMain.perfis.type === "desc") return null;
      else return "perfilAbreviacao";
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    isEdit() {
      return this.disciplinaForm.id !== undefined;
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 280px;
}
.card .input-medio {
  width: 100px;
}
.card .input-menor {
  width: 80px;
  text-align: center !important;
}
</style>
