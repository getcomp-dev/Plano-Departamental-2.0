<template>
  <tr class="turmarow">
    <v-td width="25" type="content">
      <input type="checkbox" v-model="toggleToDelete" :value="turma" />
    </v-td>
    <v-td width="65" type="content">
      <select v-model.number="turmaForm.periodo" @change="handleEditTurma">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td width="80">{{ turmaForm.disciplina.codigo }}</v-td>
    <v-td width="330" type="content">
      <select v-model.number="turmaForm.Disciplina" @change="handleEditTurma">
        <option
          v-for="disciplina in DisciplinasExternasOrderedByNome"
          :key="disciplina.id"
          :value="disciplina.id"
        >
          {{ disciplina.nome }}
        </option>
      </select>
    </v-td>
    <v-td width="55">{{ totalCarga }}</v-td>
    <v-td width="45" type="content">
      <input
        type="text"
        style="width: 30px"
        :value="turmaForm.letra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        @keypress="maskTurmaLetra"
        @change="handleEditTurma"
      />
    </v-td>
    <v-td width="80" type="content">
      <select v-model="turmaForm.turno1" @change="handleEditTurma">
        <option v-if="disciplinaIsIntegralEAD" value="EAD">EAD</option>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </v-td>
    <v-td width="85" type="content">
      <select v-model.number="turmaForm.Horario1" @change="checkHorario(1)">
        <option />
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id + horario.horario"
          :value="horario.id"
        >
          {{ horario.horario }}
        </option>
      </select>
      <select v-if="totalCarga >= 4" v-model.number="turmaForm.Horario2" @change="checkHorario(2)">
        <option />
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id + horario.horario"
          :value="horario.id"
        >
          {{ horario.horario }}
        </option>
      </select>
    </v-td>
    <v-td width="95" type="content">
      <template v-if="!disciplinaIsIntegralEAD">
        <select v-model.number="turmaForm.Sala1" @change="checkSala(1)">
          <option />
          <option v-for="sala in AllSalas" :key="sala.id + sala.nome" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>

        <select v-if="totalCarga >= 4" v-model.number="turmaForm.Sala2" @change="checkSala(2)">
          <option />
          <option v-for="sala in AllSalas" :key="sala.nome + sala.id" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>
      </template>
    </v-td>
    <v-td width="45" type="content">
      <div class="d-flex flex-column justify-content-between py-1">
        <b class="mb-1">
          {{ totalPedidosNaoPeriodizados + totalPedidosPeriodizados }}
        </b>
        <span>{{ totalPedidosPeriodizados }}+{{ totalPedidosNaoPeriodizados }}</span>
      </div>
    </v-td>
    <v-td
      v-for="indice in IndicesInPedidos"
      :key="'index' + indice"
      width="35"
      paddingX="0"
      type="none"
    >
      <InputsPedidosExternos :index="indice" :turma="turma" />
    </v-td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone, orderBy, isNull, find, some, filter } from "lodash-es";
import { maskTurmaLetra } from "@/common/mixins";
import InputsPedidosExternos from "./InputsPedidosExternos.vue";

