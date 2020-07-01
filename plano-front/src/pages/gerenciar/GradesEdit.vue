<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Disciplina na Grade'">
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

    <div class="row w-100 m-0 p-0">
      <div class="p-0 div-table">
        <BaseTable>
          <template #thead>
            <th
              style="width:35px"
              class="clickable"
              @click="toggleOrder(ordenacaoDisciplinasMain, 'periodo')"
            >
              P.
              <i
                :class="setIconByOrder(ordenacaoDisciplinasMain, 'periodo')"
              ></i>
            </th>
            <th
              style="width:75px"
              class="clickable"
              @click="
                toggleOrder(ordenacaoDisciplinasMain, 'disciplina_codigo')
              "
            >
              Código
              <i
                :class="
                  setIconByOrder(ordenacaoDisciplinasMain, 'disciplina_codigo')
                "
              ></i>
            </th>
            <th
              style="width:400px"
              class="clickable t-start"
              @click="toggleOrder(ordenacaoDisciplinasMain, 'disciplina_nome')"
            >
              Disciplina
              <i
                :class="
                  setIconByOrder(ordenacaoDisciplinasMain, 'disciplina_nome')
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <template v-for="disciplinaGrade in DisciplinaGradesOrdered">
              <tr
                @click.prevent="handleClickInDisciplina(disciplinaGrade)"
                :key="disciplinaGrade.Disciplina"
                :class="[
                  'clickable',
                  { 'bg-custom': isEven(disciplinaGrade.periodo) },
                  {
                    'bg-selected':
                      disciplinaSelectedId === disciplinaGrade.Disciplina,
                  },
                ]"
              >
                <td style="width:35px">
                  {{ disciplinaGrade.periodo }}
                </td>
                <td style="width:75px">
                  {{ disciplinaGrade.disciplina_codigo }}
                </td>
                <td style="width:400px" class="t-start">
                  {{ disciplinaGrade.disciplina_nome }}
                </td>
              </tr>
            </template>
            <tr v-show="!hasGradeSelected">
              <td style="width:510px">
                <b>Nenhuma disciplina encontrada</b>, selecione uma grade.
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <div class="div-card p-0 mt-0 mb-4 ml-auto col-auto">
        <Card :title="'Disciplinas'">
          <template #form-group>
            <div class="row mb-2 mx-0">
              <div
                class="form-group col m-0 px-0"
                style="margin-right: 18px!important"
              >
                <label for="cursoAtual" class="col-form-label">Curso</label>
                <select
                  id="cursoAtual"
                  v-model="currentCursoId"
                  v-on:change="changeCurso()"
                  class="form-control form-control-sm input-maior"
                >
                  <option value="4">Ciência da Computação Diurno</option>
                  <option value="1">Ciência da Computação Noturno</option>
                  <option value="3">Sistemas de Informação</option>
                  <option value="2">Engenharia Computacional</option>
                </select>
              </div>

              <div class="form-group m-0 px-0">
                <label for="gradeSelect" class="col-form-label">Grade</label>
                <template v-if="hasCursoSelected">
                  <select
                    id="gradeSelect"
                    v-model="currentGradeId"
                    v-on:change="changeGrade()"
                    class="form-control form-control-sm input-menor"
                  >
                    <template v-for="grade in GradesFiltredByCurrentCurso">
                      <option :key="'grade-id' + grade.id" :value="grade.id">{{
                        grade.nome
                      }}</option>
                    </template>
                  </select>
                </template>
                <template v-else>
                  <select
                    id="gradeSelect"
                    disabled
                    class="form-control form-control-sm input-menor"
                  ></select>
                </template>
              </div>
            </div>

            <div class="w-100 border mt-3 mb-2"></div>

            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="disciplina" class="col-form-label"
                  >Disciplina</label
                >
                <select
                  :disabled="!hasGradeSelected"
                  type="text"
                  class="form-control form-control-sm input-maior2"
                  id="disciplina"
                  v-model="disciplinaGradeForm.Disciplina"
                  v-on:change="clearClick()"
                >
                  <option v-if="Disciplinas.length === 0" type="text" value
                    >Nenhuma Disciplina Encontrada</option
                  >
                  <option
                    v-else
                    v-for="disciplina in Disciplinas"
                    :key="'2-grade-id' + disciplina.id"
                    :value="disciplina.id"
                    >{{ disciplina.nome }}</option
                  >
                </select>
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group m-0 col px-0">
                <label for="periodoDisciplina" class="col-form-label"
                  >Período</label
                >
                <div class="d-flex">
                  <input
                    :disabled="!hasGradeSelected"
                    type="text"
                    class="form-control form-control-sm input-menor2"
                    aria-describedby="button-edit-periodo"
                    id="periodoDisciplina"
                    @keypress="onlyNumber"
                    v-model="disciplinaGradeForm.periodo"
                  />

                  <button
                    v-if="!hasGradeSelected"
                    type="button"
                    class="btn-custom btn-icon btn-disable"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    v-else
                    type="button"
                    title="Salvar"
                    class="btn-custom btn-icon addbtn"
                    v-on:click.prevent="editDisciplinaGrade"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <template v-if="!hasGradeSelected">
              <button type="button" class="btn-custom btn-icon btn-disable">
                <i class="fas fa-plus"></i>
              </button>

              <button type="button" class="btn-custom btn-icon btn-disable">
                <i class="far fa-trash-alt"></i>
              </button>

              <button type="button" class="btn-custom btn-icon btn-disable">
                <i class="fas fa-times"></i>
              </button>
            </template>

            <template v-else>
              <button
                v-show="isNotEditDisciplina"
                type="button"
                title="Adicionar à Grade"
                class="btn-custom btn-icon addbtn"
                v-on:click.prevent="addDisciplinaGrade"
              >
                <i class="fas fa-plus"></i>
              </button>

              <button
                type="button"
                v-show="!isNotEditDisciplina"
                title="Deletar Disciplina"
                class="btn-custom btn-icon delbtn"
                v-on:click.prevent="deleteDisciplinaGrade(), clearClick()"
              >
                <i class="far fa-trash-alt"></i>
              </button>

              <button
                type="button"
                title="Cancelar"
                class="btn-custom btn-icon cancelbtn"
                v-on:click.prevent="cleanDisciplina()"
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
            <b>Para exibir conteúdo na tabela:</b> Comece selecionando o curso
            desejado. Em seguida, selecione a grade que quer visualizar.
          </li>
          <li class="list-group-item">
            <b>Para adicionar disciplinas à Grade:</b> Com o cartão a direita em
            branco, preencha-o. Em seguida, clique em Adicionar
            <i class="fas fa-plus addbtn px-1" style="font-size:12px"></i>.
          </li>
          <li class="list-group-item">
            <b>Para editar ou deletar uma disciplina:</b> Na tabela, clique na
            disciplina que deseja modificar. Logo após, no cartão à direita,
            altere as informações que desejar e clique em Salvar
            <i class="fas fa-check addbtn px-1" style="font-size:12px"></i>
            ou, para excluí-la, clique em Deletar
            <i class="far fa-trash-alt delbtn px-1" style="font-size: 12px"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deixar o cartão em branco:</b> No cartão, à direita, clique
            em Cancelar
            <i class="fas fa-times cancelbtn px-1" style="font-size: 12px"></i>
            .
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import gradeService from "@/common/services/grade";
import disciplinaGradeService from "@/common/services/disciplinaGrade";
import { toggleOrdination, redirectNotAdmin } from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseButton,
  BaseModal,
  Card,
} from "@/components/index.js";

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
  name: "DashboardGradeEdit",
  mixins: [toggleOrdination, redirectNotAdmin],
  components: {
    PageTitle,
    BaseTable,
    Card,
    BaseButton,
    BaseModal,
  },
  data() {
    return {
      gradeForm: _.clone(emptyGrade),
      disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
      error: undefined,
      currentGradeId: undefined,
      currentCursoId: undefined,
      disciplinaSelectedId: "",
      nomeDisciplinaAtual: undefined,
      ordenacaoDisciplinasMain: { order: "periodo", type: "asc" },
    };
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    handleClickInDisciplina(disciplinaGrade) {
      this.disciplinaSelectedId = disciplinaGrade.Disciplina;
      this.nomeDisciplinaAtual = disciplinaGrade.disciplina_nome;

      this.showDisciplina(disciplinaGrade);
      this.showGrade(this.currentGradeId);
    },

    clearClick() {
      this.disciplinaSelectedId = "";
      this.nomeDisciplinaAtual = "";
    },
    addGrade() {
      gradeService
        .create(this.gradeForm)
        .then((response) => {
          this.cleanGradeForm();
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
          this.cleanGradeForm();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Grade ${grade_nome} foi excluída!`,
            type: "warn",
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Grade</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
          });
        });
    },
    cleanGradeForm() {
      this.gradeForm = _.clone(emptyGrade);
      this.error = undefined;
    },
    cleanDisciplina() {
      this.clearClick();
      this.disciplinaGradeForm.periodo = undefined;
      this.disciplinaGradeForm.Disciplina = undefined;
    },
    showGrade(gradeId) {
      this.cleanGradeForm();
      const grade = _.find(this.$store.state.grade.Grades, ["id", gradeId]);
      this.gradeForm = _.clone(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    changeCurso() {
      ///Curso foi selecionado mas grade ainda não foi selecionada
      this.cleanDisciplina();
      this.cleanGradeForm();
      this.currentGradeId = undefined;
    },
    changeGrade() {
      this.cleanDisciplina();
      if (this.currentGradeId != undefined) this.showGrade(this.currentGradeId);
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
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${nome_disciplina}</b> foi adicionada à Grade <b>${
              this.gradeForm.nome
            }</b>!`,
            type: "success",
          });
          // this.disciplinaGradeForm.Disciplina = undefined; //Limpa campo de disciplina apos adicionar
        })
        .catch((error) => {
          this.error = "<b>Erro ao incluir Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
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
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${
              this.nomeDisciplinaAtual
            }</b> foi atualizada!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Disciplina</b>";
          this.$notify({
            group: "general",
            title: `Erro!`,
            text: this.error,
            type: "error",
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
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Disciplina <b>${
              this.nomeDisciplinaAtual
            }</b> foi excluída!`,
            type: "warn",
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
      //this.cleanDisciplina();
    },
    showDisciplina(disciplinaGrade) {
      this.cleanDisciplina;
      this.disciplinaGradeForm = _.clone(disciplinaGrade);
    },
    isEven(number) {
      return number % 2 === 0;
    },
  },
  computed: {
    hasCursoSelected() {
      return this.currentCursoId != undefined;
    },
    hasGradeSelected() {
      return this.currentGradeId != undefined;
    },
    isNotEditDisciplina() {
      return this.disciplinaSelectedId !== this.disciplinaGradeForm.Disciplina;
    },
    DisciplinaGradesOrdered() {
      return _.orderBy(
        this.DisciplinaGradesFiltred,
        this.ordenacaoDisciplinasMain.order,
        this.ordenacaoDisciplinasMain.type
      );
    },
    DisciplinaGradesFiltred() {
      return _.filter(
        this.$store.state.disciplinaGrade.DisciplinaGrades,
        (disciplinaGrade) => {
          return _.find(this.Disciplinas, (disciplina) => {
            if (
              this.currentGradeId === disciplinaGrade.Grade &&
              disciplina.id === disciplinaGrade.Disciplina
            ) {
              disciplinaGrade.disciplina_nome = disciplina.nome;
              disciplinaGrade.disciplina_codigo = disciplina.codigo;
              return true;
            }
            return false;
          });
        }
      );
    },
    GradesFiltredByCurrentCurso() {
      return _.filter(
        this.Grades,
        (grade) => grade.Curso == this.currentCursoId
      );
    },
    Grades() {
      return this.$store.state.grade.Grades;
    },
    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
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
.card .input-maior {
  width: 100%;
  text-align: start !important;
}
.card .input-maior2 {
  max-width: 300px;
  min-width: 300px;
  text-align: start;
}
.card .input-menor {
  width: 80px;
  text-align: start !important;
}
.card .input-menor2 {
  max-width: 40px;
  min-width: 40px;
  margin-right: 10px;
  text-align: center;
}
.even {
  background-color: #c8c8c8;
}
.notEven {
  background-color: white;
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
@media screen and (max-width: 893px) {
  .div-card {
    margin-left: 0px !important;
  }
}
</style>
