<template>
  <BaseModal2
    ref="baseModalRelatorio"
    title="Relátorio"
    position="right"
    :styles="{ width: '300px', zIndex: 905 }"
  >
    <template #modal-body>
      <ul class="list-relatorio list-group flex-row w-100 border-0">
        <li
          class="list-group-item clickable text-center m-0 rounded-0 col py-2"
          @click="handleSelect(false)"
        >
          Parcial
        </li>
        <li
          class="list-group-item clickable text-center m-0 rounded-0 col py-2"
          @click="handleSelect(true)"
        >
          Completo
        </li>
      </ul>
    </template>
  </BaseModal2>
</template>

<script>
export default {
  name: "ModalRelatorio",

  methods: {
    handleSelect(value) {
      this.setPartialLoading(true);
      this.close();
      this.$emit("selection-option", value);
      this.setPartialLoading(false);
    },

    toggle() {
      this.$refs.baseModalRelatorio.toggle();
    },
    close() {
      this.$refs.baseModalRelatorio.close();
    },
  },
};
</script>

<style scoped>
.list-relatorio .list-group-item {
  font-size: 11px;
  font-weight: bold;
}
.list-relatorio .list-group-item:hover {
  text-decoration: underline;
  color: var(--light-blue);
  background-color: #ebebeb;
}
</style>
