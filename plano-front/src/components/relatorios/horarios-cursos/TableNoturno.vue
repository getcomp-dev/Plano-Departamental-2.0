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

    <tr>
      <td class="tg-0lax tg-hor">19-21</td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 5)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 11)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 17)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 23)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 29)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">21-23</td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 6)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 12)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 18)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 24)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 30)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-noturno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content:
                  '<b>' + disciplina.nome + '</b> <br> ' + professor(turma),
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
import _ from "lodash";

export default {
  name: "HorarioNoturno",
  props: {
    Turmas: Array,
  },

  methods: {
    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
    },

    professor(turma) {
      let d1 = undefined,
        d2 = undefined;
      if (!_.isNull(turma.Docente1))
        d1 = _.find(this.$store.state.docente.Docentes, ["id", turma.Docente1]);
      if (!_.isNull(turma.Docente2))
        d2 = _.find(this.$store.state.docente.Docentes, ["id", turma.Docente1]);
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

  computed: {
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
  },
};
</script>

<style scoped>
.popoverText {
  font-family: Arial, sans-serif !important;
  font-size: 11px !important;
}
</style>
