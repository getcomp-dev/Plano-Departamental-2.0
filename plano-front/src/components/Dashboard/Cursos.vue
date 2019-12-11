<template>
  <div class="DashboardCursos row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="col-12 titulo">Cursos</h1>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <!-- Grid Esquerdo -->

    <!-- Inicio da Tabela -->
    <div class="divTable">
      <table class="table table-hover table-sm">
        <thead class="thead-light">
          <tr>
            <div
              style="display: block; overflow: hidden; width: 520px; height:20px !important"
              class="sticky"
            >
              <th scope="col">
                <p class="p-header" @click="toggleOrderNome()" style="width:300px!important;">Nome<i v-if="ordenacao=='nome'" style="font-size:0.6rem" class="fas fa-arrow-down fa-sm"></i></p>
              </th>
              <th scope="col">
                <p class="p-header" @click="toggleOrderCod()" style="width:50px!important;">Código<i v-if="ordenacao=='codigo'" style="font-size:0.6rem" class="fas fa-arrow-down fa-sm"></i></p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:50px!important;">Turno</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:44px!important;">1º Sem.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width:44px!important;">2º Sem.</p>
              </th>
              <th scope="col">
                <div style="width: 32px">
                  <input type="checkbox" v-model="selectAll" v-on:click.prevent="toggleAllCursos" />
                </div>
              </th>
            </div>
          </tr>
        </thead>

        <tbody>
          <template v-if="Cursos.length > 0">
            <tr
              v-for="curso in Cursos"
              :key="curso.id"
              v-on:click.prevent="showCurso(curso), clickada(curso.codigo)"
              :class="{'bg-custom':cursoClickado === curso.codigo}"
            >
              <div style="width: 520px">
                <td>
                  <p style="width: 300px; text-align: start">{{ curso.nome }}</p>
                </td>
                <td>
                  <p style="width: 50px">{{ curso.codigo}}</p>
                </td>
                <td>
                  <p style="width: 50px;">{{ curso.turno }}</p>
                </td>
                <!-- 1 = 1º semestre, 2 = 2º semestre, 3 = Ambos-->
                <td v-if="curso.semestreInicial == 1 || curso.semestreInicial == 3">
                  <p style="width: 44px">{{ curso.alunosEntrada }}</p>
                </td>
                <td v-else>
                  <p style="width: 44px">0</p>
                </td>
                <td v-if="curso.semestreInicial == 2 || curso.semestreInicial == 3">
                  <p style="width: 44px">{{ curso.alunosEntrada }}</p>
                </td>
                <td v-else>
                  <p style="width: 44px">0</p>
                </td>
                <td>
                  <div style="width:32px">
                    <input
                      style="width: 15px"
                      type="checkbox"
                      v-model="CursosAtivos[curso.id]"
                      v-on:click.prevent="toggleCurso(curso.id)"
                    />
                  </div>
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

    <!-- Fim do Grid Esquerdo -->

    <!-- Grid Direito -->
    <div class="div-card p-0 mt-3 mb-2 ml-auto col-lg-5 col-md-12 col-sm-12 col-12">
      <div class="col card cartao ml-auto" style="max-width: 350px;">
        <!-- <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom"
        >-->
        <div class="card-header">
          <template v-if="isEdit">
            <h1 class="card-title">Curso</h1>
          </template>
          <template v-else>
            <h1 class="card-title">Curso</h1>
          </template>
        </div>

        <div class="card-body" style="padding:20px; overflow-y:auto; overflow-x:hidden;">
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
          <form>
            <div class="form-group row">
              <label
                for="nome"
                class="col-form-label col-sm-3 col-3"
                style="text-align: end; padding: 0"
              >Nome</label>
              <div class="col-9" style="padding-left: 10px;">
                <input type="text" class="form-control" id="nome" v-model="cursoForm.nome" />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="codigo"
                class="col-form-label col-sm-3 col-3"
                style="text-align: end; padding: 0"
              >Código</label>
              <div class="col-9" style="padding-left: 10px;">
                <input type="text" class="form-control" id="codigo" v-model="cursoForm.codigo" />
              </div>
            </div>

            <div class="form-group row">
              <label
                for="alunosEntrada"
                class="col-form-label col-sm-3 col-3"
                style="text-align: end; padding: 0"
              >Alunos 1º semestre</label>
              <div class="col-9" style="padding-left: 10px;">
                <input
                  type="text"
                  class="form-control"
                  id="alunosEnrada"
                  v-model="cursoForm.alunosEntrada"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="alunosEntrada"
                class="col-form-label col-sm-3 col-3"
                style="text-align: end; padding: 0"
              >Alunos 2º semestre</label>
              <div class="col-9" style="padding-left: 10px;">
                <input
                  type="text"
                  class="form-control"
                  id="alunosEnrada"
                  v-model="cursoForm.alunosEntrada2"
                />
              </div>
            </div>

            <div class="form-group row">
              <label
                for="turno"
                class="col-lg-3 col-md-3 col-sm-3 col-3 col-form-label"
                style="text-align:end; padding: 0"
              >Turno</label>
              <div class="col-sm-6 col-6">
                <div class="radio" id="turno">
                  <input type="radio" name="turno" value="Diurno" v-model="cursoForm.turno" />
                  Diurno
                  <br />
                  <input type="radio" name="turno" value="Integral" v-model="cursoForm.turno" />
                  Integral
                  <br />
                  <input type="radio" name="turno" value="Noturno" v-model="cursoForm.turno" />
                  Noturno
                  <br />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <!-- <div class="col-sm-10"> -->
              <template v-if="isEdit">
                <div style="display: flex; margin-right: 0; margin-left: auto">
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
                    :key="3"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <!-- Cancelar -->
                  <button
                    type="button"
                    title="Cancelar"
                    class="cancelbtn"
                    v-on:click.prevent="cleanCurso"
                    :key="2"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </template>
              <template v-else>
                <div style="display: flex; margin-right: 0; margin-left: auto">
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
                </div>
              </template>
              <!-- </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Fim do Grid Direito -->
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
      ordenacao: 'posicao'
    };
  },
  created() {
    this.ultimo =
      this.$store.state.curso.Cursos[this.$store.state.curso.Cursos.length - 1]
        .id + 1;
    this.selectAll = true;
  },
  methods: {
    toggleOrderCod () {
        if(this.ordenacao == 'codigo')
            this.ordenacao = 'posicao'
        else
            this.ordenacao = 'codigo'
    },
    toggleOrderNome () {
        if(this.ordenacao == 'nome')
            this.ordenacao = 'posicao'
        else
            this.ordenacao = 'nome'
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
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
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

.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.custom-select {
  height: 26px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 10px !important;
  min-width: 85px;
  max-width: 85px;
  text-align: center;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 26px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
table {
  display: block !important;
  overflow-y: scroll !important;
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
}
table p {
  margin-bottom: 0;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
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
table select {
  height: 15px !important;
  text-align: left;
}

table input {
  height: 12px !important;
  text-align: center !important;
  margin: 0px;
  margin-top: 4px;
}

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  select {
    height: 15px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 10;
}
.radio {
  font-size: 11px;
}

.form-group {
  margin-bottom: 8px !important;
}
.col-form-label {
  font-size: 11px;
  padding-top: 0;
  padding-bottom: 0;
}

input[type="text"] {
  height: 25px !important;
  font-size: 11px;
}

input[type="radio"] {
  height: 13px !important;
}
.card {
  width: 330px !important;
  height: auto !important;
  padding: 0;
  margin-right: 20px !important;
  margin-left: auto;
  top: -20px !important;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}

input[type="checkbox"] {
  height: 13px !important;
  width: 13px !important;
  text-align: center !important;
}
table input[type="checkbox"] {
  margin-left: 0 !important;
}
table th {
  vertical-align: middle;
}
/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  transition: all 0.3s ease 0s;

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
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}

@media screen and (max-width: 992px) {
  .cartao {
    margin-right: auto !important;
    top: 0 !important;
  }
}
</style>
