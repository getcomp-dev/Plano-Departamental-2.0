<template>
  <div class="input-container">
    <input
      :id="inputId"
      type="password"
      ref="inputPassword"
      :class="['form-control', { 'input-invalid': isInvalid && isDirty }]"
      @input="updateValue($event)"
      :value="value"
    />
    <i
      :class="'fas fa-' + currentPasswordIcon"
      class="input-icon"
      @click="changePasswordVisibility()"
    ></i>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  props: {
    value: { type: String, default: "" },
    inputId: { type: String, default: "passwordInpt" },
    isInvalid: { type: Boolean, default: false },
  },
  data() {
    return {
      currentPasswordIcon: "eye-slash",
      isDirty: false,
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
      this.isDirty = true;
    },
    changePasswordVisibility() {
      let inputPassword = this.$refs.inputPassword;
      inputPassword.type =
        inputPassword.type === "password" ? "text" : "password";

      this.currentPasswordIcon === "eye"
        ? (this.currentPasswordIcon = "eye-slash")
        : (this.currentPasswordIcon = "eye");
    },
  },
};
</script>

<style scoped>
.input-container {
  width: 100%;
  position: relative;
}
.input-icon {
  cursor: pointer;
  position: absolute;
  right: 2%;
  font-size: 13px;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(97, 97, 97);
}
.input-invalid {
  border-color: rgb(228, 42, 42) !important;
}
</style>
