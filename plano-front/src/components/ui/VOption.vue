<template>
  <b-form-select-option :value="value" :disabled="disabled">
    {{ text }}
  </b-form-select-option>
</template>

<script>
export default {
  name: "VOption",
  props: {
    value: {
      default: "",
      validator: (prop) => {
        return (
          typeof prop === "string" ||
          typeof prop === "number" ||
          typeof prop === "object" ||
          prop === null
        );
      },
    },
    text: { type: [String, Number], default: "" },
    disabled: { type: Boolean, default: false },
  },
};
</script>
