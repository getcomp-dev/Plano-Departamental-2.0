<template>
  <transition name="modal-fade">
    <div class="modal-custom">
      <header class="modal-custom-header w-100">
        <h2 class="title">
          {{ modalOptions.title }}
        </h2>
        <button
          type="button"
          class="btn-custom btn-close"
          @click="close()"
          aria-label="Close modal"
        >
          &times;
        </button>
      </header>

      <main class="modal-custom-body">
        <slot name="modal-body">Modal Body</slot>
      </main>

      <footer v-if="hasFooter" class="modal-custom-footer w-100">
        <slot name="footer">
          <div class="div">
            <button
              class="btn btn-custom btn-modal btn-azul"
              @click="$emit('select-all')"
            >
              Selecionar Todos
            </button>
            <button
              class="btn btn-custom btn-modal btn-cinza"
              @click="$emit('select-none')"
            >
              Desmarcar Todos
            </button>
          </div>
          <button
            @click="$emit('btn-ok'), close()"
            class="btn btn-modal btn-verde btn-ok-modal"
          >
            OK
          </button>
        </slot>
      </footer>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  name: "BaseModal",
  props: {
    modalOptions: { type: Object, required: true },
    hasFooter: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  mounted() {
    EventBus.$emit("toggle-bg-modal", true);
    EventBus.$on("close-modal", () => {
      this.close();
    });
  },
  beforeDestroy() {
    EventBus.$emit("toggle-bg-modal", false);
    EventBus.$off("close-modal");
  },
  computed: {},
  methods: {
    close() {
      this.modalOptions.visibility = false;
    },
    dragMouseDown(event) {
      event.preventDefault();

      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag(event) {
      this.$refs.draggableContainer.style.cursor = "all-scroll";
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;

      let top = this.$refs.draggableContainer.offsetTop;
      let bottom = top + this.$refs.draggableContainer.offsetHeight;
      // console.log("bottom", bottom);
      // console.log("top", top);
      // console.log(event.clientY);

      let right =
        this.$refs.draggableContainer.offsetLeft +
        this.$refs.draggableContainer.offsetWidth;
      console.log(event.clientX);
      if (top <= 310 && event.clientY < 100) {
        this.positions.movementY = 0;
      } else if (bottom >= 1230 && event.clientY > 300) {
        this.positions.movementY = 0;
      }

      // if (right >= 2155 && event.clientX >= 1425) {
      //   this.positions.movementX = 0;
      // }

      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      if (right >= 2150) {
        this.$refs.draggableContainer.style.left =
          this.$refs.draggableContainer.offsetLeft - 1 + "px";
      } else {
        this.$refs.draggableContainer.style.left =
          this.$refs.draggableContainer.offsetLeft -
          this.positions.movementX +
          "px";
      }
    },
    closeDragElement() {
      this.$refs.draggableContainer.style.cursor = "default";
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style scoped>
.modal-custom {
  z-index: 1050;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 500px;
  min-height: 800px;
  border-radius: 5px;
}
.modal-custom-header,
.modal-custom-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.modal-custom-header {
  border-bottom: 1px solid #eeeeee;
  color: #000000;
  min-height: 56px;
}
.modal-custom-body {
  padding: 20px 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.modal-custom-footer {
  justify-content: space-between;
  margin-top: auto;
  padding: 15px;
  border-top: 1px solid #eeeeee;
  align-items: center;
}

.title {
  width: 100%;
  padding-left: 15px;
  padding-right: 5px;
  margin: 0;
  font-size: 20px;
}
.btn-close {
  height: 100% !important;
  min-height: 55px;
  width: 70px;
  font-size: 22px;
  padding: 20px;
  border: none;
  color: #2d2e2e;
  font-weight: bold;
  text-align: center;
  background: none;
  cursor: pointer;
}
.btn-close:hover {
  background-color: rgba(192, 192, 192, 0.335);
}

.btn {
  color: white;
}
.btn:hover {
  color: white;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
