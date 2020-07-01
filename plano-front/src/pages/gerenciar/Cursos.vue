<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Cursos'">
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

    <div class="row w-100 m-0">
      <div class="div-table p-0">
        <BaseTable>
          <template #thead>
            <th
              @click="toggleOrder(ordenacaoCursosMain, 'codigo')"
              title="Clique para ordenar por nome"
              class="clickable t-start"
              style="width: 65px"
            >
              Código
              <i :class="setIconByOrder(ordenacaoCursosMain, 'codigo')"></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoCursosMain, 'nome')"
              title="Clique para ordenar por nome"
              class="clickable t-start"
              style="width:300px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoCursosMain, 'nome')"></i>
            </th>
            <th
              class="clickable"
              style="width:65px"
              @click="toggleOrder(ordenacaoCursosMain, 'turno')"
            >
              Turno
              <i :class="setIconByOrder(ordenacaoCursosMain, 'turno')"></i>
            </th>
            <th
              class="clickable"
              style="width: 70px"
              title="Entrada de alunos 1º Semestre"
              @click="toggleOrder(ordenacaoCursosMain, 'alunosEntrada', 'desc')"
            >
              1º Sem.
              <i
                :class="setIconByOrder(ordenacaoCursosMain, 'alunosEntrada')"
              ></i>
            </th>
            <th
              class="clickable"
              style="width: 70px"
              title="Entrada de alunos 2º Semestre"
              @click="
                toggleOrder(ordenacaoCursosMain, 'alunosEntrada2', 'desc')
              "
            >
              2º Sem.
              <i
                :class="setIconByOrder(ordenacaoCursosMain, 'alunosEntrada2')"
              ></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="curso in Cursos"
              :key="'table-cursos: cod-' + curso.codigo"
              @click.prevent="
                showCurso(curso), handleClickInCurso(curso.codigo)
              "
              :class="[
                { 'bg-selected': cursoClickado === curso.codigo },
                'clickable',
              ]"
            >
              <td style="width: 65px" class="t-start">
                {{ curso.codigo }}
              </td>
              <td style="width: 300px" class="t-start">
                {{ curso.nome }}
              </td>
              <td style="width: 65px">
                {{ curso.turno }}
              </td>
              <td style="width: 70px;">
                {{ curso.alunosEntrada }}
              </td>
              <td style="width: 70px;">
                {{ curso.alunosEntrada2 }}
              </td>
            </tr>
            <tr v-if="!Cursos.length">
              <td colspan="5" style="width:570px" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum curso
                encontrado!
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <Card :title="'Curso'">
          <template #form-group>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="input-maior form-control
                form-control-sm"
                  id="nome"
                  v-model="cursoForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="codigo" class="col-form-label">Código</label>
                <input
                  type="text"
                  class="form-control form-control-sm input-menor"
                  id="codigo"
                  v-model="cursoForm.codigo"
                />
              </div>
              <div class="form-group col m-0 px-0">
                <label for="turno" class="col-form-label">Turno</label>
                <select
                  type="text"
                  class="form-control form-control-sm input-medio"
                  id="turno"
                  v-model="cursoForm.turno"
                >
                  <option value="Diurno">Diurno</option>
                  <option value="Noturno">Noturno</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="alunosEntrada" class="col-form-label"
                  >Alunos 1º Sem.</label
                >
                <input
                  type="text"
                  class="form-control form-control-sm input-menor"
                  id="alunosEnrada"
                  @keypress="onlyNumber"
                  v-model="cursoForm.alunosEntrada"
                />
              </div>

              <div class="form-group col m-0 px-0">
                <label for="alunosEntrada" class="col-form-label"
                  >Alunos 2º Sem.</label
                >
                <input
                  type="text"
                  class="form-control form-control-sm input-menor"
                  id="alunosEnrada"
                  @keypress="onlyNumber"
                  v-model="cursoForm.alunosEntrada2"
                />
              </div>
            </div>
          </template>
          <template #footer>
            <template v-if="isEdit">
              <button
                type="button"
                v-on:click.prevent="editCurso"
                class="btn-custom btn-icon addbtn"
                title="Salvar"
                :key="1"
              >
                <i class="fas fa-check"></i>
              </button>

              <button
                type="button"
                v-on:click.prevent="deleteCurso"
                class="btn-custom btn-icon delbtn"
                title="Deletar"
                :key="2"
              >
                <i class="far fa-trash-alt"></i>
              </button>

              <button
                type="button"
                v-on:click.prevent="cleanCurso"
                class="btn-custom btn-icon cancelbtn"
                title="Cancelar"
                :key="3"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template v-else>
              <button
                type="button"
                v-on:click.prevent="addCurso"
                class="btn-custom btn-icon addbtn"
                title="Adicionar"
                :key="1"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                v-on:click.prevent="cleanCurso"
                class="btn-custom btn-icon cancelbtn"
                title="Cancelar"
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
            <b>Para adicionar cursos:</b> Com o cartão à direita em branco,
            preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para editar ou deletar um curso:</b> Na tabela, clique no curso
            que deseja alterar. Logo após, no cartão à direita, altere as
            informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size: 12px;"></i>
            ou, para excluí-lo, clique em Deletar
            <i
              class="far fa-trash-alt delbtn px-1"
              style="font-size: 12px;"
            ></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
            em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para alterar a ordenação:</b> Clique em Nome no cabeçalho da
            tabela para ordenar por ordem alfabética ou em Código para ordem
            numérica do código do curso.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import ls from "local-storage";
