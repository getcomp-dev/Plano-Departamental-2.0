<template>
  <tr>
    <v-td width="80" :style="{ backgroundColor: disciplina.perfil.cor }">
      {{ disciplina.perfil.abreviacao }}
    </v-td>
    <v-td width="100">{{ disciplina.codigo }}</v-td>
    <v-td width="380" align="start" :title="disciplina.nome">
      {{ disciplina.nome }}
    </v-td>
    <v-td width="140" paddingX="2" v-if="cursosAtivados.CCN">
      {{ generateGradeText(disciplina.gradeCCN) }}
    </v-td>
    <v-td width="140" paddingX="2" v-if="cursosAtivados.CCD">
      {{ generateGradeText(disciplina.gradeCCD) }}
    </v-td>
    <v-td width="140" paddingX="2" v-if="cursosAtivados.EC">
      {{ generateGradeText(disciplina.gradeEC) }}
    </v-td>
    <v-td width="140" paddingX="2" v-if="cursosAtivados.SI">
      {{ generateGradeText(disciplina.gradeSI) }}
    </v-td>
  </tr>
</template>

<script>
export default {
  name: "DisciplinaRow",
  props: {
    disciplina: { type: Object, required: true },
    cursosAtivados: { type: Object, required: true },
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
