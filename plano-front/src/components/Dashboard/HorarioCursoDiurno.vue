<template>
  <div class="row marg">
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[0])">
        <div class="periodo">
          <h5>1º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[0]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[1])">
        <div class="periodo">
          <h5>2º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[1]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[2])">
        <div class="periodo">
          <h5>3º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[2]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[3])">
        <div class="periodo">
          <h5>4º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[3]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[4])">
        <div class="periodo">
          <h5>5º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[4]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[5])">
        <div class="periodo">
          <h5>6º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[5]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[6])">
        <div class="periodo">
          <h5>7º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[6]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[7])">
        <div class="periodo">
          <h5>8º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[7]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[8])">
        <div class="periodo">
          <h5>9º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[8]"></horario-diurno>
        </div>
      </template>
    </div>
    <div class="tabcur">
      <template v-if="horarioVazio(Curso[9])">
        <div class="periodo">
          <h5>10º Período</h5>
          <horario-diurno class="horario" :Turmas="Curso[9]"></horario-diurno>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import horarioDiurno from "./HorarioTabelaDiurno.vue";
export default {
  name: "HorarioCursoDiurno",
  props: {
    Curso: Array
  },

  components: {
    horarioDiurno
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
    margin: 0 !important
  }
  h5 {
    font-size: 12px;
    font-weight: normal;
  }
  .horario {
    float: left;
    margin-left: auto;
    margin-right: auto;
  }
  
  
  .periodo {
    display: inline;
    width: 72px;
    height: 24px;
    position: relative;
  }
  @media screen and (max-width: 1290px) and (min-width: 975px){
  .marg{
    margin-right: 315px !important;
  }
}
</style>