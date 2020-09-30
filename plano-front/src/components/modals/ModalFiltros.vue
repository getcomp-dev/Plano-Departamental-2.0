<template>
  <BaseModal ref="baseModalFiltros" type="filtros" title="Filtros" :hasFooter="true">
    <template #modal-body>
      <NavTab
        :currentTab="tabsOptions.current"
        :allTabs="tabsOptions.array"
        @change-tab="tabsOptions.current = $event"
      />

      <div class="div-table">
        <slot></slot>
      </div>
    </template>

    <template #modal-footer>
      <div>
        <BaseButton text="Selecionar Todos" color="lightblue" @click="selectAll" />
        <BaseButton text="Desmarcar Todos" color="gray" @click="selectNone" />
        <slot name="modal-footer-btn"></slot>
      </div>
      <BaseButton text="OK" color="green" class="px-3" @click="selectOk" />
    </template>
  </BaseModal>
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
