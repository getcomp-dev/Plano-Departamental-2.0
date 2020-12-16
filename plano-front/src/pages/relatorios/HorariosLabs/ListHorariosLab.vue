<template>
  <div class="w-100">
    <template v-for="periodo in periodos">
      <h2 :key="periodo.id + periodo.nome" class="semestre-title">
        {{ periodo.id }}º Período letivo
      </h2>

      <div class="container-horarios px-1" :key="periodo.nome + periodo.id">
        <div v-for="laboratorio in laboratorios" :key="laboratorio.id + laboratorio.nome">
          <h3 class="lab-title">{{ laboratorio.nome }}</h3>
          <TableHorariosLab
            :laboratorio="laboratorio"
            :turmas="getTurmasDoPeriodo(turmas, periodo.id)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TableHorariosLab from "./TableHorariosLab";

export default {
  name: "ListHorariosLab",
  components: { TableHorariosLab },
  props: {
    periodos: { type: Array, required: true },
    laboratorios: { type: Array, required: true },
    turmas: { type: Array, required: true },
  },
  methods: {
    getTurmasDoPeriodo(turmas, periodoId) {
      return turmas.filter((turma) => turma.periodo === periodoId);
    },
  },
};
</script>

<style scoped>
.semestre-title {
  width: 100%;
  font-size: 16px;
  padding: 5px;
  background-color: var(--light-gray);
  font-weight: bold;
  text-align: start;
}
.lab-title {
  width: 100%;
  text-align: start;
  font-size: 12px;
  font-weight: bold;
}
.container-horarios {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 381px);
  justify-content: space-between;
  grid-column-gap: 5px;
  grid-row-gap: 16px;
  margin-bottom: 20px;
}
</style>
