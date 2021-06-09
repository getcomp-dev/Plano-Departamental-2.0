<template>
  <td
    :style="{
      width: tdWidth,
      maxWidth: tdWidth,
      padding: tdPadding,
      textAlign: align,
      whiteSpace: whiteSpace,
    }"
    :class="`v-td td-${type}`"
    @click="$emit('click')"
  >
    <div v-if="type === 'content'" class="flex-center">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </td>
</template>

<script>
export default {
  name: "v-td",
  props: {
    type: { type: String, default: "text" },
    width: { type: [String, Number], required: true },
    align: { type: String, default: "center" },
    paddingX: { type: [String, Number], default: "5" },
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
.v-td {
  margin: 0;
  cursor: default;
}
.v-td.td-text {
  display: block-inline;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-td.td-content {
  padding: 0 3px !important;
}
.v-td > div.flex-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
