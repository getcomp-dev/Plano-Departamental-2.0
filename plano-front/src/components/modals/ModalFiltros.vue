<template>
  <BaseModal ref="baseModalFiltros" type="filtros" title="Filtros" :hasFooter="true">
    <template #modal-body>
      <NavTab
        :currentTab="tabsOptions.current"
        :allTabs="tabsOptions.array"
        :withScroll="tabsOptions.withScroll"
        @change-tab="tabsOptions.current = $event"
      />

      <div class="div-table w-100">
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
import { normalizeText } from "@/common/utils";

export default {
  name: "ModalFiltros",
  components: { NavTab },
  props: {
    callbacks: { type: Object, required: true },
    tabsOptions: { type: Object, required: true },
    navTabScroll: { type: Boolean, default: false },
  },

  methods: {
    toggle() {
      this.$refs.baseModalFiltros.toggle();
    },
    close() {
      this.$refs.baseModalFiltros.close();
    },

    selectAll() {
      const currentTabNormalized = normalizeText(this.tabsOptions.current, false);
      this.callbacks.selectAll[currentTabNormalized]();
    },
    selectNone() {
      const currentTabNormalized = normalizeText(this.tabsOptions.current, false);
      this.callbacks.selectNone[currentTabNormalized]();
    },
    async selectOk() {
      this.setLoading({ type: "table", value: true });
      await this.callbacks.btnOk();
      this.setLoading({ type: "table", value: false });
    },
  },
};
</script>
