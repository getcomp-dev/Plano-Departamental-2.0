<template>
  <button
    :key="generateUniqueKey()"
    :disabled="disabled"
    @click="$emit('click')"
    :class="['btn base-btn', buttonClasses]"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    type: { type: String, required: true },
    color: { type: String, default: "gray" },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    generateUniqueKey() {
      return this.$_.uniqueId(this.color);
    },
  },
  computed: {
    buttonClasses() {
      const { type, color } = this;

      if (type === "icon" || type === "text")
        return `btn-${type} ${type}-${color}`;
      else return "";
    },
  },
};
</script>

<style scoped>
.base-btn {
  height: max-content;
  margin: 0;
  padding: 0;
  border: none;
  line-height: 50%;
  cursor: pointer;
  text-align: center;
  transition: all 200ms ease;
}
.base-btn:disabled {
  filter: brightness(75%);
  cursor: default !important;
  outline: none !important;
  pointer-events: none;
}
.base-btn:disabled:focus {
  border: 0 !important;
  box-shadow: none !important;
}

/* ### types ### */
.btn-icon {
  width: 32px !important;
  height: 30px;
  margin: 0 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgb(199, 199, 199);
}
.base-btn.btn-icon svg {
  font-size: 16px !important;
}
.btn-icon:focus {
  outline: 0 !important;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.4) !important;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.4) !important;
}
.btn-icon:hover {
  background-color: #e7e7e7 !important;
}

.btn-text {
  height: 25px !important;
  width: max-content !important;
  padding: 0 10px;
  border-radius: 0.25rem !important;
  border: none !important;
  font-size: 12px !important;
  color: white !important;
  word-break: keep-all !important;
}
.btn-text + .btn-text {
  margin-left: 10px !important;
}
.btn-text:hover {
  filter: brightness(85%);
}
</style>
