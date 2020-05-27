<template>
  <div class="container-horarios pl-1">
    <template v-for="periodo in periodosDurno">
      <div
        v-if="horarioVazio(HorariosCurso[periodo.indice])"
        class="div-table p-0"
        :key="periodo.indice"
      >
        <h4 class="periodo-title">{{ periodo.nome }}</h4>

        <component
          :is="`Table${turno}`"
          :Turmas="HorariosCurso[periodo.indice]"
        ></component>
      </div>
    </template>
  </div>
</template>

<script>
import TableNoturno from "./TableNoturno.vue";
import TableDiurno from "./TableDiurno.vue";
import TableEletivas from "./TableEletivas.vue";

export default {
  name: "HorariosTables",
  components: {
    TableDiurno,
    TableNoturno,
    TableEletivas,
  },
  props: {
    HorariosCurso: { type: Array, default: () => [] },
    turno: { type: String, default: "" },
  },
  data() {
    return {
      periodosDurno: [
        { indice: 0, nome: "1º Período" },
        { indice: 1, nome: "2º Período" },
        { indice: 2, nome: "3º Período" },
        { indice: 3, nome: "4º Período" },
        { indice: 4, nome: "5º Período" },
        { indice: 5, nome: "6º Período" },
        { indice: 6, nome: "7º Período" },
        { indice: 7, nome: "8º Período" },
        { indice: 8, nome: "9º Período" },
        { indice: 9, nome: "10º Período" },
      ],
    };
  },
  methods: {
    horarioVazio(curso) {
      if (curso.length != 0) return true;
      else return false;
    },
  },
};
</script>

<style scoped>
.container-horarios {
  width: 100% !important;
  max-width: 1550px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
}
.container-horarios .div-table {
  min-width: max-content;
}

/* Para quebrar de 2 em 2 */
@media screen and (max-width: 1250px) and (min-width: 1106px) {
  .container-horarios {
    margin-right: 27% !important;
  }
}
@media screen and (max-width: 1105px) and (min-width: 944px) {
  .container-horarios {
    margin-right: 15% !important;
  }
}
</style>
