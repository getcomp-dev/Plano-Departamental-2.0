<template>
  <tr :key="disciplina.id + disciplina.codigo" class="bg-custom">
    <v-td width="80">{{ disciplina.codigo }}</v-td>
    <v-td width="350" align="start">{{ disciplina.nome }}</v-td>
    <v-td width="80">{{ disciplina.perfil.abreviacao }}</v-td>
    <v-td width="65" />
    <v-td width="45">{{ disciplina.turmas.length }}</v-td>
    <v-td colspan="2" />
    <v-td width="65">{{ disciplina.totalCreditos }}</v-td>
    <v-td width="80">{{ disciplina.totalVagas }}</v-td>
    <v-td width="80">{{ disciplina.totalVagasOferecidas }}</v-td>
    <v-td width="80">{{ disciplina.totalVagasOcupadas }}</v-td>
  </tr>
</template>

<script>
export default {
  name: "DisciplinaRow",
  props: {
    disciplina: { type: Object, required: true },
  },
};
</script>
