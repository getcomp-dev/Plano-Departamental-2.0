<template>
  <BaseModal2
    ref="baseModalDelete"
    title="Confirmar exclusão"
    position="center"
    :hasBackground="true"
    :hasFooter="isDeleting"
    :styles="{ width: '400px', maxHeight: '600px', fontSize: '14px' }"
  >
    <template #modal-body>
      <ul class="list-group list-delete">
        <slot></slot>
      </ul>
    </template>

    <template #modal-footer>
      <div class="mr-auto">
        <BaseButton
          v-if="hasClearDelete"
          class="paddingX-20"
          :type="'text'"
          :color="'gray'"
          @click="emitClearDelete"
        >
          Cancelar seleções
        </BaseButton>
      </div>
      <BaseButton
        class="paddingX-20"
        :type="'text'"
        :color="'red'"
        @click="emitDelete"
      >
        Deletar
      </BaseButton>
    </template>
  </BaseModal2>
</template>

<script>
export default {
  name: "ModalDelete",
  props: {
    isDeleting: { type: Boolean, default: false },
    hasClearDelete: { type: Boolean, default: false },
  },
  methods: {
    open() {
      this.$refs.baseModalDelete.open();
    },
    close() {
      this.$refs.baseModalDelete.close();
    },
    emitDelete() {
      this.close();
      this.$emit("btn-deletar");
    },
    emitClearDelete() {
      this.close();
      this.$emit("btn-clear");
    },
  },
};
</script>
