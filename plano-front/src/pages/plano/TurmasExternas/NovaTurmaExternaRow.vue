<template>
  <tr class="novaturma">
    <v-td width="25" type="content" />
    <v-td width="55" type="content">
      <select v-model.number="turmaForm.periodo">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td width="80" type="content">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option v-for="disciplina in DisciplinasExternas" :key="disciplina.id" :value="disciplina">
          {{ disciplina.codigo }}
        </option>
      </select>
    </v-td>
    <v-td width="330" type="content">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasExternasOrderedByNome"
          :key="disciplina.id + disciplina.codigo"
          :value="disciplina"
        >
          {{ disciplina.nome }}
        </option>
      </select>
    </v-td>
    <v-td width="25">{{ totalCarga }}</v-td>
    <v-td width="45" type="content">
      <input
        type="text"
        style="width: 30px"
        :value="turmaForm.letra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        @keypress="maskTurmaLetra"
      />
    </v-td>
    <v-td width="80" type="content">
      <select v-model="turmaForm.turno1" @change="handleChangeTurno">
        <option v-if="disciplinaIsIntegralEAD" value="EAD">EAD</option>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </v-td>
    <v-td width="85" type="content">
      <select v-model.number="turmaForm.Horario1" @change="handleChangeHorario(1)">
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.id + horario.horario"
          :value="horario.id"
        >
          {{ horario.horario }}
        </option>
      </select>
      <select v-model.number="turmaForm.Horario2" @change="handleChangeHorario(2)">
        <option
          v-for="horario in HorariosFiltredByTurno"
          :key="horario.horario + horario.id"
          :value="horario.id"
        >
          {{ horario.horario }}
        </option>
      </select>
    </v-td>
    <v-td width="95" type="content">
      <template v-if="!disciplinaIsIntegralEAD">
        <select v-model.number="turmaForm.Sala1">
          <option />
          <option v-for="sala in AllSalas" :key="sala.id + sala.nome" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>

        <select v-if="totalCarga >= 4 && !disciplinaIsParcialEAD" v-model.number="turmaForm.Sala2">
          <option />
          <option v-for="sala in AllSalas" :key="sala.nome + sala.id" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>
      </template>
    </v-td>
    <v-td width="45" />
    <v-td width="35" v-for="cursosEmptySpace in 4" :key="cursosEmptySpace" />
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone, some, orderBy, filter } from "lodash-es";
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
      turmaForm: clone(emptyTurma),
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
      else if (!this.disciplinaIsParcialEAD) this.setTurnoByHorario(this.turmaForm.Horario2);
    },
    setTurnoByHorario(horarioId) {
      if (horarioId == 31 && this.disciplinaIsIntegralEAD) this.turmaForm.turno1 = "EAD";
      else if (some(this.HorariosNoturno, ["id", horarioId])) this.turmaForm.turno1 = "Noturno";
      else if (some(this.HorariosDiurno, ["id", horarioId])) this.turmaForm.turno1 = "Diurno";
    },
    async handleCreateTurmaExterna() {
      try {
        this.setLoading({ type: "partial", value: true });
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
        this.setLoading({ type: "partial", value: false });
      }
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
    ]),

    DisciplinasExternasOrderedByNome() {
      return orderBy(this.DisciplinasExternas, ["nome"]);
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
    totalCarga() {
      return this.turmaForm.disciplina
        ? parseInt(this.turmaForm.disciplina.cargaTeorica) +
            parseInt(this.turmaForm.disciplina.cargaPratica)
        : "";
    },
    disciplinaIsIntegralEAD() {
      return this.turmaForm.disciplina ? this.turmaForm.disciplina.ead === 1 : false;
    },
    disciplinaIsParcialEAD() {
      return this.turmaForm.disciplina ? this.turmaForm.disciplina.ead === 2 : false;
    },
  },
};
</script>

<style scoped>
.novaturma {
  font-size: 11px;
  background-color: #e9e9e9;
}
.novaturma:hover {
  background-color: #e9e9e9;
}
</style>
