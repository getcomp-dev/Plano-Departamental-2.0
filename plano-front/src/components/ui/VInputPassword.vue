<template>
  <div class="container-input-password">
    <VInput
      :id="id"
      :label="label"
      :validation="validation"
      :inputType="inputType"
      :value="value"
      @input="emitInput"
      :upperCase="false"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <font-awesome-icon
      class="input-icon"
      @click="togglePasswordVisibility"
      :style="iconPosition"
      :icon="['fas', currentIcon]"
    />
  </div>
</template>

<script>
import { uniqueId } from "lodash-es";
import VInput from "./VInput";

export default {
  name: "VInputPassword",
  components: { VInput },
  props: {
    id: { type: String, default: () => uniqueId() },
    value: { type: [String, Number], required: true },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      inputType: "password",
      currentIcon: "eye-slash",
    };
  },

  methods: {
    emitInput(newValue) {
      this.$emit("input", newValue);
    },
    togglePasswordVisibility() {
      if (this.inputType === "text") {
        this.inputType = "password";
        this.currentIcon = "eye-slash";
      } else {
        this.inputType = "text";
        this.currentIcon = "eye";
      }
    },
  },

  computed: {
    iconPosition() {
      let right, top;
      if (this.validation && this.validation.$error) right = "25px";
      else right = "5px";

      if (this.label) top = "38px";
      else top = "14px";

      return { right, top };
    },
  },
};
</script>

<style lang="scss" scoped>
.container-input-password {
  position: relative;

  svg {
    cursor: pointer;
    position: absolute;
    width: 13px;
    top: 32px;
    transition: right ease 0.2s;
    transform: translate(-50%, -50%);
  }
}
</style>
