<template>
  <button
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
    color: { type: String, default: "" },
  },
  computed: {
    buttonClasses() {
      const { type, color } = this;

      if (type === "icon" || type === "modal")
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
.base-btn:focus {
  outline: 0 !important;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.4) !important;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.4) !important;
}

/* ### types ### */
.btn-icon:hover {
  background-color: rgb(238, 238, 238) !important;
}
.btn-icon {
  width: 32px !important;
  height: 30px;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgb(199, 199, 199);
  /* old icon btn */
  /* width: 32px !important;
  margin: 0 4px !important;
  outline: none !important;
  background: none !important;
  background: none !important;
  box-shadow: none !important; */
}

.base-btn.btn-icon i {
  font-size: 16px !important;
}
.btn-modal {
  height: 25px !important;
  width: max-content !important;
  padding: 0 5px;
  border-radius: 0.25rem !important;
  border: none !important;
  font-size: 12px !important;
  color: white !important;
}
.btn-modal.extra-padding {
  padding-right: 20px !important;
  padding-left: 20px !important;
}
.btn-modal + .btn-modal {
  margin-left: 10px !important;
}

/* ### icon-cores ### */
.icon-green {
  color: #a0e7a0 !important;
}
.icon-green:hover {
  color: #77dd77 !important;
}

.icon-lightblue {
  color: #9ab3ff !important;
}
.icon-lightblue:hover {
  color: #728bdd !important;
}

.icon-gray {
  color: #8a8a8a !important;
}
.icon-gray:hover {
  color: #747474 !important;
}

.icon-red {
  background-color: inherit !important;
  color: #ff817b !important;
}
.icon-red:hover {
  color: #ff5f48 !important;
}

/* ### modal-cores ### */
.modal-red {
  background-color: #df4139;
}
.modal-red:hover {
  background-color: #c73129;
}

.modal-lightblue {
  background-color: #718de0 !important;
}
.modal-lightblue:hover {
  background-color: rgb(74, 101, 190) !important;
}

.modal-cinza {
  background-color: #999999 !important;
}
.modal-cinza:hover {
  background-color: #747474 !important;
}

.modal-verde {
  background-color: #70b670 !important;
}
.modal-verde:hover {
  background-color: #4c8a4c !important;
}
</style>
