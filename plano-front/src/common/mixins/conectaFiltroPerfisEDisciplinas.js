export default {
  methods: {
    selectDisciplina(disciplina) {
      this.toggleItemInArray(disciplina, this.filtroDisciplinas.selecionados, "id");
      this.conectaDisciplinasEmPerfis();
    },
    conectaDisciplinasEmPerfis() {
      this.filtroPerfis.selecionados = [];

      this.filtroPerfis.selecionados = this.$_.filter(this.PerfisOptions, (perfil) =>
        this.$_.some(this.filtroDisciplinas.selecionados, ["Perfil", perfil.id])
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

      this.$_.forEach(this.PerfisOptions, (perfil) => {
        const perfilFounded = this.$_.find(this.filtroPerfis.selecionados, [
          "id",
          perfil.id,
        ]);

        if (perfilFounded) {
          if (!perfilFounded.halfChecked) {
            const disciplinasDoPerfil = this.$_.filter(this.DisciplinasOptions, [
              "Perfil",
              perfilFounded.id,
            ]);

            this.filtroDisciplinas.selecionados = this.$_.union(
              disciplinasDoPerfil,
              this.filtroDisciplinas.selecionados
            );
          }
        } else {
          this.filtroDisciplinas.selecionados = this.$_.filter(
            this.filtroDisciplinas.selecionados,
            (disciplina) => disciplina.Perfil !== perfil.id
          );
        }
      });
    },
  },
};
