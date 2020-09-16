export default {
  methods: {
    selecionaSemestre(newItem) {
      this.toggleItemInArray(newItem, this.filtroSemestres.selecionados);
      this.conectaSemestreEmPeriodo();
    },
    conectaSemestreEmPeriodo() {
      this.filtroPeriodos.selecionados = [];
      const periodosSelecionados = this.filtroPeriodos.selecionados;
      const semestresSelecionados = this.filtroSemestres.selecionados;

      const semestre1EstaSelecionado = this.$_.some(semestresSelecionados, [
        "id",
        1,
      ]);
      const semestre2EstaSelecionado = this.$_.some(semestresSelecionados, [
        "id",
        2,
      ]);
      const Periodos = this.$store.getters.PeriodosLetivos;

      if (semestre1EstaSelecionado) {
        periodosSelecionados.push(
          this.$_.find(Periodos, ["id", 1]),
          this.$_.find(Periodos, ["id", 2])
        );
      }

      if (semestre2EstaSelecionado) {
        periodosSelecionados.push(
          this.$_.find(Periodos, ["id", 3]),
          this.$_.find(Periodos, ["id", 4])
        );
      }
    },

    selecionaPeriodo(newItem) {
      this.toggleItemInArray(newItem, this.filtroPeriodos.selecionados);
      this.conectaPeriodoEmSemestre();
    },
    conectaPeriodoEmSemestre() {
      const periodosSelecionados = this.filtroPeriodos.selecionados;
      const semestresSelecionados = this.filtroSemestres.selecionados;

      const periodo1e2EstaSelecionado =
        this.$_.some(periodosSelecionados, ["id", 1]) &&
        this.$_.some(periodosSelecionados, ["id", 2]);

      const periodo3e4EstaSelecionado =
        this.$_.some(periodosSelecionados, ["id", 3]) &&
        this.$_.some(periodosSelecionados, ["id", 4]);

      if (periodo1e2EstaSelecionado) {
        semestresSelecionados.push(
          this.$_.find(this.SemestresLetivos, ["id", 1])
        );
      } else {
        const index = this.$_.findIndex(semestresSelecionados, ["id", 1]);
        if (index !== -1) semestresSelecionados.splice(index, 1);
      }

      if (periodo3e4EstaSelecionado) {
        semestresSelecionados.push(
          this.$_.find(this.SemestresLetivos, ["id", 2])
        );
      } else {
        const index = this.$_.findIndex(semestresSelecionados, ["id", 2]);
        if (index !== -1) semestresSelecionados.splice(index, 2);
      }
    },
  },
};
