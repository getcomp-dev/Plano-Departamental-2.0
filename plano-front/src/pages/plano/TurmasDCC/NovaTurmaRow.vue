<template>
  <tr class="novaturma stickyAdd">
    <td style="width: 25px"></td>
    <td style="width: 40px"></td>
    <td style="width: 55px" class="less-padding">
      <select v-model.number="turmaForm.periodo">
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
    </td>
    <td
      style="width: 80px"
      class="less-padding"
      :style="
        `background-color:${
          currentDisciplina ? currentDisciplina.perfil.cor : ''
        }`
      "
    >
      {{ currentDisciplina ? currentDisciplina.perfil.abreviacao : "" }}
    </td>
    <td style="width:80px" class="less-padding">
      <select
        type="text"
        v-model="turmaForm.Disciplina"
        @change="handleChangeDisciplina()"
      >
        <option
          v-for="disciplina in DisciplinasDCCInPerfis"
          :key="disciplina.codigo + disciplina.id"
          :value="disciplina.id"
          >{{ disciplina.codigo }}</option
        >
      </select>
    </td>
    <td style="width: 330px;" class="less-padding">
      <select
        type="text"
        v-model="turmaForm.Disciplina"
        @change="handleChangeDisciplina()"
      >
        <option
          v-if="!DisciplinasDCCInPerfisOrderedByNome.length"
          type="text"
          value=""
        >
          Nenhuma Disciplina Encontrada
        </option>
        <option
          v-for="disciplina in DisciplinasDCCInPerfisOrderedByNome"
          :key="disciplina.nome + disciplina.id"
          :value="disciplina.id"
          >{{ disciplina.nome }}</option
        >
      </select>
    </td>
    <td style="width: 25px">
      {{ totalCarga }}
    </td>
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
      <select type="text" v-model="turmaForm.Docente1">
        <option type="text" value=""></option>
        <option
          v-for="docente in DocentesAtivos"
          :key="docente.id + docente.apelido"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>

      <select type="text" v-model="turmaForm.Docente2">
        <option type="text" value=""></option>
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
        v-if="currentDisciplina"
        type="text"
        v-model="turmaForm.turno1"
        @change="clearHorarios()"
      >
        <option v-if="disciplinaIsIntegralEAD" value="EAD">EAD</option>
        <template v-else>
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
        </template>
      </select>
    </td>
    <td style="width: 85px" class="less-padding">
      <template v-if="currentDisciplina">
        <select
          type="text"
          v-model="turmaForm.Horario1"
          @change="setTurnoByHorario(1)"
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
          v-model="turmaForm.Horario2"
          @change="setTurnoByHorario(2)"
        >
          <option
            v-if="!disciplinaIsIntegralEAD && !disciplinaIsParcialEAD"
            type="text"
            value=""
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
      <template v-if="!disciplinaIsIntegralEAD && currentDisciplina">
        <select type="text" v-model="turmaForm.Sala1">
          <option type="text" value=""></option>
          <option
            v-for="sala in AllSalas"
            :key="'s1' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>

        <select
          v-if="hasMoreThan4Creditos && currentDisciplina.ead != 2"
          type="text"
          v-model="turmaForm.Sala2"
        >
          <option type="text" value=""></option>
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
      <div style="height: 43px"></div>
    </td>
    <td
      v-if="cursosAtivadosLength"
      :style="`width: ${35 * cursosAtivadosLength}px`"
    ></td>
  </tr>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import turmaService from "@/common/services/turma";
import {
  maskTurmaLetra,
  setEmptyValuesToNull,
  validateObjectKeys,
} from "@/common/utils";
import { notification } from "@/common/mixins";

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
  disciplina: {
    id: null,
    nome: null,
    codigo: null,
    cargaTeorica: null,
    cargaPratica: null,
    Perfil: null,
    ead: null,
    laboratorio: null,
    perfil: {
      cor: null,
      nome: null,
      abreviacao: null,
    },
  },
};

