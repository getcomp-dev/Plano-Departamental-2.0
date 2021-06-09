<template>
  <b-form-group class="mb-1 mt-2" :style="style">
    <div class="d-flex justify-content-start align-items-center">
      <b-form-checkbox :id="id" :checked="!!value" @change="emitInput" size="sm" />
      <label v-prevent-click-selection :for="id" class="d-block col-form-label-sm p-0 pr-2">
        {{ label }}
      </label>
    </div>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";
import { preventClickSelection } from "@mixins";
export default {
  name: "VCheckbox",
  mixins: [preventClickSelection],
  props: {
    id: { type: String, default: () => uniqueId() },
    value: { type: [Boolean, Number], required: true },
    label: { type: String, default: "" },
    inlineRow: { type: Boolean, defualt: false },
  },
  methods: {
    emitInput(newValue) {
      if (typeof this.value === "number") {
        let booleanNumeric = newValue ? 1 : 0;
        this.$emit("input", booleanNumeric);
      } else {
        this.$emit("input", newValue);
      }
    },
  },
  computed: {
    style() {
      return this.inlineRow
        ? {
          transform: "translateY(75%)",
          paddingLeft: "3px!important",
        }
        : {};
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.d-flex > label {
  transform: translateY(2px);
}
::v-deep .bv-no-focus-ring {
  @include no-focus;
}
</style>
