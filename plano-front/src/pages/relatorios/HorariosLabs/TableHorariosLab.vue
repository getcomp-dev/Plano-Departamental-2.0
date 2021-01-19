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

    <tr v-for="listItem in ListaDeTodosHorarios" :key="listItem.nome">
      <td class="tg-0lax tg-hor">{{ listItem.nome }}</td>
      <td v-for="horarioId in listItem.horariosIds" :key="'tdHorario' + horarioId" class="tg-0lax">
        <p
          v-for="turma in TurmasFilteredByHorario(horarioId)"
          :key="horarioId + turma.letra + turma.id"
          v-b-popover.hover.right="{
            title: turma.disciplina.nome,
            content: turma.docenteApelido,
          }"
        >
          {{ turma.disciplina.codigo }} {{ turma.letra }}
        </p>
      </td>
    </tr>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import { filter, isNull, find } from "lodash-es";

export default {
  name: "TableHorariosLab",
  props: {
    turmas: { type: Array, required: true },
    laboratorio: { type: Object, required: true },
  },
  methods: {
    TurmasFilteredByHorario(horarioId) {
      const turmasFiltred = filter(
        this.turmas,
        (turma) =>
          (turma.Horario1 == horarioId && turma.Sala1 === this.laboratorio.id) ||
          (turma.Horario2 == horarioId && turma.Sala2 === this.laboratorio.id)
      );

      return turmasFiltred.map((turma) => ({
        ...turma,
        docenteApelido: this.findDocentesApelidoInTurma(turma),
      }));
    },
    findDocentesApelidoInTurma(turma) {
      let docente1;
      let docente2;
      if (!isNull(turma.Docente1)) docente1 = find(this.AllDocentes, ["id", turma.Docente1]);
      if (!isNull(turma.Docente2)) docente2 = find(this.AllDocentes, ["id", turma.Docente2]);

      let apelidos = "";
      if (docente1 !== undefined) {
        apelidos += docente1.apelido;
        if (docente2 !== undefined) apelidos += "\n" + docente2.apelido;
      } else {
        if (docente2 !== undefined) apelidos += docente2.apelido;
      }
      return apelidos;
    },
  },
  computed: {
    ...mapGetters(["ListaDeTodosHorarios", "AllDocentes"]),
  },
};
</script>

<style scoped>
.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
}
.tg td {
  font-size: 11px;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: break-word;
  border-color: rgba(189, 189, 189, 0.644);
  color: #333;
  background-color: #fff;
}
.tg th,
.tg-hor {
  font-size: 11px;
  font-weight: bold;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: rgba(189, 189, 189, 0.623);
  color: #333;
  background-color: #e9ecef !important;
  min-width: 50px !important;
}
.tg .tg-0lax {
  vertical-align: center;
  text-align: center;
  height: 22px;
  min-width: 66px;
}
.tg td p {
  min-width: 64px !important;
  padding: 0 1px !important;
  margin: 0 !important;
}
.tg td p:hover {
  cursor: default;
  background-color: var(--light-gray) !important;
}
</style>
