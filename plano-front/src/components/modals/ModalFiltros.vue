<template>
  <BaseModal2
    ref="baseModalFiltros"
    type="filtros"
    title="Filtros"
    :hasFooter="true"
  >
    <template #modal-body>
      <NavTab
        :currentTab="tabsOptions.current"
        :allTabs="tabsOptions.array"
        @change-tab="tabsOptions.current = $event"
      />

      <slot></slot>
    </template>

    <template #modal-footer>
      <div>
        <BaseButton :type="'text'" :color="'lightblue'" @click="selectAll"
          >Selecionar Todos</BaseButton
        >
        <BaseButton :type="'text'" :color="'gray'" @click="selectNone"
          >Desmarcar Todos</BaseButton
        >
        <slot name="modal-footer-btn"></slot>
      </div>

      <BaseButton
        class="paddingX-20"
        :type="'text'"
        :color="'green'"
        @click="selectOk"
        >OK</BaseButton
      >
    </template>
  </BaseModal2>
</template>

<script>
import NavTab from "@/components/ui/NavTab";
import { mapActions } from "vuex";

export default {
  name: "ModalFiltros",
  components: { NavTab },
  props: {
    callbacks: { type: Object, required: true },
    tabsOptions: { type: Object, required: true },
  },

  methods: {
    ...mapActions(["setTableLoading"]),

    selectAll() {
      const currentTabNormalized = this.tabsOptions.current
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      this.callbacks.selectAll[currentTabNormalized]();
    },
    selectNone() {
      const currentTabNormalized = this.tabsOptions.current
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      this.callbacks.selectNone[currentTabNormalized]();
    },
    selectOk() {
      this.setTableLoading(true);
      this.callbacks.btnOk();
      this.setTableLoading(false);
    },

    toggle() {
      this.$refs.baseModalFiltros.toggle();
    },
    close() {
      this.$refs.baseModalFiltros.close();
    },
  },
};
</script>
