<template>
  <div class="container-horarios pl-1">
    <template v-for="periodo in listaDePeriodos">
      <div
        v-if="curso.horarios[periodo.indice].length"
        class="div-table"
        :key="'periodo' + periodo.indice"
      >
        <h4 class="periodo-title">{{ periodo.nome }}</h4>
        <TableHorarios
          :Turmas="curso.horarios[periodo.indice]"
          :listaDeHorarios="listHorarios"
        />
      </div>
    </template>
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
    listaDePeriodos: { type: Array, required: true },
    curso: { type: Object, required: true },
  },

  computed: {
    ...mapGetters(["ListaDeHorariosNoturno", "ListaDeHorariosDiurno"]),

    listHorarios() {
      if (this.curso.turno === "Diurno") return this.ListaDeHorariosDiurno;
      else return this.ListaDeHorariosNoturno;
    },
  },
};
</script>

<style scoped>
.container-horarios {
  width: 100% !important;
  display: grid;
  grid-template-columns: repeat(auto-fit, 306px);
  justify-content: space-between;
  grid-gap: 5px;
  grid-row-gap: 20px;
  margin-bottom: 20px;
  max-width: 1550px !important;
}

@media screen and (max-width: 1273px) {
  .container-horarios {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 642px) {
  .container-horarios {
    grid-template-columns: 1fr;
  }
}
</style>
