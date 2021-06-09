import { find } from "lodash-es";

export default {
  methods: {
    generateDocentesText(docente1Id, docente2Id, divider = "/") {
      const DocentesAtivos = this.$store.getters.DocentesAtivos;
      let docente1 = find(DocentesAtivos, ["id", docente1Id]);
      let docente2 = find(DocentesAtivos, ["id", docente2Id]);

      if (docente1 && !docente2) {
        return docente1.apelido;
      } else if (!docente1 && docente2) {
        return docente2.apelido;
      } else if (docente1 && docente2) {
        return `${docente1.apelido} ${divider} ${docente2.apelido}`;
      } else {
        return "";
      }
    },
  },
};
