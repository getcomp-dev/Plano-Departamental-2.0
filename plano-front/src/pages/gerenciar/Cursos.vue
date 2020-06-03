<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Cursos'">
      <template #aside>
        <button
          type="button"
          class="btn-custom btn-icon relatbtn"
          title="Ajuda"
          v-b-modal.modalAjuda
        >
          <i class="fas fa-question"></i>
        </button>
      </template>
    </PageTitle>

    <div class="row w-100 m-0">
      <div class="divTable p-0">
        <TableMain>
          <template #thead>
            <th
              @click="toggleOrder('codigo')"
              title="Clique para ordenar por nome"
              class="clickable t-start"
              style="width: 65px"
            >
              Código
              <i :class="setIconByOrder('codigo')"></i>
            </th>
            <th
              @click="toggleOrder('nome')"
              title="Clique para ordenar por nome"
              class="clickable t-start"
              style="width:300px"
            >
              Nome
              <i :class="setIconByOrder('nome')"></i>
            </th>
            <th
              class="clickable"
              style="width:65px"
              @click="toggleOrder('turno')"
            >
              Turno
              <i :class="setIconByOrder('turno')"></i>
            </th>
            <th
              class="clickable"
              style="width: 70px"
              title="Entrada de alunos 1º Semestre"
              @click="toggleOrder('alunosEntrada', 'desc')"
            >
              1º Sem.
              <i :class="setIconByOrder('alunosEntrada')"></i>
            </th>
            <th
              class="clickable"
              style="width: 70px"
              title="Entrada de alunos 2º Semestre"
              @click="toggleOrder('alunosEntrada2', 'desc')"
            >
              2º Sem.
              <i :class="setIconByOrder('alunosEntrada2')"></i>
            </th>
          </template>
          <template #tbody>
            <template v-if="Cursos.length > 0">
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
            </template>
            <template v-else>
              <tr>
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhum curso
                  encontrado!
                </td>
              </tr>
            </template>
          </template>
        </TableMain>
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

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" scrollable title="Ajuda" hide-footer>
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar cursos:</strong> Com o cartão à direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar um curso:</strong> Na tabela, clique
            no curso que deseja alterar. Logo após, no cartão à direita, altere
            as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size: 12px;"></i>
            ou, para excluí-lo, clique em Deletar
            <i
              class="far fa-trash-alt delbtn px-1"
              style="font-size: 12px;"
            ></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px;"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para alterar a ordenação:</strong> Clique em Nome no
            cabeçalho da tabela para ordenar por ordem alfabética ou em Código
            para ordem numérica do código do curso.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import ls from "local-storage";
import cursoService from "@/common/services/curso";
import pedidoService from "@/common/services/pedido";
import PageTitle from "@/components/PageTitle";
import TableMain from "@/components/TableMain";
import Card from "@/components/Card";

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
  components: { PageTitle, TableMain, Card },

  data() {
    return {
      cursoForm: _.clone(emptyCurso),
      error: undefined,
      cursoClickado: "",
      ordenacao: { order: "codigo", type: "asc" },
    };
  },
  created() {
    if (!this.Admin) {
      this.$notify({
        group: "second",
        title: "Erro",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
        type: "error",
      });
      this.$router.push({ name: "dashboard" });
    }

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
    setIconByOrder(orderToCheck) {
      if (this.ordenacao.order === orderToCheck) {
        return this.ordenacao.type == "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
    toggleOrder(newOrder, type = "asc") {
      if (this.ordenacao.order != newOrder) {
        this.ordenacao.order = newOrder;
        this.ordenacao.type = type;
      } else {
        this.ordenacao.type = this.ordenacao.type == "asc" ? "desc" : "asc";
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
              .then((response) => {})
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
          this.error = "<b>Erro ao criar Curso</b>";
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
          this.error = "<b>Erro ao atualizar Curso</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
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
        .catch(() => {
          this.error = "<b>Erro ao excluir Curso</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    cleanCurso() {
      this.clearClick();
      this.cursoForm = _.clone(emptyCurso);
      this.error = undefined;
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
        this.ordenacao.order,
        this.ordenacao.type
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
