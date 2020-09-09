<template>
  <!-- <tr v-if="cargasPos.length" class="tr-header">
      <td style="width: 130px" class="clickable t-start"></td>
      <td style="width: 25px" title="Trimestre">T.</td>
      <td style="width: 80px"></td>
      <td style="width: 300px" class="t-start">
        Disciplinas Pós Graduação
      </td>
      <td style="width: 35px" class="less-padding" title="Turma">T.</td>
      <td style="width: 130px"></td>

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
    <td style="width: 25px">{{ carga.trimestre }}</td>
    <td style="width: 80px"></td>
    <td style="width: 300px" class="t-start upper-case">
      {{ carga.programa }}
    </td>
    <td style="width: 35px"></td>
    <td style="width: 130px"></td>
    <td
      v-for="periodo in periodosAtivados"
      :key="periodo.nome + periodo.id"
      style="width: 35px"
      class="less-padding"
    >
      {{ periodo.id === carga.trimestre ? carga.creditos : "" }}
      <!--
        E alterar o somatorio de creditos
        <template v-if="carga.trimestre <= 2">
          {{ periodo.id === 1 ? carga.creditos : "" }}
        </template>
        <template v-else>
          {{ periodo.id === 3 ? carga.creditos : "" }}
       </template> -->
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
  name: "DocenteCargaPosRow",
  mixins: [generateHorariosText],
  props: {
    carga: { type: Object, required: true },
    periodosAtivados: { type: Array, required: true },
  },
  computed: {
    ...mapGetters(["PeriodosLetivos"]),
  },
};
</script>
