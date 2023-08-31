<template>
  <tr>
    <v-td class="table-data" width="80" :style="{ backgroundColor: disciplina.perfil.cor }">
      {{ disciplina.perfil.abreviacao.toLowerCase() }}
    </v-td>
    <v-td class="table-data" width="100">{{ disciplina.codigo }}</v-td>
    <v-td class="table-data" width="380" align="start" :title="disciplina.nome">
      {{ disciplina.nome.toLowerCase() }}
    </v-td>
    <v-td
      class="table-data"
      width="140"
      paddingX="2"
      v-for="curso in cursosComGrades"
      :key="curso.codigo + curso.id"
    >
      {{ generateGradeText(disciplina[curso.id]) }}
    </v-td>
  </tr>
</template>

<script>
export default {
  name: "DisciplinaOutrosRow",
  props: {
    disciplina: { type: Object, required: true },
    cursosComGrades: { type: Array, required: true },
  },
  methods: {
    generateGradeText(grade) {
      let textResult = "";
      if (grade.semestre1.length) {
        textResult += `${grade.semestre1}º Período: 1º Semestre`;
      } else if (grade.semestre2.length) {
        textResult += `${grade.semestre2}º Período: 2º Semestre`;
      }

      return textResult;
    },
  },
};
</script>
