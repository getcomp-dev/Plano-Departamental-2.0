<template>
  <div style="font-size:11px;" class="max-content">
    <td>
      <div style="width: 25px;"></div>
    </td>
    <td>
      <div style="width: 40px;">
        <select style="width: 35px;" v-model="turmaForm.periodo">
          <option value="1">1</option>
          <option value="3">3</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width:70px">
        <select
          type="text"
          style="width:65px;"
          id="disciplinaCod"
          v-model="turmaForm.Disciplina"
          @change="checkDisciplina()"
        >
          <option v-if="DisciplinasOrederedByCod.length === 0" type="text" value
            >Nenhuma Disciplina Encontrada</option
          >
          <option
            v-for="disciplina in DisciplinasOrederedByCod"
            :key="'1-' + disciplina.id"
            :value="disciplina.id"
            >{{ disciplina.codigo }}</option
          >
        </select>
      </div>
    </td>

    <td>
      <div style="width: 330px;">
        <select
          type="text"
          style="width:325px;"
          id="disciplina"
          v-model="turmaForm.Disciplina"
          @change="checkDisciplina()"
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
      </div>
    </td>
    <td>
      <div style="width: 18px">
        <p style="width:18px">
          <template v-if="currentDisciplina">
            {{
              currentDisciplina.cargaPratica + currentDisciplina.cargaTeorica
            }}
          </template>
        </p>
      </div>
    </td>
    <td>
      <div style="width: 40px">
        <input
          class="input-letra"
          type="text"
          style="text-transform: uppercase"
          id="turma"
          v-model="turmaForm.letra"
          @keypress="onlyA_Z"
        />
      </div>
    </td>
    <td>
      <div style="width:130px">
        <select
          type="text"
          style="width:125px; margin-bottom:1px;"
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
          v-if="hasMoreThan4Creditos"
          type="text"
          style="width:125px;"
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
      </div>
    </td>
    <td>
      <div style="width:80px">
        <template v-if="currentDisciplina">
          <select
            type="text"
            style="width: 75px"
            id="SelectTurno"
            v-model="turmaForm.turno1"
          >
            <template v-if="disciplinaIsIntegralEAD">
              <option value="EAD">EAD</option>
            </template>
            <template v-else>
              <option value="Diurno">Diurno</option>
              <option value="Noturno">Noturno</option>
            </template>
          </select>
        </template>
      </div>
    </td>
    <td>
      <div style="width: 80px">
        <template v-if="currentDisciplina != undefined">
          <select
            type="text"
            style="width: 75px; margin-bottom:1px"
            id="horario1"
            v-model="turmaForm.Horario1"
          >
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
            style="width: 75px"
            id="horario2"
            v-model="turmaForm.Horario2"
          >
            <option
              v-if="!disciplinaIsIntegralEAD"
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
      </div>
    </td>

    <td>
      <div style="width: 100px">
        <template v-if="!disciplinaIsIntegralEAD && currentDisciplina">
          <select
            type="text"
            style="width:95px; margin-bottom:1px"
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
            style="width: 95px;"
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
      </div>
    </td>
    <td>
      <div style="width:40px"></div>
    </td>
    <template v-for="c in cursos_length">
      <td :key="c + 'cursos-ativados'">
        <div style="width:32px">{{ c.codigo }}</div>
      </td>
    </template>
  </div>
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
  props: { cursos_length: Number },
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
    isEmpty(value) {
      return value === null || value === undefined || value === "";
    },
    findDisciplinaById(id) {
      return _.find(this.Disciplinas, (disciplina) => disciplina.id == id);
    },
    checkDisciplina() {
      this.clearInputs();
      this.setInfos();
    },
    clearInputs() {
      this.turmaForm.turno1 = null;
      this.turmaForm.Horario1 = null;
      this.turmaForm.Horario2 = null;
      this.turmaForm.Docente1 = null;
      this.turmaForm.Docente2 = null;
    },
    setInfos(disciplina) {
      if (this.currentDisciplina.ead === 1) {
        this.turmaForm.turno1 = "EAD";
        this.turmaForm.Horario1 = 31;
        this.turmaForm.Horario2 = 31;
      } else if (this.currentDisciplina.ead === 2) {
        this.turmaForm.Horario2 = 31;
      }
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key.toUpperCase() : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    changeTurmaEmptyStringToNull(turma) {
      if (turma.Docente1 === "") turma.Docente1 = null;
      if (turma.Docente2 === "") turma.Docente2 = null;
      if (turma.Horario1 === "") turma.Horario1 = null;
      if (turma.Horario2 === "") turma.Horario2 = null;
      if (turma.Sala1 === "") turma.Sala111 = null;
      if (turma.Sala2 === "") turma.Sala2 = null;
      if (turma.letra === "") turma.letra = null;
    },
    checkTurmaInputsValue(turma) {
      let campoInvalido = false;
      if (turma.Disciplina === null) campoInvalido = "disciplina";
      else if (turma.letra === null) campoInvalido = "letra";
      else if (turma.turno1 === null) campoInvalido = "turno";

      if (campoInvalido) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Cadastro de " + campoInvalido + " invalido",
          type: "error",
        });
        return false;
      }
      return true;
    },
    addTurma() {
      this.changeTurmaEmptyStringToNull(this.turmaForm);

      if (!this.checkTurmaInputsValue(this.turmaForm)) return;

      let turmasLivres = _.filter(
        this.$store.state.turma.Turmas,
        (turma) => turma.Disciplina === null
      );

      this.turmaForm.id = turmasLivres[0].id;
      this.editTurma(this.turmaForm, this.currentDisciplina.nome);
      this.semestre = this.turmaForm.periodo;
      this.cleanTurma();
    },
    editTurma(turma, disciplinaNome) {
      turmaService
        .update(turma.id, turma)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} da disciplina ${disciplinaNome} foi adicionada!`,
            type: "success",
          });
          console.log("Nova turma adiciona:", turma);
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Turma</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },
    cleanTurma() {
      this.turmaForm = _.clone(emptyTurma);
      this.turmaForm.periodo = this.semestre;
      this.turmaForm.letra = "A";
      this.error = undefined;
    },
  },
  computed: {
    currentDisciplina() {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: this.turmaForm.Disciplina,
      });
    },

    totalCarga() {
      if (this.currentDisciplina != undefined) {
        return (
          parseInt(this.currentDisciplina.cargaTeorica) +
          parseInt(this.currentDisciplina.cargaPratica)
        );
      }
      return;
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
        } else if (cadastroEAD !== 2) {
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
td {
  text-align: center !important;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 40px !important;
}
p {
  margin-bottom: 0 !important;
  text-align: center !important;
}

.input-letra {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px;
  width: 20px;
  text-align: center !important;
}
.input-turno {
  height: 18px;
  text-align: center;
  padding: 0 2px;
  cursor: default;
}

select {
  height: 18px;
}

@-moz-document url-prefix() {
  table select {
    height: 50px !important;
    text-align: left;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    height: 18px !important;
    text-align: center;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(160, 160, 160);
    -moz-border-radius: 2px;
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.max-content {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
</style>
