<template>
  <div class="w-100 pl-1">
    <h3 class="title">
      {{ title }}
    </h3>

    <div class="container-horarios">
      <template v-if="template === 'curso'">
        <div
          v-for="periodo in PeriodosDaGradeDoCurso"
          :key="periodo.indice + periodo.nome + curso.periodoInicial"
          class="div-table"
        >
          <h4 class="periodo-title">{{ periodo.nome }}</h4>

          <TableHorarios
            :Turmas="horariosTurmas[periodo.indice]"
            :listaDeHorarios="listaDeHorariosFiltredByTurno"
          />
        </div>
      </template>

      <div v-else class="div-table">
        <TableHorarios
          :Turmas="horariosTurmas"
          :listaDeHorarios="ListaDeTodosHorarios"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TableHorarios from "./TableHorarios.vue";

export default {
  name: "HorariosDoCurso",
  components: {
    TableHorarios,
  },
  props: {
    template: { type: String, default: "curso" },
    title: { type: String, required: true },
    curso: { type: Object, default: () => {} },
    horariosTurmas: { type: Array, required: true },
  },

  computed: {
    ...mapGetters([
      "ListaDeTodosHorarios",
      "ListaDeHorariosNoturno",
      "ListaDeHorariosDiurno",
      "DisciplinasDasGrades",
      "AllGrades",
    ]),

    listaDeHorariosFiltredByTurno() {
      if (this.template !== "curso") return;

      if (this.curso.turno === "Diurno") return this.ListaDeHorariosDiurno;
      else return this.ListaDeHorariosNoturno;
    },
    GradesDoCurso() {
      if (this.template !== "curso") return;

      return this.$_.filter(
        this.AllGrades,
        (grade) => grade.Curso === this.curso.id
      );
    },
    PeriodoFinalDoCurso() {
      if (this.template !== "curso") return;

      let periodoFinal = this.curso.periodoInicial;
      this.$_.forEach(this.GradesDoCurso, (grade) => {
        this.$_.forEach(this.DisciplinasDasGrades, (disciplinaGrade) => {
          if (
            disciplinaGrade.Grade === grade.id &&
            disciplinaGrade.periodo > periodoFinal
          ) {
            periodoFinal = disciplinaGrade.periodo;
          }
        });
      });

      return periodoFinal;
    },
    PeriodosDaGradeDoCurso() {
      if (this.template !== "curso") return;

      const periodosResult = [];
      for (
        let i = this.curso.periodoInicial;
        i <= this.PeriodoFinalDoCurso;
        i += 2
      ) {
        periodosResult.push({
          indice: i - 1,
          nome: `${i}º Período`,
        });
      }
      return periodosResult;
    },
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  text-align: start;
  font-size: 12px;
  font-weight: bold;
}
.container-horarios {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 306px);
  justify-content: space-between;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  margin-bottom: 25px;
}
.container-horarios .periodo-title {
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 5px;
}
</style>
