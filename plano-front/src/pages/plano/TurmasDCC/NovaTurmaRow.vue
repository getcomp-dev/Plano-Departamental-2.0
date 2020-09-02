<template>
  <tr class="novaturma">
    <td style="width: 25px"></td>
    <td style="width: 40px"></td>
    <td style="width: 55px" class="less-padding">
      <select v-model.number="turmaForm.periodo">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </td>
    <td
      style="width: 80px"
      class="less-padding"
      :style="
        `background-color:${
          turmaForm.disciplina ? turmaForm.disciplina.perfil.cor : ''
        }`
      "
    >
      {{ turmaForm.disciplina ? turmaForm.disciplina.perfil.abreviacao : "" }}
    </td>
    <td style="width:80px" class="less-padding">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasDCCInPerfis"
          :key="disciplina.codigo + disciplina.id"
          :value="disciplina"
          >{{ disciplina.codigo }}</option
        >
      </select>
    </td>
    <td style="width: 330px;" class="less-padding">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasDCCInPerfisOrderedByNome"
          :key="disciplina.nome + disciplina.id"
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
        @keypress="maskTurmaLetra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        :value="turmaForm.letra"
      />
    </td>
    <td style="width:130px" class="less-padding">
      <select v-model.number="turmaForm.Docente1">
        <option value=""></option>
        <option
          v-for="docente in DocentesAtivos"
          :key="docente.id + docente.apelido"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>

      <select v-model.number="turmaForm.Docente2">
        <option value=""></option>
        <option
          v-for="docente in DocentesAtivos"
          :key="docente.id + docente.nome"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>
    </td>
    <td style="width:80px">
      <select
        v-if="turmaForm.disciplina"
        v-model="turmaForm.turno1"
        @input="handleChangeTurno"
      >
        <option v-if="disciplinaIsIntegralEAD" value="EAD">EAD</option>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </td>
    <td style="width: 85px" class="less-padding">
      <template v-if="turmaForm.disciplina">
        <select
          v-model.number="turmaForm.Horario1"
          @change="handleChangeHorario(1)"
        >
          <option
            v-if="!disciplinaIsParcialEAD && !disciplinaIsIntegralEAD"
          ></option>
          <option
            v-for="horario in HorariosFiltredByTurno"
            :key="'1-horarioEAD-id' + horario.id"
            :value="horario.id"
            >{{ horario.horario }}</option
          >
        </select>

        <select
          v-if="totalCarga >= 4"
          v-model.number="turmaForm.Horario2"
          @change="handleChangeHorario(2)"
        >
          <option
            v-if="!disciplinaIsParcialEAD && !disciplinaIsIntegralEAD"
          ></option>

          <template v-if="disciplinaIsParcialEAD">
            <option
              v-for="horario in HorariosEAD"
              :key="'2-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
          <template v-else>
            <option
              v-for="horario in HorariosFiltredByTurno"
              :key="'1-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
        </select>
      </template>
    </td>
    <td style="width: 95px" class="less-padding">
      <template v-if="!disciplinaIsIntegralEAD && turmaForm.disciplina">
        <select v-model.number="turmaForm.Sala1">
          <option value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="'s1' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>

        <select
          v-if="totalCarga >= 4 && turmaForm.disciplina.ead != 2"
          v-model.number="turmaForm.Sala2"
        >
          <option value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="'s2' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
      </template>
    </td>
    <td style="width:45px">
      <div style="height:43px"></div>
    </td>
    <td
      v-if="cursosAtivadosLength"
      :style="`width:${35 * cursosAtivadosLength}px`"
    ></td>
  </tr>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { generateEmptyTurma } from "@/common/utils";
import { maskTurmaLetra } from "@/common/mixins";

export default {
  name: "NovaTurmaRow",
  mixins: [maskTurmaLetra],
  props: { cursosAtivadosLength: Number, default: 0 },
  data() {
    return {
      turmaForm: generateEmptyTurma({ periodo: 1, letra: "A" }),
    };
  },

  methods: {
    ...mapActions(["addNovaTurma"]),

    handleChangeTurno() {
      this.turmaForm.Horario1 = null;
      if (!this.disciplinaIsParcialEAD) this.turmaForm.Horario2 = null;
    },
    handleChangeDisciplina() {
      this.turmaForm.Disciplina = this.turmaForm.disciplina.id;
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
      this.turmaForm.turno1 = null;

      if (this.turmaForm.disciplina === null) return;

      if (!this.hasMoreThan4Creditos) {
        this.turmaForm.Docente2 = null;
        this.turmaForm.Horario2 = null;
        this.turmaForm.Sala2 = null;
      }

      if (this.disciplinaIsIntegralEAD) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
        this.turmaForm.Sala1 = null;
        this.turmaForm.Sala2 = null;
      } else if (this.disciplinaIsParcialEAD) {
        this.turmaForm.Horario2 = 31;
        this.turmaForm.Docente2 = null;
        this.turmaForm.Sala1 = null;
        this.turmaForm.Sala2 = null;
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

    async handleAddNovaTurma() {
      try {
        this.setPartialLoading(true);
        await this.addNovaTurma(this.turmaForm);
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
      "DisciplinasDCCInPerfis",
      "DocentesAtivos",
      "AllHorarios",
      "HorariosEAD",
      "HorariosNoturno",
      "HorariosDiurno",
      "AllSalas",
    ]),

    DisciplinasDCCInPerfisOrderedByNome() {
      return this.$_.orderBy(this.DisciplinasDCCInPerfis, ["nome"]);
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
          //Todos sem EAD
          return this.$_.filter(
            this.AllHorarios,
            (horario) => horario.id != 31
          );
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
.novaturma td {
  margin: 0 !important;
  padding: 0 5px;
  height: 43px !important;
  vertical-align: middle !important;
  text-align: center;
  word-break: break-word;
}
.novaturma .less-padding {
  padding: 0 2px;
}
.novaturma select,
.novaturma input {
  font-size: 11px !important;
  border: 1px solid #414141 !important;
  color: #414141;
  border-radius: 0px !important;
}
.novaturma select {
  padding: 0 0 !important;
  height: 18px !important;
  width: 100% !important;
  text-align: start;
}
.novaturma input[type="text"] {
  width: 100% !important;
  height: 18px !important;
  text-align: center;
}
.novaturma select + select {
  margin-top: 3px !important;
}

.novaturma .input-letra {
  margin: 0;
  margin-top: 4px !important;
  height: 18px;
  width: 30px;
  text-align: center;
}
</style>
