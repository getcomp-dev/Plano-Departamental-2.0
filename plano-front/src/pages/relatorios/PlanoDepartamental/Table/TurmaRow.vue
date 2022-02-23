<template>
  <tr v-if="disciplinasAmarradas">
    <v-td width="80" />
    <v-td width="350" />
    <v-td width="80" />
    <v-td width="65">{{ turma.periodo }}</v-td>
    <v-td width="45" paddingX="0">{{ turma.letra }}</v-td>
    <v-td width="150" align="start">
      {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
    </v-td>
    <v-td width="130" paddingX="0">
      {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </v-td>
    <v-td width="90">{{ getSalasConvertidas() }}</v-td>
    <v-td width="65">{{ creditoTotal }}</v-td>

    <template v-if="showVagas">
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagas }}
      </v-td>
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagasOferecidas }}
      </v-td>
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagasOcupadas }}
      </v-td>
    </template>
  </tr>
  <tr v-else>
    <v-td width="80">{{ turma.disciplina.codigo }}</v-td>
    <v-td width="350">{{ turma.disciplina.nome }}</v-td>
    <v-td width="80">{{ turma.disciplina.perfil.abreviacao }}</v-td>
    <v-td width="65">{{ turma.periodo }}</v-td>
    <v-td width="45" paddingX="0">{{ turma.letra }}</v-td>
    <v-td width="150" align="start">
      {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
    </v-td>
    <v-td width="130" paddingX="0">
      {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
    </v-td>
    <v-td width="90">{{ getSalasConvertidas() }}</v-td>
    <v-td width="65">{{ creditoTotal }}</v-td>

    <template v-if="showVagas">
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagas }}
      </v-td>
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagasOferecidas }}
      </v-td>
      <v-td
        width="80"
        class="td-vagas clickable"
        @click="$emit('click-in-turma-vaga', turma)"
        title="Exibir detalhes sobre a vaga"
      >
        {{ turma.vagasOcupadas }}
      </v-td>
    </template>
  </tr>
</template>

<script>
import { generateHorariosText, generateDocentesText } from "@/common/mixins";
import { mapGetters } from "vuex";

export default {
  name: "TurmaRow",
  mixins: [generateHorariosText, generateDocentesText],
  props: {
    turma: { type: Object, required: true },
    creditoTotal: { type: [Number, String], default: "" },
    showVagas: { type: Boolean, required: true },
    disciplinasAmarradas: { type: Boolean, required: true },
  },
  methods: {
    getSalasConvertidas() {
      if (this.turma.Sala1 === null && this.turma.Sala2 === null) return "-";

      let nomeSala1 = "";
      let nomeSala2 = "";

      for (const sala of this.AllSalas) {
        if (sala.id === this.turma.Sala1) {
          nomeSala1 = sala.nome;
          if (this.turma.Sala2 === null) break;
        }

        if (sala.id === this.turma.Sala2) {
          nomeSala2 = sala.nome;
          if (this.turma.Sala1 === null) break;
        }

        if (nomeSala1 !== "" && nomeSala2 !== "") break;
      }

      if (this.turma.Sala1 !== null && this.turma.Sala2 === null) return nomeSala1;

      if (this.turma.Sala2 !== null && this.turma.Sala1 === null) return nomeSala2;

      if (this.turma.Sala1 !== null && this.turma.Sala2 !== null)
        return `${nomeSala1} / ${nomeSala2}`;
    },
  },

  computed: {
    ...mapGetters(["AllSalas"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

td.td-vagas:hover {
  color: $clr-lightblue;
  text-decoration: underline;
}
</style>
