<template>
  <tr :key="disciplina.id + disciplina.codigo" class="bg-custom">
    <v-td width="80">{{ disciplina.codigo }}</v-td>
    <v-td width="350" align="start" class="table-data">{{ disciplina.nome.toLowerCase() }}</v-td>
    <v-td width="80" class="table-data">{{ disciplina.perfil.abreviacao.toLowerCase() }}</v-td>
    <v-td width="65" />
    <v-td width="45">{{ disciplina.turmas.length }}</v-td>
    <v-td colspan="2" />
    <v-td width="90" />
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
