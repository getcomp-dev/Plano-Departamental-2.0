<template>
  <b-form-group class="mb-1" label-size="sm" :label="label" :label-for="id">
    <b-form-textarea
      :id="id"
      :value="value"
      @input="emitInput"
      :state="validationState"
      :placeholder="placeholder"
      :aria-describedby="feedbackId"
      :disabled="disabled"
      :rows="rows"
      :cols="cols"
      size="sm"
      autocomplete="off"
      no-resize
    />

    <b-form-invalid-feedback v-if="validationState === false" :id="feedbackId">
      <template v-if="validation.$params.required && !validation.required">
        Campo obrigatório
      </template>
      <template v-else-if="validation.$params.maxLength && !validation.maxLength">
        Limite de caracteres excedido
      </template>
      <template v-else>Valor inválido</template>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "VTextarea",
  props: {
    id: { type: String, default: () => uniqueId() },
    value: {
      required: true,
      validator: (prop) => {
        return typeof prop === "string" || typeof prop === "number" || prop === null;
      },
    },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    rows: { type: [String, Number], default: "" },
    cols: { type: [String, Number], default: "" },
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
