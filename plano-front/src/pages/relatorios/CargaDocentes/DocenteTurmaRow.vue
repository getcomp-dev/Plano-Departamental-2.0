<template>
  <tr>
    <v-td class="table-data" v-if="docente" width="130">{{ docente.apelido.toLowerCase() }}</v-td>
    <v-td class="table-data" v-else width="130" />
    <v-td class="table-data" width="65">{{ turma.periodo }}</v-td>
    <v-td class="table-data" width="80">{{ turma.disciplina.codigo }}</v-td>
    <v-td class="table-data" width="300" align="start">
      {{ turma.disciplina.nome.toLowerCase() }}
    </v-td>
    <v-td class="table-data" width="45">{{ turma.letra }}</v-td>
    <v-td class="table-data" width="130">
      {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </v-td>
    <v-td class="table-data" width="75">
      {{ turmaIs1Semestre ? turma.creditosDaTurma : "" }}
    </v-td>
    <v-td class="table-data" width="75">
      {{ turmaIs2Semestre ? turma.creditosDaTurma : "" }}
    </v-td>
    <v-td class="table-data" width="50" />
  </tr>
</template>

<script>
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteTurmaRow",
  mixins: [generateHorariosText],
  props: {
    turma: { type: Object, required: true },
    profsAmarrados: { type: Boolean, required: true },
    docente: { type: Object, required: false },
  },

  computed: {
    turmaIs1Semestre() {
      return this.turma.periodo === 1 || this.turma.periodo === 2;
    },
    turmaIs2Semestre() {
      return this.turma.periodo === 3 || this.turma.periodo === 4;
    },
  },
};
</script>
