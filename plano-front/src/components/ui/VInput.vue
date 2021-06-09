<template>
  <b-form-group class="mb-1" label-size="sm" :label="label" :label-for="id">
    <b-form-input
      :id="id"
      :type="inputType"
      :value="value"
      @input="emitInput"
      :state="validationState"
      :placeholder="placeholder"
      :aria-describedby="feedbackId"
      :disabled="disabled"
      :min="min"
      size="sm"
      autocomplete="off"
      step="1"
      @change="$emit('change', $event)"
      @blur="$emit('blur', $event)"
    />

    <b-form-invalid-feedback v-if="textFeedback && validationState === false" :id="feedbackId">
      <template v-if="validation.$params.required && !validation.required">
        Campo obrigatório
      </template>
      <template v-else-if="validation.$params.maxLength && !validation.maxLength">
        Limite de caracteres excedido
      </template>
      <template v-else-if="validation.$params.integer && !validation.integer">
        Número deve ser inteiro
      </template>
      <template v-else-if="validation.$params.maxValue && !validation.maxValue">
        Valor máximo excedido
      </template>
      <template v-else-if="validation.$params.minValue && !validation.minValue">
        Valor minimo excedido
      </template>
      <template v-else>Valor inválido</template>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "VInput",
  props: {
    id: { type: String, default: () => uniqueId() },
    inputType: { type: String, default: "text" },
    value: { type: [String, Number], required: true },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
    upperCase: { type: Boolean, default: true },
    min: { type: Number, default: 0 },
    textFeedback: { type: Boolean, default: true },
  },

  methods: {
    emitInput(newValue) {
      let newValueNormalized = newValue;
      if (this.inputType === "text" && this.upperCase) newValueNormalized = newValue.toUpperCase();

      this.$emit("input", newValueNormalized);
      if (this.validation) this.validation.$touch();
    },
  },

  computed: {
    // retorna null caso nao possua validacao, ou caso possua
    // retorna false para invalido e true para valido
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
