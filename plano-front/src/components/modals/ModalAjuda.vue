<template>
  <BaseModal ref="baseModalAjuda" title="Ajuda" type="ajuda">
    <template #modal-body>
      <ul class="list-ajuda list-group">
        <slot></slot>
      </ul>
    </template>
  </BaseModal>
</template>

<script>
export default {
  name: "ModalAjuda",
  methods: {
    toggle() {
      this.$refs.baseModalAjuda.toggle();
    },
    close() {
      this.$refs.baseModalAjuda.close();
    },
  },
};
</script>

<style scoped>
.modal-custom .list-ajuda svg,
.modal-custom .list-ajuda i {
  font-size: 12px !important;
  margin: 0 1px !important;
  color: #585858;
}
.list-ajuda .list-group-item b:first-of-type {
  color: var(--light-blue);
}
.modal-custom .list-ajuda i:hover {
  color: #2a2a2a;
}
</style>
