<template>
  <tr class="novaturma">
    <td style="width: 25px"></td>

    <td style="width: 55px" class="less-padding">
      <select v-model.number="turmaForm.periodo">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </td>

    <td style="width: 80px" class="less-padding">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasExternasInPerfis"
          :key="'d1' + disciplina.id"
          :value="disciplina"
          >{{ disciplina.codigo }}</option
        >
      </select>
    </td>

    <td style="width: 330px" class="less-padding">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasExternasInPerfisOrderedByNome"
          :key="'d2' + disciplina.id"
          :value="disciplina"
          >{{ disciplina.nome }}</option
        >
      </select>
    </td>

    <td style="width: 25px">{{ totalCarga }}</td>

    <td style="width: 45px">
      <input
        type="text"
        class="input-letra"
        :value="turmaForm.letra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        @keypress="maskTurmaLetra"
      />
    </td>

    <td style="width: 80px;">
      <select v-model="turmaForm.turno1" @change="handleChangeTurno">
        <option v-if="disciplinaIsIntegralEAD" value="EAD">EAD</option>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </td>

    <td style="width: 85px" class="less-padding">
      <select
        v-model.number="turmaForm.Horario1"
        @change="handleChangeHorario(1)"
      >
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="'h1' + horario.id"
          :value="horario.id"
          >{{ horario.horario }}</option
        >
      </select>
      <select
        v-model.number="turmaForm.Horario2"
        @change="handleChangeHorario(2)"
      >
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="'h2' + horario.id"
          :value="horario.id"
          >{{ horario.horario }}</option
        >
      </select>
    </td>

    <td style="width: 95px" class="less-padding">
      <template v-if="!disciplinaIsIntegralEAD">
        <select v-model.number="turmaForm.Sala1">
          <option value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="sala.id + sala.nome"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
        <select
          v-if="totalCarga >= 4 && !disciplinaIsParcialEAD"
          v-model.number="turmaForm.Sala2"
        >
          <option value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="sala.nome + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
      </template>
    </td>

    <td style="width: 45px">
      <div style="height:43px"></div>
    </td>

    <td
      style="width: 35px;"
      v-for="cursosEmptySpace in 4"
      :key="cursosEmptySpace"
    ></td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { maskTurmaLetra } from "@/common/mixins";

const emptyTurma = {
  id: null,
  periodo: 1,
  letra: "A",
  turno1: null,
  turno2: null,
  Disciplina: null,
  Docente1: null,
  Docente2: null,
  Horario1: null,
  Horario2: null,
  Sala1: null,
  Sala2: null,
  disciplina: null,
};

export default {
  name: "NovaTurmaExternaRow",
  mixins: [maskTurmaLetra],
  data() {
    return {
      turmaForm: this.$_.clone(emptyTurma),
    };
  },

  methods: {
    ...mapActions(["createTurmaExterna"]),

    handleChangeTurno() {
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
    },
    handleChangeDisciplina() {
      this.turmaForm.Disciplina = this.turmaForm.disciplina.id;
      this.turmaForm.turno1 = null;
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
      this.turmaForm.Docente1 = null;
      this.turmaForm.Docente2 = null;

      if (this.disciplinaIsIntegralEAD) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (this.disciplinaIsParcialEAD) {
        this.turmaForm.Horario2 = 31;
      }
    },
    handleChangeHorario(horarioAtual) {
      if (horarioAtual === 1) this.setTurnoByHorario(this.turmaForm.Horario1);
      else if (!this.disciplinaIsParcialEAD)
        this.setTurnoByHorario(this.turmaForm.Horario2);
    },
    setTurnoByHorario(horarioId) {
      if (horarioId == 31 && this.disciplinaIsIntegralEAD)
        this.turmaForm.turno1 = "EAD";
      else if (this.$_.some(this.HorariosNoturno, ["id", horarioId]))
        this.turmaForm.turno1 = "Noturno";
      else if (this.$_.some(this.HorariosDiurno, ["id", horarioId]))
        this.turmaForm.turno1 = "Diurno";
    },
    async handleCreateTurmaExterna() {
      try {
        this.setPartialLoading(true);
        await this.createTurmaExterna(this.turmaForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova turma!",
          text: error.response
            ? "A combinação de disciplina, período e turma deve ser única."
            : error.message,
        });
      } finally {
        this.setPartialLoading(false);
      }
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

    DisciplinasExternasInPerfisOrderedByNome() {
      return this.$_.orderBy(this.DisciplinasExternasInPerfis, ["nome"]);
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
          return this.$_.filter(
            this.AllHorarios,
            (horario) => horario.id != 31
          ); //Todos sem EAD
      }
    },
    totalCarga() {
      return this.turmaForm.disciplina
        ? parseInt(this.turmaForm.disciplina.cargaTeorica) +
            parseInt(this.turmaForm.disciplina.cargaPratica)
        : "";
    },
    disciplinaIsIntegralEAD() {
      return this.turmaForm.disciplina
        ? this.turmaForm.disciplina.ead === 1
        : false;
    },
    disciplinaIsParcialEAD() {
      return this.turmaForm.disciplina
        ? this.turmaForm.disciplina.ead === 2
        : false;
    },
  },
};
</script>

<style scoped>
.novaturma {
  font-size: 11px !important;
  background-color: #e9e9e9;
}

.novaturma .less-padding {
  padding: 0 2px;
}
.novaturma td {
  margin: 0 !important;
  padding: 0 5px;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}
.novaturma select,
.novaturma input {
  font-size: 11px !important;
  border: 1px solid #414141 !important;
  color: #414141 !important;
  border-radius: 0px !important;
}
.novaturma select {
  height: 18px !important;
  width: 100% !important;
}
.novaturma select + select {
  margin-top: 3px !important;
}
.novaturma input[type="checkbox"] {
  width: 14px !important;
  height: 14px !important;
  margin: 0;
  margin-top: 5px !important;
}
.novaturma .input-letra {
  margin: 0;
  margin-top: 4px !important;
  height: 18px;
  width: 30px;
  text-align: center;
}
.novaturma .less-padding {
  padding: 0 2px;
}
</style>