export default {
  name: "NovaTurmaRow",
  mixins: [notification],
  props: { cursosAtivadosLength: Number, default: 0 },

  data() {
    return {
      turmaForm: null,
      maskTurmaLetra: maskTurmaLetra,
    };
  },
  beforeMount() {
    this.turmaForm = _.clone(emptyTurma);
    this.turmaForm.periodo = 1;
    this.turmaForm.letra = "A";
  },

  methods: {
    ...mapActions(["setLoadingState"]),

    clearHorarios() {
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
    },
    handleChangeDisciplina() {
      this.turmaForm.turno1 = null;
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
      this.turmaForm.Docente1 = null;
      this.turmaForm.Docente2 = null;
      this.setDefaultHorarios();
    },
    setDefaultHorarios() {
      if (this.currentDisciplina.ead === 1) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (this.currentDisciplina.ead === 2) {
        this.turmaForm.Horario2 = 31;
      }
    },
    setTurnoByHorario(horarioAtual) {
      if (horarioAtual === 1) this.adjustTurno(this.turmaForm.Horario1);
      else if (!this.disciplinaIsParcialEAD)
        this.adjustTurno(this.turmaForm.Horario2);
    },
    adjustTurno(horarioId) {
      if (horarioId == 31 && this.disciplinaIsIntegralEAD)
        this.turmaForm.turno1 = "EAD";
      else if (_.some(this.HorariosNoturno, ["id", horarioId]))
        this.turmaForm.turno1 = "Noturno";
      else if (_.some(this.HorariosDiurno, ["id", horarioId]))
        this.turmaForm.turno1 = "Diurno";
    },
    async addTurma() {
      try {
        this.setLoadingState("partial");

        delete this.turmaForm.disciplina;
        const newTurma = _.cloneDeepWith(this.turmaForm, setEmptyValuesToNull);
        validateObjectKeys(newTurma, ["Disciplina", "letra", "turno1"]);

        newTurma.Plano = parseInt(localStorage.getItem("Plano"), 10);
        const response = await turmaService.create(newTurma);
        await this.$store.dispatch("fetchAllPedidos");
        this.showNotification({
          type: "success",
          message: `Turma ${response.Turma.letra} foi criada!`,
        });
      } catch (error) {
        const erroMsg = error.response
          ? "Turma já existe no mesmo plano e periodo."
          : error.message;

        this.showNotification({
          type: "error",
          title: "Erro ao criar nova turma!",
          message: erroMsg,
        });
      } finally {
        this.setLoadingState("completed");
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

    currentDisciplina() {
      return _.find(this.DisciplinasDCCInPerfis, [
        "id",
        this.turmaForm.Disciplina,
      ]);
    },
    totalCarga() {
      return this.currentDisciplina
        ? parseInt(this.currentDisciplina.cargaTeorica) +
            parseInt(this.currentDisciplina.cargaPratica)
        : "";
    },
    hasMoreThan4Creditos() {
      return this.totalCarga >= 4;
    },
    disciplinaIsIntegralEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 1 : false;
    },
    disciplinaIsParcialEAD() {
      return this.currentDisciplina ? this.currentDisciplina.ead === 2 : false;
    },
    DisciplinasDCCInPerfisOrderedByNome() {
      return _.orderBy(this.DisciplinasDCCInPerfis, ["nome"]);
    },
    HorariosFiltredByTurno() {
      //Se for EAD
      if (this.currentDisciplina && this.currentDisciplina.ead === 1)
        return this.HorariosEAD;

      //Se não, verifica o turno selecionado
      switch (this.turmaForm.turno1) {
        case "Noturno":
          return this.HorariosNoturno;
        case "Diurno":
          return this.HorariosDiurno;
        case "EAD":
          return this.HorariosEAD;
        default:
          return _.filter(this.AllHorarios, (horario) => horario.id != 31);
      }
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
  margin-top: 2px !important;
}

.novaturma .input-letra {
  margin: 0;
  margin-top: 4px !important;
  height: 18px;
  width: 30px;
  text-align: center;
}
.stickyAdd {
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}
</style>
