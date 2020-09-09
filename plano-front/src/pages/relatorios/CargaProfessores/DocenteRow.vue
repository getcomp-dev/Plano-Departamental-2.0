<template>
  <tr class="bg-custom">
    <td style="width: 130px" class="t-start">
      {{ docente.apelido }}
    </td>
    <td colspan="5" style="width:570px"></td>
    <td
      v-for="periodo in periodosAtivados"
      :key="periodo.id + periodo.nome"
      style="width: 35px"
      class="less-padding"
    >
      {{ docente.creditos[`periodo${periodo.id}`] }}
    </td>
    <td
      style="width: 50px"
      class="less-padding"
      v-if="periodosAtivados.length > 1"
    >
      {{ totalDeCreditos(docente.creditos) }}
    </td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import { generateHorariosText } from "@/common/mixins";

export default {
  name: "DocenteRow",
  mixins: [generateHorariosText],
  props: {
    docente: { type: Object, required: true },
    periodosAtivados: { type: Array, required: true },
  },
  methods: {
    totalDeCreditos(creditos) {
      return this.$_.reduce(
        this.periodosAtivados,
        (sum, periodo) => sum + creditos[`periodo${periodo.id}`],
        0
      );
    },
  },
  computed: {
    ...mapGetters(["PeriodosLetivos"]),
  },
};
</script>
