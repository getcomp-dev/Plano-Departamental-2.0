<template>
  <tr class="tr-totais">
    <v-td width="80" />
    <v-td width="350" />
    <v-td width="80" />
    <v-td width="65" />
    <v-td width="45">{{ totalsSummation.numeroDeTurmas }}</v-td>
    <v-td width="150" />
    <v-td width="130" />
    <v-td width="65">{{ totalsSummation.creditos }}</v-td>
    <v-td width="80">{{ totalsSummation.vagas }}</v-td>
    <v-td width="80">{{ totalsSummation.vagasOferecidas }}</v-td>
    <v-td width="80">{{ totalsSummation.vagasOcupadas }}</v-td>
  </tr>
</template>

<script>
export default {
  name: "TotalsRow",
  props: {
    totalsSummation: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
.tr-totais {
  background-color: #cecece;
  &:hover {
    background-color: #cecece !important;
  }
}
</style>
