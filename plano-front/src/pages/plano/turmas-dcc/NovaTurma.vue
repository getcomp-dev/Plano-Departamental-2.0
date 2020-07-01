<template>
  <tr class="novaturma stickyAdd">
    <td style="width: 25px"></td>
    <td style="width: 40px"></td>
    <td style="width: 55px" class="less-padding">
      <select v-model="turmaForm.periodo">
        <option value="1">1</option>
        <option value="3">3</option>
      </select>
    </td>
    <td style="width: 80px" class="less-padding" :style="perfilBackgroundColor">
      {{ currentDisciplina ? currentDisciplina.perfilAbreviacao : "" }}
    </td>
    <td style="width:80px" class="less-padding">
      <select
        type="text"
        style="width:100%;"
        id="disciplinaCod"
        v-model="turmaForm.Disciplina"
        @change="handleChangeDisciplina()"
      >
        <option
          v-for="disciplina in DisciplinasOrederedByCod"
          :key="'1-' + disciplina.id"
          :value="disciplina.id"
          >{{ disciplina.codigo }}</option
        >
      </select>
    </td>

    <td style="width: 330px;" class="less-padding">
      <select
        type="text"
        style="width:100%;"
        id="disciplina"
        v-model="turmaForm.Disciplina"
        @change="handleChangeDisciplina()"
      >
        <option v-if="Disciplinas.length === 0" type="text" value
          >Nenhuma Disciplina Encontrada</option
        >
        <option
          v-for="disciplina in Disciplinas"
          :key="'2-' + disciplina.id"
          :value="disciplina.id"
          >{{ disciplina.nome }}</option
        >
      </select>
    </td>
    <td style="width: 25px">
      <template v-if="currentDisciplina">
        {{ currentDisciplina.cargaPratica + currentDisciplina.cargaTeorica }}
      </template>
    </td>
    <td style="width: 35px">
      <input
        class="input-letra"
        type="text"
        style="text-transform: uppercase"
        id="turma"
        v-model="turmaForm.letra"
        @keypress="onlyA_Z"
      />
    </td>
    <td style="width:130px" class="less-padding">
      <select
        type="text"
        style="margin-bottom:1px;"
        id="docente1"
        v-model="turmaForm.Docente1"
      >
        <option type="text" value=""></option>
        <option
          v-for="docente in Docentes"
          :key="'1-' + docente.id"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>

      <select
        type="text"
        style="width:100%;"
        id="docente2"
        v-model="turmaForm.Docente2"
      >
        <option type="text" value=""></option>
        <option
          v-for="docente in Docentes"
          :key="'2-' + docente.id"
          :value="docente.id"
          >{{ docente.apelido }}</option
        >
      </select>
    </td>
    <td style="width:80px">
      <template v-if="currentDisciplina">
        <select type="text" id="SelectTurno" v-model="turmaForm.turno1">
          <template v-if="disciplinaIsIntegralEAD">
            <option value="EAD">EAD</option>
          </template>
          <template v-else>
            <option value="Diurno">Diurno</option>
            <option value="Noturno">Noturno</option>
          </template>
        </select>
      </template>
    </td>
    <td style="width: 85px" class="less-padding">
      <template v-if="currentDisciplina != undefined">
        <select
          type="text"
          style="; margin-bottom:1px"
          id="horario1"
          v-model="turmaForm.Horario1"
          v-on:change="setTurnoByHorario(1)"
        >
          <option v-if="!disciplinaIsIntegralEAD" type="text" value=""></option>
          <option
            v-for="horario in HorariosFiltredByTurno"
            :key="'1-horarioEAD-id' + horario.id"
            :value="horario.id"
            >{{ horario.horario }}</option
          >
        </select>
        <br />

        <select
          v-if="hasMoreThan4Creditos"
          type="text"
          id="horario2"
          v-model="turmaForm.Horario2"
          v-on:change="setTurnoByHorario(2)"
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
        <select
          type="text"
          style="margin-bottom:1px"
          id="sala1"
          v-model="turmaForm.Sala1"
        >
          <option type="text" value=""></option>
          <option
            v-for="sala in Salas"
            :key="'3-' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
        <br />
        <select
          v-if="hasMoreThan4Creditos && currentDisciplina.ead != 2"
          type="text"
          id="sala2"
          v-model="turmaForm.Sala2"
        >
          <option type="text" value=""></option>
          <option
            v-for="sala in Salas"
            :key="'4-' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
      </template>
    </td>
    <td style="width:45px"><div style="height: 43px;"></div></td>
    <td
      v-if="cursosAtivadosLength"
      :style="`width: ${35 * cursosAtivadosLength}px`"
    ></td>
  </tr>
</template>

