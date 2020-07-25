export default {
  methods: {
    showNotification({ message, title, type = "success" }) {
      if (!title) title = type === "error" ? "Erro!" : "Sucesso!";

      this.$notify({
        title: title,
        text: `${message}`,
        type: type,
        group: "general",
      });
    },
  },
};
