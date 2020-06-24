<template>
  <transition name="modal-fade">
    <div
      v-if="visibility"
      :class="modalClass"
      :style="modalStyle + customStyles"
    >
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

      <footer v-if="modalOptions.hasFooter" class="modal-custom-footer w-100">
        <slot name="modal-footer">
          <div class="div">
            <button
              class="btn btn-custom btn-modal btn-azul"
              @click="emitSelectAll()"
            >
              Selecionar Todos
            </button>
            <button
              class="btn btn-custom btn-modal btn-cinza"
              @click="emitSelectNone()"
            >
              Desmarcar Todos
            </button>
          </div>
          <button
            @click="emitOk()"
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
    modalOptions: {
      type: Object,
      required: true,
    },
    classes: {
      type: [String, Array],
      default: () => [],
    },
    customStyles: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      positions: {
        right: "top: 5vh; right: 10px;z-index: 900;",
        center:
          "top: 50px;left:50%; transform: translateX(-50%); z-index: 1000;",
      },
      visibility: false,
    };
  },
  mounted() {
    window.addEventListener("keyup", this.onEscKeyUp);
  },
  beforeDestroy() {
    EventBus.$emit("toggle-bg-modal", false);
    this.$off("on-close");
    window.removeEventListener("keyup", this.onEscKeyUp);
  },
  methods: {
    close() {
      this.visibility = false;
    },
    open() {
      this.visibility = true;
    },
    toggle() {
      this.visibility = !this.visibility;
    },
    emitSelectAll() {
      this.$emit("select-all");
    },
    emitSelectNone() {
      this.$emit("select-none");
    },
    emitOk() {
      this.$emit("btn-ok");
    },
    onEscKeyUp(event) {
      const { code } = event;
      const { type } = this.modalOptions;

      if (code === "Escape") {
        this.close();
      } else if (type === "filtros" && code === "Backquote") {
        this.emitSelectAll();
      }
    },
  },
  computed: {
    modalStyle() {
      const { position, type } = this.modalConfigs;
      let styles = "";

      styles += this.positions ? this.positions[position] : "";
      // modal type overwrite the position prop
      switch (type) {
        case "editTurma":
          styles = this.positions.center + "max-width:510px;min-height: 800px;";
          break;
        case "filtros":
          styles = this.positions.right + "max-width:510px; min-height:510px;";
          break;
        case "ajuda":
          styles = this.positions.right + "max-width:510px; height:auto;";
          break;
        default:
          styles += "max-width:510px; height:auto;";
          break;
      }

      return styles;
    },
    modalConfigs() {
      return {
        visibility: false,
        title: "Nenhum titulo recebido!",
        position: "center",
        hasBackground: this.modalOptions.type === "editTurma" ? true : false,
        ...this.modalOptions,
      };
    },
    modalClass() {
      return ["modal-custom", this.classes];
    },
  },
  watch: {
    visibility(newValue) {
      if (newValue) {
        if (this.modalConfigs.hasBackground) {
          EventBus.$emit("toggle-bg-modal", true);
          EventBus.$on("close-modal", this.close);
        }
      } else {
        if (this.modalConfigs.hasBackground) {
          EventBus.$emit("toggle-bg-modal", false);
          EventBus.$off("close-modal");
        }
        this.$emit("on-close");
      }
    },
  },
};
</script>

<style scoped>
.modal-custom {
  position: absolute;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px 20px;
}
.modal-custom-footer {
  justify-content: space-between;
  margin-top: auto;
  padding: 10px 20px;
  border-top: 1px solid #eeeeee;
  align-items: center;
}

.title {
  width: 100%;
  padding-left: 20px;
  padding-right: 5px;
  margin: 0;
  font-size: 20px;
}
.btn-close {
  height: 100% !important;
  min-height: 55px;
  width: 70px;
  font-size: 22px;
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
