<template>
  <tr class="bg-custom">
    <td style="width: 130px" class="t-start">
      {{ docente.apelido }}
    </td>
    <td colspan="5" style="width:575px"></td>

    <td
      v-if="semestresAtivados.primeiro"
      style="width: 35px"
      class="less-padding"
    >
      {{ docente.creditos1Semestre }}
    </td>
    <td
      v-if="semestresAtivados.segundo"
      style="width: 35px"
      class="less-padding"
    >
      {{ docente.creditos2Semestre }}
    </td>
    <td
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      style="width: 50px"
      class="less-padding"
    >
      {{ docente.creditos1Semestre + docente.creditos2Semestre }}
    </td>
  </tr>
</template>

<script>
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteRow",
  mixins: [generateHorariosText],
  props: {
    docente: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
