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
          v-for="turma in TurmasFiltredByHorario(horarioId)"
          :key="horarioId + turma.id + turma.periodo"
          v-b-popover.hover.right="{
            title: turma.disciplina.nome,
            content: findDocenteInTurma(turma),
          }"
        >
          {{ turma.disciplina.codigo }}
        </p>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TableHorarios",
  props: {
    Turmas: { type: Array, required: true },
    listaDeHorarios: { type: Array, required: true },
  },

  methods: {
    TurmasFiltredByHorario(horario) {
      return this.$_.filter(
        this.Turmas,
        (turma) => turma.Horario1 == horario || turma.Horario2 == horario
      );
    },
    findDocenteInTurma(turma) {
      let d1 = undefined,
        d2 = undefined;
      if (!this.$_.isNull(turma.Docente1))
        d1 = this.$_.find(this.$store.state.docente.Docentes, [
          "id",
          turma.Docente1,
        ]);
      if (!this.$_.isNull(turma.Docente2))
        d2 = this.$_.find(this.$store.state.docente.Docentes, [
          "id",
          turma.Docente1,
        ]);
      let apelidos = "";
      if (d1 !== undefined) {
        apelidos += d1.apelido;
        if (d2 !== undefined) {
          apelidos = apelidos + " " + d2.apelido;
        }
      } else {
        if (d2 !== undefined) apelidos += d2.apelido;
      }
      return apelidos;
    },
  },
};
</script>
