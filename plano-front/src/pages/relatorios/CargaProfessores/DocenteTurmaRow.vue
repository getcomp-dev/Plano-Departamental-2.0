<template>
  <tr>
    <td style="width: 130px"></td>
    <td style="width: 30px">{{ turma.periodo }}</td>
    <td style="width: 80px" class="less-padding">
      {{ turma.disciplina.codigo }}
    </td>
    <td style="width: 300px" class="t-start">
      {{ turma.disciplina.nome }}
    </td>
    <td style="width: 35px" class="less-padding">
      {{ turma.letra }}
    </td>
    <td style="width: 130px">
      {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </td>
    <td
      v-if="semestresAtivados.primeiro"
      style="width: 35px"
      class="less-padding"
    >
      {{
        turma.periodo === 1 || turma.periodo === 2 ? turma.creditosDaTurma : ""
      }}
    </td>
    <td
      v-if="semestresAtivados.segundo"
      style="width: 35px"
      class="less-padding"
    >
      {{
        turma.periodo === 3 || turma.periodo === 4 ? turma.creditosDaTurma : ""
      }}
    </td>
    <td
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      style="width: 50px"
      class="less-padding"
    ></td>
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
