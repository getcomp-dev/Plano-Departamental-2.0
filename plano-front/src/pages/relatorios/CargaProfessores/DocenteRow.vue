<template>
  <tr class="bg-custom">
    <v-td width="130" align="start">{{ docente.apelido }}</v-td>
    <v-td width="575" colspan="5" />

    <v-td width="35" paddingX="2">
      {{ !docente.creditos1Semestre ? "" : docente.creditos1Semestre }}
    </v-td>

    <v-td width="35" paddingX="2">
      {{ !docente.creditos2Semestre ? "" : docente.creditos2Semestre }}
    </v-td>

    <v-td
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      width="40"
      paddingX="2"
    >
      {{
        !docente.creditos1Semestre && !docente.creditos2Semestre
          ? ""
          : docente.creditos1Semestre + docente.creditos2Semestre
      }}
    </v-td>
  </tr>
</template>

<script>
export default {
  name: "DocenteRow",
  props: {
    docente: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
