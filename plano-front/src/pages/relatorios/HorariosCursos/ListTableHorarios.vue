<template>
  <div class="w-100 pl-1">
    <h3 class="title">
      {{ title }}
    </h3>

    <div class="container-horarios">
      <template v-if="template === 'curso'">
        <template v-if="obrigatoriasAtivas">
          <div
            v-for="periodo in PeriodosDaGradeDoCurso"
            :key="periodo.indice + periodo.nome + curso.periodoInicial"
            class="div-table"
          >
            <h4 class="periodo-title">{{ periodo.nome }}</h4>

            <TableHorarios
              class="table-horarios"
              :Turmas="horariosObrigatorias[periodo.indice]"
              :listaDeHorarios="listaDeHorariosFiltredByTurno(periodo.nome)"
            />
          </div>
        </template>
      </template>

      <template v-if="eletivasAtivas">
        <div class="div-table-eletivas">
          <h4 class="periodo-title">Eletivas</h4>

          <TableHorarios
            class="table-horarios"
            :Turmas="horariosEletivas[0]"
            :listaDeHorarios="listaDeHorariosFiltredByTurno('Eletivas')"
          />
        </div>
      </template>
    </div>

    <div v-if="template === 'extra'" class="div-table">
      <TableHorarios :Turmas="horariosTurmas" :listaDeHorarios="ListaDeTodosHorarios" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { filter } from "lodash-es";
import TableHorarios from "./TableHorarios.vue";

export default {
  name: "HorariosDoCurso",
  components: {
    TableHorarios,
  },
  data() {
    return {
      listaHorariosCombinada: [],
      ordemHorarios: { order: "id", type: "asc" },
      horariosEletivas: [],
      horariosObrigatorias: [],
    };
  },
  props: {
    template: { type: String, default: "curso" },
    title: { type: String, required: true },
    curso: { type: Object, default: () => {} },
    horariosTurmas: { type: Array, required: true },
    eletivasAtivas: { type: Boolean, required: true },
    obrigatoriasAtivas: { type: Boolean, required: true },
    numPeriodos: { type: Number, required: true },
  },
  beforeMount() {
    this.separaObrigatoriasDeEletivas();
  },
  methods: {
    listaDeHorariosFiltredByTurno(nomePeriodo) {
      if (this.template !== "curso") return;

      if (this.eletivasAtivas && nomePeriodo === "Eletivas") return this.ListaDeTodosHorarios;

      if (this.curso.turno === "Diurno") return this.ListaDeHorariosDiurno;
      else return this.ListaDeHorariosNoturno;
    },
    separaObrigatoriasDeEletivas() {
      this.horariosEletivas.push(this.horariosTurmas[10]);

      for (let i = 0; i < 10; i++) this.horariosObrigatorias.push(this.horariosTurmas[i]);
    },
  },

  computed: {
    ...mapGetters([
      "ListaDeTodosHorarios",
      "ListaDeHorariosNoturno",
      "ListaDeHorariosDiurno",
      "DisciplinasGrades",
      "AllGrades",
    ]),

    // GradesDoCurso() {
    //   if (this.template !== "curso") return;

    //   return filter(this.AllGrades, (grade) => grade.Curso === this.curso.id);
    // },
    // PeriodoFinalDoCurso() {
    //   if (this.template !== "curso") return;

    //   let periodoFinal = this.curso.periodoInicial;
    //   this.GradesDoCurso.forEach((grade) => {
    //     this.DisciplinasGrades.forEach((disciplinaGrade) => {
    //       if (disciplinaGrade.Grade === grade.id && disciplinaGrade.periodo > periodoFinal) {
    //         periodoFinal = disciplinaGrade.periodo;
    //       }
    //     });
    //   });
    //   return periodoFinal;
    // },
    PeriodosDaGradeDoCurso() {
      if (this.template !== "curso") return;

      const periodosResult = [];
      // for (let i = this.curso.periodoInicial; i <= this.PeriodoFinalDoCurso; i += 2) {
      console.log(this.curso + " tem " + this.numPeriodos + " periodos");
      for (let i = this.curso.periodoInicial; i <= this.numPeriodos; i += 2) {
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
  margin-left: 5%;
}

.container-horarios {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .container-horarios {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 306px);
  justify-content: space-between;
  grid-column-gap: 5px;
  grid-row-gap: 10px;
  margin-bottom: 10px;
} */

.div-table-eletivas {
  margin-bottom: 25px;
}

.periodo-title {
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 5px;
}

.table-horarios {
  margin-bottom: 20px;
}
</style>
