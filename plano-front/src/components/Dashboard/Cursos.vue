<template>
  <div class="DashboardCursos row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-2 col-md-4 col-sm-5 col-7 px-0 pr-1 titulo">
          Cursos
        </h1>

        <div
          class="form-group col-xl-10 col-md-8 col-sm-7 col-5 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
            <i class="fas fa-question"></i>
          </b-button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <div class="row w-100 m-0">
      <!-- Inicio da Tabela -->
      <div class="p-0 divTable">
        <table class="table table-hover table-sm">
          <thead class="thead-light">
            <tr>
              <div
                style="display: block; overflow: hidden; width: 525px;"
                class="sticky"
              >
                <th scope="col">
                  <p
                    @click="toggleOrderNome()"
                    title="Clique para ordenar por nome"
                    class="p-header clickable-header"
                    style="width:300px!important; text-align: start !important;"
                  >
                    Nome
                    <i
                      v-if="ordenacao == 'nome'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p
                    @click="toggleOrderCod()"
                    title="Clique para ordenar por nome"
                    class="p-header clickable-header"
                    style="width:60px!important;"
                  >
                    Código
                    <i
                      v-if="ordenacao == 'codigo'"
                      style="font-size:0.6rem"
                      class="fas fa-arrow-down fa-sm"
                    ></i>
                  </p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width:52px!important;">Turno</p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    style="width:52px!important;"
                    title="Entrada de alunos 1º Semestre"
                  >
                    1º Sem.
                  </p>
                </th>
                <th scope="col">
                  <p
                    class="p-header"
                    style="width:52px!important;"
                    title="Entrada de alunos 2º Semestre"
                  >
                    2º Sem.
                  </p>
                </th>
                <th scope="col">
                  <p style="width: 9px"></p>
                </th>
              </div>
            </tr>
          </thead>

          <tbody>
            <template v-if="Cursos.length > 0">
              <tr
                v-for="curso in Cursos"
                :key="'curso codigo' + curso.codigo"
                v-on:click.prevent="showCurso(curso), clickada(curso.codigo)"
                :class="{ 'bg-custom': cursoClickado === curso.codigo }"
                style="cursor: pointer;"
              >
                <div style="width: 525px">
                  <td>
                    <p style="width: 300px; text-align: start">
                      {{ curso.nome }}
                    </p>
                  </td>
                  <td>
                    <p style="width: 60px">{{ curso.codigo }}</p>
                  </td>
                  <td>
                    <p style="width: 52px;">{{ curso.turno }}</p>
                  </td>
                  <!-- 1 = 1º semestre, 2 = 2º semestre, 3 = Ambos-->
                  <td>
                    <p style="width: 52px">{{ curso.alunosEntrada }}</p>
                  </td>
                  <td>
                    <p style="width: 52px">{{ curso.alunosEntrada2 }}</p>
                  </td>
                  <td>
                    <p style="width: 9px"></p>
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
          </tbody>
        </table>
        <!-- Fim da Tabela -->
      </div>

      <!-- Grid Direito -->
      <div class="div-card p-0 mt-0 mb-4 col-auto">
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

              <!-- <div class="row mb-2 mt-1 mx-0">
              <div class="form-group col m-0 px-0">
                <h5 style="font-size:14px" class="mt-1">Turno:</h5>
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    name="turno"
                    id="diurno"
                    value="Diurno"
                    class="form-check-input"
                    v-model="cursoForm.turno"
                  />
                  <label class="form-check-label" for="diurno">Diurno</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    name="turno"
                    id="integral"
                    value="Integral"
                    class="form-check-input"
                    v-model="cursoForm.turno"
                  />
                  <label class="form-check-label" for="integral">Integral</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    type="radio"
                    name="turno"
                    id="noturno"
                    value="Noturno"
                    v-model="cursoForm.turno"
                    class="form-check-input"
                  />
                  <label class="form-check-label" for="noturno">Noturno</label>
                </div>
              </div>
              </div>-->

              <div class="row mb-0 mt-3 mx-0">
                <div class="d-flex mr-0 ml-auto">
                  <template v-if="isEdit">
                    <!-- Editar -->
                    <button
                      type="button"
                      class="addbtn"
                      title="Salvar"
                      v-on:click.prevent="editCurso"
                      :key="1"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <!-- Excluir -->
                    <button
                      type="button"
                      title="Deletar"
                      class="delbtn"
                      v-on:click.prevent="deleteCurso"
                      :key="2"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <!-- Cancelar -->
                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanCurso"
                      :key="3"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </template>

                  <template v-else>
                    <!-- Adicionar -->
                    <button
                      type="button"
                      title="Adicionar"
                      class="addbtn"
                      v-on:click.prevent="addCurso"
                      :key="1"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                    <!-- Resetar -->
                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanCurso"
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
    <!-- Fim do Grid Direito -->
    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar cursos:</strong> Com o cartão à direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar um curso:</strong> Na tabela, clique
            no curso que deseja alterar. Logo após, no cartão à direita, altere
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
            <strong>Para alterar a ordenação:</strong> Clique em Nome no
            cabeçalho da tabela para ordenar por ordem alfabética ou em Código
            para ordem numérica do código do curso.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import cursoService from "../../common/services/curso";
