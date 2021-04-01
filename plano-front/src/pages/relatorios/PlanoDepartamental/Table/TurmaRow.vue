<template>
  <tr>
    <v-td width="80" />
    <v-td width="350" />
    <v-td width="80" />
    <v-td width="65">{{ turma.periodo }}</v-td>
    <v-td width="45" paddingX="0">{{ turma.letra }}</v-td>
    <v-td width="150" align="start">
      {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
    </v-td>
    <v-td width="130" paddingX="0">
      {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </v-td>
    <v-td width="65">{{ creditoTotal }}</v-td>

    <template v-if="showVagas">
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagas }}
      </v-td>
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagasOferecidas }}
      </v-td>
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagasOcupadas }}
      </v-td>
    </template>
  </tr>
</template>

<script>
import { generateHorariosText, generateDocentesText } from "@/common/mixins";

export default {
  name: "TurmaRow",
  mixins: [generateHorariosText, generateDocentesText],
  props: {
    turma: { type: Object, required: true },
    creditoTotal: { type: [Number, String], default: "" },
    showVagas: { type: Boolean, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

td.td-vagas:hover {
  color: $clr-lightblue;
  text-decoration: underline;
}
</style>
