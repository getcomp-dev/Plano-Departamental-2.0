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
      <div class="ml-auto">
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'red'"
          @click="$emit('btn-deletar')"
        >
          Deletar
        </BaseButton>
      </div>
    </template>
  </BaseModal2>
</template>

<script>
export default {
  name: "ModalDelete",
  props: {
    isDeleting: { type: Boolean, default: false },
  },
  methods: {
    open() {
      this.$refs.baseModalDelete.open();
    },
    close() {
      this.$refs.baseModalDelete.close();
    },
  },
};
</script>
