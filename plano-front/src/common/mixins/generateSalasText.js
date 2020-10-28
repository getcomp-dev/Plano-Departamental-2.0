export default {
  methods: {
    generateSalasText(sala1Id, sala2Id) {
      const AllSalas = this.$store.getters.AllSalas;
      let sala1 = this.$_.find(AllSalas, ["id", sala1Id]);
      let sala2 = this.$_.find(AllSalas, ["id", sala2Id]);

      if (sala1 && !sala2) {
        return sala1.nome;
      } else if (!sala1 && sala2) {
        return sala2.nome;
      } else if (sala1 && sala2) {
        return `${sala1.nome} / ${sala2.nome}`;
      } else {
        return "";
      }
    },
  },
};
