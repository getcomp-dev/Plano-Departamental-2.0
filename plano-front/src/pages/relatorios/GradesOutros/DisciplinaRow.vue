<template>
    <tr>
        <v-td width="80" :style="{ backgroundColor: disciplina.perfil.cor }">
            {{ disciplina.perfil.abreviacao }}
        </v-td>
        <v-td width="100">{{ disciplina.codigo }}</v-td>
        <v-td width="380" align="start" :title="disciplina.nome">
            {{ disciplina.nome }}
        </v-td>
        <v-td width="140" paddingX="2" v-for="curso in cursosComGrades">
            {{generateGradeText(disciplina[curso.id])}}
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
