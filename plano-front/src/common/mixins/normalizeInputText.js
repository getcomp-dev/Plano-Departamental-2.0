export default {
  methods: {
    normalizeInputText(event) {
      const textNormalized = event.target.value.trim().toUpperCase();

      event.target.value = textNormalized;
      return textNormalized;
    },
  },
};
