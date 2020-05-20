<template>
  <div class="main-component row" v-if="Admin">
    <PageTitle :title="'Grades'">
      <template #aside>
        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

    <div class="row w-100 m-0">
      <div class="p-0 divTable">
        <TableMain>
          <template #thead>
            <th style="width: 220px">
              Cursos
            </th>
            <th style="width: 100px">
              Grades
            </th>
          </template>

          <template #tbody>
            <tr class="bg-custom">
              <td style="width: 220px">
                Ciência da Computação Diurno
              </td>
              <td style="width:100px"></td>
            </tr>
            <template v-for="grade in Grades_CCDiurno">
              <tr
                @click="findGrade(grade.id)"
                :key="'grade-id' + grade.id"
                :class="[
                  'clickable',
                  { 'bg-selected': gradeForm.id == grade.id },
                ]"
              >
                <td style="width: 220px"></td>
                <td style="width: 100px">
                  {{ grade.nome }}
                </td>
              </tr>
            </template>

            <tr class="bg-custom">
              <td style="width: 220px">
                Ciência da Computação Noturno
              </td>
              <td style="width:100px"></td>
            </tr>
            <template v-for="grade in Grades_CCNoturno">
              <tr
                @click="findGrade(grade.id)"
                :key="'grade-id' + grade.id"
                :class="[
                  'clickable',
                  { 'bg-selected': gradeForm.id == grade.id },
                ]"
              >
                <td style="width: 220px"></td>
                <td style="width: 100px">
                  {{ grade.nome }}
                </td>
              </tr>
            </template>

            <tr class="bg-custom">
              <td style="width: 220px">
                Sistemas de informação
              </td>
              <td style="width:100px"></td>
            </tr>
            <template v-for="grade in Grades_SI">
              <tr
                @click="findGrade(grade.id)"
                :key="'grade-id' + grade.id"
                :class="[
                  'clickable',
                  { 'bg-selected': gradeForm.id == grade.id },
                ]"
              >
                <td style="width: 220px"></td>
                <td style="width: 100px">
                  {{ grade.nome }}
                </td>
              </tr>
            </template>

            <tr class="bg-custom">
              <td style="width: 220px">
                Engenharia da Computação
              </td>
              <td style="width:100px"></td>
            </tr>
            <template v-for="grade in Grade_EC">
              <tr
                @click="findGrade(grade.id)"
                :key="'grade-id' + grade.id"
                :class="[
                  'clickable',
                  { 'bg-selected': gradeForm.id == grade.id },
                ]"
              >
                <td style="width: 220px"></td>
                <td style="width: 100px">
                  {{ grade.nome }}
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
              <div class="form-group col-5 m-0 px-0">
                <label for="nome" class="col-form-label">Nome</label>
                <input
                  type="text"
                  class="card-input-menor form-control form-control-sm"
                  id="nome"
                  v-model="gradeForm.nome"
                />
              </div>

              <div class="form-group col-7 m-0 px-0">
                <label for="periodoInicio" class="col-form-label"
                  >Período de Início</label
                >
                <input
                  type="text"
                  class="card-input-menor form-control form-control-sm col"
                  id="periodoInicio"
                  v-model="gradeForm.periodoInicio"
                  @keypress="onlyNumber"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <label for="curso" class="col-form-label">Curso</label>
                <select
                  type="text"
                  style="text-align:center;"
                  class="form-control form-control-sm card-input-maior"
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
          </template>
          <template #footer>
            <template v-if="currentGrade != undefined">
              <button
                type="button"
                title="Salvar Grade"
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="editGrade()"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                type="button"
                title="Deletar Grade"
                class="btn-custom btn-icon delbtn"
                v-on:click.prevent="deleteGrade()"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanGrade()"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>

            <template v-else>
              <button
                type="button"
                title="Adicionar Grade"
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="addGrade()"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanGrade()"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
          </template>
        </Card>
      </div>
    </div>

    <!-- MODAL DE AJUDA -->
    <b-modal id="modalAjuda" title="Ajuda" scrollable hide-footer>
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para adicionar grades:</strong> Com o cartão a direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>.
          </li>
          <li class="list-group-item">
            <strong>Para editar ou deletar uma grade:</strong> Na tabela, clique
            na grade que deseja alterar. Logo após, no cartão à direita, altere
            as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-la, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <strong>Para deixar o cartão em branco:</strong> No cartão, à
            direita, clique em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>.
          </li>
        </ul>
      </div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import gradeService from "@/common/services/grade";
import disciplinaGradeService from "@/common/services/disciplinaGrade";
import Card from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import TableMain from "@/components/TableMain";

const emptyGrade = {
  id: undefined,
  periodoInicio: undefined,
  Curso: undefined,
  nome: undefined,
};
const emptyDisciplinaGrade = {
  periodo: undefined,
  Disciplina: undefined,
  Grade: undefined,
};
export default {
  name: "DashboardGrade",
  components: { PageTitle, Card, TableMain },
  data() {
    return {
      error: undefined,
      gradeForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      currentGrade: undefined,
    };
  },
  methods: {
    addGrade() {
      gradeService
        .create(this.gradeForm)
        .then((response) => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi criada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao criar Grade</b>";
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
      this.cleanGrade();
    },
    editGrade() {
      gradeService
        .update(this.gradeForm.id, this.gradeForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${response.Grade.nome} foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Grade</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    deleteGrade() {
      let grade_nome = this.gradeForm.nome;

      gradeService
        .delete(this.gradeForm.id, this.gradeForm)
        .then((response) => {
          this.cleanGrade();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${grade_nome} foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error =
            "<b>Erro ao excluir Grade, não pode haver disciplinas cadastradas na Grade.</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    cleanGrade() {
      this.currentGrade = undefined;
      this.gradeForm = _.clone(emptyGrade);
      this.error = undefined;
    },
    showGrade(grade) {
      this.cleanGrade();

      this.currentGrade = grade.id;
      this.gradeForm = _.clone(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    findGrade(id) {
      var grade = _.find(this.$store.state.grade.Grades, ["id", id]);
      this.showGrade(grade);
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
    isEven(number) {
      return number % 2 === 0;
    },
  },
  computed: {
    Grades() {
      return this.$store.state.grade.Grades;
    },
    Grades_CCNoturno() {
      return _.orderBy(
        this.Grades.filter(function(grade) {
          return grade.Curso == 1;
        }),
        "nome"
      );
    },
    Grades_CCDiurno() {
      return _.orderBy(
        this.Grades.filter(function(grade) {
          return grade.Curso == 4;
        }),
        "nome"
      );
    },
    Grades_SI() {
      return this.Grades.filter(function(grade) {
        return grade.Curso == 3;
      });
    },
    Grade_EC() {
      return _.orderBy(
        this.Grades.filter(function(grade) {
          return grade.Curso == 2;
        }),
        "nome"
      );
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
};
</script>

<style scoped>
.main-table {
  overflow: auto !important;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
}
.card-input-maior {
  width: 210px;
}
.card-input-menor {
  width: 70px;
}
@media screen and (max-width: 606px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
