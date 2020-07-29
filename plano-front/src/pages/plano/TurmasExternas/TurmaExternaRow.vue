<template>
  <tr class="turmarow">
    <td style="width: 25px">
      <input
        type="checkbox"
        class="form-check-input position-static m-0"
        @click="selectToDelete(turma)"
      />
    </td>
    <td style="width: 55px" class="less-padding">
      <select v-model="turmaForm.periodo" @change="editTurma()">
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
    </td>
    <td style="width: 70px">
      {{ turmaForm.disciplina.codigo }}
    </td>

    <td style="width: 330px" class="less-padding">
      <select v-model="turmaForm.Disciplina" @change="editTurma()">
        <option
          v-for="disciplina in DisciplinasExternasInPerfis"
          :key="disciplina.id"
          :value="disciplina.id"
          >{{ disciplina.nome }}</option
        >
      </select>
    </td>

    <td style="width: 25px">
      {{ totalCarga }}
    </td>

    <td style="width: 45px;">
      <input
        type="text"
        class="input-letra"
        :value="turmaForm.letra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        @keypress="maskTurmaLetra"
        @change="editTurma()"
      />
    </td>

    <td style="width: 80px;" class="less-padding">
      <select v-model="turmaForm.turno1" @change="editTurma()">
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
      <select v-model="turmaForm.Horario1" @change="checkHorario(1)">
        <option value=""></option>
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id"
          :value="horario.id"
          >{{ horario.horario }}</option
        >
      </select>
      <select
        v-if="totalCarga >= 4"
        v-model="turmaForm.Horario2"
        @change="checkHorario(2)"
      >
        <option value=""></option>
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
        <select v-model="turmaForm.Sala1" @change="checkSala(1)">
          <option value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="'s1' + sala.id"
            :value="sala.id"
          >
            {{ sala.nome }}
          </option>
        </select>
        <select
          v-if="totalCarga >= 4"
          v-model="turmaForm.Sala2"
          @change="checkSala(2)"
        >
          <option value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="'s2' + sala.id"
            :value="sala.id"
          >
            {{ sala.nome }}</option
          >
        </select>
      </template>
    </td>

    <td style="width: 40px;" class="p-0">
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
      <InputsPedidosExternos :index="indice" :turma="turma" />
    </td>
  </tr>
</template>
<script>
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";
import turmaExternaService from "@/common/services/turmaExterna";
import { setEmptyValuesToNull, validateObjectKeys } from "@/common/utils";
import { notification, maskTurmaLetra } from "@/common/mixins";
import InputsPedidosExternos from "./InputsPedidosExternos.vue";

export default {
  name: "TurmaExternaRow",
  props: {
    turma: { type: Object, required: true },
    CursosAtivados: { type: Array, required: true },
  },
  mixins: [notification, maskTurmaLetra],
  components: {
    InputsPedidosExternos,
  },
  data() {
    return {
      turmaForm: _.clone(this.turma),
      currentData: _.clone(this.turma),
    };
  },

  methods: {
    ...mapActions(["setLoadingState"]),

    async editTurma() {
      try {
        this.setLoadingState("partial");

        const newTurma = _.cloneDeepWith(this.turmaForm, setEmptyValuesToNull);
        validateObjectKeys(newTurma, ["letra", "Disciplina"]);

        const response = await turmaExternaService.update(
          newTurma.id,
          newTurma
        );
        this.currentData = _.clone(newTurma);

        this.showNotification({
          type: "success",
          message: `A Turma ${response.Turma.letra} foi atualizada!`,
        });
      } catch (error) {
        this.turmaForm = _.cloneDeep(this.turma);

        const erroMsg = error.response
          ? "A combinação de disciplina, semestre e turma deve ser única."
          : error.message;
        this.showNotification({
          type: "error",
          title: "Erro ao atualizar turma!",
          message: erroMsg,
        });
      } finally {
        this.setLoadingState("completed");
      }
    },

    selectToDelete(turma) {
      this.$store.commit("checkDeleteExterno", { Turma: turma });
    },

    checkHorario(horario) {
      if (!this.checkHorarioSala(horario)) this.editTurma();
      else {
        if (horario === 1) this.turmaForm.Horario1 = this.currentData.Horario1;
        else this.turmaForm.Horario2 = this.currentData.Horario2;
      }
    },
    checkSala(sala) {
      if (!this.checkHorarioSala(sala)) this.editTurma();
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
          ? _.find(this.AllHorarios, ["id", this.turmaForm.Horario1])
          : _.find(this.AllHorarios, ["id", this.turmaForm.Horario2]);
      let s =
        sala === 1
          ? _.find(this.AllSalas, ["id", this.turmaForm.Sala1])
          : _.find(this.AllSalas, ["id", this.turmaForm.Sala2]);

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
    ...mapGetters([
      "DisciplinasExternasInPerfis",
      "AllHorarios",
      "HorariosEAD",
      "HorariosNoturno",
      "HorariosDiurno",
      "AllSalas",
    ]),

    totalPedidosPeriodizados() {
      if (!this.Pedidos) return 0;

      let total = 0;
      for (let i = 0; i < this.currentTurmaPedidos.length; i++) {
        total += parseInt(this.currentTurmaPedidos[i].vagasPeriodizadas, 10);
      }
      return total;
    },

    totalPedidosNaoPeriodizados() {
      if (!this.Pedidos) return 0;

      let total = 0;
      for (let i = 0; i < this.currentTurmaPedidos.length; i++) {
        total += parseInt(this.currentTurmaPedidos[i].vagasNaoPeriodizadas, 10);
      }
      return total;
    },

    disciplinaIsIntegralEAD() {
      return this.turmaForm.disciplina.ead === 1;
    },

    disciplinaIsParcialEAD() {
      return this.turmaForm.disciplina.ead === 2;
    },

    totalCarga() {
      return (
        parseInt(this.turmaForm.disciplina.cargaTeorica) +
        parseInt(this.turmaForm.disciplina.cargaPratica)
      );
    },

    HorariosFiltredByTurno() {
      if (this.disciplinaIsIntegralEAD) return this.HorariosEAD;

      //Se não, verifica o turno selecionado
      switch (this.turmaForm.turno1) {
        case "Noturno":
          return this.HorariosNoturno;
        case "Diurno":
          return this.HorariosDiurno;
        case "EAD":
          return this.HorariosEAD;
        default:
          return _.filter(this.AllHorarios, (horario) => horario.id != 31); //Todos sem EAD
      }
    },

    IndicesPedidos() {
      const indicesResultantes = [];

      _.forEach(this.currentTurmaPedidos, (pedido, index) => {
        const cursoFounded = _.find(
          this.CursosAtivados,
          (curso) => curso.id === pedido.Curso
        );

        if (cursoFounded) indicesResultantes.push(index);
      });
      return indicesResultantes;
    },

    currentTurmaPedidos() {
      return this.$store.state.pedidoExterno.Pedidos[this.turma.id];
    },
  },
  watch: {
    turma() {
      this.turmaForm = _.clone(this.turma);
    },
  },
};
</script>

<style scoped>
.turmarow {
  font-size: 11px !important;
  background-color: #fff !important;
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
  color: #414141 !important;
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
</style>
