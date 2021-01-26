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
      <td v-for="horarioId in listItem.horariosIds" :key="'tdHorario' + horarioId" class="tg-0lax">
        <p
          v-for="turma in TurmasFilteredByHorario(horarioId)"
          :key="horarioId + turma.id + turma.periodo"
          v-b-popover.hover.right="{
            title: turma.disciplina.nome + ' - ' + turma.letra,

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
import { filter, isNull, find } from "lodash-es";

export default {
  name: "TableHorarios",
  props: {
    Turmas: { type: Array, required: true },
    listaDeHorarios: { type: Array, required: true },
  },

  methods: {
    TurmasFilteredByHorario(horarioId) {
      const turmasFiltred = filter(
        this.Turmas,
        (turma) => turma.Horario1 == horarioId || turma.Horario2 == horarioId
      );

      return turmasFiltred.map((turma) => ({
        ...turma,
        docenteApelido: this.findDocentesApelidoInTurma(turma),
        disciplina: this.findDisciplinaInTurma(turma),
      }));
    },
    findDocentesApelidoInTurma(turma) {
      let docente1 = undefined;
      let docente2 = undefined;
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
    findDisciplinaInTurma(turma) {
      return find(this.AllDisciplinas, {
        id: turma.Disciplina,
      });
    },
  },

  computed: {
    ...mapGetters(["AllDisciplinas", "AllDocentes"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme";

table.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
}
table.tg td {
  font-size: 11px;
  padding: 0px !important;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: break-word;
  border-color: rgba(189, 189, 189, 0.644);
  color: #333;
  background-color: #fff;
}
table.tg th,
table.tg .tg-hor {
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
}
table.tg .tg-0lax {
  vertical-align: center;
  text-align: center;
  height: 22px;
  min-width: 50px !important;
  width: 50px !important;
}
table.tg td > p {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 48px !important;
  padding: 0 1px !important;
  margin: 0 !important;
}
table.tg td > p:hover {
  cursor: default;
  background-color: $clr-lightgray !important;
}
</style>
