<template>
  <transition :name="customAnimatedClass + '-modal'">
    <div
      v-show="visibility"
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
          <div class="w-100">
            <BaseButton
              :type="'text'"
              :color="'lightblue'"
              @click="emitSelectAll()"
            >
              Selecionar Todos
            </BaseButton>
            <BaseButton
              :type="'text'"
              :color="'gray'"
              @click="emitSelectNone()"
            >
              Desmarcar Todos
            </BaseButton>
          </div>
          <BaseButton
            class="px-4"
            :type="'text'"
            :color="'green'"
            @click="emitOk()"
          >
            OK
          </BaseButton>
        </slot>
      </footer>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "@/event-bus.js";
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseModal",
  components: {
    BaseButton,
  },
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
        right: "top: 80px; right: 20px; z-index: 900;",
        center:
          "top: 25px; left:50%; transform: translateX(-50%); z-index: 1000; max-height: calc(100% - 3rem);",
        centerNavbar:
          "top: 40px;left:50%; transform: translateX(-50%); z-index: 1000;",
      },
      visibility: false,
    };
  },
  mounted() {
    window.addEventListener("keyup", this.onEscKeyUp);
  },
  beforeDestroy() {
    this.$off("on-close");
    this.$store.commit("HIDE_MODAL_OVERLAY");
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
      const { position, type, hasBackground } = this.modalConfigs;
      let styles = "";

      styles += this.positions ? this.positions[position] : "";
      // modal type overwrite the position prop
      switch (type) {
        case "editTurma":
          styles = this.positions.center + "max-width:510px;height: auto;";
          break;
        case "editVagas":
          styles =
            this.positions.center +
            "width:580px;min-height: auto; z-index: 1000;";
          break;
        case "filtros":
          styles = this.positions.right + "width:510px; height:610px;";
          break;
        case "ajuda":
          styles = this.positions.right + "max-width:510px; height:auto;";
          break;
        case "fromNavbar":
          styles +=
            this.positions.centerNavbar + "max-width:510px; height:auto;";
          break;
        default:
          styles += `max-width:510px; height:auto; z-index:${
            hasBackground ? "955" : "750"
          };`;
          break;
      }

      return styles;
    },
    modalConfigs() {
      return {
        visibility: false,
        title: "Nenhum titulo recebido!",
        position: "center",
        hasBackground:
          this.modalOptions.type === "editTurma" ||
          this.modalOptions.type === "fromNavbar" ||
          this.modalOptions.type === "editVagas"
            ? true
            : false,
        ...this.modalOptions,
      };
    },
    modalClass() {
      return ["modal-custom", this.classes];
    },
    customAnimatedClass() {
      const { position, type } = this.modalConfigs;
      switch (type) {
        case "editTurma":
        case "editVagas":
          return "center";
        case "filtros":
        case "ajuda":
          return "right";
        case "fromNavbar":
          return "fromNavbar";
        default:
          return position === "centerNavbar" ? "fromNavbar" : position;
      }
    },
  },
  watch: {
    visibility(newValue) {
      if (newValue) {
        if (this.modalConfigs.hasBackground) {
          this.$store.commit("SHOW_MODAL_OVERLAY");
          EventBus.$on("close-modal", this.close);
        }
      } else {
        this.$emit("on-close");

        if (this.modalConfigs.hasBackground) {
          this.$store.commit("HIDE_MODAL_OVERLAY");
          EventBus.$off("close-modal");
        }
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/base-modal-animations.css";

.modal-custom {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: calc(100% - 6rem);
  background: #ffffff;
  box-shadow: 0 2px 10px 0;
  border-radius: 5px;
}
/* header */
.modal-custom-header {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  color: #000000;
  height: 55px;
}
.modal-custom-header .title {
  width: 100%;
  padding-left: 20px;
  padding-right: 5px;
  margin: 0;
  font-size: 20px;
}
.modal-custom-header .btn-close {
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
.modal-custom-header .btn-close:hover {
  background-color: rgba(192, 192, 192, 0.335);
}
/* body */
.modal-custom-body {
  position: relative;
  display: block !important;
  width: 100%;
  overflow-y: auto !important;
  padding: 15px 20px;
}
/* footer */
.modal-custom-footer {
  border-top: 1px solid #eeeeee;
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 0 20px;
  height: 45px;
}
</style>
