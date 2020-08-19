export default {
  methods: {
    generateDocentesText(docente1Id, docente2Id) {
      const DocentesAtivos = this.$store.getters.DocentesAtivos;
      let docente1 = this.$_.find(DocentesAtivos, ["id", docente1Id]);
      let docente2 = this.$_.find(DocentesAtivos, ["id", docente2Id]);

      if (docente1 && !docente2) {
        return docente1.apelido;
      } else if (!docente1 && docente2) {
        return docente2.apelido;
      } else if (docente1 && docente2) {
        return `${docente1.apelido} / ${docente2.apelido}`;
      } else {
        return "";
      }
    },
  },
};
