<template>
  <table class="tg">
    <tr>
      <th class="tg-0lax">Horário</th>
      <th class="tg-0lax">Seg</th>
      <th class="tg-0lax">Ter</th>
      <th class="tg-0lax">Qua</th>
      <th class="tg-0lax">Qui</th>
      <th class="tg-0lax">Sex</th>
    </tr>

    <tr v-for="listItem in listaDeHorarios" :key="listItem.nome">
      <td class="tg-0lax tg-hor">{{ listItem.nome }}</td>
      <td
        v-for="horarioId in listItem.horariosIds"
        :key="'tdHorario' + horarioId"
        class="tg-0lax"
      >
        <p
          v-for="turma in TurmasInHorarios(horarioId)"
          :key="horarioId + turma.id + turma.periodo"
          v-b-popover.hover.right="{
            title: turma.disciplina.nome,
            content: turma.docenteApelido,
          }"
        >
          {{ turma.disciplina.codigo }}
        </p>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TableHorarios",
  props: {
    Turmas: { type: Array, required: true },
    listaDeHorarios: { type: Array, required: true },
  },

  methods: {
    TurmasInHorarios(horarioId) {
      const turmasFiltred = this.$_.filter(
        this.Turmas,
        (turma) => turma.Horario1 == horarioId || turma.Horario2 == horarioId
      );

      return this.$_.map(turmasFiltred, (turma) => ({
        ...turma,
        docenteApelido: this.findDocentesApelidoInTurma(turma),
        disciplina: this.findDisciplinaInTurma(turma),
      }));
    },

    findDocentesApelidoInTurma(turma) {
      let docente1 = undefined;
      let docente2 = undefined;
      if (!this.$_.isNull(turma.Docente1))
        docente1 = this.$_.find(this.AllDocentes, ["id", turma.Docente1]);
      if (!this.$_.isNull(turma.Docente2))
        docente2 = this.$_.find(this.AllDocentes, ["id", turma.Docente1]);

      let apelidos = "";
      if (docente1 !== undefined) {
        apelidos += docente1.apelido;
        if (docente2 !== undefined) apelidos += "\n" + docente2.apelido;
      } else {
        if (docente2 !== undefined) apelidos += docente2.apelido;
      }
      return apelidos;
    },
    findDisciplinaInTurma(turma) {
      return this.$_.find(this.AllDisciplinas, {
        id: turma.Disciplina,
      });
    },
  },

  computed: {
    ...mapGetters(["ListaDeHorariosEletivas", "AllDisciplinas", "AllDocentes"]),
  },
};
</script>
