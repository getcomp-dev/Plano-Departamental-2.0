<template>
  <th
    :style="{
      textAlign: align,
      width: thWidth,
      maxWidth: thWidth,
      padding: thPadding,
    }"
  >
    <slot></slot>
  </th>
</template>

<script>
export default {
  name: "v-th",
  props: {
    width: { type: String | Number, required: true },
    align: { type: String, default: "center" },
    paddingX: { type: String | Number, default: "5" },
  },

  computed: {
    thWidth() {
      return `${this.width}px`;
    },
    thPadding() {
      return `0 ${this.paddingX}px`;
    },
  },
};
</script>
