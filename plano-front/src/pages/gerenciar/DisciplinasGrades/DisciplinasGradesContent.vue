<template>
  <div class="page-content">
    <div class="flex flex-column flex-grow-1">
      <NavTab
        :currentTab="currentTab"
        :allTabs="['DCC', 'Outros']"
        @change-tab="$emit('change-tab', $event)"
      />

      <div class="div-table">
        <BaseTable styles="height:calc(100vh - 130px)">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoDisciplinasMain"
              orderToCheck="periodo"
              width="70"
              title="Período letivo"
            >
              Período
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDisciplinasMain"
              orderToCheck="disciplina.codigo"
              width="80"
              align="start"
              title="Código da Disciplina"
            >
              Código
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoDisciplinasMain"
              orderToCheck="disciplina.nome"
              width="400"
              align="start"
              title="Nome da Disciplina"
            >
              Disciplina
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="disciplinaGrade in DisciplinaGradesOrdered"
              @click="handleClickInDisciplina(disciplinaGrade)"
              :key="disciplinaGrade.Disciplina"
              :class="[
                'clickable',
                { 'bg-custom': isEven(disciplinaGrade.periodo) },
                { 'bg-selected': disciplinaSelectedId === disciplinaGrade.Disciplina },
              ]"
            >
              <v-td width="70">{{ disciplinaGrade.periodo }}</v-td>
              <v-td width="80" align="start">{{ disciplinaGrade.disciplina.codigo }}</v-td>
              <v-td width="400" align="start">{{ disciplinaGrade.disciplina.nome }}</v-td>
            </tr>

            <tr v-if="!hasGradeSelected">
              <v-td width="545" colspan="3">
                <b>Nenhuma disciplina encontrada</b>
                , selecione uma grade.
              </v-td>
            </tr>
            <tr v-else-if="!DisciplinaGradesOrdered.length">
              <v-td width="545" colspan="3">
                <b>Nenhuma disciplina encontrada</b>
                na grade selecionada.
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </div>

    <Card title="Disciplinas" width="420">
      <template #body>
        <div class="row">
          <div class="col-8">
            <VSelect label="Curso" v-model="currentCursoId" @change="handleSelectCursos">
              <VOption v-if="!CursosOptions.length" text="Nenhum cursos encontrado" />
              <VOption
                v-for="curso in CursosOptions"
                :key="curso.nome + curso.id"
                :value="curso.id"
                :text="curso.nome"
              />
            </VSelect>
          </div>

          <div class="col">
            <VSelect
              label="Grade"
              v-model="currentGradeId"
              @change="handleSelectGrade"
              :disabled="!hasCursoSelected"
            >
              <VOption v-if="!GradesOptionsFiltred.length" text="Nenhuma grade encontrada" />
              <VOption
                v-for="grade in GradesOptionsFiltred"
                :key="grade.id + grade.nome"
                :value="grade.id"
                :text="grade.nome"
              />
            </VSelect>
          </div>
        </div>

        <div class="w-100 border my-2"></div>

        <VSelect
          label="Disciplina"
          v-model="disciplinaGradeForm.Disciplina"
          :validation="$v.disciplinaGradeForm.Disciplina"
          @change="handleSelectDisciplina"
          :disabled="!hasGradeSelected"
        >
          <VOption v-if="!DisciplinasOptions.length" text="Nenhuma disciplina encontrada" />
          <VOption
            v-for="disciplina in DisciplinasOptions"
            :key="disciplina.id + disciplina.nome"
            :value="disciplina.id"
            :text="disciplina.nome"
          />
        </VSelect>

        <div class="row">
          <div class="col-7">
            <VSelect
              label="Código"
              v-model="disciplinaGradeForm.Disciplina"
              :validation="$v.disciplinaGradeForm.Disciplina"
              @change="handleSelectDisciplina"
              :disabled="!hasGradeSelected"
            >
              <VOption v-if="!DisciplinasOptions.length" text="Nenhuma disciplina encontrada" />
              <VOption
                v-for="disciplina in DisciplinasOptions"
                :key="disciplina.id + disciplina.nome"
                :value="disciplina.id"
                :text="disciplina.codigo"
              />
            </VSelect>
          </div>

          <div class="col-3">
            <VInput
              inputType="number"
              label="Período"
              v-model.number="disciplinaGradeForm.periodo"
              :validation="$v.disciplinaGradeForm.periodo"
              :min="1"
              :disabled="!hasGradeSelected"
            />
          </div>

          <div class="col">
            <BaseButton
              :disabled="!hasGradeSelected || !isEditDisciplina"
              template="salvar"
              title="Atualizar período da disciplina"
              class="btn-append"
              style="margin-top: 23px"
              @click="handleUpdateDisciplinaGrade"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <BaseButton
          template="adicionar"
          title="Adicionar à Grade"
          @click="handleCreateDisciplinaGrade"
          :disabled="!hasGradeSelected || isEditDisciplina"
        />

        <BaseButton
          template="deletar"
          title="Deletar Disciplina"
          @click="$refs.modalDelete.open()"
          :disabled="!hasGradeSelected || !isEditDisciplina"
        />

        <BaseButton template="cancelar" @click="clearDisciplina" :disabled="!hasGradeSelected" />
      </template>
    </Card>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditDisciplina"
      @btn-deletar="handleDeleteDisciplinaGrade"
    >
      <li v-if="isEditDisciplina" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a disciplina
          <b>{{ disciplinaGradeForm.disciplina.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma disciplina selecionada.</li>
    </ModalDelete>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep, orderBy } from "lodash-es";
import { required, integer, maxValue, minValue } from "vuelidate/lib/validators";
import { makeEmptyGrade, makeEmptyDisciplinaGrade } from "@utils/factories";
import { ModalDelete } from "@/components/modals";
import { Card, NavTab, VInput, VSelect, VOption } from "@/components/ui";

export default {
  name: "DisciplinasGradesContent",
  components: { Card, ModalDelete, NavTab, VInput, VSelect, VOption },
  props: {
    currentTab: { type: String, required: true },
    arraysData: {
      type: Object,
      required: true,
      validator: (value) => {
        return "DisciplinasGrades" in value && "Grades" in value && "Cursos" in value;
      },
    },
    disciplinaGradeServices: {
      type: Object,
      required: true,
      validator: (value) => {
        return "create" in value && "update" in value && "delete" in value;
      },
    },
  },
  data() {
    return {
      disciplinaGradeForm: makeEmptyDisciplinaGrade(),
      gradeForm: makeEmptyGrade(),
      currentGradeId: null,
      currentCursoId: null,
      disciplinaSelectedId: null,
      ordenacaoDisciplinasMain: { order: "periodo", type: "asc" },
    };
  },
  validations: {
    disciplinaGradeForm: {
      periodo: { required, integer, maxValue: maxValue(15), minValue: minValue(1) },
      Disciplina: { required },
    },
  },

  methods: {
    handleSelectCursos() {
      ///Curso foi selecionado mas grade ainda não foi selecionada
      this.clearDisciplina();
      this.clearGradeForm();
      this.currentGradeId = null;
    },
    handleSelectGrade() {
      this.clearDisciplina();
      if (this.currentGradeId) this.showGrade(this.currentGradeId);
    },
    handleSelectDisciplina() {
      const disciplinaFound = this.AllDisciplinas.find(
        (disciplina) => disciplina.id === this.disciplinaGradeForm.Disciplina
      );
      if (!disciplinaFound) return;

      this.disciplinaGradeForm.disciplina = { ...disciplinaFound };
      this.disciplinaGradeForm.Grade = this.currentGradeId;

      const disciplinaDaGradeAtual = this.DisciplinaGradesFiltred.find(
        (disciplinaGrade) => disciplinaGrade.Disciplina === disciplinaFound.id
      );
      if (disciplinaDaGradeAtual) {
        this.disciplinaSelectedId = disciplinaFound.id;
        this.disciplinaGradeForm.periodo = disciplinaDaGradeAtual.periodo;
      } else {
        this.clearClick();
      }
    },
    handleClickInDisciplina(disciplinaGrade) {
      this.disciplinaSelectedId = disciplinaGrade.Disciplina;
      this.showGrade(this.currentGradeId);
      this.showDisciplina(disciplinaGrade);
    },
    clearClick() {
      this.disciplinaSelectedId = null;
    },
    clearGradeForm() {
      this.gradeForm = makeEmptyGrade();
    },
    clearDisciplina() {
      this.clearClick();
      this.disciplinaGradeForm = makeEmptyDisciplinaGrade();
      this.$nextTick(() => this.$v.$reset());
    },
    showGrade(gradeId) {
      const grade = this.arraysData.Grades.find((grade) => grade.id === gradeId);
      this.gradeForm = cloneDeep(grade);
    },
    showDisciplina(disciplinaGrade) {
      this.disciplinaGradeForm = cloneDeep(disciplinaGrade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    isEven(number) {
      return number % 2 === 0;
    },
    async handleCreateDisciplinaGrade() {
      this.$v.disciplinaGradeForm.$touch();
      if (this.$v.disciplinaGradeForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const disciplinaGrade = { ...this.disciplinaGradeForm };
        const response = await this.disciplinaGradeServices.create(disciplinaGrade);
        this.disciplinaSelectedId = response.DisciplinaGrade.Disciplina;
        this.$notify({
          group: "general",
          title: "Sucesso!",
          text: `A disciplina <b>${disciplinaGrade.disciplina.nome}</b> foi adicionada à grade 
          <b>${this.gradeForm.nome}</b>`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Erro ao incluir disciplina, verifique se a disciplina já não existe na grade",
          type: "error",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleUpdateDisciplinaGrade() {
      this.$v.disciplinaGradeForm.$touch();
      if (this.$v.disciplinaGradeForm.$anyError) return;

      try {
        this.setLoading({ type: "partial", value: true });
        const disciplinaGrade = { ...this.disciplinaGradeForm };
        await this.disciplinaGradeServices.update(
          disciplinaGrade.Disciplina,
          disciplinaGrade.Grade,
          disciplinaGrade
        );
        this.$notify({
          group: "general",
          title: "Sucesso!",
          text: `A disciplina <b>${this.disciplinaGradeForm.disciplina.nome}</b> foi atualizada!`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Erro ao atualizar disciplina",
          type: "error",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteDisciplinaGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        const disciplinaGrade = { ...this.disciplinaGradeForm };
        await this.disciplinaGradeServices.delete(
          disciplinaGrade.Disciplina,
          disciplinaGrade.Grade,
          disciplinaGrade
        );
        this.$notify({
          group: "general",
          title: "Sucesso!",
          text: `A disciplina <b>${disciplinaGrade.disciplina.nome}</b> foi excluída da grade
           <b>${this.gradeForm.nome}</b>`,
          type: "success",
        });
        this.clearClick();
      } catch (error) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Erro ao excluir disciplina",
          type: "error",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    ...mapGetters(["AllDisciplinas"]),

    hasCursoSelected() {
      return this.currentCursoId != null;
    },
    hasGradeSelected() {
      return this.currentGradeId != null;
    },
    isEditDisciplina() {
      return this.disciplinaSelectedId !== null;
    },
    DisciplinaGradesOrdered() {
      const { order, type } = this.ordenacaoDisciplinasMain;
      return orderBy(this.DisciplinaGradesFiltred, order, type);
    },
    DisciplinaGradesFiltred() {
      return this.arraysData.DisciplinasGrades.filter(
        (disciplinaGrade) => this.currentGradeId === disciplinaGrade.Grade
      );
    },
    GradesOptionsFiltred() {
      return this.arraysData.Grades.filter((grade) => grade.Curso == this.currentCursoId);
    },
    DisciplinasOptions() {
      return orderBy(this.AllDisciplinas, "nome");
    },
    CursosOptions() {
      return orderBy(this.arraysData.Cursos, "nome");
    },
  },
};
</script>
