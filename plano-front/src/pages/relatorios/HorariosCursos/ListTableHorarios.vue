<template>
  <div class="w-100 pl-1">
    <h3 class="curso-nome">
      {{ curso.nome }}
    </h3>

    <div class="container-horarios">
      <div
        v-for="periodo in PeriodosDaGradeDoCurso"
        :key="periodo.indice + periodo.nome + curso.periodoInicial"
        class="div-table"
      >
        <h4 class="periodo-title">{{ periodo.nome }}</h4>

        <TableHorarios
          :Turmas="curso.horarios[periodo.indice]"
          :listaDeHorarios="listaDeHorariosFiltredByTurno"
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
    curso: { type: Object, required: true },
  },

  computed: {
    ...mapGetters([
      "ListaDeHorariosNoturno",
      "ListaDeHorariosDiurno",
      "AllGrades",
    ]),

    listaDeHorariosFiltredByTurno() {
      if (this.curso.turno === "Diurno") return this.ListaDeHorariosDiurno;
      else return this.ListaDeHorariosNoturno;
    },
    GradesDoCurso() {
      return this.$_.filter(
        this.AllGrades,
        (grade) => grade.Curso === this.curso.id
      );
    },
    DisciplinasNaGradeDoCurso() {
      return this.$store.state.disciplinaGrade.DisciplinaGrades;
    },
    PeriodoFinalDoCurso() {
      let periodoFinal = this.curso.periodoInicial;

      this.$_.forEach(this.GradesDoCurso, (grade) => {
        this.$_.forEach(this.DisciplinasNaGradeDoCurso, (disciplinaGrade) => {
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
.curso-nome {
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
  margin-bottom: 20px;
}
</style>
