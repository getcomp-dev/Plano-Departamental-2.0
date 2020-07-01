<template>
  <BaseModal
    ref="baseModalRelatorio"
    :customStyles="'width:300px;z-index:900;'"
    :modalOptions="{
      title: 'Relátorio',
      position: 'right',
    }"
  >
    <template #modal-body>
      <ul class="list-relatorio list-group flex-row w-100 border-0">
        <li
          class="list-group-item clickable text-center m-0 rounded-0 col py-2"
          @click="$emit('selection-option', false)"
        >
          Parcial
        </li>
        <li
          class="list-group-item clickable text-center m-0 rounded-0 col py-2"
          @click="$emit('selection-option', true)"
        >
          Completo
        </li>
      </ul>
    </template>
  </BaseModal>
</template>

<script>
import { BaseModal } from "@/components/index.js";
export default {
  name: "ModalRelatorio",
  components: { BaseModal },

  methods: {
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
