<template>
  <tr class="bg-custom">
    <v-td width="130" align="start" :title="docente.nome">{{ docente.apelido }}</v-td>
    <v-td width="620" colspan="5" />
    <v-td width="75">
      {{ docente.creditos1Semestre ? docente.creditos1Semestre : "" }}
    </v-td>
    <v-td width="75">
      {{ docente.creditos2Semestre ? docente.creditos2Semestre : "" }}
    </v-td>
    <v-td width="50">
      {{ docente.creditos1Semestre + docente.creditos2Semestre }}
    </v-td>
  </tr>
</template>

<script>
export default {
  name: "DocenteRow",
  props: {
    docente: { type: Object, required: true },
  },
};
</script>