<script>
import _ from "lodash";
import turmaService from "@/common/services/turma";
import { EventBus } from "@/event-bus.js";

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
  name: "NovaTurma",
  props: { cursosAtivadosLength: Number, default: 0 },

  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      semestre: 1,
      error: undefined,
    };
  },
  mounted() {
    EventBus.$on("addTurma", () => {
      this.addTurma();
    });
    this.turmaForm.periodo = this.semestre;
    this.turmaForm.letra = "A";
  },
  beforeDestroy() {
    EventBus.$off("addTurma");
  },
  methods: {
    findDisciplinaById(id) {
      return _.find(this.Disciplinas, (disciplina) => disciplina.id == id);
    },
    handleChangeDisciplina() {
      this.clearInputs();
      this.setInputValues();
    },
    clearInputs() {
      this.turmaForm.turno1 = null;
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
      this.turmaForm.Docente1 = null;
      this.turmaForm.Docente2 = null;
    },
    setInputValues() {
      if (this.currentDisciplina.ead === 1) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (this.currentDisciplina.ead === 2) {
        this.turmaForm.Horario2 = 31;
      }
    },
    checkNewTurmaInputsValue(turma) {
      if (
        turma.Disciplina === null ||
        turma.letra === null ||
        turma.turno1 === null
      ) {
        this.$notify({
          group: "general",
          title: "Cadastro da turma inválido ou incompleto.",
          text: "Disciplina, turno e letra da turma são obrigatório",
          type: "error",
        });
        return false;
      }
      return true;
    },
    setTurnoByHorario(horarioAtual) {
      if (horarioAtual === 1) this.adjustTurno(this.turmaForm.Horario1);
      else if (!this.disciplinaIsParcialEAD)
        this.adjustTurno(this.turmaForm.Horario2);
    },
    adjustTurno(horario) {
      if (horario === null || horario === "" || horario === undefined) {
        this.turmaForm.turno1 = null;
      } else if (horario == 31 && this.disciplinaIsIntegralEAD) {
        this.turmaForm.turno1 = "EAD";
      } else if (
        horario == 1 ||
        horario == 2 ||
        horario == 7 ||
        horario == 8 ||
        horario == 13 ||
        horario == 14 ||
        horario == 19 ||
        horario == 20 ||
        horario == 25 ||
        horario == 26 ||
        horario == 3 ||
        horario == 4 ||
        horario == 9 ||
        horario == 10 ||
        horario == 15 ||
        horario == 16 ||
        horario == 21 ||
        horario == 22 ||
        horario == 27 ||
        horario == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },

    isEmpty(value) {
      return value === "" || value === undefined ? true : false;
    },
    convertEmptyToNull(turma) {
      if (this.isEmpty(turma.Docente1)) turma.Docente1 = null;
      if (this.isEmpty(turma.Docente2)) turma.Docente2 = null;
      if (this.isEmpty(turma.Horario1)) turma.Horario1 = null;
      if (this.isEmpty(turma.Horario2)) turma.Horario2 = null;
      if (this.isEmpty(turma.Sala1)) turma.Sala1 = null;
      if (this.isEmpty(turma.Sala2)) turma.Sala2 = null;
      if (this.isEmpty(turma.turno1)) turma.turno1 = null;
    },
    addTurma() {
      this.convertEmptyToNull(this.turmaForm);
      if (!this.checkNewTurmaInputsValue(this.turmaForm)) return;

      this.turmaForm.Plano = parseInt(localStorage.getItem('Plano'), 10)
      console.log(this.turmaForm)
      turmaService.create(this.turmaForm)
              .then((response) => {
                this.$store.dispatch('fetchAllPedidos')
                this.$notify({
                  group: "general",
                  title: `Sucesso!`,
                  text: `A Turma ${response.Turma.letra} foi criada!`,
                  type: "success",
                });
              })
              .catch((error) => {
                this.error = "<b>Erro ao criar Turma</b>";
                if (error.response.data.fullMessage) {
                  this.error +=
                          "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
                }
              });
      this.semestre = this.turmaForm.periodo;
    },
    editTurma(turma, disciplinaNome) {
      turmaService
        .update(turma.id, turma)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${
              response.Turma.letra
            } da disciplina ${disciplinaNome} foi adicionada!`,
            type: "success",
          });
          console.log("Nova turma adiciona:", turma);
          this.cleanTurmaForm();
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
        });
    },
    cleanTurmaForm() {
      this.turmaForm = _.clone(emptyTurma);
      this.turmaForm.periodo = this.semestre;
      this.turmaForm.letra = "A";
      this.error = undefined;
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key.toUpperCase() : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
  },
  computed: {
    perfilBackgroundColor() {
      return this.currentDisciplina
        ? `background-color: ${this.currentDisciplina.perfilCor}`
        : ``;
    },
    currentDisciplina() {
      let disciplinaFounded = _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turmaForm.Disciplina,
      });
      if (disciplinaFounded) {
        _.find(this.Perfis, (perfil) => {
          if (perfil.id === disciplinaFounded.Perfil) {
            disciplinaFounded.perfilAbreviacao = perfil.abreviacao;
            disciplinaFounded.perfilCor = perfil.cor;
            return true;
          }
        });
      }

      return disciplinaFounded;
    },
    totalCarga() {
      if (this.currentDisciplina != undefined) {
        return (
          parseInt(this.currentDisciplina.cargaTeorica) +
          parseInt(this.currentDisciplina.cargaPratica)
        );
      }
      return 0;
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
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    DisciplinasOrederedByCod() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "codigo");
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },
    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    HorariosEAD() {
      return _.filter(this.Horarios, { id: 31 });
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
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
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
.novaturma select {
  width: 100% !important;
  height: 18px !important;
}
.novaturma p {
  margin: 0 !important;
  text-align: center;
}
.novaturma .input-letra {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px !important;
  width: 20px;
  text-align: center !important;
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
