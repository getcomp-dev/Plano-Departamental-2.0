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
      <td class="tg-0lax tg-hor">08-10</td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 1)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 7)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 13)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 19)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 25)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">10-12</td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 2)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 8)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 14)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 20)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 26)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">14-16</td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 3)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 9)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 15)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 21)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 27)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
    </tr>

    <tr>
      <td class="tg-0lax tg-hor">16-18</td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 4)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 10)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 16)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 22)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
              }"
            >
              {{ disciplina.codigo }}
            </p>
          </template>
        </template>
      </td>
      <td class="tg-0lax">
        <template v-for="turma in Turmas" v-if="checkTurmaHorario(turma, 28)">
          <template
            v-for="disciplina in Disciplinas"
            v-if="turma.Disciplina === disciplina.id"
          >
            <p
              :key="'1-diurno' + turma.Disciplina + '-' + disciplina.id"
              v-b-popover.html.hover.top="{
                customClass: 'popoverText',
                content: disciplina.nome + ' <br> ' + professor(turma)
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
  name: "HorarioDiurno",
  props: {
    Turmas: Array
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
    }
  },

  computed: {
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    }
  }
};
</script>
<style scoped>
.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
  margin-right: 5px !important;
  margin-bottom: 20px !important;
}
.tg td {
  font-family: Arial, sans-serif;
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
  font-family: Arial, sans-serif;
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
.tg .tg-0lax {
  vertical-align: center;
  text-align: center;
  height: 22px;
  min-width: 50px !important;
}
td p {
  min-width: 48px !important;
  padding-right: 1px !important;
  padding-left: 1px !important;
  margin: 0 !important;
}
.popoverText {
  font-family: Arial, sans-serif;
  font-size: 11px;
}
</style>
