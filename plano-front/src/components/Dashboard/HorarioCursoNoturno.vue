<template>
  <div class="row marg w-100 pl-1">
    <template v-if="horarioVazio(Curso[0])">
      <div class="div-table col p-0">
        <h5>1º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[0]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[1])">
      <div class="div-table col p-0">
        <h5>2º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[1]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[2])">
      <div class="div-table col p-0">
        <h5>3º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[2]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[3])">
      <div class="div-table col p-0">
        <h5>4º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[3]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[4])">
      <div class="div-table col p-0">
        <h5>5º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[4]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[5])">
      <div class="div-table col p-0">
        <h5>6º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[5]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[6])">
      <div class="div-table col p-0">
        <h5>7º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[6]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[7])">
      <div class="div-table col p-0">
        <h5>8º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[7]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[8])">
      <div class="div-table col p-0">
        <h5>9º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[8]"></horario-noturno>
      </div>
    </template>

    <template v-if="horarioVazio(Curso[9])">
      <div class="div-table col p-0">
        <h5>10º Período</h5>
        <horario-noturno class="horario" :Turmas="Curso[9]"></horario-noturno>
      </div>
    </template>
  </div>
</template>
<script>
import _ from "lodash";
import horarioNoturno from "./HorarioTabelaNoturno.vue";
export default {
  name: "HorarioCursoNoturno",
  props: {
    Curso: Array
  },

  components: {
    horarioNoturno
  },

  methods: {
    horarioVazio(c) {
      if (c.length != 0) return true;
      else return false;
    }
  }
};
</script>
<style scoped>
.row {
  display: flex;
  justify-content: center;
  margin: 0 !important;
}
.div-table {
  display: inline;
  position: relative;
}
h5 {
  font-size: 12px;
  font-weight: normal;
}
/* Para quebrar de 2 em 2 */
@media screen and (max-width: 1250px) and (min-width: 1106px) {
  .marg {
    margin-right: 25% !important;
  }
}
@media screen and (max-width: 1105px) and (min-width: 944px) {
  .marg {
    margin-right: 15% !important;
  }
}
</style>