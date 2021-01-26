<template>
  <div class="container" @click.stop="$emit('handel-click')">
    <span class="title">{{ title }}</span>

    <ButtonArrow :state="isOpen" />
  </div>
</template>

<script>
import { ButtonArrow } from "@/components/ui";
export default {
  name: "ButtonSlideSection",
  components: { ButtonArrow },
  props: {
    title: { type: String, default: "Editar senha" },
    isOpen: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
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
}
.container::before,
.container::after {
  content: "";
  position: absolute;
  width: 100%;
}
.container::before {
  top: 0;
  border-top: 1px solid #dee2e6;
}
.container::after {
  bottom: 0;
  border-bottom: 1px solid #dee2e6;
}
.container:hover {
  filter: brightness(85%);
}
.container > .title {
  font-weight: normal;
  font-size: inherit;
}
</style>
