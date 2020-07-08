<template>
  <tr
    v-if="Admin"
    class="turmarow max-content"
    :style="{ 'background-color': turma.perfilCor }"
  >
    <td style="width: 25px">
      <input
        type="checkbox"
        class=" form-check-input position-static m-0"
        name="ativa"
        :v-model="ativo"
        @click="checkDelete(turma)"
      />
    </td>
    <td style="width:40px" class="p-0">
      <button
        class="btn-table"
        @click.stop="$emit('handle-click-in-edit', turma)"
      >
        <i class="fas fa-edit btn-table-icon"></i>
      </button>
    </td>
    <td style="width: 55px" class="less-padding">
      <select
        id="2periodo"
        v-model="turmaForm.periodo"
        @change="checkHorariosPeriodo()"
      >
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
    </td>
    <td style="width: 80px" class="less-padding">
      {{ turma.perfilAbreviacao }}
    </td>
    <td style="width:80px" class="less-padding">
      {{ currentDisciplina.codigo }}
    </td>
    <td style="width: 330px" class="t-start">
      {{ currentDisciplina.nome }}
    </td>
    <td style="width: 25px">
      {{ totalCreditos }}
    </td>
    <td style="width: 45px">
      <input
        type="text"
        class="input-letra"
        style="text-transform: uppercase"
        v-model="turmaForm.letra"
        @keypress="onlyA_Z($event), limitLenght($event)"
        @blur="editTurma(turma)"
      />
    </td>
    <td style="width: 130px;" class="less-padding">
      <select
        type="text"
        id="docente1"
        v-model="turmaForm.Docente1"
        @change="checkDocente()"
      >
        <option v-if="Docentes.length === 0" type="text" value=""
          >Nenhum Docente Encontrado</option
        >
        <option v-else type="text" value=""></option>
        <option
          v-for="docente in Docentes"
          :key="'1-docente-id' + docente.id"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>

      <select
        type="text"
        id="docente2"
        v-model="turmaForm.Docente2"
        @change="checkDocente()"
      >
        <option v-if="Docentes.length === 0" type="text" value=""
          >Nenhum Docente Encontrado</option
        >
        <option v-else type="text" value=""></option>
        <option
          v-for="docente in Docentes"
          :key="'2-docente-id' + docente.id"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>
    </td>
    <td style="width: 80px;" class="less-padding">
      <select
        type="text"
        id="SelectTurno"
        v-model="turmaForm.turno1"
        @change="editTurma(turma)"
      >
        <template v-if="disciplinaIsIntegralEAD">
          <option value="EAD">EAD</option>
        </template>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </td>
    <td style="width:85px" class="less-padding">
      <select
        type="text"
        id="horario1"
        v-model="turmaForm.Horario1"
        @change="checkHorario(1)"
      >
        <option v-if="!disciplinaIsIntegralEAD" type="text" value=""></option>

        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="'1-horarioEAD-id' + horario.id"
          :value="horario.id"
          >{{ horario.horario }}</option
        >
      </select>

      <select
        v-if="hasMoreThan4Creditos"
        type="text"
        id="horario2"
        v-model="turmaForm.Horario2"
        @change="checkHorario(2)"
      >
        <template v-if="disciplinaIsParcialEAD">
          <option
            v-for="horario in HorariosEAD"
            :key="'2-horarioEAD-id' + horario.id"
            :value="horario.id"
            >{{ horario.horario }}</option
          >
        </template>
        <template v-else>
          <option v-if="!disciplinaIsIntegralEAD" type="text" value=""></option>

          <option
            v-for="horario in HorariosFiltredByTurno"
            :key="'1-horarioEAD-id' + horario.id"
            :value="horario.id"
            >{{ horario.horario }}</option
          >
        </template>
      </select>
    </td>
    <td style="width: 95px" class="less-padding">
      <template v-if="!disciplinaIsIntegralEAD">
        <select
          type="text"
          id="sala1"
          v-model="turmaForm.Sala1"
          @change="checkSala()"
        >
          <option v-if="Salas.length === 0" type="text" value=""
            >Nenhuma Sala Encontrada</option
          >
          <option v-else value=""></option>
          <option
            v-for="sala in Salas"
            :key="'1-sala-id' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
        <select
          v-if="hasMoreThan4Creditos && currentDisciplina.ead === 0"
          type="text"
          id="sala2"
          v-model="turmaForm.Sala2"
          @change="checkSala()"
        >
          <option v-if="Salas.length === 0" type="text" value=""
            >Nenhuma Sala Encontrada</option
          >
          <option v-else value=""></option>
          <option
            v-for="sala in Salas"
            :key="'2-sala-id' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
      </template>
    </td>
    <td style="width:45px" class="less-padding">
      <div style="height: 43px;" class="py-1">
        <span style="font-weight:bold">
          {{ totalPedidosPeriodizados + totalPedidosNaoPeriodizados }}</span
        >
        <br />
        <p class="mt-1">
          {{ totalPedidosPeriodizados }}+{{ totalPedidosNaoPeriodizados }}
        </p>
      </div>
    </td>
    <template v-for="curso in cursosAtivados">
      <td class="p-0" style="width:35px;" :key="'1-id-curso' + curso.id">
        <template v-for="(pedido, index) in Pedidos">
          <template v-if="pedido.Curso === curso.id">
            <turmaPedidos
              :key="'index' + index"
              v-bind:index="index"
              v-bind:turma="turma"
            ></turmaPedidos>
          </template>
        </template>
      </td>
    </template>
  </tr>
