<template>
  <div class="page-content">
    <div class="flex flex-column flex-grow-1">
      <NavTab
        :currentTab="currentTab"
        :allTabs="['DCC', 'Outros']"
        @change-tab="$emit('change-tab', $event)"
      />

      <div class="div-table">
        <BaseTable styles="height:max-content">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              align="start"
              orderToCheck="nome"
              width="220"
              title="Nome do Cursos"
            >
              Cursos
            </v-th-ordination>
            <v-th width="100" title="Nome da Grade">Grades</v-th>
          </template>

          <template #tbody>
            <template v-for="curso in CursosComGradesOrdered">
              <tr :key="curso.id" class="bg-custom">
                <v-td width="220" align="start" :title="curso.nome">{{ curso.nome }}</v-td>
                <v-td width="100" />
              </tr>
              <tr
                v-for="grade in curso.grades"
                :key="grade.id + grade.nome + curso.id"
                :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
                @click="showGrade(grade)"
              >
                <v-td width="220" />
                <v-td width="100">{{ grade.nome }}</v-td>
              </tr>
            </template>
            <tr v-if="!CursosComGradesOrdered.length">
              <v-td width="320" colspan="2">Nenhuma grade encontrada</v-td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </div>

    <Card
      title="Curso"
      width="420"
      :toggleFooter="isEditing"
      @btn-salvar="handleEditGrade"
      @btn-delete="$refs.modalDelete.open()"
      @btn-add="handleCreateGrade"
      @btn-clean="cleanGrade"
    >
      <template #body>
        <div class="row">
          <div class="col-8">
            <VInput label="Nome" v-model="gradeForm.nome" :validation="$v.gradeForm.nome" />
          </div>
          <div class="col">
            <VInput
              label="Período de Início"
              v-model="gradeForm.periodoInicio"
              :validation="$v.gradeForm.periodoInicio"
              placeholder="Ex: 2018.3"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-8">
            <VSelect
              label="Curso"
              v-model.number="gradeForm.Curso"
              :validation="$v.gradeForm.Curso"
              :title="getCursoNome(gradeForm.Curso)"
            >
              <VOption
                v-for="curso in CursosOptions"
                :key="curso.id + curso.nome"
                :value="curso.id"
                :text="curso.nome"
              />
            </VSelect>
          </div>
          <div class="col">
            <VSelect
              label="Código"
              v-model.number="gradeForm.Curso"
              :validation="$v.gradeForm.Curso"
            >
              <VOption
                v-for="curso in CursosOptions"
                :key="curso.id + curso.codigo"
                :value="curso.id"
                :text="curso.codigo"
              />
            </VSelect>
          </div>
        </div>
      </template>
    </Card>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteGrade">
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a grade
          <b>{{ gradeForm.periodoInicio }} - {{ gradeForm.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma grade selecionada.</li>
    </ModalDelete>
  </div>
</template>

<script>
import { clone, orderBy } from "lodash-es";
import { required, maxLength, minLength, decimal } from "vuelidate/lib/validators";
import { makeEmptyGrade } from "@utils/factories";
import { ModalDelete } from "@/components/modals";
import { Card, VInput, VSelect, VOption, NavTab } from "@/components/ui";

export default {
  name: "GradesCursosContent",
  components: { Card, ModalDelete, NavTab, VInput, VSelect, VOption },
  props: {
    currentTab: { type: String, required: true },
    arraysData: {
      type: Object,
      required: true,
      validator: (value) => {
        return "Grades" in value && "Cursos" in value;
      },
    },
    gradeService: {
      type: Object,
      required: true,
      validator: (value) => {
        return "create" in value && "update" in value && "delete" in value;
      },
    },
  },
  data() {
    return {
      gradeForm: makeEmptyGrade(),
      gradeSelected: null,
      ordenacaoCursos: { order: "nome", type: "asc" },
    };
  },
  validations: {
    gradeForm: {
      nome: { required, maxLength: maxLength(9) },
      periodoInicio: { required, decimal, maxLength: maxLength(6), minLength: minLength(6) },
      Curso: { required },
    },
  },

  methods: {
    cleanGrade() {
      this.gradeForm = makeEmptyGrade();
      this.gradeSelected = null;
      this.$nextTick(() => this.$v.$reset());
    },
    showGrade(grade) {
      this.cleanGrade();
      this.gradeSelected = grade.id;
      this.gradeForm = clone(grade);
    },
    getCursoNome(cursoId) {
      if (!cursoId) return "";

      const cursoFound = this.arraysData.Cursos.find((curso) => curso.id === cursoId);
      return cursoFound ? cursoFound.nome : "";
    },
    async handleCreateGrade() {
      this.$v.gradeForm.$touch();
      if (this.$v.gradeForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.gradeService.create(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleEditGrade() {
      this.$v.gradeForm.$touch();
      if (this.$v.gradeForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        await this.gradeService.update(this.gradeForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.gradeService.delete(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir grade!",
          text: error.response
            ? "Grade não pode possuir disciplinas cadastradas para ser excluída"
            : "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    CursosComGradesOrdered() {
      const { order, type } = this.ordenacaoCursos;
      return orderBy(this.CursosComGrades, order, type);
    },
    CursosComGrades() {
      const cursosResult = [];
      this.arraysData.Cursos.forEach((curso) => {
        const gradesFound = this.arraysData.Grades.filter((grade) => grade.Curso === curso.id);
        if (gradesFound.length) {
          cursosResult.push({
            ...curso,
            grades: orderBy(gradesFound, ["nome", "periodoInicio"], ["asc", "desc"]),
          });
        }
      });

      return cursosResult;
    },
    CursosOptions() {
      return orderBy(this.arraysData.Cursos, ["nome"]);
    },
    isEditing() {
      return this.gradeSelected != null;
    },
  },
};
</script>
