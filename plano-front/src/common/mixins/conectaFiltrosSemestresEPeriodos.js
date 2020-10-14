import { mapGetters } from "vuex";

export default {
  methods: {
    periodoEstaSelecionado(periodoId) {
      return this.$_.some(this.filtroPeriodos.selecionados, ["id", periodoId]);
    },

    selecionaSemestre(semestre) {
      semestre.halfChecked = false;
      this.toggleItemInArray(semestre, this.filtroSemestres.selecionados, "id");

      this.conectaSemestreEmPeriodo();
    },
    conectaSemestreEmPeriodo() {
      this.$_.forEach(this.SemestresOptions, (semestre) => {
        const semestreFounded = this.$_.find(this.filtroSemestres.selecionados, [
          "id",
          semestre.id,
        ]);

        if (semestreFounded) {
          if (!semestreFounded.halfChecked) {
            const periodosDoSemestre = this.$_.filter(this.PeriodosOptions, [
              "semestreId",
              semestreFounded.id,
            ]);

            this.filtroPeriodos.selecionados = this.$_.union(
              this.filtroPeriodos.selecionados,
              periodosDoSemestre
            );
          }
        } else {
          this.filtroPeriodos.selecionados = this.$_.filter(
            this.filtroPeriodos.selecionados,
            (periodo) => periodo.semestreId != semestre.id
          );
        }
      });
    },

    selecionaPeriodo(periodo) {
      this.toggleItemInArray(periodo, this.filtroPeriodos.selecionados, "id");

      this.conectaPeriodoEmSemestre();
    },
    conectaPeriodoEmSemestre() {
      this.filtroSemestres.selecionados = [];
      const semestre1 = this.$_.find(this.SemestresOptions, ["id", 1]);
      const semestre2 = this.$_.find(this.SemestresOptions, ["id", 2]);

      if (this.periodoEstaSelecionado(1) && this.periodoEstaSelecionado(2)) {
        this.filtroSemestres.selecionados.push(semestre1);
      } else if (this.periodoEstaSelecionado(1) || this.periodoEstaSelecionado(2)) {
        semestre1.halfChecked = true;
        this.filtroSemestres.selecionados.push(semestre1);
      }

      if (this.periodoEstaSelecionado(3) && this.periodoEstaSelecionado(4)) {
        this.filtroSemestres.selecionados.push(semestre2);
      } else if (this.periodoEstaSelecionado(3) || this.periodoEstaSelecionado(4)) {
        semestre2.halfChecked = true;
        this.filtroSemestres.selecionados.push(semestre2);
      }
    },
  },

  computed: {
    ...mapGetters(["PeriodosLetivos", "SemestresLetivos"]),

    PeriodosOptions() {
      return this.PeriodosLetivos;
    },
    SemestresOptions() {
      return this.$_.map(this.SemestresLetivos, (semestre) => {
        const periodosDoSemestre = this.$_.filter(this.filtroPeriodos.selecionados, [
          "semestreId",
          semestre.id,
        ]);

        let halfChecked = false;
        if (periodosDoSemestre.length === 2) {
          halfChecked = false;
        } else if (periodosDoSemestre.length > 0) {
          halfChecked = true;
        }

        return {
          ...semestre,
          halfChecked,
        };
      });
    },
  },
};
