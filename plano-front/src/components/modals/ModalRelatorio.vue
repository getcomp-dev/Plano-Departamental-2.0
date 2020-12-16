<template>
  <BaseModal
    ref="baseModalRelatorio"
    title="Relátorio"
    position="right"
    :styles="{ width: '300px', zIndex: 905 }"
  >
    <template #modal-body>
      <ul class="list-relatorio list-group flex-row w-100">
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
  </BaseModal>
</template>

<script>
export default {
  name: "ModalRelatorio",

  methods: {
    handleSelect(value) {
      this.setLoading({ type: "partial", value: true });
      this.close();
      this.$emit("selection-option", value);
      this.setLoading({ type: "partial", value: false });
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
  border: 1px solid rgba(0, 0, 0, 0.125);
  font-size: 11px;
  font-weight: bold;
}
.list-relatorio .list-group-item:hover {
  text-decoration: underline;
  color: var(--light-blue);
  background-color: #ebebeb;
}
</style>
