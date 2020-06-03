<template>
  <div class="turmarow max-content">
    <td>
      <div style="width: 25px;">
        <input
          :disabled="Admin ? false : true"
          type="checkbox"
          class="form-check-input position-static m-0"
          name="ativa"
          value="true"
          v-model="ativo"
          v-on:click="checkDelete(turma)"
        />
      </div>
    </td>
    <td>
      <div style="width:40px" class="div-btn">
        <i
          v-if="Admin"
          @click="$emit('handle-click-in-edit', turma)"
          class="fas fa-edit btn-table clickable"
        ></i>
      </div>
    </td>
    <td>
      <div style="width: 50px;">
        <select
          :disabled="Admin ? false : true"
          id="2periodo"
          style="width: 45px;"
          v-model="turmaForm.periodo"
          v-on:change="checkHorariosPeriodo()"
        >
          <option value="1">1</option>
          <option value="3">3</option>
        </select>
      </div>
    </td>
    <td>
      <p style="width: 80px">
        {{ turma.perfilAbreviacao }}
      </p>
    </td>
    <td>
      <div style="width:70px;">
        <p style="width:70px">
          {{ currentDisciplina.codigo }}
        </p>
      </div>
    </td>
    <td>
      <p style="width: 330px;" class="t-start">
        {{ currentDisciplina.nome }}
      </p>
    </td>
    <td>
      <div style="width: 18px;">
        <p style="width:18px;">
          {{ totalCarga }}
        </p>
      </div>
    </td>
    <td>
      <div style="width: 40px">
        <input
          :disabled="Admin ? false : true"
          type="text"
          class="input-letra"
          style="text-transform: uppercase"
          v-model="turmaForm.letra"
          @keypress="onlyA_Z"
          v-on:blur="editTurma(turma)"
        />
      </div>
    </td>
    <td>
      <div style="width: 130px;">
        <select
          :disabled="Admin ? false : true"
          type="text"
          style="width:125px; margin-bottom:1px;"
          id="docente1"
          v-model="turmaForm.Docente1"
          v-on:change="checkDocente()"
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
          :disabled="Admin ? false : true"
          type="text"
          style="width:125px"
          id="docente2"
          v-model="turmaForm.Docente2"
          v-on:change="checkDocente()"
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
      </div>
    </td>
    <td>
      <div style="width: 80px;">
        <select
          :disabled="Admin ? false : true"
          type="text"
          style="width: 75px"
          id="SelectTurno"
          v-model="turmaForm.turno1"
          v-on:change="editTurma(turma)"
        >
          <template v-if="disciplinaIsIntegralEAD">
            <option value="EAD">EAD</option>
          </template>
          <template v-else>
            <option value="Diurno">Diurno</option>
            <option value="Noturno">Noturno</option>
          </template>
        </select>
      </div>
    </td>
    <td>
      <div style="width:80px">
        <select
          :disabled="Admin ? false : true"
          type="text"
          style="width: 75px; margin-bottom:1px"
          id="horario1"
          v-model="turmaForm.Horario1"
          v-on:change="checkHorario(1)"
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
          :disabled="Admin ? false : true"
          type="text"
          style="width: 75px"
          id="horario2"
          v-model="turmaForm.Horario2"
          v-on:change="checkHorario(2)"
        >
          <template v-if="isParcialEAD">
            <option
              v-for="horario in HorariosEAD"
              :key="'2-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
          <template v-else>
            <option
              v-if="!disciplinaIsIntegralEAD"
              type="text"
              value=""
            ></option>

            <option
              v-for="horario in HorariosFiltredByTurno"
              :key="'1-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 100px">
        <template v-if="!disciplinaIsIntegralEAD">
          <select
            :disabled="Admin ? false : true"
            type="text"
            style="width:95px; margin-bottom:1px;"
            id="sala1"
            v-model="turmaForm.Sala1"
            v-on:change="checkSala()"
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
            :disabled="Admin ? false : true"
            type="text"
            style="width: 95px"
            id="sala2"
            v-model="turmaForm.Sala2"
            v-on:change="checkSala()"
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
      </div>
    </td>

    <td>
      <div style="width:40px; height:43px">
        <p style="width: 40px; font-weight: bold;" class="py-1">
          {{ totalPedidos() }}
        </p>
        <p style="width: 40px;">
          {{ totalPedidosPeriodizados }}+{{ totalPedidosNaoPeriodizados }}
        </p>
      </div>
    </td>

    <template v-for="curso in cursosSelecteds">
      <td :key="'1-id-curso' + curso.id">
        <template v-for="(pedido, index) in Pedidos">
          <template v-if="pedido.Curso === curso.id">
            <turmaPedido
              :key="'index' + index"
              v-bind:index="index"
              v-bind:turma="turma"
            ></turmaPedido>
          </template>
        </template>
      </td>
    </template>
  </div>
