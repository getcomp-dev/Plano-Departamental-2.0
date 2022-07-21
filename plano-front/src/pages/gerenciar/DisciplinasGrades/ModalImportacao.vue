<template>
  <BaseModal
    ref="BaseModalDisciplinaGrade"
    title="Importação de Disciplinas na Grade"
    :hasOverlay="true"
    :hasFooter="true"
  >
    <template #modal-body>
      <div class="row">
        <VSelect label="Curso" v-model="cursoSelecionado" class="col-7" @change="handleSelectCurso">
          <VOption
            v-for="curso in cursosDCCOrdered"
            :key="curso.codigo"
            :value="curso"
            :text="curso.nome"
          />
        </VSelect>
        <VSelect
          label="Grade"
          v-model="gradeSelecionada"
          class="col-5"
          :disabled="!hasCursoSelected"
        >
          <VOption v-if="!hasCursoSelected" text="Nenhuma grade encontrada" />
          <VOption
            v-else
            v-for="grade in gradesCursoSelecionado"
            :key="grade.id"
            :value="grade"
            :text="grade.nome"
          />
        </VSelect>
      </div>
      <p class="alert alert-secondary my-2">
        Selecione o curso e a sua grade acima e o arquivo a ser importado. O arquivo deve
        <br />
        ser importado de acordo com a grade selecionada.
      </p>
      <div class="col">
        <VInputFile label="Selecione o arquivo" v-model="fileImportacao" accept=".csv" />
      </div>
    </template>
    <template #modal-footer>
      <BaseButton text="OK" color="green" class="px-3 ml-auto" @click="handleImport" />
    </template>
  </BaseModal>
</template>

<script>
import { VInputFile, VSelect, VOption } from "@/components/ui";
import { parseCSVFileToArray, validateDisciplinasGrades } from "@/common/utils";
import { mapActions, mapGetters } from "vuex";
import disciplinaGradeService from "@/services/disciplinaGrade";
import { orderBy } from "lodash-es";

export default {
  components: { VInputFile, VSelect, VOption },
  data() {
    return {
      fileImportacao: null,

      cursoSelecionado: null,
      gradesCursoSelecionado: null,
      gradeSelecionada: null,
    };
  },

  methods: {
    ...mapActions([
      "initializeProgressBar",
      "updateProgressBar",
      "finishProgressBar",
      "createDisciplinasGrade",
    ]),
    async handleImport() {
      try {
        const disciplinasGrades = await parseCSVFileToArray(this.fileImportacao);
        validateDisciplinasGrades(disciplinasGrades);

        this.initializeProgressBar({
          finalValue: disciplinasGrades.length,
        });

        const disciplinasGradeSelecionada = [];

        this.DisciplinasGrades.forEach((disc) => {
          if (disc.Grade === this.gradeSelecionada.id) disciplinasGradeSelecionada.push(disc);
        });

        for (const discGrade of disciplinasGrades) {
          this.handleCreateDisciplinasNaGrade(discGrade, disciplinasGradeSelecionada);
        }

        this.pushNotification({
          type: "success",
          text: "Disciplinas criadas na Grade",
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao importar disciplinas nas grades!",
          text: error.message,
        });
      } finally {
        this.close(); // O modal fecha de qualquer jeito por causa do esc
        await this.finishProgressBar();
      }
    },
    async handleCreateDisciplinasNaGrade(disciplinaGrade, discsGradeSelecionada) {
      if (!disciplinaGrade || !discsGradeSelecionada.length) return;

      let objDiscGrade = {
        periodo: null,
        Disciplina: null,
        disciplina: null,
        Grade: null,
        obrigatoria: false,
      };

      objDiscGrade.Grade = this.gradeSelecionada.id;
      if (disciplinaGrade.PERIODO == "-") objDiscGrade.periodo = 15;
      else objDiscGrade.periodo = +disciplinaGrade.PERIODO;

      objDiscGrade.Disciplina = this.getIdDisciplina(disciplinaGrade.CODIGO);
      objDiscGrade.disciplina = this.disciplinaFound(objDiscGrade.Disciplina);
      objDiscGrade.obrigatoria = +disciplinaGrade.OBRIGATORIA;

      if (typeof objDiscGrade.Disciplina === "number")
        await this.createDisciplinasGrade(objDiscGrade, discsGradeSelecionada);
    },
    async createDisciplinasGrade(disciplinaGrade, disciplinasGradeSelecionada) {
      const temDisciplina = this.checkDiscGradeExiste(disciplinaGrade, disciplinasGradeSelecionada);

      if (temDisciplina)
        await disciplinaGradeService.update(
          disciplinaGrade.Disciplina,
          disciplinaGrade.Grade,
          disciplinaGrade
        );
      else await disciplinaGradeService.create(disciplinaGrade);

      this.updateProgressBar();
    },
    checkDiscGradeExiste(disciplinaGrade, disciplinasGradeSelecionada) {
      for (const disc of disciplinasGradeSelecionada) {
        if (disciplinaGrade.Disciplina === disc.Disciplina) return true;
      }
      return false;
    },
    open() {
      this.$refs.BaseModalDisciplinaGrade.open();
    },
    close() {
      this.$refs.BaseModalDisciplinaGrade.close();
    },
    handleSelectCurso() {
      this.gradesCursoSelecionado = this.AllGrades.filter((grade) => {
        return grade.Curso == this.cursoSelecionado.id;
      });
    },
    getIdDisciplina(codigoDisc) {
      for (const disc of this.AllDisciplinas) if (disc.codigo == codigoDisc) return disc.id;
    },
    disciplinaFound(idDisciplina) {
      return this.AllDisciplinas.find((disciplina) => disciplina.id === idDisciplina);
    },
  },

  computed: {
    ...mapGetters(["PrincipaisCursosDCC", "AllDisciplinas", "AllGrades", "DisciplinasGrades"]),
    hasCursoSelected() {
      return this.cursoSelecionado;
    },
    cursosDCCOrdered() {
      return orderBy(this.PrincipaisCursosDCC, "name");
    },
  },
};
</script>
