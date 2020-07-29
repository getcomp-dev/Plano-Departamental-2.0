<template>
  <div class="input-container">
    <input
      :id="inputId"
      :type="currentInputType"
      :placeholder="placeholder"
      :class="[classes, { 'input-invalid': isInvalid && isDirty }]"
      @input="updateValue($event)"
      :value="value"
    />

    <font-awesome-icon
      class="input-icon"
      @click="togglePasswordVisibility()"
      :style="{ width: iconSize + 'px' }"
      :icon="['fas', currentInputIcon]"
    />
  </div>
</template>

<script>
export default {
  name: "InputPassword",
  props: {
    value: { type: String, default: "" },
    inputId: { type: String, default: "passwordInpt" },
    isInvalid: { type: Boolean, default: false },
    iconSize: { type: Number, default: 16 },
    classes: { type: String, default: "form-control" },
    placeholder: { type: String, default: "" },
  },
  data() {
    return {
      currentInputIcon: "eye-slash",
      currentInputType: "password",
      isDirty: false,
    };
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
      this.isDirty = true;
    },
    togglePasswordVisibility() {
      if (this.currentInputType === "text") {
        this.currentInputType = "password";
        this.currentInputIcon = "eye-slash";
      } else {
        this.currentInputType = "text";
        this.currentInputIcon = "eye";
      }
    },
  },
};
</script>

<style scoped>
.input-container {
  width: 100%;
  position: relative;
}
.input-container > input {
  padding-right: 30px !important;
}
.input-icon {
  position: absolute;
  right: 1%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(97, 97, 97);
  cursor: pointer;
  user-select: none;
}
.input-invalid {
  border-color: rgb(228, 42, 42) !important;
}
</style>
