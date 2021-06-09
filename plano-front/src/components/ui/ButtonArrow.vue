<template>
  <button type="button" class="btn-arrow" :style="`transform:rotate(${state ? -90 : 0}deg)`">
    <font-awesome-icon :icon="['fas', 'chevron-left']" />
  </button>
</template>

<script>
export default {
  name: "ButtonArrow",
  props: {
    state: { type: Boolean, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins";

.btn-arrow {
  @include no-focus;
  padding: 0 5px;
  line-height: 50%;
  border: none;
  margin: 0;
  outline: 0;
  background: none;
  color: currentColor;
  background-color: transparent;
  transition: transform 0.25s ease;

  > svg {
    color: currentColor;
  }
}
</style>
