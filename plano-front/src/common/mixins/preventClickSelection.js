const preventDoubleClickSelection = (event) => {
  event.stopPropagation();
  if (event.detail > 1) event.preventDefault();
};

export default {
  directives: {
    preventClickSelection: {
      bind(el) {
        el.handleClick = preventDoubleClickSelection;
        el.addEventListener("mousedown", el.handleClick);
      },
      unbind(el) {
        el.removeEventListener("mousedown", el.handleClick);
      },
    },
  },
};
