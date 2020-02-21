<template>
  <div>
    <td>
      <div style="width:24px">
        <input
          type="text"
          style="width: 18px; height:15px; margin-top:3px"
          id="3periodo"
          @keypress="onlyNumber"
          v-model="turmaForm.periodo"
        />
      </div>
    </td>

    <td>
      <div style="width:70px">
        <select type="text" style="width:65px;" id="disciplinaCod" v-model="turmaForm.Disciplina">
          <option v-if="DisciplinasCod.length===0" type="text" value>Nenhuma Disciplina Encontrada</option>
          <option
            v-for="disciplina in DisciplinasCod"
            :key="'1-'+disciplina.id"
            :value="disciplina.id"
          >{{disciplina.codigo}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 330px;">
        <select type="text" style="width:325px;" id="disciplina" v-model="turmaForm.Disciplina">
          <option v-if="Disciplinas.length===0" type="text" value>Nenhuma Disciplina Encontrada</option>
          <option
            v-for="disciplina in Disciplinas"
            :key="'2-'+disciplina.id"
            :value="disciplina.id"
          >{{disciplina.nome}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 18px">
        <p style="width:20px">
          <template v-for="disciplina in Disciplinas">
            <template
              v-if="disciplina.id===turmaForm.Disciplina"
            >{{disciplina.cargaPratica + disciplina.cargaTeorica}}</template>
          </template>
        </p>
      </div>
    </td>
    <td>
      <div style="width: 40px">
        <input type="text" style="width: 20px" id="turma" v-model="turmaForm.letra" />
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
          <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
          <option
            v-for="docente in Docentes"
            :key="'1-'+docente.id"
            :value="docente.id"
          >{{docente.apelido}}</option>
        </select>

        <select type="text" style="width:125px;" id="docente2" v-model="turmaForm.Docente2">
          <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
          <option
            v-for="docente in Docentes"
            :key="'2-'+docente.id"
            :value="docente.id"
          >{{docente.apelido}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width:68px">
        <select
          type="text"
          style="width: 62px"
          id="turno1"
          v-model="turmaForm.turno1"
          v-on:change="setEad"
        >
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
          <option value="EAD">EAD</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 72px">
        <select
          type="text"
          style="width: 67px; margin-bottom:1px"
          id="horario1"
          v-model="turmaForm.Horario1"
          v-on:change="adjustTurno1"
        >
          <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
          <option
            v-for="horario in Horarios"
            :key="'1-'+horario.id"
            :value="horario.id"
          >{{horario.horario}}</option>
        </select>
        <br />
        <select
          type="text"
          style="width: 67px"
          id="horario2"
          v-model="turmaForm.Horario2"
          v-on:change="adjustTurno2"
        >
          <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
          <option
            v-for="horario in Horarios"
            :key="'2-'+horario.id"
            :value="horario.id"
          >{{horario.horario}}</option>
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
          <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
          <option v-for="sala in Salas" :key="'3-'+sala.id" :value="sala.id">{{sala.nome}}</option>
        </select>

        <select type="text" style="width: 93px" id="sala2" v-model="turmaForm.Sala2">
          <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
          <option v-for="sala in Salas" :key="'4-'+sala.id" :value="sala.id">{{sala.nome}}</option>
        </select>
      </div>
    </td>
  </div>
</template>
<script>
import _ from "lodash";
import turmaService from "../../common/services/turma";
import { EventBus } from "../../event-bus.js";
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
  Sala2: undefined
};
export default {
  name: "NovaTurma",
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      semestre: 1,
      error: undefined
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
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    adjustTurno1: function() {
      if (
        this.turmaForm.Horario1 == 1 ||
        this.turmaForm.Horario1 == 2 ||
        this.turmaForm.Horario1 == 7 ||
        this.turmaForm.Horario1 == 8 ||
        this.turmaForm.Horario1 == 13 ||
        this.turmaForm.Horario1 == 14 ||
        this.turmaForm.Horario1 == 19 ||
        this.turmaForm.Horario1 == 20 ||
        this.turmaForm.Horario1 == 25 ||
        this.turmaForm.Horario1 == 26 ||
        this.turmaForm.Horario1 == 3 ||
        this.turmaForm.Horario1 == 4 ||
        this.turmaForm.Horario1 == 9 ||
        this.turmaForm.Horario1 == 10 ||
        this.turmaForm.Horario1 == 15 ||
        this.turmaForm.Horario1 == 16 ||
        this.turmaForm.Horario1 == 21 ||
        this.turmaForm.Horario1 == 22 ||
        this.turmaForm.Horario1 == 27 ||
        this.turmaForm.Horario1 == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else if (this.turmaForm.Horario1 == 31) {
        this.turmaForm.turno1 = "EAD";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },
    adjustTurno2: function() {
      if (
        this.turmaForm.Horario2 == 1 ||
        this.turmaForm.Horario2 == 2 ||
        this.turmaForm.Horario2 == 7 ||
        this.turmaForm.Horario2 == 8 ||
        this.turmaForm.Horario2 == 13 ||
        this.turmaForm.Horario2 == 14 ||
        this.turmaForm.Horario2 == 19 ||
        this.turmaForm.Horario2 == 20 ||
        this.turmaForm.Horario2 == 25 ||
        this.turmaForm.Horario2 == 26 ||
        this.turmaForm.Horario2 == 3 ||
        this.turmaForm.Horario2 == 4 ||
        this.turmaForm.Horario2 == 9 ||
        this.turmaForm.Horario2 == 10 ||
        this.turmaForm.Horario2 == 15 ||
        this.turmaForm.Horario2 == 16 ||
        this.turmaForm.Horario2 == 21 ||
        this.turmaForm.Horario2 == 22 ||
        this.turmaForm.Horario2 == 27 ||
        this.turmaForm.Horario2 == 28
      ) {
        this.turmaForm.turno1 = "Diurno";
      } else if (this.turmaForm.Horario2 == 31) {
        this.turmaForm.turno1 = "EAD";
      } else {
        this.turmaForm.turno1 = "Noturno";
      }
    },
    setEad: function() {
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
          type: "error"
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
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
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
    }
  },
  computed: {
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
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    }
  }
};
</script>
<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

td {
  text-align: center;
  vertical-align: middle;
  padding: 0;
  height: 40px;
}
p {
  margin-bottom: 0;
  text-align: center;
}

input {
  height: 18px;
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
</style>