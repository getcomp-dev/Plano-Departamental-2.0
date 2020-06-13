<template>
  <tr class="turmarow">
    <td style="width:25px">
      <input
        type="checkbox"
        class="form-check-input position-static m-0"
        name="ativa"
        value="true"
        v-on:click="checkDelete(turma)"
        v-model="ativo"
      />
    </td>
    <td style="width:55px" class="less-padding">
      <select
        id="2periodo"
        v-model="turmaForm.periodo"
        v-on:change="editTurma(turmaForm)"
      >
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
    </td>
    <td style="width:70px">
      {{ turmaForm.disciplinaCodigo }}
    </td>

    <td style="width: 330px" class="less-padding">
      <select
        type="text"
        id="disciplina"
        v-model="turmaForm.Disciplina"
        v-on:change="editTurma(turmaForm)"
      >
        <option
          v-for="disciplina in options.DisciplinasExternas"
          :key="disciplina.id"
          :value="disciplina.id"
          >{{ disciplina.nome }}</option
        >
      </select>
    </td>

    <td style="width: 25px">
      {{ totalCarga }}
    </td>

    <td style="width: 35px;">
      <input
        type="text"
        class="input-letra"
        v-model="turmaForm.letra"
        v-on:blur="editTurma(turmaForm)"
      />
    </td>

    <td style="width: 80px;" class="less-padding">
      <select
        type="text"
        id="turno1"
        v-model="turmaForm.turno1"
        v-on:change="editTurma(turmaForm)"
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
        style="margin-bottom: 1px;"
        id="horario1"
        v-model="turmaForm.Horario1"
      >
        <!-- v-on:change="checkHorario(1)" -->
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id"
          :value="horario.id"
          >{{ horario.horario }}</option
        >
      </select>
      <select
        v-if="hasMoreThan4Creditos"
        type="text"
        id="horario2"
        v-model="turmaForm.Horario2"
      >
        <!-- v-on:change="checkHorario(2)" -->
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id"
          :value="horario.id"
          >{{ horario.horario }}</option
        >
      </select>
    </td>

    <td style="width: 95px" class="less-padding">
      <template v-if="!disciplinaIsIntegralEAD">
        <select
          type="text"
          style="margin-bottom: 1px;"
          id="sala1"
          v-model="turmaForm.Sala1"
          v-on:change="checkSala(1)"
        >
          <option v-for="sala in Salas" :key="sala.id" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>
        <select
          v-if="hasMoreThan4Creditos"
          type="text"
          id="sala2"
          v-model="turmaForm.Sala2"
          v-on:change="checkSala(2)"
        >
          <option v-for="sala in Salas" :key="sala.id" :value="sala.id">
            {{ sala.nome }}</option
          >
        </select>
      </template>
    </td>

    <td style="width: 40px;">
      <div style="height: 43px;" class="py-1">
        <span style="font-weight:bold">
          {{ totalPedidosNaoPeriodizados + totalPedidosPeriodizados }}</span
        >
        <br />
        <p class="mt-1">
          {{ totalPedidosPeriodizados }}+{{ totalPedidosNaoPeriodizados }}
        </p>
      </div>
    </td>

    <td
      v-for="indice in IndicesPedidos"
      :key="indice"
      style="width:35px"
      class="p-0"
    >
      <TurmaExternaPedidos :index="indice" :turma="turma" />
    </td>
  </tr>