</template>

<script>
import turmaService from "@/common/services/turma";
import turmaPedidos from "./TurmaPedidos.vue";
import _ from "lodash";

const emptyTurma = {
  id: null,
  periodo: null,
  letra: null,
  turno1: null,
  turno2: null,
  Disciplina: null,
  Docente1: null,
  Docente2: null,
  Horario1: null,
  Horario2: null,
  Sala1: null,
  Sala2: null,
};

export default {
  name: "TurmaRow",
  props: {
    turma: Object,
    cursosAtivados: Array,
  },
  data() {
    return {
      ativo: false,
      valorAtual: undefined,
      currentData: undefined,
      turmaForm: _.clone(emptyTurma),
    };
  },
  components: {
    turmaPedidos,
  },
  mounted() {
    this.turmaForm = _.clone(this.turma);
    this.currentData = _.clone(this.turmaForm);
    this.setInputs();
  },

  methods: {
    setInputs() {
      if (this.currentDisciplina.ead === 1) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (this.currentDisciplina.ead === 2) {
        this.turmaForm.Horario2 = 31;
      }
    },
    findDisciplinaById(id) {
      return _.find(this.Disciplinas, (d) => d.id == id);
    },
    limitLenght($event) {
      if ($event.target.value.length >= 3) $event.preventDefault();
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    checkHorariosPeriodo() {
      if (!this.checkHorarioDocente(1) && !this.checkHorarioSala(1)) {
        if (!this.checkHorarioDocente(2) && !this.checkHorarioSala(2)) {
          this.editTurma();
        } else {
          this.turmaForm.Horario2 = this.currentData.Horario2;
          this.turmaForm.periodo = this.currentData.periodo;
        }
      } else {
        this.turmaForm.Horario1 = this.currentData.Horario1;
        this.turmaForm.periodo = this.currentData.periodo;
      }
    },
    checkHorario(horario) {
      if (
        !this.checkHorarioDocente(horario) &&
        !this.checkHorarioSala(horario)
      ) {
        this.editTurma();
      } else {
        if (horario === 1) this.turmaForm.Horario1 = this.currentData.Horario1;
        else this.turmaForm.Horario2 = this.currentData.Horario2;
      }
    },
    checkDocente() {
      let d1 = !this.checkHorarioDocente(1),
        d2 = !this.checkHorarioDocente(2);
      if (d1 && d2) {
        this.editTurma();
      } else {
        if (!d1) this.turmaForm.Docente1 = this.currentData.Docente1;
        if (!d2) this.turmaForm.Docente2 = this.currentData.Docente2;
      }
    },

    checkSala() {
      let s1 = !this.checkHorarioSala(1),
        s2 = !this.checkHorarioSala(2);
      if (s1 && s2) {
        this.editTurma();
      } else {
        if (!s1) this.turmaForm.Sala1 = this.currentData.Sala1;
        if (!s2) this.turmaForm.Sala2 = this.currentData.Sala2;
      }
    },

    checkHorarioDocente(horario) {
      let horarios1618 = [4, 10, 16, 22, 28];
      let horarios1719 = [32, 34, 36, 38, 40];
      let horarios1820 = [33, 35, 37, 39, 41];
      let horarios1921 = [5, 11, 17, 23, 29];
      if (this.turmaForm.Horario1 === "") this.turmaForm.Horario1 = null;
      if (this.turmaForm.Horario2 === "") this.turmaForm.Horario2 = null;
      if (this.turmaForm.Docente1 === "") this.turmaForm.Docente1 = null;
      if (this.turmaForm.Docente2 === "") this.turmaForm.Docente2 = null;

      if (
        (!_.isNull(this.turmaForm.Horario1) ||
          !_.isNull(this.turmaForm.Horario2)) &&
        (!_.isNull(this.turmaForm.Docente1) ||
          !_.isNull(this.turmaForm.Docente2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          _.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1618(1, 1)) return true;
          if (this.checkHorarioDocente1618(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1618(2, 1)) return true;
          if (this.checkHorarioDocente1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1719(1, 1)) return true;
          if (this.checkHorarioDocente1719(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1719(2, 1)) return true;
          if (this.checkHorarioDocente1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1820(1, 1)) return true;
          if (this.checkHorarioDocente1820(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1820(2, 1)) return true;
          if (this.checkHorarioDocente1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioDocente1921(1, 1)) return true;
          if (this.checkHorarioDocente1921(1, 2)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1921, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioDocente1921(2, 1)) return true;
          if (this.checkHorarioDocente1921(2, 2)) return true;
        } else {
          if (horario === 1) {
            if (this.checkHorarioDocenteGeral(1, 1)) return true;
            if (this.checkHorarioDocenteGeral(1, 2)) return true;
          } else {
            if (this.checkHorarioDocenteGeral(2, 1)) return true;
            if (this.checkHorarioDocenteGeral(2, 2)) return true;
          }
        }
      }
      return false;
    },

    notifyHorarioDocente(horario, docente) {
      let h =
        horario === 1
          ? _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario1,
            ])
          : _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario2,
            ]);
      let d =
        docente === 1
          ? _.find(this.$store.state.docente.Docentes, [
              "id",
              this.turmaForm.Docente1,
            ])
          : _.find(this.$store.state.docente.Docentes, [
              "id",
              this.turmaForm.Docente2,
            ]);
      let text = `Conflito no horário ${h.horario} com o docente ${d.apelido}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },

    checkHorarioDocente1618(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocente1719(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario1 ||
            this.turmaForm.Horario1 + 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario2 ||
            this.turmaForm.Horario1 + 1 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario1 ||
            this.turmaForm.Horario2 + 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario2 ||
            this.turmaForm.Horario2 + 1 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocente1820(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario1 ||
            this.turmaForm.Horario1 - 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario2 ||
            this.turmaForm.Horario1 - 1 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario1 ||
            this.turmaForm.Horario2 - 1 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario2 ||
            this.turmaForm.Horario2 - 1 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocente1921(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            this.turmaForm.Horario1 === t.Horario1 ||
            33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario1 === t.Horario2 ||
            33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario2;
        } else {
          h1 =
            this.turmaForm.Horario2 === t.Horario1 ||
            33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario1;
          h2 =
            this.turmaForm.Horario2 === t.Horario2 ||
            33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioDocenteGeral(horario, docente) {
      let conflitos = _.filter(this.$store.state.turma.Turmas, (t) => {
        if (this.turmaForm.periodo != t.periodo) {
          return false;
        }
        let h1, h2;
        if (horario === 1) {
          h1 =
            !_.isNull(this.turmaForm.Horario1) &&
            this.turmaForm.Horario1 === t.Horario1;
          h2 =
            !_.isNull(this.turmaForm.Horario1) &&
            this.turmaForm.Horario1 === t.Horario2;
        } else {
          h1 =
            !_.isNull(this.turmaForm.Horario2) &&
            this.turmaForm.Horario2 === t.Horario1;
          h2 =
            !_.isNull(this.turmaForm.Horario2) &&
            this.turmaForm.Horario2 === t.Horario2;
        }
        let d1, d2;
        if (docente === 1) {
          d1 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente1) &&
            this.turmaForm.Docente1 === t.Docente2;
        } else {
          d1 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente1;
          d2 =
            !_.isNull(this.turmaForm.Docente2) &&
            this.turmaForm.Docente2 === t.Docente2;
        }

        return ((h1 || h2) && d1) || ((h1 || h2) && d2);
      });
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioDocente(horario, docente);

        return true;
      }
      return false;
    },

    checkHorarioSala(horario) {
      let horarios1618 = [4, 10, 16, 22, 28];
      let horarios1719 = [32, 34, 36, 38, 40];
      let horarios1820 = [33, 35, 37, 39, 41];
      let horarios1921 = [5, 11, 17, 23, 29];
      if (this.turmaForm.Horario1 === "") this.turmaForm.Horario1 = null;
      if (this.turmaForm.Horario2 === "") this.turmaForm.Horario2 = null;
      if (this.turmaForm.Sala1 === "") this.turmaForm.Sala1 = null;
      if (this.turmaForm.Sala2 === "") this.turmaForm.Sala2 = null;
      if (
        (!_.isNull(this.turmaForm.Horario1) ||
          !_.isNull(this.turmaForm.Horario2)) &&
        (!_.isNull(this.turmaForm.Sala1) || !_.isNull(this.turmaForm.Sala2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          _.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1618(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1719(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1820(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1921(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1921, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1921(2, 2)) return true;
        } else {
          if (horario == 1) {
            if (this.checkHorarioSalaGeral(1, 1)) return true;
          } else {
            if (this.checkHorarioSalaGeral(2, 2)) return true;
          }
        }
      }
      return false;
    },

    notifyHorarioSala(horario, sala) {
      let h =
        horario === 1
          ? _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario1,
            ])
          : _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario2,
            ]);
      let s =
        sala === 1
          ? _.find(this.$store.state.sala.Salas, ["id", this.turmaForm.Sala1])
          : _.find(this.$store.state.sala.Salas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito no horário ${h.horario} com a sala ${s.nome}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },

    checkHorarioSala1618(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1719(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario1 ||
              this.turmaForm.Horario1 + 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario2 ||
              this.turmaForm.Horario1 + 1 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario1 ||
              this.turmaForm.Horario2 + 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario2 ||
              this.turmaForm.Horario2 + 1 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1820(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario1 ||
              this.turmaForm.Horario1 - 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario2 ||
              this.turmaForm.Horario1 - 1 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario1 ||
              this.turmaForm.Horario2 - 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario2 ||
              this.turmaForm.Horario2 - 1 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1921(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSalaGeral(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              !_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario1;
            h2 =
              !_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario2;
          } else {
            h1 =
              !_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario1;
            h2 =
              !_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },
    changeTurmaEmptyStringToNull(turma) {
      if (turma.Docente1 === "") turma.Docente1 = null;
      if (turma.Docente2 === "") turma.Docente2 = null;
      if (turma.Horario1 === "") turma.Horario1 = null;
      if (turma.Horario2 === "") turma.Horario2 = null;
      if (turma.Sala1 === "") turma.Sala111 = null;
      if (turma.Sala2 === "") turma.Sala2 = null;
      if (turma.turno1 === "") turma.turno1 = null;
      if (turma.letra === "") turma.letra = this.currentData.letra;
    },
    editTurma() {
      this.changeTurmaEmptyStringToNull(this.turmaForm);

      turmaService
        .update(this.turma.id, this.turmaForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success",
          });
          this.currentData = _.clone(this.turmaForm);
        })
        .catch((error) => {
          let errormsg = _.find(error.response.data.errors, {
            field: "unique_name",
          })
            ? "A combinação de disciplina, semestre e turma deve ser única"
            : "";
          this.$notify({
            group: "general",
            title: `Erro ao atualizar Turma`,
            text: errormsg,
            type: "error",
          });
          this.turmaForm = this.turma;
        });
    },
    checkDelete(turma) {
      this.$store.commit("checkDelete", { Turma: turma });
    },
  },
  watch: {
    turma() {
      this.turmaForm = _.clone(this.turma);
    },
  },
  computed: {
    totalPedidosPeriodizados() {
      if (!this.Pedidos) return 0;
      let total = 0;
      for (var p = 0; p < this.Pedidos.length; p++) {
        total += parseInt(this.Pedidos[p].vagasPeriodizadas, 10);
      }
      return total;
    },
    totalPedidosNaoPeriodizados() {
      if (!this.Pedidos) return 0;
      let total = 0;
      for (var p = 0; p < this.Pedidos.length; p++) {
        total += parseInt(this.Pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return total;
    },

    disciplinaIsIntegralEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 1 : false;
    },
    disciplinaIsParcialEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 2 : false;
    },
    currentDisciplina() {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turma.Disciplina,
      });
    },

    totalCreditos() {
      return (
        parseInt(this.currentDisciplina.cargaTeorica) +
        parseInt(this.currentDisciplina.cargaPratica)
      );
    },

    hasMoreThan4Creditos() {
      return this.totalCreditos >= 4;
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },
    HorariosFiltredByCadastroEAD() {
      let horariosResultante = this.Horarios;

      if (this.currentDisciplina != undefined) {
        const cadastroEAD = this.currentDisciplina.ead;
        if (cadastroEAD === 1) {
          horariosResultante = _.filter(horariosResultante, { id: 31 });
        } else {
          horariosResultante = _.filter(
            horariosResultante,
            (horario) => horario.id != 31
          );
        }
      }
      return horariosResultante;
    },
    HorariosFiltredByTurno() {
      const turnoSelected = this.turmaForm.turno1;
      let horarioResultante = this.HorariosFiltredByCadastroEAD;

      if (turnoSelected === "EAD") {
        horarioResultante = _.filter(horarioResultante, { id: 31 });
      } else if (turnoSelected === "Diurno") {
        horarioResultante = _.filter(horarioResultante, function(h) {
          if (parseInt(h.horario.slice(3, 5)) < 17) return true;
          if (h.id === 31) return true;
        });
      } else if (turnoSelected === "Noturno") {
        horarioResultante = _.filter(horarioResultante, function(h) {
          if (parseInt(h.horario.slice(3, 5)) >= 17) return true;
          if (h.id === 31) return true;
        });
      }
      return _.orderBy(horarioResultante, "horario");
    },
    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    HorariosEAD() {
      return _.filter(this.$store.state.horario.Horarios, { id: 31 });
    },
    Deletar() {
      return this.$store.state.turma.Deletar;
    },
    Pedidos() {
      return this.$store.state.pedido.Pedidos[this.turma.id];
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    },
  },
};
</script>

<style scoped>
.turmarow {
  font-size: 11px;
}
.turmarow td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}

.turmarow select,
.turmarow input {
  font-size: 11px !important;
  border: 1px solid #414141 !important;
  color: #414141;
  border-radius: 0px !important;
}
.turmarow select {
  height: 18px !important;
  width: 100% !important;
}
.turmarow select + select {
  margin-top: 2px !important;
}
.turmarow input[type="checkbox"] {
  width: 14px !important;
  height: 14px !important;
  margin: 0;
  margin-top: 5px !important;
}
.turmarow .input-letra {
  margin: 0;
  margin-top: 4px !important;
  height: 18px;
  width: 30px;
  text-align: center;
}

.turmarow .less-padding {
  padding: 0 2px;
}

.btn-table {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
}
.btn-table-icon {
  font-size: 12px;
}
</style>
