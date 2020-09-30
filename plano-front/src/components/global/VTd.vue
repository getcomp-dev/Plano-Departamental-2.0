<template>
  <td
    :style="{
      textAlign: align,
      width: tdWidth,
      maxWidth: tdWidth,
      padding: tdPadding,
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
  white-space: nowrap;
  margin: 0;
}
</style>
