<template>
  <transition name="fade-transition">
    <div
      v-if="modalOverlayVisibility"
      class="modal-overlay"
      @click.stop="setModalOverlayVisibility(false)"
    ></div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ModalOverlay",
  methods: {
    ...mapActions(["setModalOverlayVisibility"]),
  },
  computed: {
    ...mapGetters(["modalOverlayVisibility"]),
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 950;
  height: 100vh;
  width: 100vw;
  background-color: #00000066;
}
</style>