</template>
<script>
import _ from "lodash";
import turmaExternaService from "@/common/services/turmaExterna";
import pedidoExternoService from "@/common/services/pedidoExterno";
import TurmaExternaPedidos from "./TurmaExternaPedidos.vue";

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
    turma: { type: Object, required: true },
    options: { type: Object },
  },
  components: {
    TurmaExternaPedidos,
  },
  data() {
    return {
      ativo: false,
      turmaForm: _.clone(emptyTurma),
      currentData: undefined,
    };
  },

  mounted() {
    this.turmaForm = _.clone(this.turma);
    this.currentData = this.TurmaForm;
  },

  methods: {
    isEmpty(value) {
      return value === "" || value === undefined ? true : false;
    },
    convertEmptyToNull(turma) {
      Object.keys(turma).forEach((key) => {
        if (this.isEmpty(turma[key])) turma[key] = null;
      });
    },
    validateTurma(turma) {
      if (turma.Disciplina === null || turma.letra === null) {
        this.$notify({
          group: "general",
          type: "error",
          title: "Erro!",
          text: "Cadastro da turma inválido ou incompleto.",
        });
        return false;
      }
      return true;
    },
    editTurma(turma) {
      const newTurma = _.clone(turma);
      this.convertEmptyToNull(newTurma);

      if (!this.validateTurma(newTurma)) {
        this.turmaForm = _.clone(this.turma);
        return;
      }

      if (turma.turno1 === "EAD") {
        turma.Horario1 = 31;
        if (turma.Horario2 > 0) turma.Horario2 = null;
      }

      turmaExternaService
        .update(newTurma.id, newTurma)
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
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    checkDelete(turma) {
      this.$store.commit("checkDeleteExterno", { Turma: turma });
    },

    editPedido(pedido) {
      pedidoExternoService
        .update(pedido.Curso, pedido.Turma, pedido)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O pedido foi atualizado!`,
            type: "success",
          });
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Pedido</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    checkHorario(horario) {
      if (!this.checkHorarioSala(horario)) this.editTurma(this.turmaForm);
      else {
        if (horario === 1) this.turmaForm.Horario1 = this.currentData.Horario1;
        else this.turmaForm.Horario2 = this.currentData.Horario2;
      }
    },

    checkSala(sala) {
      if (!this.checkHorarioSala(sala)) this.editTurma(this.turmaForm);
      else {
        if (sala === 1) this.turmaForm.Sala1 = this.currentData.Sala1;
        else this.turmaForm.Sala2 = this.currentData.Sala2;
      }
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
  },

  computed: {
    totalPedidosPeriodizados() {
      let total = 0;
      for (let p = 0; p < this.Pedidos.length; p++) {
        total += parseInt(this.Pedidos[p].vagasPeriodizadas, 10);
      }
      return total;
    },
    totalPedidosNaoPeriodizados() {
      let total = 0;
      for (let p = 0; p < this.Pedidos.length; p++) {
        total += parseInt(this.Pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return total;
    },
    disciplinaIsIntegralEAD() {
      return this.currentDisciplina.ead === 1;
    },
    hasMoreThan4Creditos() {
      return this.totalCarga >= 4;
    },
    disciplinaIsParcialEAD() {
      return this.currentDisciplina.ead === 2;
    },
    currentDisciplina() {
      return _.find(this.options.DisciplinasExternas, {
        id: this.turma.Disciplina,
      });
    },
    totalCarga() {
      return (
        parseInt(this.currentDisciplina.cargaTeorica) +
        parseInt(this.currentDisciplina.cargaPratica)
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

      return horarioResultante;
    },
    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    IndicesPedidos() {
      const indicesResultantes = [];

      _.forEach(this.Pedidos, (pedido, index) => {
        const cursoFounded = _.find(
          this.options.CursosDCC,
          (curso) => curso.id === pedido.Curso
        );

        if (cursoFounded) indicesResultantes.push(index);
      });
      return indicesResultantes;
    },
    Pedidos() {
      return this.$store.state.pedidoExterno.Pedidos[this.turma.id];
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
  },
};
</script>

<style scoped>
.turmarow {
  font-size: 11px !important;
}
.turmarow td {
  margin: 0 !important;
  padding: 0 5px;
  /* height: 43px !important; */
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}
.turmarow tbody tr input[type="checkbox"] {
  width: 14px !important;
  height: 14px !important;
  text-align: center !important;
  margin: 0;
  margin-top: 5px !important;
  margin-bottom: auto !important;
}
.turmarow .less-padding {
  padding: 0 2px;
}
.turmarow select {
  width: 100% !important;
  height: 18px;
}
.input-letra {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  text-align: center !important;
  height: 25px !important;
  width: 20px;
}
</style>
