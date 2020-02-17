<template>
  <div class="DashboardGradesEdit row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-3 col-md-4 col-sm-5 col px-0 pr-1 titulo">Disciplinas na Grade</h1>

        <div
          class="form-group col-xl-9 col-md-8 col-sm-7 col-1 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn p-0">
            <i class="fas fa-question"></i>
          </b-button>
        </div>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <div class="row w-100 m-0" style="font-size:11px">
      <div class="col-lg-7 col-md-6 col-sm-12 col-12 m-0 px-0">
        <div class="row w-100 m-0" style="font-size:11px">
          <!-- Grind esquerdo -->
          <!-- Inicio da tabela -->
          <div class="divTable ml-0 mt-0 pl-0 pr-0 border">
            <table class="table table-sm table-hover">
              <thead class="thead-light">
                <tr>
                  <div style="width: 505px;" class="sticky">
                    <th scope="col">
                      <p class="p-header" style="width: 32px">P.</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:70px">Código</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width: 403px; text-align:start">Disciplina</p>
                    </th>
                  </div>
                </tr>
              </thead>

              <tbody>
                <template v-if="grade_selected">
                  <template v-for="grade in Grades">
                    <template v-for="disciplinaGrade in DisciplinaGrades">
                      <tr
                        :key="disciplinaGrade.Disciplina+'-'+disciplinaGrade.Grade+'-'+grade.id"
                        v-if="grade.id===currentGrade"
                        :class="[isEven(disciplinaGrade.periodo)? 'even':'notEven']"
                      >
                        <div style="width: 505px; font-size:11px;">
                          <template v-if="disciplinaGrade.Grade===grade.id">
                            <td>
                              <p style="width:32px;">{{disciplinaGrade.periodo}}</p>
                            </td>

                            <template v-for="disciplina in Disciplinas">
                              <template v-if="andConnector(grade, disciplina, disciplinaGrade)">
                                <td
                                  :key="'disciplina-codigo'+disciplina.codigo"
                                  v-on:click.prevent="showDisciplina(disciplinaGrade), clickada(disciplina.id, disciplina.nome), showGrade(grade)"
                                  :class="{ 'bg-custom': disciplinaClickada===disciplina.id}"
                                  style="cursor:pointer;"
                                >
                                  <p style="width: 70px">{{disciplina.codigo}}</p>
                                </td>
                                <td
                                  :key="'2-disciplina-codigo'+disciplina.codigoo"
                                  v-on:click.prevent="showDisciplina(disciplinaGrade), clickada(disciplina.id, disciplina.nome), showGrade(grade)"
                                  :class="{ 'bg-custom': disciplinaClickada===disciplina.id}"
                                  style="cursor:pointer;"
                                >
                                  <p style="width: 400px; text-align: start;">{{disciplina.nome}}</p>
                                </td>
                              </template>
                            </template>
                          </template>
                        </div>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>

            <!-- Final da tabela -->
          </div>
        </div>
      </div>
      <!-- Fim Grind esquerdo  -->

      <!-- Grind direito -->
      <div class="div-card p-0 mt-0 mb-2 col-lg-5 col-md-6 col-sm-12 col-12">
        <!-- Inicio card Disciplina -->
        <div class="card mr-3 ml-auto">
          <div class="card-header">
            <h1 class="card-title">Disciplinas</h1>
          </div>

          <div class="card-body">
            <form>
              <div class="row mb-2 mx-0">
                <div class="form-group col m-0 px-0" style="margin-right: 18px!important">
                  <label for="cursoAtual" class="col-form-label">Curso</label>
                  <select
                    id="cursoAtual"
                    v-model="currentCurso"
                    v-on:change="clearClick(), cleanGrade(), selectingGrade()"
                    class="form-control form-control-sm selectMaior"
                  >
                    <option value="4">Ciência da Computação Diurno</option>
                    <option value="1">Ciência da Computação Noturno</option>
                    <option value="3">Sistemas de Informação</option>
                    <option value="2">Engenharia Computacional</option>
                  </select>
                </div>

                <div class="form-group m-0 col px-0">
                  <template v-if="curso_selected">
                    <label for="gradeAtual" class="col-form-label">Grade</label>
                    <select
                      id="gradeAtual"
                      v-model="currentGrade"
                      v-on:change="findGrade(), cleanDisciplina(), grade_selected=true"
                      class="form-control form-control-sm selectMenor"
                    >
                      <template v-for="grade in Grades">
                        <option
                          v-if="grade.Curso == currentCurso"
                          :key="'grade-id'+grade.id"
                          :value="grade.id"
                        >{{grade.nome}}</option>
                      </template>
                    </select>
                  </template>

                  <template v-else>
                    <label for="gradeAtual" class="col-form-label">Grade</label>
                    <select
                      id="gradeAtual"
                      disabled
                      class="form-control form-control-sm selectMenor"
                    ></select>
                  </template>
                </div>
              </div>

              <div class="w-100 border mt-3 mb-2"></div>

              <!-- Edição de disciplina -->
              <template v-if="grade_selected">
                <div class="row mb-2 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="disciplina" class="col-form-label">Disciplina</label>
                    <select
                      type="text"
                      class="form-control form-control-sm selectMaior2"
                      id="disciplina"
                      v-model="disciplinaGradeForm.Disciplina"
                      v-on:change="clearClick()"
                    >
                      <option
                        v-if="Disciplinas.length===0"
                        type="text"
                        value
                      >Nenhuma Disciplina Encontrada</option>
                      <option
                        v-else
                        v-for="disciplina in Disciplinas"
                        :key="'2-grade-id'+disciplina.id+'-'+disciplina.codigo"
                        :value="disciplina.id"
                      >{{disciplina.nome}}</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-2 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="periodoDisciplina" class="col-form-label">Período</label>
                    <div class="d-flex">
                      <input
                        type="text"
                        class="form-control form-control-sm inputMenor2"
                        aria-describedby="button-edit-periodo"
                        id="periodoDisciplina"
                        @keypress="onlyNumber"
                        v-model="disciplinaGradeForm.periodo"
                      />

                      <button
                        type="button"
                        title="Salvar"
                        class="addbtn"
                        style="margin-top: -1px"
                        v-on:click.prevent="editDisciplinaGrade"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row mb-0 mt-3 mx-0">
                  <div class="d-flex mr-0 ml-auto">
                    <template v-if="disciplinaClickada !== disciplinaGradeForm.Disciplina">
                      <button
                        type="button"
                        title="Adicionar à Grade"
                        class="addbtn"
                        v-on:click.prevent="addDisciplinaGrade"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </template>

                    <button
                      type="button"
                      title="Deletar Disciplina"
                      class="delbtn"
                      v-on:click.prevent="deleteDisciplinaGrade(), clearClick()"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>

                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanDisciplina()"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </template>
              <!-- botões desabilitados -->
              <template v-else>
                <div class="row mb-2 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="disciplina" class="mr-2 col-form-label">Disciplina</label>
                    <select
                      type="text"
                      class="selectMaior2 form-control form-control-sm"
                      id="disciplina"
                      disabled
                    ></select>
                  </div>
                </div>

                <div class="row mb-2 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="periodoDisciplina" class="col-form-label">Período</label>

                    <div class="d-flex">
                      <input
                        type="text"
                        class="form-control form-control-sm inputMenor2"
                        aria-describedby="button-edit-periodo"
                        id="periodoDisciplina"
                        disabled
                      />

                      <button type="button" class="btn-disable" style="margin-top: -1px">
                        <i class="fas fa-check"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row mb-0 mt-3 mx-0">
                  <div class="d-flex mr-0 ml-auto">
                    <button type="button" class="btn-disable">
                      <i class="fas fa-plus"></i>
                    </button>

                    <button type="button" class="btn-disable">
                      <i class="far fa-trash-alt"></i>
                    </button>

                    <button type="button" class="btn-disable">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </template>
            </form>
          </div>
        </div>

        <!-- Final card -->
      </div>
      <!-- FIM DA REPETIÇÃO -->
    </div>
    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tabela:</strong> Comece selecionando o curso desejado. Em seguida, selecione 
            a grade que quer visualizar.
          </li>
          <li class="list-group-item">
            <strong>Para adicionar disciplinas à Grade:</strong> Com o cartão a direita em branco, preencha-o. Em seguida, 
            clique em Adicionar <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>.
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar uma disciplina:</strong> Na tabela, clique na disciplina que deseja modificar. 
            Logo após, no cartão à direita, altere as informações que desejar e clique em Salvar 
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
             ou, para excluí-la, clique em Deletar 
             <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
             .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à direita, clique em Cancelar 
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import gradeService from "../../common/services/grade";
import disciplinaGradeService from "../../common/services/disciplinaGrade";
const emptyGrade = {
  id: undefined,
  periodoInicio: undefined,
  Curso: undefined,
  nome: undefined
};
const emptyDisciplinaGrade = {
  periodo: undefined,
  Disciplina: undefined,
  Grade: undefined
};
export default {
  name: "DashboardGradeEdit",
  data() {
    return {
      gradeForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      error: undefined,
      currentGrade: undefined,
      currentCurso: undefined,
      curso_selected: false,
      grade_selected: false,
      grades: [],
      disciplinaClickada: "",
      showCard: false,
      nomeAtual: undefined
    };
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    clickada(ID, nome) {
      this.disciplinaClickada = ID;
      this.nomeAtual = nome;
    },
    selectingGrade() {
      this.curso_selected = true; //Curso foi selecionado
      this.grade_selected = false; //Grade ainda não foi selecionada
    },
    clearClick() {
      this.disciplinaClickada = "";
    },
    cleanSelections() {
      this.currentGrade = undefined;
      this.currentCurso = undefined;
      this.grade_selected = false;
      this.curso_selected = false;
    },
    addGrade() {
      gradeService
        .create(this.gradeForm)
        .then(response => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Grade</b>";
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
    AvisoDisabled() {
      this.$notify({
        group: "general",
        title: `Erro!`,
        text: "Selecione um curso e grade!",
        type: "error"
      });
    },
    editGrade() {
      gradeService
        .update(this.gradeForm.id, this.gradeForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Grade</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },
    deleteGrade() {
      let grade_nome = this.gradeForm.nome;
      gradeService
        .delete(this.gradeForm.id, this.gradeForm)
        .then(response => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${grade_nome} foi excluída!`,
            type: "warn"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Grade</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },
    cleanGrade() {
      this.gradeForm = _.clone(emptyGrade);
      this.error = undefined;
    },
    cleanDisciplina() {
      this.clearClick();
      this.disciplinaGradeForm.periodo = undefined;
      this.disciplinaGradeForm.Disciplina = undefined;
    },
    showGrade(grade) {
      this.cleanGrade();
      this.gradeForm = _.clone(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    findGrade() {
      var grade = _.find(this.$store.state.grade.Grades, [
        "id",
        this.currentGrade
      ]);

      this.showGrade(grade);
    },
    addDisciplinaGrade() {
      let nome_disciplina = null;
      for (const key in this.Disciplinas) {
        if (this.Disciplinas[key].id == this.disciplinaGradeForm.Disciplina) {
          nome_disciplina = this.Disciplinas[key].nome;
          break;
        }
      }
      disciplinaGradeService
        .create(this.disciplinaGradeForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${nome_disciplina}</b> foi adicionada à Grade <b>${this.gradeForm.nome}</b>!`,
            type: "success"
          });
          // this.disciplinaGradeForm.Disciplina = undefined; //Limpa campo de disciplina apos adicionar
        })
        .catch(error => {
          this.error = "<b>Erro ao incluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },
    editDisciplinaGrade() {
      disciplinaGradeService
        .update(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${this.nomeAtual}</b> foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
    },
    deleteDisciplinaGrade() {
      disciplinaGradeService
        .delete(
          this.disciplinaGradeForm.Disciplina,
          this.disciplinaGradeForm.Grade,
          this.disciplinaGradeForm
        )
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${this.nomeAtual}</b> foi excluída!`,
            type: "warn"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error"
          });
        });
      //this.cleanDisciplina();
    },
    showDisciplina: function(disciplinaGrade) {
      this.cleanDisciplina;
      this.disciplinaGradeForm = _.clone(disciplinaGrade);
    },
    andConnector: function(grade, disciplina, disciplinaGrade) {
      return (
        grade.id === disciplinaGrade.Grade &&
        disciplina.id === disciplinaGrade.Disciplina
      );
    },
    isEven(number) {
      return number % 2 === 0;
    }
  },
  watch: {},
  computed: {
    Grades() {
      return this.$store.state.grade.Grades;
    },
    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    Disciplinas() {
      return _.sortBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    DisciplinaGrades() {
      return _.sortBy(
        this.$store.state.disciplinaGrade.DisciplinaGrades,
        "periodo"
      );
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

.DashboardGradesEdit {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.btn {
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  font-size: 12px;
  padding: 0 5px 0 5px;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
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
  width: 342px;
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
.selectMenor {
  min-width: 80px;
  max-width: 80px;
  text-align: start !important;
}
.selectMaior {
  min-width: 200px;
  max-width: 200px;
  text-align: start !important;
}
input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  max-width: 60px;
  min-width: 60px;
  text-align: center;
}
.inputMenor2 {
  max-width: 40px;
  min-width: 40px;
  margin-right: 10px;
  text-align: center;
}
.selectMaior2 {
  max-width: 300px;
  min-width: 300px;
  text-align: start;
}
/* =================== */
.divTable {
  overflow: hidden !important;
  height: -webkit-max-content !important;
  height: -moz-max-content !important;
  height: max-content !important;
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
table {
  display: block !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
.p-header {
  padding: 0 5px 0 5px;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
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
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  z-index: 5 !important;
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}
.even {
  background-color: rgba(0, 0, 0, 0.08);
}
.notEven {
  background-color: white;
}
table tbody tr:hover {
  background-color: #c8c8c8;
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
  padding: 0;
  border: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
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

.btn-disable {
  background-color: white;
  color: #cfcfc4;
  cursor: default !important;
  outline: none !important;
}
.btn-disable::-moz-focus-inner {
  border: 0;
}

@media screen and (max-width: 900px) {
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
.modal-header {
  background-color: rgba(0, 0, 0, 0.03);
  text-align: center;
}
header {
  text-align: center;
}
.modal-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
</style>