import cursoService from "@/common/services/curso";
import pedidoService from "@/common/services/pedido";
import {
  toggleOrdination,
  redirectNotAdmin,
  notification,
} from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseModal,
  BaseButton,
  Card,
} from "@/components/index.js";

const emptyCurso = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  turno: undefined,
  semestreInicial: undefined,
  alunosEntrada: undefined,
  alunosEntrada2: undefined,
  posicao: undefined,
};
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
  ultimo: undefined,
  selectAll: undefined,
};

export default {
  name: "DashboardCursos",
  mixins: [toggleOrdination, redirectNotAdmin, notification],
  components: { PageTitle, BaseTable, Card, BaseButton, BaseModal },

  data() {
    return {
      cursoForm: _.clone(emptyCurso),
      cursoClickado: "",
      ordenacaoCursosMain: { order: "codigo", type: "asc" },
    };
  },
  created() {
    this.ultimo =
      this.$store.state.curso.Cursos[this.$store.state.curso.Cursos.length - 1]
        .id + 1;
    this.selectAll = true;
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    handleClickInCurso(curso) {
      this.cursoClickado = curso;
    },
    clearClick() {
      this.cursoClickado = "";
    },
    toggleCurso(id) {
      var state = ls.get(`${id}`);
      this.$store.dispatch("toggleCurso", id);
      ls.set(`${id}`, !state);
    },
    toggleAllCursos() {
      if (this.selectAll === true) {
        this.$store.dispatch("toggleAllCursosFalse");
        this.selectAll = false;
        ls.set("toggle", false);
      } else {
        this.$store.dispatch("toggleAllCursosTrue");
        this.selectAll = true;
        ls.set("toggle", true);
      }
    },
    validateCurso(curso) {
      for (const key of Object.keys(curso)) {
        if (key !== "id")
          if (
            curso[key] === "" ||
            curso[key] === null ||
            curso[key] === undefined
          )
            return false;
      }
      return true;
    },
    addCurso() {
      this.cursoForm.posicao = this.ultimo;
      this.ultimo = this.ultimo + 1;
      if (
        this.cursoForm.alunosEntrada == 0 ||
        this.cursoForm.alunosEntrada === undefined
      )
        if (
          this.cursoForm.alunosEntrada2 == 0 ||
          this.cursoForm.alunosEntrada2 === undefined
        )
          this.cursoForm.semestreInicial = 3;
        else this.cursoForm.semestreInicial = 2;
      else if (
        this.cursoForm.alunosEntrada2 == 0 ||
        this.cursoForm.alunosEntrada2 === undefined
      )
        this.cursoForm.semestreInicial = 1;
      else this.cursoForm.semestreInicial = 3;

      if (!this.validateCurso(this.cursoForm)) {
        this.showNotification({
          type: "error",
          title: "Erro ao criar Curso!",
          message: "Campos obrigátorios incompletos ou inválidos.",
        });
        return;
      }

      cursoService
        .create(this.cursoForm)
        .then((response) => {
          for (var i = 0; i < this.$store.state.turma.Turmas.length; i++) {
            var pedido = _.clone(emptyPedido);
            pedido.Curso = response.Curso.id;
            pedido.Turma = this.$store.state.turma.Turmas[i].id;
            console.log(pedido);
            pedidoService
              .create(pedido)
              .then(() => {})
              .catch((error) => {
                console.log("erro ao criar pedido: " + error);
              });
          }
          this.cleanCurso();

          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi criado!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            title: "Erro ao criar Curso!",
            message: error,
          });
        });
    },
    editCurso() {
      if (
        this.cursoForm.alunosEntrada == 0 ||
        this.cursoForm.alunosEntrada === undefined
      )
        if (
          this.cursoForm.alunosEntrada2 == 0 ||
          this.cursoForm.alunosEntrada2 === undefined
        )
          this.cursoForm.semestreInicial = 3;
        else this.cursoForm.semestreInicial = 2;
      else if (
        this.cursoForm.alunosEntrada2 == 0 ||
        this.cursoForm.alunosEntrada2 === undefined
      )
        this.cursoForm.semestreInicial = 1;
      else this.cursoForm.semestreInicial = 3;
      cursoService
        .update(this.cursoForm.id, this.cursoForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi atualizado!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            title: "Erro ao atualizar Curso!",
            message: error,
          });
        });
    },
    deleteCurso() {
      cursoService
        .delete(this.cursoForm.id, this.cursoForm)
        .then((response) => {
          this.cleanCurso();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi excluído!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            title: "Erro ao excluir Curso!",
            message: error,
          });
        });
    },
    cleanCurso() {
      this.clearClick();
      this.cursoForm = _.clone(emptyCurso);
    },
    showCurso(curso) {
      this.cleanCurso();
      this.cursoForm = _.clone(curso);
    },
  },
  computed: {
    Cursos() {
      return _.orderBy(
        this.$store.state.curso.Cursos,
        this.ordenacaoCursosMain.order,
        this.ordenacaoCursosMain.type
      );
    },
    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
    isEdit() {
      return this.cursoForm.id !== undefined;
    },
  },
};
</script>

<style scoped>
.card .input-maior {
  width: 250px;
}
.card .input-menor {
  width: 60px;
  text-align: center !important;
}
.card .input-medio {
  width: 100px;
}
@media screen and (max-width: 886px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
