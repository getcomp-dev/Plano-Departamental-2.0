<template>
  <b-form-group class="mb-1" label-size="sm" :label="label" :label-for="id">
    <b-form-file
      :id="id"
      :value="value"
      @input="emitInput"
      :state="validationState"
      :placeholder="placeholder"
      :aria-describedby="feedbackId"
      :disabled="disabled"
      :accept="accept"
      :multiple="multiple"
      drop-placeholder="Solte o arquivo aqui"
      :browse-text="browseText"
      size="sm"
    />

    <b-form-invalid-feedback v-if="validationState === false" :id="feedbackId">
      <template v-if="validation.$params.required && !validation.required">
        Campo obrigatório
      </template>
      <template v-else>Valor inválido</template>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "VInputFile",
  props: {
    id: { type: String, default: () => uniqueId() },
    value: {
      default: null,
      validator: (prop) => typeof prop === "object" || prop === null,
    },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
    placeholder: { type: String, default: "Selecione..." },
    browseText: { type: String, default: "Arquivo" },
    disabled: { type: Boolean, default: false },
    accept: { type: String, default: "" },
    multiple: { type: Boolean, default: false },
  },

  methods: {
    emitInput(newValue) {
      this.$emit("input", newValue);
      if (this.validation) this.validation.$touch();
    },
  },

  computed: {
    validationState() {
      if (!this.validation) return null;

      const { $dirty, $error } = this.validation;
      if ($dirty && $error) return false;
      return null;
    },
    feedbackId() {
      return "feedback-" + this.id;
    },
  },
};
</script>

<style scoped>
::v-deep .custom-file-label {
  line-height: 1.5 !important;
}
</style>
