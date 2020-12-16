<template>
  <tr class="novaturma">
    <v-td width="25" />
    <v-td width="40" />
    <v-td width="55" type="content">
      <select v-model.number="turmaForm.periodo">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </v-td>
    <v-td
      width="80"
      paddinX="2"
      :style="{
        backgroundColor: turmaForm.disciplina ? turmaForm.disciplina.perfil.cor : '',
      }"
    >
      {{ turmaForm.disciplina ? turmaForm.disciplina.perfil.abreviacao : "" }}
    </v-td>
    <v-td width="80" type="content">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasDCCInPerfis"
          :key="disciplina.codigo + disciplina.id"
          :value="disciplina"
        >
          {{ disciplina.codigo }}
        </option>
      </select>
    </v-td>
    <v-td width="330" type="content">
      <select v-model="turmaForm.disciplina" @change="handleChangeDisciplina">
        <option
          v-for="disciplina in DisciplinasDCCInPerfisOrderedByNome"
          :key="disciplina.nome + disciplina.id"
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
        style="width:30px"
        :value="turmaForm.letra"
        @input="turmaForm.letra = $event.target.value.toUpperCase()"
        @keypress="maskTurmaLetra"
      />
    </v-td>
    <v-td width="160" type="none" paddingX="3">
      <div class="d-flex align-items-center w-100">
        <div class="d-flex flex-column" style="width:130px">
          <select v-model.number="turmaForm.Docente1">
            <option></option>
            <option
              v-for="docente in DocentesByPreferencia"
              :key="docente.id + docente.apelido"
              :value="docente.id"
            >
              {{ docente.apelido }}
              {{
                orderByPreferencia && preferenciaDocente(docente)
                  ? "- " + preferenciaDocente(docente)
                  : ""
              }}
            </option>
          </select>

          <select v-model.number="turmaForm.Docente2">
            <option></option>
            <option
              v-for="docente in DocentesByPreferencia"
              :key="docente.apelido + docente.id"
              :value="docente.id"
            >
              {{ docente.apelido }}
              {{
                orderByPreferencia && preferenciaDocente(docente)
                  ? "- " + preferenciaDocente(docente)
                  : ""
              }}
            </option>
          </select>
        </div>

        <font-awesome-icon
          :icon="['fas', 'graduation-cap']"
          :class="['clickable mx-auto', { 'low-opacity': !orderByPreferencia }]"
          style="font-size:12px"
          title="Alternar ordenação de docentes por preferência"
          @click="orderByPreferencia = !orderByPreferencia"
        />
      </div>
    </v-td>
    <v-td width="80" type="content">
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
    </v-td>
    <v-td width="85" type="content">
      <template v-if="turmaForm.disciplina">
        <select v-model.number="turmaForm.Horario1" @change="handleChangeHorario(1)">
          <option v-if="!disciplinaIsParcialEAD && !disciplinaIsIntegralEAD" />

          <option
            v-for="horario in HorariosFiltredByTurno"
            :key="horario.id + horario.horario"
            :value="horario.id"
          >
            {{ horario.horario }}
          </option>
        </select>

        <select
          v-if="totalCarga >= 4"
          v-model.number="turmaForm.Horario2"
          @change="handleChangeHorario(2)"
        >
          <option v-if="!disciplinaIsParcialEAD && !disciplinaIsIntegralEAD" />

          <template v-if="disciplinaIsParcialEAD">
            <option
              v-for="horario in HorariosEAD"
              :key="horario.horario + horario.id"
              :value="horario.id"
            >
              {{ horario.horario }}
            </option>
          </template>

          <template v-else>
            <option
              v-for="horario in HorariosFiltredByTurno"
              :key="horario.horario + horario.id"
              :value="horario.id"
            >
              {{ horario.horario }}
            </option>
          </template>
        </select>
      </template>
    </v-td>
    <v-td width="95" type="content">
      <template v-if="!disciplinaIsIntegralEAD && turmaForm.disciplina">
        <select v-model.number="turmaForm.Sala1">
          <option />
          <option v-for="sala in AllSalas" :key="sala.id + sala.nome" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>

        <select
          v-if="totalCarga >= 4 && turmaForm.disciplina.ead != 2"
          v-model.number="turmaForm.Sala2"
        >
          <option />
          <option v-for="sala in AllSalas" :key="sala.nome + sala.id" :value="sala.id">
            {{ sala.nome }}
          </option>
        </select>
      </template>
    </v-td>
    <v-td :width="45 + 35 * cursosAtivadosLength" />
  </tr>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { orderBy, filter, some } from "lodash-es";
import { generateEmptyTurma } from "@/common/utils";
import { maskTurmaLetra } from "@/common/mixins";

export default {
  name: "NovaTurmaRow",
  mixins: [maskTurmaLetra],
  props: { cursosAtivadosLength: Number, default: 0 },
  data() {
    return {
      turmaForm: generateEmptyTurma({ periodo: 1, letra: "A" }),
      orderByPreferencia: false,
    };
  },

  methods: {
    ...mapActions(["createTurma", "fetchAllPedidos"]),

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
      if (horarioId == 31 && this.disciplinaIsIntegralEAD) this.turmaForm.turno1 = "EAD";
      else if (some(this.HorariosNoturno, ["id", horarioId]))
        this.turmaForm.turno1 = "Noturno";
      else if (some(this.HorariosDiurno, ["id", horarioId]))
        this.turmaForm.turno1 = "Diurno";
    },
    async handleCreateTurma() {
      try {
        this.setLoading({ type: "partial", value: true });
        this.turmaForm.Plano = this.currentPlano.id;
        await this.createTurma(this.turmaForm);
        await this.fetchAllPedidos();

        this.pushNotification({
          type: "success",
          text: `A turma ${this.turmaForm.letra} foi criada`,
        });
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
    preferenciaDocente(docente) {
      let p = find(this.PreferenciasDisciplina, {
        Docente: docente.id,
      });
      return p ? p.preferencia : false;
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
      "PreferenciasDocentes",
    ]),

    PreferenciasDisciplina() {
      return filter(this.PreferenciasDocentes, ["Disciplina", this.turmaForm.Disciplina]);
    },

    DocentesByPreferencia() {
      if (this.orderByPreferencia) {
        return orderBy(
          this.DocentesAtivos,
          (docente) => {
            const p = find(this.PreferenciasDisciplina, ["Docente", docente.id]);

            return p ? p.preferencia : 0;
          },
          "desc"
        );
      } else {
        return this.DocentesAtivos;
      }
    },
    DisciplinasDCCInPerfisOrderedByNome() {
      return orderBy(this.DisciplinasDCCInPerfis, ["nome"]);
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
          return filter(this.AllHorarios, (horario) => horario.id != 31);
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
