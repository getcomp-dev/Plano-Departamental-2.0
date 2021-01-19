<template>
  <transition :name="customAnimation">
    <div
      v-if="visibility"
      :class="['modal-custom', options.customClasses]"
      :style="options.typeStyles"
    >
      <header class="header w-100">
        <h2 class="title">{{ options.title }}</h2>
        <button
          type="button"
          class="btn-custom btn-close"
          @click="close()"
          aria-label="Close modal"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </header>

      <main class="body">
        <slot name="modal-body">Modal Body</slot>
      </main>

      <footer v-if="options.hasFooter" class="footer w-100">
        <slot name="modal-footer"></slot>
      </footer>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const positions = {
  right: {
    top: "80px",
    right: "25px",
    zIndex: 900,
  },
  center: {
    top: "25px",
    left: "50%",
    zIndex: 1000,
    transform: "translateX(-50%)",
  },
};

export default {
  name: "BaseModal",
  props: {
    type: { type: String, default: "" },
    position: { type: String, default: "" },
    title: { type: String, default: "" },
    hasOverlay: { type: Boolean, default: false },
    hasFooter: { type: Boolean, default: false },
    classes: { type: String, default: "" },
    styles: { type: Object, default: () => {} },
  },
  data() {
    return {
      visibility: false,
    };
  },

  mounted() {
    document.addEventListener("keydown", this.closeOnEscKey);
  },
  beforeDestroy() {
    this.setModalOverlayVisibility(false);
    document.removeEventListener("keydown", this.closeOnEscKey);
  },

  methods: {
    ...mapActions(["setModalOverlayVisibility"]),

    close() {
      this.visibility = false;
    },
    open() {
      this.visibility = true;
    },
    toggle() {
      this.visibility = !this.visibility;
    },
    closeOnEscKey(event) {
      event.stopPropagation();

      const { code } = event;
      if (code === "Escape") this.close();
    },
  },

  computed: {
    ...mapGetters(["modalOverlayVisibility"]),

    options() {
      const typeStyles = [];
      let { type, position, hasOverlay, title, hasFooter, styles } = this;

      switch (type) {
      case "editTurma":
        if (!title) title = "Editar turma";
        hasOverlay = true;
        typeStyles.push(positions.center, { width: "510px" });
        break;

      case "fromNavbar":
        hasOverlay = true;
        typeStyles.push(positions.center, { width: "400px" });
        break;

      case "filtros":
        if (!title) title = "Filtros";
        if (!hasFooter) hasFooter = true;
        hasOverlay = false;
        typeStyles.push(positions.right, { width: "510px", height: "610px" });
        break;

      case "ajuda":
        title = "Ajuda";
        hasOverlay = false;
        typeStyles.push(positions.right, { width: "510px" });
        break;
      case "editVagas":
        if (!title) title = "Editar Vagas";
        title = "Vagas";
        hasOverlay = true;
        typeStyles.push(positions.center, { width: "580px" });
        break;

      default:
        if (position) typeStyles.push(positions[position]);
        else typeStyles.push(positions.center);
        typeStyles.push({ minWidth: "300px" });
        break;
      }

      typeStyles.push(styles);
      if (!title) title = "Nenhum titulo recebido";

      return {
        position,
        typeStyles,
        hasOverlay,
        title,
        hasFooter,
        customClasses: ["modal-custom", this.classes],
      };
    },
    customAnimation() {
      switch (this.type) {
      case "editTurma":
      case "editVagas":
      case "fromNavbar":
        return "center";

      case "filtros":
      case "ajuda":
        return "right";
      default:
        if (!this.position) return "center";
        else return this.position;
      }
    },
  },

  watch: {
    visibility(newValue) {
      if (this.options.hasOverlay) {
        this.setModalOverlayVisibility(newValue);
      }
    },
    modalOverlayVisibility(newValue) {
      //Para fechar o modal quando clicar no olverlay
      if (this.options.hasOverlay && !newValue && newValue !== this.visibility) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-custom {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: calc(100% - 6rem);
  background: #ffffff;
  box-shadow: 0 2px 10px 0;
  border-radius: 5px;

  > .header {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    color: #000000;
    height: 55px;

    .title {
      text-align: start;
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
      font-size: 16px;
      border: none;
      color: #2d2e2e;
      font-weight: bold;
      text-align: center;
      background: none;
      cursor: pointer;
      &:hover {
        background-color: #c0c0c055;
      }
    }
  }

  > .body {
    position: relative;
    display: block !important;
    overflow-y: auto !important;
    padding: 15px 20px;
  }

  > .footer {
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
}

/* transition */
.right-enter-active {
  animation: zoomInRight 0.3s ease;
}
.right-leave-active {
  animation: zoomOutRight 0.3s ease;
}
@keyframes zoomInRight {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes zoomOutRight {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}
.center-enter-active {
  animation: zoomInCenter 0.3s ease;
}
.center-leave-active {
  animation: zoomOutCenter 0.3s ease;
}
@keyframes zoomInCenter {
  from {
    transform: translateX(-50%) scale(0);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}
@keyframes zoomOutCenter {
  from {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
}
</style>
