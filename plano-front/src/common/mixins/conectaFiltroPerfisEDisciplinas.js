import { toggleItemInArray } from "./index";
import { filter, find, union, some } from "lodash-es";

export default {
  mixins: [toggleItemInArray],

  methods: {
    selectDisciplina(disciplina) {
      this.toggleItemInArray(disciplina, this.filtroDisciplinas.selecionados, "id");
      this.conectaDisciplinasEmPerfis();
    },
    conectaDisciplinasEmPerfis() {
      this.filtroPerfis.selecionados = [];

      this.filtroPerfis.selecionados = filter(this.PerfisOptions, (perfil) =>
        some(this.filtroDisciplinas.selecionados, ["Perfil", perfil.id])
      );
    },

    selectPerfis(perfil) {
      perfil.halfChecked = false;
      this.toggleItemInArray(perfil, this.filtroPerfis.selecionados, "id");

      this.conectaPerfisEmDisciplinas();
    },
    conectaPerfisEmDisciplinas() {
      if (!this.filtroPerfis.selecionados.length) {
        this.filtroDisciplinas.selecionados = [];
        return;
      }

      this.PerfisOptions.forEach((perfil) => {
        const perfilFounded = find(this.filtroPerfis.selecionados, ["id", perfil.id]);

        if (perfilFounded) {
          if (!perfilFounded.halfChecked) {
            const disciplinasDoPerfil = filter(this.DisciplinasOptions, [
              "Perfil",
              perfilFounded.id,
            ]);

            this.filtroDisciplinas.selecionados = union(
              disciplinasDoPerfil,
              this.filtroDisciplinas.selecionados
            );
          }
        } else {
          this.filtroDisciplinas.selecionados = filter(
            this.filtroDisciplinas.selecionados,
            (disciplina) => disciplina.Perfil !== perfil.id
          );
        }
      });
    },
  },
};
