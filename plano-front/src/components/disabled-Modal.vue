<template>
  <transition name="modal-fade">
    <div id="Modal" class="modal-custom " ref="draggableContainer">
      <header
        class="modal-custom-header w-100 pr-0"
        ref="refHeader"
        @mousedown="dragMouseDown"
      >
        <h2 class="title">
          <slot name="title">
            Nenhum titulo passado para o componente!
          </slot>
        </h2>
        <button
          type="button"
          class="btn-custom"
          style=" font-size:25px;height:30px!important; width:80px; text-align:center"
          @click="close"
          aria-label="Close modal"
        >
          &times;
        </button>
      </header>

      <section class="modal-custom-body">
        <!-- <div
          class="col m-0 p-0"
          style="width: max-content; height: 450px !important;"
        >
        </div> -->
        <slot name="body"> </slot>
      </section>

      <footer class="modal-custom-footer w-100">
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
            @click="$emit('btn-ok')"
            class="btn btn-modal btn-verde"
            style="padding-right: 15px !important; padding-left: 15px !important;"
          >
            OK
          </button>

          <!-- <button
          type="button"
          class="btn btn-green"
          @click="close"
          aria-label="Close modal"
        >
          Close me!
        </button> -->
        </slot>
      </footer>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  components: {},
  data() {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
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
.modal-backdrop {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

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
}
.modal-custom-header,
.modal-custom-footer {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-custom-header {
  cursor: all-scroll;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
}

.modal-custom-footer {
  border-top: 1px solid #eeeeee;
  align-items: center;
}
.modal-custom-body {
  position: relative;
  padding: 20px 10px;
}

/* .btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
} */
.title {
  margin: 0;
  font-size: 20px;
}
.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #2d2e2e;
  background: transparent;
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
