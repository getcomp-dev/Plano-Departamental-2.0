<template>
  <tr>
    <td style="width: 130px"></td>
    <td style="width: 30px">{{ carga.trimestre }}</td>
    <td style="width: 80px"></td>
    <td style="width: 300px" class="t-start upper-case">
      {{ carga.programa }}
    </td>
    <td style="width: 35px"></td>
    <td style="width: 130px"></td>
    <td
      v-if="semestresAtivados.primeiro"
      style="width: 35px"
      class="less-padding"
    >
      {{ carga.trimestre === 1 || carga.trimestre === 2 ? carga.creditos : "" }}
    </td>
    <td
      v-if="semestresAtivados.segundo"
      style="width: 35px"
      class="less-padding"
    >
      {{ carga.trimestre === 3 || carga.trimestre === 4 ? carga.creditos : "" }}
    </td>
    <td
      style="width: 50px"
      class="less-padding"
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
    ></td>
  </tr>
</template>

<script>
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteCargaPosRow",
  mixins: [generateHorariosText],
  props: {
    carga: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
