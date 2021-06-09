<template>
  <BaseModal
    ref="baseModalDownloadTurmasCursos"
    title="Período"
    position="right"
    :styles="{ width: '300px', zIndex: 905 }"
  >
    <template #modal-body>
      <ul class="list-relatorio list-group flex-row w-100">
        <li
          class="list-group-item clickable text-center m-0 rounded-0 col py-2"
          @click="handleSelect(1)"
        >
          Primeiro
        </li>
        <li
          class="list-group-item clickable text-center m-0 rounded-0 col py-2"
          @click="handleSelect(3)"
        >
          Terceiro
        </li>
      </ul>
    </template>
  </BaseModal>
</template>

<script>
export default {
  name: "ModalDownloadTurmasCursos",

  methods: {
    handleSelect(value) {
      this.$emit("selection-option", value);
      this.close();
    },

    toggle() {
      this.$refs.baseModalDownloadTurmasCursos.toggle();
    },
    close() {
      this.$refs.baseModalDownloadTurmasCursos.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.list-relatorio .list-group-item {
  border: 1px solid rgba(0, 0, 0, 0.125);
  font-size: 11px;
  font-weight: bold;
}
.list-relatorio .list-group-item:hover {
  text-decoration: underline;
  color: $clr-lightblue;
  background-color: #ebebeb;
}
</style>
