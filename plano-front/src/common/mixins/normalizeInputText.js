export default {
  methods: {
    normalizeInputText(event) {
      const textNormalized = event.target.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toUpperCase();

      event.target.value = textNormalized;
      return textNormalized;
    },
  },
};
