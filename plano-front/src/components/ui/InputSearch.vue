<template>
  <div class="input-search-container">
    <input
      ref="input"
      type="text"
      :placeholder="placeholder"
      :class="['input-search', classes]"
      :style="customStyle"
      :value="value"
      @input="updateValue($event.target.value)"
      autocomplete="off"
    />

    <button class="btn-search" @click="clearInputValue">
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>
  </div>
</template>

<script>
import { debounce } from "@/common/utils";

export default {
  name: "InputSearch",
  props: {
    value: { type: String, require: true },
    placeholder: { type: String, default: "Pesquisar..." },
    classes: { type: String, default: "" },
    customStyle: { type: String, default: "" },
  },
  methods: {
    updateValue(newValue, wait = 400) {
      debounce(() => {
        this.$emit("input", newValue);
      }, wait);
    },
    clearInputValue() {
      this.updateValue("", 0);
      this.$refs.input.value = "";
      this.$refs.input.focus();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/theme";

.input-search-container {
  position: relative;
  width: 100%;
}
.input-search-container > .input-search {
  width: 100%;
  height: 25px;
  font-size: 12px;
  color: $clr-darkgray;
  padding: 5px;
  padding-right: 38px;
  border: 1px solid #949494aa;
  background-color: #fff;
  border-radius: 4px;
}
.input-search-container > .input-search:focus {
  box-shadow: none;
  outline: none;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25) !important;
}

.input-search-container > .btn-search {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1px;
  top: 1px;
  width: 35px;
  height: calc(100% - 2px);
  font-size: 12px;
  padding: 0;
  color: $clr-darkgray;
  background-color: #fff;
  border: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-left: 1px solid #949494aa;
  cursor: pointer;
  transition: all 0.2s ease;
}
.input-search-container > .btn-search:hover {
  background-color: $clr-lightgray;
}

.input-search-container > .btn-search:focus {
  box-shadow: none;
  outline: none;
}

.btn-search,
.input-search {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
}
</style>