import pedidoService from "../../common/services/pedido";
import ls from "local-storage";
const emptyCurso = {
  id: undefined,
  nome: undefined,
  codigo: undefined,
  turno: undefined,
  semestreInicial: undefined,
  alunosEntrada: undefined,
  alunosEntrada2: undefined,
  posicao: undefined
};
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
  ultimo: undefined,
  selectAll: undefined
};
export default {
  name: "DashboardCursos",
  data() {
    return {
      cursoForm: _.clone(emptyCurso),
      error: undefined,
      cursoClickado: "",
      ordenacao: "posicao"
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
    toggleOrderCod() {
      if (this.ordenacao == "codigo") this.ordenacao = "posicao";
      else this.ordenacao = "codigo";
    },
    toggleOrderNome() {
      if (this.ordenacao == "nome") this.ordenacao = "posicao";
      else this.ordenacao = "nome";
    },
    clickada(f_curso) {
      this.cursoClickado = f_curso;
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
        .then(response => {
          for (var i = 0; i < this.$store.state.turma.Turmas.length; i++) {
            var pedido = _.clone(emptyPedido);
            pedido.Curso = response.Curso.id;
            pedido.Turma = this.$store.state.turma.Turmas[i].id;
            console.log(pedido);
            pedidoService
              .create(pedido)
              .then(response => {})
              .catch(error => {
                console.log("erro ao criar pedido: " + error);
              });
          }
          this.cleanCurso();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi criado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Curso</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
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
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi atualizado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Curso</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },
    deleteCurso() {
      cursoService
        .delete(this.cursoForm.id, this.cursoForm)
        .then(response => {
          this.cleanCurso();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Curso ${response.Curso.nome} foi excluído!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Curso</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
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
    }
  },
  computed: {
    Cursos() {
      return _.orderBy(this.$store.state.curso.Cursos, this.ordenacao);
    },
    CursosAtivos() {
      return this.$store.state.curso.Ativos;
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
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardCursos {
  max-width: 100%;
  overflow: auto;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

/* Tabela Lucas */
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: auto !important;
  border: rgba(0, 0, 0, 0.125) solid 1px;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
table {
  display: block !important;
  overflow: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
  height: 18px !important;
}
table p {
  margin-bottom: 0;
  text-align: center;
  padding-right: 5px;
  padding-left: 5px;
}
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
table input {
  height: 18px !important;
  text-align: center !important;
  margin: 0;
}
/*
table tbody tr div {
  height: 22px !important;
}*/
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}

/* ====== CARD ====== */

.div-card {
  margin-left: auto;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: 300px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
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
select {
  height: 25px !important;
  font-size: 11px !important;
  padding: 0px 5px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMaior {
  min-width: 250px;
  max-width: 250px;
  text-align: start !important;
}
.inputMenor {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
}
.selectMenor {
  min-width: 80px;
  max-width: 80px;
  text-align: start !important;
}
/* =================== */

.radio {
  font-size: 11px;
}
input[type="text"] {
  height: 25px !important;
  font-size: 11px;
}
input[type="radio"] {
  height: 13px !important;
}
input[type="checkbox"] {
  width: 16px !important;
  height: 14px !important;
  text-align: center !important;
}
table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
}
.clickable-header {
  cursor: pointer;
  padding-left: 5px;
}

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

/* Botoes */
button {
  padding: 0 !important;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 32px !important;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  line-height: 50%;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-align: center !important;
}
i.fas,
i.far {
  font-size: 25px;
}
.addbtn {
  background-color: white;
  color: #a0e7a0;
}
.addbtn:hover {
  background-color: white;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}
.cancelbtn {
  background-color: white;
  color: #cfcfc4;
}
.cancelbtn:hover {
  color: #b8b4a8;
}
.cancelbtn:focus {
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}

.delbtn {
  background-color: white;
  color: #ff817b;
}
.delbtn:hover {
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}
.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  color: #82a0ff !important;
  background-color: white;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #698dff;
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
