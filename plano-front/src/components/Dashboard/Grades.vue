<template>
  <div class="DashboardGrades row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-12 titulo">Grades</h1>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="row w-100 m-0" style="font-size:11px">
      <div class="col-lg-7 col-md-6 col-sm-12 col-12 m-0 px-0">
        <div class="form-row mx-0">
          <div class="mr-3">
            <label for="cursoAtual" class="col-form-label py-0">Curso</label>
            <select
              id="cursoAtual"
              v-model="currentCurso"
              v-on:change="clearClick(), cleanGrade(), currentGrade=undefined"
              class="form-control form-control-sm selectMaior"
            >
              <option value="4">Ciência da Computação Diurno</option>
              <option value="1">Ciência da Computação Noturno</option>
              <option value="3">Sistemas de Informação</option>
              <option value="2">Engenharia Computacional</option>
            </select>
          </div>

          <div class="mr-3">
            <label for="gradeAtual" class="col-form-label py-0">Grade</label>
            <select
              id="gradeAtual"
              v-model="currentGrade"
              v-on:change="findGrade(), clearClick(), cleanDisciplina()"
              class="form-control form-control-sm selectMenor"
            >
              <template v-for="grade in Grades">
                <option
                  v-if="grade.Curso == currentCurso"
                  :key="grade.Curso"
                  :value="grade.id"
                >{{grade.nome}}</option>
              </template>
            </select>
          </div>

          <div class="mr-3">
            <button
              type="button"
              title="Nova Grade"
              class="addbtn mt-3"
              v-on:click.capture="cleanNewGrade()"
              v-b-modal.modalNovaGrade
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>

          <b-modal
            id="modalNovaGrade"
            ref="modalGrade"
            scrollable
            title="Nova Grade"
            style="font-size:12px!important;"
            size="sm"
          >
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="inputMenor form-control form-control-sm"
                  id="nome"
                  v-model="gradeNewForm.nome"
                />
              </div>

              <div class="form-group col m-0 px-0">
                <label for="periodoInicio" class="col-form-label">Período de Início</label>
                <input
                  type="text"
                  class="inputMenor form-control form-control-sm col"
                  id="periodoInicio"
                  v-model="gradeNewForm.periodoInicio"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="curso" class="col-form-label">Curso</label>
                <select
                  type="text"
                  class="form-control form-control-sm selectMaior"
                  id="curso"
                  v-model="gradeNewForm.Curso"
                >
                  <option value="4">Ciência da Computação Diurno</option>
                  <option value="1">Ciência da Computação Noturno</option>
                  <option value="3">Sistemas de Informação</option>
                  <option value="2">Engenharia Computacional</option>
                </select>
              </div>
            </div>

            <div slot="modal-footer">
              <button
                type="button"
                title="Adicionar Grade"
                class="addbtn"
                v-on:click.prevent=" addGrade(), btnOkModal()"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="cancelbtn"
                v-on:click.prevent="cleanNewGrade()"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </b-modal>
        </div>
        <!-- Final Forms Curso e Grande -->

        <div class="row w-100"></div>

        <div class="row w-100 m-0" style="font-size:11px">
          <!-- Grind esquerdo -->
          <!-- Inicio da tabela -->
          <div class="divTable ml-0 mt-3 pl-0 pr-0 border">
            <table class="table table-sm table-hover">
              <thead class="thead-light">
                <tr>
                  <div style="width: 505px;" class="sticky">
                    <th scope="col">
                      <p class="p-header" style="width: 32px">P.</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:70px">Cod</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width: 403px; text-align:start">Disciplina</p>
                    </th>
                  </div>
                </tr>
              </thead>

              <tbody>
                <template v-if="currentGrade!=undefined">
                  <template v-for="grade in Grades">
                    <template v-for="disciplinaGrade in DisciplinaGrades">
                      <tr
                        :key="disciplinaGrade+grade.periodo"
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
                                  :key="disciplina.codigo"
                                  v-on:click.prevent="showDisciplina(disciplinaGrade), clickada(disciplina.nome), showGrade(grade)"
                                  :class="{ 'bg-custom': disciplinaClickada===disciplina.nome}"
                                  style="cursor:pointer;"
                                >
                                  <p style="width: 70px">{{disciplina.codigo}}</p>
                                </td>
                                <td
                                  :key="disciplina.nome"
                                  :class="{ 'bg-custom': disciplinaClickada===disciplina.nome}"
                                  style="cursor:pointer;"
                                  v-on:click.prevent="showDisciplina(disciplinaGrade), clickada(disciplina.nome), showGrade(grade)"
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
        <!-- Inicio card Grade -->
        <template v-if="isEdit">
          <div
            class="card mr-3 ml-auto"
            style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
          >
            <div class="card-header">
              <h1 class="card-title">Grade</h1>
            </div>

            <div class="card-body">
              <form>
                <div class="row mb-2 mx-0">
                  <div class="form-group col m-0 mr-4 px-0">
                    <label for="nome" class="col-form-label">Nome</label>
                    <input
                      type="text"
                      class="inputMenor form-control form-control-sm"
                      id="nome"
                      v-model="gradeForm.nome"
                    />
                  </div>

                  <div class="form-group col m-0 px-0">
                    <label for="periodoInicio" class="col-form-label">Período de Início</label>
                    <input
                      type="text"
                      class="inputMenor form-control form-control-sm col"
                      id="periodoInicio"
                      v-model="gradeForm.periodoInicio"
                    />
                  </div>
                </div>

                <div class="row mb-2 mx-0">
                  <div class="form-group col m-0 px-0">
                    <label for="curso" class="col-form-label">Curso</label>
                    <select
                      type="text"
                      style="text-align:center;"
                      class="form-control form-control-sm selectMaior"
                      id="curso"
                      v-model="gradeForm.Curso"
                    >
                      <option value="4">Ciência da Computação Diurno</option>
                      <option value="1">Ciência da Computação Noturno</option>
                      <option value="3">Sistemas de Informação</option>
                      <option value="2">Engenharia Computacional</option>
                    </select>
                  </div>
                </div>

                <div class="row mb-0 mt-3 mx-0">
                  <div class="d-flex mr-0 ml-auto">
                    <button
                      type="button"
                      title="Salvar Grade"
                      class="addbtn"
                      v-on:click.prevent="editGrade"
                      :key="1"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button
                      type="button"
                      title="Excluir Grade"
                      class="delbtn"
                      v-on:click.prevent="deleteGrade"
                      :key="3"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- Final card Grade -->

          <!-- Inicio card Disciplina -->
          <div
            class="card mr-3 ml-auto"
            style="border-top-left-radius: 0; border-top-right-radius: 0; margin-top: -1px;"
          >
            <div class="card-header">
              <h1 class="card-title">Disciplinas</h1>
            </div>

            <div class="card-body">
              <form>
                <!-- Edição de disciplina -->
                <div class="row mb-2 mx-0">
                  <div class="form-group m-0 col px-0">
                    <label for="disciplina" class="mr-2 col-form-label">Disciplina</label>
                    <select
                      type="text"
                      class="selectMaior2 form-control form-control-sm"
                      id="disciplina"
                      v-model="disciplinaGradeForm.Disciplina"
                    >
                      <option
                        v-if="Disciplinas.length===0"
                        type="text"
                        value
                      >Nenhuma Disciplina Encontrada</option>
                      <option
                        v-else
                        v-for="disciplina in Disciplinas"
                        :key="disciplina.nome"
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
                        v-model="disciplinaGradeForm.periodo"
                      />

                      <button
                        type="button"
                        title="Salvar"
                        class="addbtn"
                        style="margin-top: -1px"
                        v-on:click.prevent="editDisciplinaGrade"
                        :key="4"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row mb-0 mt-3 mx-0">
                  <div class="d-flex mr-0 ml-auto">
                    <button
                      type="button"
                      title="Adicionar à Grade"
                      class="addbtn"
                      v-on:click.prevent="addDisciplinaGrade"
                      :key="4"
                    >
                      <i class="fas fa-plus"></i>
                    </button>

                    <button
                      type="button"
                      title="Deletar Disciplina"
                      class="delbtn"
                      v-on:click.prevent="deleteDisciplinaGrade(), clearClick()"
                      :key="4"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>

                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanDisciplina(),clearClick()"
                      :key="2"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </template>
        <!-- Final card -->
      </div>
      <!-- FIM DA REPETIÇÃO -->
    </div>
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
  name: "DashboardGrade",
  data() {
    return {
      gradeForm: _.clone(emptyGrade),
      gradeNewForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      error: undefined,
      currentGrade: undefined,
      currentCurso: undefined,
      grades: [],
      disciplinaClickada: "",
      showCard: false
    };
  },
  methods: {
    clickada(discip) {
      this.disciplinaClickada = discip;
    },
    clearClick() {
      this.disciplinaClickada = "";
    },
    addGrade() {
      this.gradeForm = this.gradeNewForm;
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
          this.$refs.modalGrade.hide();//esconde o modal
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
      gradeService
        .delete(this.gradeForm.id, this.gradeForm)
        .then(response => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi excluída!`,
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
    cleanNewGrade() {
      this.gradeNewForm = _.clone(emptyGrade);
    },
    cleanDisciplina() {
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
      disciplinaGradeService
        .create(this.disciplinaGradeForm)
        .then(response => {
          this.disciplinaGradeForm.Disciplina = undefined;
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina ${response.Disciplina} foi adicionada à Grade ${response.Grade}!`,
            type: "success"
          });
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
            text: `A Disciplina ${response.Disciplina} foi atualizada!`,
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
            text: `A Disciplina ${response.Disciplina} foi excluída!`,
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
    isEdit() {
      return this.currentGrade !== undefined;
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

.DashboardGrades {
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
  font-size: 12px;
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
.p-header {
  padding: 0 5px 0 5px;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
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
  height: -webkit-calc(100vh - 150px);
  height: -moz-calc(100vh - 150px);
  height: calc(100vh - 150px);
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
}
/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  /*select {
    height: 25px !important;
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
    height: 25px !important;
    text-align: start;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
	*/
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