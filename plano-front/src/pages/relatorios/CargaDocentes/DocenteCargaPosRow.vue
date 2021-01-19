<template>
  <tr>
    <v-td width="130" />
    <v-td width="25">{{ carga.trimestre }}</v-td>
    <v-td width="80" />
    <v-td width="300" align="start">{{ carga.programa }}</v-td>
    <v-td width="35" />
    <v-td width="130" />
    <v-td width="35" paddingX="2">
      {{ cargaIs1Semestre ? carga.creditos : "" }}
    </v-td>
    <v-td width="35" paddingX="2">
      {{ cargaIs2Semestre ? carga.creditos : "" }}
    </v-td>
    <v-td width="40" paddingX="2" />
  </tr>
</template>

<script>
export default {
  name: "DocenteCargaPosRow",
  props: {
    carga: { type: Object, required: true },
  },

  computed: {
    cargaIs1Semestre() {
      return this.carga.trimestre === 1 || this.carga.trimestre === 2;
    },
    cargaIs2Semestre() {
      return this.carga.trimestre === 3 || this.carga.trimestre === 4;
    },
  },
};
</script>
