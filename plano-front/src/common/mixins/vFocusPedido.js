export default {
  directives: {
    "focus-pedido": {
      bind(el) {
        el.handleFocus = () => {
          if (el.value == 0) el.value = "";
        };
        el.handleBlur = () => {
          if (el.value == "") el.value = 0;
        };

        el.addEventListener("focus", el.handleFocus);
        el.addEventListener("blur", el.handleBlur);
      },
    },
    unbind(el) {
      el.removeEventListener("focus", el.handleFocus);
      el.removeEventListener("blur", el.handleBlur);
    },
  },
};
