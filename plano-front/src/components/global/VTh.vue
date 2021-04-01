<template>
  <th
    :style="{
      textAlign: 'center',
      padding: 0,
      width: thWidth,
      maxWidth: thWidth,
      verticalAlign: 'middle',
    }"
  >
    <slot></slot>
  </th>
</template>

<script>
export default {
  name: "v-th",
  props: {
    width: { type: [String, Number], default: "" },
  },

  computed: {
    thWidth() {
      return `${this.width}px`;
    },
  },
};
</script>
