const defaultOptions = {
  allowDot: false,
};

export default {
  methods: {
    maskOnlyNumber($event, options = defaultOptions) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which;

      let dotCond = options.allowDot && keyCode === 46;
      if (keyCode < 48 || keyCode > 57) {
        if (!dotCond) $event.preventDefault();
      }
    },
  },
};
