<template>
  <tr>
    <v-td width="130" />
    <v-td width="25">{{ carga.trimestre }}</v-td>
    <v-td width="80" />
    <v-td width="300" align="start">{{ carga.programa }}</v-td>
    <v-td width="35" />
    <v-td width="130" />

    <v-td width="35" paddingX="2">
      {{ carga.trimestre === 1 || carga.trimestre === 2 ? carga.creditos : "" }}
    </v-td>

    <v-td width="35" paddingX="2">
      {{ carga.trimestre === 3 || carga.trimestre === 4 ? carga.creditos : "" }}
    </v-td>

    <v-td
      v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
      width="40"
      paddingX="2"
    />
  </tr>
</template>

<script>
export default {
  name: "DocenteCargaPosRow",
  props: {
    carga: { type: Object, required: true },
    semestresAtivados: { type: Object, required: true },
  },
};
</script>