export default {
  name: "TurmaExternaRow",
  mixins: [maskTurmaLetra],
  components: {
    InputsPedidosExternos,
  },
  props: {
    turma: { type: Object, required: true },
  },
  data() {
    return {
      turmaForm: null,
      currentData: null,
    };
  },

  methods: {
    ...mapActions(["editTurmaExterna", "toggleTurmaExternaToDelete"]),

    resetTurmaForm() {
      this.turmaForm = clone(this.turma);
      this.currentData = clone(this.turma);
    },
    async handleEditTurma() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.editTurmaExterna(this.turmaForm);
      } catch (error) {
        this.resetTurmaForm();

        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar turma!",
          text: error.response
            ? "A combinação de disciplina, período e turma deve ser única."
            : error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    checkHorario(horario) {
      if (!this.checkHorarioSala(horario)) this.handleEditTurma();
      else {
        if (horario === 1) this.turmaForm.Horario1 = this.currentData.Horario1;
        else this.turmaForm.Horario2 = this.currentData.Horario2;
      }
    },
    checkSala(sala) {
      if (!this.checkHorarioSala(sala)) this.handleEditTurma();
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
        (!isNull(this.turmaForm.Horario1) || !isNull(this.turmaForm.Horario2)) &&
        (!isNull(this.turmaForm.Sala1) || !isNull(this.turmaForm.Sala2))
      ) {
        if (horario === 1 ? this.turmaForm.Horario1 === 31 : this.turmaForm.Horario2 === 31) {
          return false;
        } else if (horario === 1 && horarios1618.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1618(1, 1)) return true;
        } else if (horario === 2 && horarios1618.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioSala1618(2, 2)) return true;
        } else if (horario === 1 && horarios1719.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1719(1, 1)) return true;
        } else if (horario === 2 && horarios1719.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioSala1719(2, 2)) return true;
        } else if (horario === 1 && horarios1820.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1820(1, 1)) return true;
        } else if (horario === 2 && horarios1820.includes(this.turmaForm.Horario2)) {
          if (this.checkHorarioSala1820(2, 2)) return true;
        } else if (horario === 1 && horarios1921.includes(this.turmaForm.Horario1)) {
          if (this.checkHorarioSala1921(1, 1)) return true;
        } else if (horario === 2 && horarios1921.includes(this.turmaForm.Horario2)) {
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
          ? find(this.AllHorarios, ["id", this.turmaForm.Horario1])
          : find(this.AllHorarios, ["id", this.turmaForm.Horario2]);
      let s =
        sala === 1
          ? find(this.AllSalas, ["id", this.turmaForm.Sala1])
          : find(this.AllSalas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito no horário ${h.horario} com a sala ${s.nome}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error",
      });
    },
    checkHorarioSala1618(horario, sala) {
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
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
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      let conflitos = filter(
        this.$store.state.turma.Turmas.concat(this.$store.state.turmaExterna.Turmas),
        (t) => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 = !isNull(this.turmaForm.Horario1) && this.turmaForm.Horario1 === t.Horario1;
            h2 = !isNull(this.turmaForm.Horario1) && this.turmaForm.Horario1 === t.Horario2;
          } else {
            h1 = !isNull(this.turmaForm.Horario2) && this.turmaForm.Horario2 === t.Horario1;
            h2 = !isNull(this.turmaForm.Horario2) && this.turmaForm.Horario2 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala1) && this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala1;
            d2 = !isNull(this.turmaForm.Sala2) && this.turmaForm.Sala2 === t.Sala2;
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
      "DisciplinasExternas",
      "AllHorarios",
      "HorariosEAD",
      "HorariosNoturno",
      "HorariosDiurno",
      "AllSalas",
      "TurmasExternasToDelete",
      "PedidosExternos",
      "PrincipaisCursosDCC",
    ]),

    toggleToDelete: {
      set() {
        this.toggleTurmaExternaToDelete(this.turma);
      },
      get() {
        return this.TurmasExternasToDelete;
      },
    },
    DisciplinasExternasOrderedByNome() {
      return orderBy(this.DisciplinasExternas, "nome");
    },
    totalPedidosPeriodizados() {
      return this.PedidosDaTurma.reduce(
        (sum, turma) => sum + parseInt(turma.vagasPeriodizadas, 10),
        0
      );
    },
    totalPedidosNaoPeriodizados() {
      return this.PedidosDaTurma.reduce(
        (sum, turma) => sum + parseInt(turma.vagasNaoPeriodizadas, 10),
        0
      );
    },
    totalCarga() {
      return this.turmaForm.disciplina.creditoTotal;
    },
    disciplinaIsIntegralEAD() {
      return this.turmaForm.disciplina.ead === 1;
    },
    disciplinaIsParcialEAD() {
      return this.turmaForm.disciplina.ead === 2;
    },

    HorariosFiltredByTurno() {
      if (this.disciplinaIsIntegralEAD) return this.HorariosEAD;

      switch (this.turmaForm.turno1) {
      case "Noturno":
        return this.HorariosNoturno;
      case "Diurno":
        return this.HorariosDiurno;
      case "EAD":
        return this.HorariosEAD;
      default:
        return filter(this.AllHorarios, (horario) => horario.id != 31); //Todos sem EAD
      }
    },
    IndicesInPedidos() {
      const indicesResultantes = [];

      this.PedidosDaTurma.forEach((pedido, index) => {
        const cursoFounded = some(this.PrincipaisCursosDCC, ["id", pedido.Curso]);

        if (cursoFounded) indicesResultantes.push(index);
      });
      return indicesResultantes;
    },
    PedidosDaTurma() {
      return this.PedidosExternos[this.turma.id] || [];
    },
  },

  watch: {
    turma: {
      handler: "resetTurmaForm",
      immediate: true,
    },
  },
};
</script>

<style scoped>
.turmarow {
  font-size: 11px;
}
</style>
