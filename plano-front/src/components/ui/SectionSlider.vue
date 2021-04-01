<template>
  <div class="container" @click.stop="$emit('handel-click')">
    <span class="text">{{ text }}</span>

    <ButtonArrow :state="isOpen" />
  </div>
</template>

<script>
import ButtonArrow from "./ButtonArrow";

export default {
  name: "SectionSlider",
  components: { ButtonArrow },
  props: {
    text: { type: String, default: "" },
    isOpen: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 8px 0;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s ease;
  &:hover {
    filter: brightness(85%);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
  }
  &::before {
    top: 0;
    border-top: 1px solid #dee2e6;
  }
  &::after {
    bottom: 0;
    border-bottom: 1px solid #dee2e6;
  }

  > .text {
    font-weight: normal;
    font-size: inherit;
  }
}
</style>