</template>
<script>
import turmaService from "@/common/services/turma";
import turmaPedido from "./TurmaPedido.vue";
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
    cursosSelecteds: Array,
  },
  data() {
    return {
      ativo: false,
      valorAtual: undefined,
      turmaForm: _.clone(emptyTurma),
      currentData: undefined,
    };
  },
  components: {
    turmaPedido,
  },
  mounted() {
    this.turmaForm = _.clone(this.turma);
    this.currentData = _.clone(this.turmaForm);
    this.autoSetInputs();
  },

  methods: {
    autoSetInputs() {
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
    onlyA_Z($event) {
      let key = $event.key ? $event.key : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    totalPedidos() {
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
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
    isEmpty(value) {
      return value === null || value === undefined || value === "";
    },
    changeTurmaEmptyStringToNull(turma) {
      if (turma.Docente1 === "") turma.Docente1 = null;
      if (turma.Docente2 === "") turma.Docente2 = null;
      if (turma.Horario1 === "") turma.Horario1 = null;
      if (turma.Horario2 === "") turma.Horario2 = null;
      if (turma.Sala1 === "") turma.Sala111 = null;
      if (turma.Sala2 === "") turma.Sala2 = null;
      if (turma.turno1 === "") turma.turno1 = null;
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
          this.error = "<b>Erro ao atualizar Turma</b>";
          //Erro frequente!!

          // this.$notify({
          //   group: "general",
          //   title: "Erro!",
          //   text:
          //     "Erro ao atualizar Turma, verifique se ja não existe uma turma com a mesma letra alocada",
          //   type: "error",
          // });
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
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
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
      }
      return t;
    },

    totalPedidosNaoPeriodizados() {
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
    },
    disciplinaIsIntegralEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 1 : false;
    },
    currentDisciplina() {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turma.Disciplina,
      });
    },

    totalCarga() {
      return (
        parseInt(this.currentDisciplina.cargaTeorica) +
        parseInt(this.currentDisciplina.cargaPratica)
      );
    },

    hasMoreThan4Creditos() {
      return this.totalCarga >= 4;
    },

    isParcialEAD() {
      return this.currentDisciplina.ead === 2;
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
    //filtro do cadastro EAD da disciplina
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

    // HorariosDiurnos() {
    //   return _.orderBy(
    //     _.filter(this.$store.state.horario.Horarios, function(h) {
    //       if (parseInt(h.horario.slice(3, 5)) < 17) return true;
    //       if (h.id === 31) return true;
    //     }),
    //     "horario"
    //   );
    // },

    // HorariosNoturnos() {
    //   return _.orderBy(
    //     _.filter(this.$store.state.horario.Horarios, function(h) {
    //       if (parseInt(h.horario.slice(3, 5)) >= 17) return true;
    //       if (h.id === 31) return true;
    //     }),
    //     "horario"
    //   );
    // },

    Pedidos() {
      return this.$store.state.pedido.Pedidos[this.turma.id];
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
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
td {
  text-align: center !important;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 40px !important;
}
p {
  margin-bottom: 0 !important;
  text-align: center;
  padding: 0 5px;
}
select {
  height: 18px;
}

.input-letra {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px;
  width: 20px;
  text-align: center !important;
}
input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 15px;
  width: 15px;
}
.input-turno {
  height: 18px;
  text-align: center;
  padding: 0 2px;
  cursor: default;
}
.div-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.btn-table {
  font-size: 12px;
  margin: 0 !important;
  margin-left: 2px !important;
  padding: 0 !important;
}
</style>
