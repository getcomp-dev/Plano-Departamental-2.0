<template>
  <!-- <tr v-if="turmas.length" :key="turmas.id + turmas.letra" class="tr-header">
      <td style="width: 130px" class="clickable t-start"></td>
      <td style="width: 25px" title="Período">P.</td>
      <td style="width: 80px">Código</td>
      <td style="width: 300px" class="t-start">Disciplinas Graduação DCC</td>
      <td style="width: 35px" class="less-padding" title="Turma">T.</td>
      <td style="width: 130px">
        Horário
      </td>
      <td
        v-for="periodo in periodosAtivados"
        :key="periodo.id + periodo.nome"
        style="width: 35px"
        class="less-padding"
      ></td>
      <td
        style="width: 50px"
        class="less-padding"
        title="Somatório total de créditos"
        v-if="periodosAtivados.length === 4"
      ></td>
    </tr> -->

  <tr>
    <td style="width: 130px"></td>
    <td style="width: 25px">{{ turma.periodo }}</td>
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
      v-for="periodo in periodosAtivados"
      :key="'td2' + periodo.nome + periodo.id"
      style="width: 35px"
      class="less-padding"
    >
      {{ turma.periodo === periodo.id ? turma.creditosDaTurma : "" }}
    </td>
    <td
      style="width: 50px"
      class="less-padding"
      v-if="periodosAtivados.length > 1"
    ></td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteTurmaRow",
  mixins: [generateHorariosText],
  props: {
    turma: { type: Object, required: true },
    periodosAtivados: { type: Array, required: true },
  },
  computed: {
    ...mapGetters(["PeriodosLetivos"]),
  },
};
</script>
