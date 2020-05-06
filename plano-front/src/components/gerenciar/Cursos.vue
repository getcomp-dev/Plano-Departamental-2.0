<template>
  <div class="DashboardCursos row pr-2" v-if="Admin">
    <PageTitle
      :title="'Cursos'"
      :asideClass="'col-xl-10 col-md-8 col-sm-7 col-2'"
    >
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
    <!--  -->
    <div class="w-100 mb-2 border-bottom"></div>
    <!--  -->
    <div class="row w-100 m-0">
      <div class="divTable p-0">
        <!-- Inicio Tabela -->
        <TableMain>
          <template #thead>
            <th
              @click="toggleOrd('nome')"
              title="Clique para ordenar por nome"
              class="clickable"
              style="width:300px!important; text-align:start!important;"
            >
              Nome
              <i
                :class="
                  ordenacao.order == 'nome'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
            </th>
            <th
              @click="toggleOrd('codigo')"
              title="Clique para ordenar por nome"
              class="clickable"
              style="width: 60px !important;text-align:start"
            >
              Código
              <i
                :class="
                  ordenacao.order == 'codigo'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
            </th>
            <th
              class="clickable"
              style="width:55px!important; text-align:start"
              @click="toggleOrd('turno')"
            >
              Turno
              <i
                :class="
                  ordenacao.order == 'turno'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
            </th>
            <th
              class="clickable"
              style="width: 65px !important;"
              title="Entrada de alunos 1º Semestre"
              @click="toggleOrd('alunosEntrada', 'desc')"
            >
              1º Sem.
              <i
                :class="
                  ordenacao.order == 'alunosEntrada'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
            </th>
            <th
              class="clickable"
              style="width: 65px !important;"
              title="Entrada de alunos 2º Semestre"
              @click="toggleOrd('alunosEntrada2', 'desc')"
            >
              2º Sem.
              <i
                :class="
                  ordenacao.order == 'alunosEntrada2'
                    ? ordenacao.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
              ></i>
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
                  { 'bg-custom': cursoClickado === curso.codigo },
                  'clickable',
                ]"
              >
                <div class="max-content">
                  <td style="width: 300px; text-align: start;">
                    {{ curso.nome }}
                  </td>
                  <td style="width: 60px; text-align:start">
                    {{ curso.codigo }}
                  </td>
                  <td style="width: 55px;text-align:start">
                    {{ curso.turno }}
                  </td>
                  <td style="width: 65px;">
                    {{ curso.alunosEntrada }}
                  </td>
                  <td style="width: 65px;">
                    {{ curso.alunosEntrada2 }}
                  </td>
                </div>
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
        <!-- Fim Tabela -->
      </div>

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <div class="card mr-3 ml-auto">
          <div class="card-header">
            <h1 class="card-title">Curso</h1>
          </div>

          <div class="card-body">
            <form>
              <div class="row mb-2 mx-0">
                <div class="form-group col m-0 px-0">
                  <label for="nome" class="col-form-label">Nome</label>
                  <input
                    type="text"
                    class="inputMaior form-control form-control-sm"
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
                    class="form-control form-control-sm inputMenor"
                    id="codigo"
                    v-model="cursoForm.codigo"
                  />
                </div>
                <div class="form-group col m-0 px-0">
                  <label for="turno" class="col-form-label">Turno</label>
                  <select
                    type="text"
                    class="form-control form-control-sm selectMenor"
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
                    class="form-control form-control-sm inputMenor"
                    id="alunosEnrada"
                    @keypress="onlyNumber"
                    v-model="cursoForm.alunosEntrada"
                  />
                </div>
                <!-- </div> -->
                <div class="form-group col m-0 px-0">
                  <label for="alunosEntrada" class="col-form-label"
                    >Alunos 2º Sem.</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-sm inputMenor"
                    id="alunosEnrada"
                    @keypress="onlyNumber"
                    v-model="cursoForm.alunosEntrada2"
                  />
                </div>
              </div>
              <div class="row mb-0 mt-3 mx-0">
                <div class="d-flex mr-0 ml-auto">
                  <template v-if="isEdit">
                    <!-- Editar -->
                    <button
                      type="button"
                      v-on:click.prevent="editCurso"
                      class="btn-custom btn-icon addbtn"
                      title="Salvar"
                      :key="1"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <!-- Excluir -->
                    <button
                      type="button"
                      v-on:click.prevent="deleteCurso"
                      class="btn-custom btn-icon delbtn"
                      title="Deletar"
                      :key="2"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <!-- Cancelar -->
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
                    <!-- Adicionar -->
                    <button
                      type="button"
                      v-on:click.prevent="addCurso"
                      class="btn-custom btn-icon addbtn"
                      title="Adicionar"
                      :key="1"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                    <!-- Resetar -->
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
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

      <div slot="modal-footer" style="display: none;"></div>
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
  components: { PageTitle, TableMain },

  data() {
    return {
      cursoForm: _.clone(emptyCurso),
      error: undefined,
      cursoClickado: "",
      ordenacao: { order: "nome", type: "asc" },
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
    toggleOrd(ord, type = "asc") {
      if (this.ordenacao.order != ord) {
        this.ordenacao.order = ord;
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
    isEdit() {
      return this.cursoForm.id !== undefined;
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
.DashboardCursos {
  max-width: 100%;
  overflow: auto;
  margin: 0;
}
/* ====== CARD ====== */
.card {
  width: 300px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card-body {
  font-size: 12px !important;
  padding-top: 15px;
}
.card label {
  line-height: 1.2;
  font-size: 12px;
  text-align: start;
  padding-top: 0 !important;
}
.card select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
.card input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.card .inputMaior {
  min-width: 250px;
  max-width: 250px;
  text-align: start !important;
}
.card .inputMenor {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
}
.card .selectMenor {
  min-width: 100px;
  max-width: 100px;
  text-align: start !important;
}
/* =================== */

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}

@media screen and (max-width: 858px) {
  .div-card {
    margin-left: 0px !important;
    margin-right: 50px !important;
    margin-top: 20px !important;
    top: 0 !important;
  }
  .card {
    margin-left: 0px !important;
  }
}
</style>
