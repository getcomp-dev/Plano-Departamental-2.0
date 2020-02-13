<template>
  <div class="DashboardGrades row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="col-xl-2 col-md-4 col-sm-5 col-7 px-0 pr-1 titulo">Grades</h1>

        <div
          class="form-group col-xl-10 col-md-8 col-sm-7 col-5 mb-0 p-0"
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
      <!-- Grid esquerdo -->
      <div class="col-lg-7 col-md-6 col-sm-12 col-12 m-0 px-0">
        <div class="divTable ml-0 mt-0 pl-0 pr-0 border">
          <table class="table table-sm">
            <thead class="thead-light">
              <th scope="col">
                <p class="p-header" style="width: 300px">Cursos</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 250px">Grades</p>
              </th>
            </thead>

            <tbody>
              <tr class="bg-custom-tr">
                <td>
                  <p style="width: 300px">Ciência da Computação Diurno</p>
                </td>
                <td>
                  <div style="width:250px">
                    <span class="badge badge-light">{{Grades_CCDiurno.length}}</span>
                  </div>
                </td>
              </tr>
              <template v-for="grade in Grades_CCDiurno">
                <tr
                  :key="'grade-id'+grade.id"
                  :class="{'bg-custom' : gradeForm.nome == grade.nome && gradeForm.Curso == 4}"
                >
                  <td>
                    <p style="width: 300px"></p>
                  </td>
                  <td class="clickable-td">
                    <p
                      @click="currentGrade=grade.id, findGrade(), grade_selected=true "
                      style="width: 250px"
                    >{{grade.nome}}</p>
                  </td>
                </tr>
              </template>

              <tr class="bg-custom-tr">
                <td>
                  <p style="width: 300px">Ciência da Computação Noturno</p>
                </td>
                <td>
                  <div style="width:250px">
                    <span class="badge badge-light">{{Grades_CCNoturno.length}}</span>
                  </div>
                </td>
              </tr>
              <template v-for="grade in Grades_CCNoturno">
                <tr
                  :key="'grade-id'+grade.id"
                  :class="{'bg-custom' : gradeForm.nome == grade.nome && gradeForm.Curso == 1}"
                >
                  <td>
                    <p style="width: 300px"></p>
                  </td>
                  <td class="clickable-td">
                    <p
                      @click="currentGrade=grade.id, findGrade(), grade_selected=true "
                      style="width: 250px"
                    >{{grade.nome}}</p>
                  </td>
                </tr>
              </template>

              <tr class="bg-custom-tr">
                <td>
                  <p style="width: 300px">Sistemas de informação</p>
                </td>
                <td>
                  <div style="width:250px">
                    <span class="badge badge-light">{{Grades_SI.length}}</span>
                  </div>
                </td>
              </tr>
              <template v-for="grade in Grades_SI">
                <tr
                  :key="'grade-id'+grade.id"
                  :class="{'bg-custom' : gradeForm.nome == grade.nome && gradeForm.Curso == 3}"
                >
                  <td>
                    <p style="width: 300px"></p>
                  </td>
                  <td class="clickable-td">
                    <p
                      @click="currentGrade=grade.id, findGrade(), grade_selected=true "
                      style="width: 250px"
                    >{{grade.nome}}</p>
                  </td>
                </tr>
              </template>

              <tr class="bg-custom-tr">
                <td>
                  <p style="width: 300px">Engenharia da Computação</p>
                </td>
                <td>
                  <div style="width:250px">
                    <span class="badge badge-light">{{Grade_EC.length}}</span>
                  </div>
                </td>
              </tr>
              <template v-for="grade in Grade_EC">
                <tr
                  :key="'grade-id'+grade.id"
                  :class="{'bg-custom' : gradeForm.nome == grade.nome && gradeForm.Curso == 2}"
                >
                  <td>
                    <p style="width: 300px"></p>
                  </td>
                  <td class="clickable-td">
                    <p
                      @click="currentGrade=grade.id, findGrade(), grade_selected=true"
                      style="width: 250px"
                    >{{grade.nome}}</p>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Fim Grid esquerdo  -->
      <!-- Grid direito -->
      <div class="div-card p-0 mt-0 mb-2 col-lg-5 col-md-6 col-sm-12 col-12">
        <!-- Inicio card -->
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

              <template v-if="grade_selected">
                <div class="row mb-0 mt-3 mx-0">
                  <div class="d-flex mr-0 ml-auto">
                    <button
                      type="button"
                      title="Salvar Grade"
                      class="addbtn"
                      v-on:click.prevent="editGrade()"
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button
                      type="button"
                      title="Excluir Grade"
                      class="delbtn"
                      v-on:click.prevent="deleteGrade()"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanGrade()"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="row mb-0 mt-3 mx-0">
                  <div class="d-flex mr-0 ml-auto">
                    <button
                      type="button"
                      title="Adicionar Grade"
                      class="addbtn"
                      v-on:click.prevent="addGrade()"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanGrade()"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </template>
            </form>
          </div>
        </div>
      </div>
      <!-- FIM DA REPETIÇÃO -->
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>lelele</strong> lalala
          </li>
          <li class="list-group-item">
            <strong>lelele</strong>lalala
          </li>
          <li class="list-group-item">
            <strong>lelele</strong> lalala
          </li>
          <li class="list-group-item">
            <strong>lelele</strong> lalala
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
  name: "DashboardGrade",
  data() {
    return {
      gradeForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      error: undefined,
      currentGrade: undefined,
      grade_selected: false,
      grades: [],
      showCard: false,
      nomeAtual: undefined
    };
  },
  methods: {
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
      this.cleanGrade();
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
      this.grade_selected = false;
      this.gradeForm = _.clone(emptyGrade);
      this.error = undefined;
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
    isEven(number) {
      return number % 2 === 0;
    }
  },
  watch: {},
  computed: {
    Grades() {
      return this.$store.state.grade.Grades;
    },
    Grades_CCNoturno() {
      return this.Grades.filter(function(grade) {
        return grade.Curso == 1;
      });
    },
    Grades_CCDiurno() {
      return this.Grades.filter(function(grade) {
        return grade.Curso == 4;
      });
    },
    Grades_SI() {
      return this.Grades.filter(function(grade) {
        return grade.Curso == 3;
      });
    },
    Grade_EC() {
      return this.Grades.filter(function(grade) {
        return grade.Curso == 2;
      });
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
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
.p-header {
  padding: 0 5px 0 5px;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
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

table {
  display: block !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 12px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
  height: 20px !important;
}
div-tab {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
  height: 40px !important;
}
table p {
  margin-bottom: 0;
  text-align: center;
  padding-right: 5px;
  padding-left: 5px;
}
p-tab {
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
.divTable {
  overflow: hidden !important;
  height: -webkit-max-content !important;
  height: -moz-max-content !important;
  height: max-content !important;
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
.clickable-td {
  cursor: pointer;
}
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}
.bg-custom-tr {
  background-color: rgba(0, 0, 0, 0.089);
  color: black;
}
</style>