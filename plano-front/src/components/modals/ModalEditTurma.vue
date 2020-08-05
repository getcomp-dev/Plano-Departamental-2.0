<template>
  <BaseModal2 ref="baseModalEditTurma" type="editTurma" title="Edição de Turma">
    <template #modal-body v-if="turmaSelected">
      <BodyModalEditTurma
        :hasEditDisciplina="hasEditDisciplina"
        :turma="turmaSelected"
        :key="'mdEdit' + turmaSelected.id"
      />
    </template>
  </BaseModal2>
</template>

<script>
import BodyModalEditTurma from "@/components/ui/BodyModalEditTurma";

export default {
  name: "ModalEditTurma",
  components: { BodyModalEditTurma },
  props: {
    turmaSelected: { type: Object | null, required: true },
    hasEditDisciplina: { type: Boolean, default: false },
  },
  methods: {
    open() {
      this.$refs.baseModalEditTurma.open();
    },
    close() {
      this.$refs.baseModalEditTurma.close();
    },
  },
};
</script>
