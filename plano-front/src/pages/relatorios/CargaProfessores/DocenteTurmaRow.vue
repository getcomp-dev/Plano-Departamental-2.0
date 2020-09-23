<template>
  <tr>
    <v-td width="130" />
    <v-td width="30">{{ turma.periodo }}</v-td>
    <v-td width="80" paddingX="2">{{ turma.disciplina.codigo }}</v-td>
    <v-td width="300" align="start">{{ turma.disciplina.nome }}</v-td>
    <v-td width="35" paddingX="2">{{ turma.letra }}</v-td>

    <v-td width="130">
      {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </v-td>

    <v-td width="35" paddingX="2">
      {{
        turma.periodo === 1 || turma.periodo === 2 ? turma.creditosDaTurma : ""
      }}
    </v-td>

    <v-td width="35" paddingX="2">
      {{
        turma.periodo === 3 || turma.periodo === 4 ? turma.creditosDaTurma : ""
      }}
    </v-td>

    <v-td
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      width="40"
      paddingX="2"
    />
  </tr>
</template>

<script>
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteTurmaRow",
  mixins: [generateHorariosText],
  props: {
    turma: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
