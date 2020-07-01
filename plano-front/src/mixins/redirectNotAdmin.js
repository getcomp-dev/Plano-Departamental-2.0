export default {
  created() {
    const isAdmin = this.$store.state.auth.Usuario.admin === 1;

    if (!isAdmin) {
      this.$notify({
        group: "general",
        type: "error",
        title: "Erro!",
        text:
          "Acesso negado! Usuário não possui permissão para acessar esta página!",
      });
      this.$router.push({ name: "dashboard" });
    }
  },
};
