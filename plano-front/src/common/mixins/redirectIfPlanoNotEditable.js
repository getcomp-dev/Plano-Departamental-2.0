export default {
  created() {
    if (!this.currentPlano.isEditable) {
      this.pushNotification({
        type: "warn",
        text: "Plano atual não é editável, redirecionando para o inicio",
      });
      this.$router.push("./home");
    }
  },
};
