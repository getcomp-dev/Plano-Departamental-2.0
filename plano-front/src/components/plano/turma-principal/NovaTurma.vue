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
        >
          <option v-if="DisciplinasCod.length === 0" type="text" value
            >Nenhuma Disciplina Encontrada</option
          >
          <option
            v-for="disciplina in DisciplinasCod"
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
          v-on:change="setTurno(), setDisciplinaAtual()"
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
        <p style="width:20px">
          <template v-for="disciplina in Disciplinas">
            <template v-if="disciplina.id === turmaForm.Disciplina">{{
              disciplina.cargaPratica + disciplina.cargaTeorica
            }}</template>
          </template>
        </p>
      </div>
    </td>
    <td>
      <div style="width: 40px">
        <input
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
          <option v-if="Docentes.length === 0" type="text" value
            >Nenhum Docente Encontrado</option
          >
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
          <option v-if="Docentes.length === 0" type="text" value
            >Nenhum Docente Encontrado</option
          >
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
      <div style="width: 80px">
        <select
          type="text"
          style="width: 75px; margin-bottom:1px"
          id="horario1"
          v-model="turmaForm.Horario1"
          v-on:change="setTurnoByHorario(1)"
        >
          <option v-if="Horarios.length === 0" type="text" value
            >Nenhum Horário Encontrado</option
          >
          <template v-if="disciplinaSelectedIsEad">
            <option
              v-for="horario in HorariosEAD"
              :key="'1-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
          <template v-else>
            <option
              v-for="horario in Horarios"
              :key="'1-horario-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
        </select>
        <br />

        <select
          v-if="hasMoreThan4Creditos"
          type="text"
          style="width: 75px"
          id="horario2"
          v-model="turmaForm.Horario2"
          v-on:change="setTurnoByHorario(2)"
        >
          <option v-if="Horarios.length === 0" type="text" value
            >Nenhum Horário Encontrado</option
          >
          <template v-if="disciplinaSelectedIsEad">
            <option
              v-for="horario in HorariosEAD"
              :key="'2-horarioEAD-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
          <template v-else>
            <option
              v-for="horario in Horarios"
              :key="'2-horario-id' + horario.id"
              :value="horario.id"
              >{{ horario.horario }}</option
            >
          </template>
        </select>
      </div>
    </td>
    <td>
      <div style="width:80px">
        <select
          type="text"
          style="width: 75px"
          id="turno1"
          v-model="turmaForm.turno1"
          v-on:change="setEad()"
        >
          <template v-if="disciplinaIsEad(turmaForm.Disciplina)">
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
      <div style="width: 98px">
        <select
          type="text"
          style="width:93px; margin-bottom:1px"
          id="sala1"
          v-model="turmaForm.Sala1"
        >
          <option v-if="Salas.length === 0" type="text" value
            >Nenhuma Sala Encontrada</option
          >
          <option
            v-for="sala in Salas"
            :key="'3-' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>

        <select
          v-if="hasMoreThan4Creditos"
          type="text"
          style="width: 93px"
          id="sala2"
          v-model="turmaForm.Sala2"
        >
          <option v-if="Salas.length === 0" type="text" value
            >Nenhuma Sala Encontrada</option
          >
          <option
            v-for="sala in Salas"
            :key="'4-' + sala.id"
            :value="sala.id"
            >{{ sala.nome }}</option
          >
        </select>
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
  id: undefined,
  periodo: undefined,
  letra: undefined,
  turno1: undefined,
  turno2: undefined,
  Disciplina: undefined,
  Docente1: undefined,
  Docente2: undefined,
  Horario1: undefined,
  Horario2: undefined,
  Sala1: undefined,
  Sala2: undefined,
};
export default {
  name: "NovaTurma",
  props: { cursos_length: Number },
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      semestre: 1,
      error: undefined,
      disciplinaSelected: null,
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
    setDisciplinaAtual() {
      this.disciplinaSelected = this.findDisciplinaById(
        this.turmaForm.Disciplina
      );
    },
    findDisciplinaById(id) {
      let disciplina = _.find(this.Disciplinas, (d) => d.id == id);
      return disciplina != undefined ? disciplina : null;
    },
    setTurno() {
      this.turmaForm.turno1 = "EAD";
    },
    disciplinaIsEad(id) {
      let disciplina = _.find(this.Disciplinas, (d) => d.id == id);
      return disciplina != undefined ? disciplina.ead : null;
    },
    onlyA_Z($event) {
      let key = $event.key ? $event.key.toUpperCase() : $event.which;
      if (!key.match(/[A-Z]/i)) $event.preventDefault();
    },
    setTurnoByHorario(horarioAtual) {
      if (horarioAtual === 1) this.adjustTurno(this.turmaForm.Horario1);
      else this.adjustTurno(this.turmaForm.Horario2);
    },
    adjustTurno(horario) {
      if (
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
      } else if (horario == 31) {
        this.turmaForm.turno1 = "EAD";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },
    setEad() {
      if (this.turmaForm.turno1 === "EAD") {
        this.turmaForm.Horario1 = 31;
        if (this.turmaForm.Horario2 > 0) this.turmaForm.Horario2 = null;
      }
    },
    addTurma() {
      if (this.turmaForm.periodo != 1 && this.turmaForm.periodo != 3) {
        this.$notify({
          group: "general",
          title: `Erro`,
          text: `O semestre deve ser 1 ou 3`,
          type: "error",
        });
        return;
      }
      var turmasLivres = _.filter(this.$store.state.turma.Turmas, function(t) {
        return t.Disciplina === null;
      });
      console.log(turmasLivres);
      this.turmaForm.id = turmasLivres[0].id;
      console.log(this.turmaForm);
      this.editTurma(this.turmaForm);
      this.semestre = this.turmaForm.periodo;
      this.cleanTurma();
    },
    editTurma(turma) {
      turmaService
        .update(turma.id, turma)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success",
          });
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
    disciplinaSelectedIsEad() {
      return (
        this.disciplinaSelected != undefined && this.disciplinaSelected.ead
      );
    },
    hasMoreThan4Creditos() {
      if (this.disciplinaSelected == undefined) return false;
      else if (
        this.disciplinaSelected.cargaTeorica +
          this.disciplinaSelected.cargaPratica >=
        4
      )
        return true;
    },
    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    DisciplinasCod() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "codigo");
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },
    Horarios() {
      return _.orderBy(
        _.filter(
          this.$store.state.horario.Horarios,
          (horario) => horario.id != 31 //exclui horario ead
        ),
        "horario"
      );
    },
    HorariosEAD() {
      console.log(_.filter(this.$store.state.horario.Horarios, { id: 31 }));
      return _.filter(this.$store.state.horario.Horarios, { id: 31 });
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
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

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

input[type="text"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px;
  width: 20px;
  text-align: center !important;
}
select {
  height: 18px;
}

@-moz-document url-prefix() {
  select {
    height: 18px !important;
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
