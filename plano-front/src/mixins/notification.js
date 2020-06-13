export default {
  methods: {
    showNotication({ message, title = "Sucesso!", type = "success" }) {
      this.$notify({
        title: title,
        text: `${message}`,
        type: type,
        group: "general",
      });
    },
  },
};
