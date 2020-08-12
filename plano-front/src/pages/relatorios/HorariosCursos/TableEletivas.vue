<template>
  <div class="container-horarios pl-1">
    <div class="div-table col p-0">
      <table class="tg" v-if="horarioVazio(Eletivas)">
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
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 1)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('1') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 7)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('2') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 13)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('3') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 19)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('4') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 25)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('5') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">10-12</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 2)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('6') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 8)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('7') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 14)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('8') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 20)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('9') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 26)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('10') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">14-16</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 3)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('11') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 9)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('12') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 15)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('13') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 21)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('14') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 27)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('15') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">16-18</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 4)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('16') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 10)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('17') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 16)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('18') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 22)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('19') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 28)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('20') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">17-19</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 32)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('21') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 34)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('22') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 36)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('23') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 38)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('24') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 40)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('25') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">18-20</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 33)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('26') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 35)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('27') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 37)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('28') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 39)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('29') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 41)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('30') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">19-21</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 5)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('31') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 11)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('32') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 17)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('33') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 23)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('34') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 29)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('35') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>

        <tr>
          <td class="tg-0lax tg-hor">21-23</td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 6)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('36') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 12)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('37') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 18)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('38') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 24)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('39') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 30)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="generateKey('40') + turma.Disciplina + disciplina.id"
                  v-b-popover.hover.right="{
                    title: disciplina.nome,
                    content: professor(turma),
                  }"
                >{{ disciplina.codigo }}</div>
              </template>
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableEletivas",
  props: {
    Eletivas: { type: Array, required: true },
  },

  methods: {
    generateKey(prefix) {
      return this.$_.uniqueId(prefix);
    },
    horarioVazio(c) {
      if (c.length != 0) return true;
      else return false;
    },
    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
    },
    professor(turma) {
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

  computed: {
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
  },
};
</script>

<style scoped>
.container-horarios {
  width: 100% !important;
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  justify-content: space-between;
  grid-gap: 5px;
  grid-row-gap: 20px;
  margin-bottom: 20px;
  max-width: 1550px !important;
}
.container-horarios .div-table {
  min-width: max-content;
}
.container-horarios td div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1px !important;
}
</style>
