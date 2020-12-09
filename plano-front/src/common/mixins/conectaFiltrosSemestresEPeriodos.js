import { mapGetters } from "vuex";
import { filter, find, union, some } from "lodash-es";
import { toggleItemInArray } from "./index";

export default {
  mixins: [toggleItemInArray],

  methods: {
    periodoEstaSelecionado(periodoId) {
      return some(this.filtroPeriodos.selecionados, ["id", periodoId]);
    },

    selecionaSemestre(semestre) {
      semestre.halfChecked = false;
      this.toggleItemInArray(semestre, this.filtroSemestres.selecionados, "id");

      this.conectaSemestreEmPeriodo();
    },
    conectaSemestreEmPeriodo() {
      this.SemestresOptions.forEach((semestre) => {
        const semestreFounded = find(this.filtroSemestres.selecionados, [
          "id",
          semestre.id,
        ]);

        if (semestreFounded) {
          if (!semestreFounded.halfChecked) {
            const periodosDoSemestre = filter(this.PeriodosOptions, [
              "semestreId",
              semestreFounded.id,
            ]);

            this.filtroPeriodos.selecionados = union(
              this.filtroPeriodos.selecionados,
              periodosDoSemestre
            );
          }
        } else {
          this.filtroPeriodos.selecionados = filter(
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
      const semestre1 = find(this.SemestresOptions, ["id", 1]);
      const semestre2 = find(this.SemestresOptions, ["id", 2]);

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
      return this.SemestresLetivos.map((semestre) => {
        const periodosDoSemestre = filter(this.filtroPeriodos.selecionados, [
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
