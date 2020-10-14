<template>
  <td
    :style="{
      width: tdWidth,
      maxWidth: tdWidth,
      padding: tdPadding,
      textAlign: align,
      whiteSpace: whiteSpace,
    }"
    @click="$emit('click')"
  >
    <slot></slot>
  </td>
</template>

<script>
export default {
  name: "v-td",
  props: {
    width: { type: String | Number, required: true },
    align: { type: String, default: "center" },
    paddingX: { type: String | Number, default: "5" },
    whiteSpace: { type: String, default: "nowrap" },
  },

  computed: {
    tdWidth() {
      return `${this.width}px`;
    },
    tdPadding() {
      return `0 ${this.paddingX}px`;
    },
  },
};
</script>
<style scoped>
td {
  display: block-inline;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}
</style>
