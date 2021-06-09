<template>
  <BaseModal
    ref="baseModalPlano"
    title="Plano Departamental"
    type="editTurma"
    class="modal-plano"
    :hasOverlay="true"
    :hasFooter="true"
  >
    <template #modal-body>
      <NavTab
        :currentTab="currentTab"
        :allTabs="['Importar', 'Copiar']"
        @change-tab="currentTab = $event"
      />
      <ImportPlano
        v-show="currentTab === 'Importar'"
        ref="importPlano"
        :plano="plano"
        :closeModal="close"
      />
      <CopyPlano
        v-show="currentTab === 'Copiar'"
        ref="copyPlano"
        :plano="plano"
        :closeModal="close"
      />
    </template>

    <template #modal-footer>
      <template v-if="currentTab === 'Copiar'">
        <BaseButton
          text="Selecionar Todos"
          color="lightblue"
          @click="$refs.copyPlano.selectAllDisciplinas()"
        />
        <BaseButton
          text="Desmarcar Todos"
          color="gray"
          @click="$refs.copyPlano.selectNoneDisciplinas()"
        />

        <BaseButton text="OK" color="green" class="px-3" @click="handleCreatePlano" />
      </template>

      <template v-else>
        <BaseButton text="OK" color="green" class="px-3 ml-auto" @click="handleCreatePlano" />
      </template>
    </template>
  </BaseModal>
</template>

<script>
import { NavTab } from "@/components/ui";
import CopyPlano from "./CopyPlano";
import ImportPlano from "./ImportPlano";

export default {
  name: "ModalNovoPlano",
  components: { CopyPlano, ImportPlano, NavTab },
  props: {
    plano: { type: Object, required: true },
  },
  data() {
    return {
      currentTab: "Importar",
    };
  },

  methods: {
    open() {
      this.$refs.baseModalPlano.open();
    },
    close() {
      this.$refs.baseModalPlano.close();
    },
    async handleCreatePlano() {
      if (this.currentTab === "Importar") {
        await this.$refs.importPlano.handleImportPlano();
      } else if (this.currentTab === "Copiar") {
        await this.$refs.copyPlano.handleCopyPlano();
      }
    },
  },
};
</script>

<style>
.modal-plano {
  font-size: 14px;
}
.modal-plano .form-row {
  margin: 0;
  padding: 0;
  margin-bottom: 0.75rem;
}
.modal-plano .form-group {
  margin: 0;
  padding: 0;
}

.modal-plano .alert {
  width: 470px;
  margin-bottom: 1rem;
  padding: 8px 10px;
  padding-right: 20px;
  background-color: #e9ecef !important;
  font-size: 12px;
  word-break: break-word;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.modal-plano .form-control {
  width: 100%;
  height: 28px;
  font-size: 12px;
  padding: 0 5px;
  text-align: start;
}
.modal-plano .form-row {
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
}
.modal-plano .form-group {
  margin: 0;
  padding: 0;
}
.modal-plano label {
  margin-bottom: 3px;
}
</style>
