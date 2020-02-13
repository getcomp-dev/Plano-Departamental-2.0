<template>
  <div class="periodo">
    <div class="horario" v-if="horarioVazio(Eletivas)">
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
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 1)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'1-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 7)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'2-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 13)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'3-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 19)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'4-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 25)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'5-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'6-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 8)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'7-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 14)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'8-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 20)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'9-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 26)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'10-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'11-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 9)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'12-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 15)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'13-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 21)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'14-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 27)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'15-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'16-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 10)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'17-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 16)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'18-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 22)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'19-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 28)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'20-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'21-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 34)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'22-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 36)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'23-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 38)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'24-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 40)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'25-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'26-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 35)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'27-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 37)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'28-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 39)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'29-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 41)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'30-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'31-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 11)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'32-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 17)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'33-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 23)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'34-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 29)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'35-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
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
                  :key="'36-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 12)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'37-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 18)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'38-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 24)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'39-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
          <td class="tg-0lax">
            <template v-for="turma in Eletivas" v-if="checkTurmaHorario(turma, 30)">
              <template v-for="disciplina in Disciplinas" v-if="turma.Disciplina === disciplina.id">
                <div
                  :key="'40-'+turma.Disciplina+'-'+disciplina.id"
                  v-b-popover.html.hover.top="{customClass: 'popoverText', content:disciplina.nome + ' <br> ' + professor(turma) }"
                >{{disciplina.codigo}}</div>
              </template>
            </template>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  name: "HorarioEletivas",
  props: {
    Eletivas: Array
  },

  methods: {
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
h5 {
  font-size: 12px;
  font-weight: normal;
}
.horario {
  float: left;
  margin-left: auto;
  margin-right: auto;
}

.periodo {
  display: inline;
  width: 72px;
  height: 24px;
  position: relative;
}

.tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
  margin-bottom: 20px !important;
  margin-right: 20px !important;
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
  width: 49px !important;
}

.popoverText {
  font-family: Arial, sans-serif;
  font-size: 11px;
}
</style>