<template>
  <div class="turmarow" style="font-size:11px;">
    <td>
      <div style="width:25px !important;">
        <input
          type="checkbox"
          class="form-check-input position-static m-0"
          name="ativa"
          value="true"
          v-on:click="checkDelete(turma)"
          v-model="ativo"
        />
      </div>
    </td>
    <td>
      <div style="width:40px !important;">
        <select
          id="2periodo"
          style="width: 35px;"
          v-model="turmaForm.periodo"
          v-on:change="editTurma(turmaForm)"
        >
          <option value="1">1</option>
          <option value="3">3</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width:70px;">
        <template
          type="text"
          style="width:70px;"
          v-for="disciplina in DisciplinasCod"
        >
          <template v-if="disciplina.id === turma.Disciplina">
            {{ disciplina.codigo }}
          </template>
        </template>
      </div>
    </td>

    <td>
      <div style="width: 330px;">
        <select
          type="text"
          style="width:325px;"
          id="disciplina"
          v-model="turmaForm.Disciplina"
          v-on:change="editTurma(turmaForm)"
        >
          <option v-if="Disciplinas.length === 0" type="text" value
            >Nenhuma Disciplina Encontrada</option
          >
          <option
            v-for="disciplina in Disciplinas"
            :key="disciplina.id"
            :value="disciplina.id"
            >{{ disciplina.nome }}</option
          >
        </select>
      </div>
    </td>

    <td>
      <div style="width: 18px;">
        <p style="width:18px;">
          <template v-for="disciplina in Disciplinas">
            <template v-if="disciplina.id === turma.Disciplina">{{
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
          style="width: 20px;"
          v-model="turmaForm.letra"
          v-on:blur="editTurma(turmaForm)"
        />
      </div>
    </td>

    <td>
      <div style="width: 68px;">
        <select
          type="text"
          style="width: 63px; "
          id="turno1"
          v-model="turmaForm.turno1"
          v-on:change="editTurma(turmaForm)"
        >
          <option value="Diurno">Diurno</option>
          <option value="Noturno">Noturno</option>
          <option value="EAD">EAD</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 72px;  padding-top:1px; padding-bottom:1px">
        <select
          type="text"
          style="width: 67px; margin-bottom:1px;"
          id="horario1"
          v-model="turmaForm.Horario1"
          v-on:change="checkHorario(1)"
        >
          <option v-if="Horarios.length === 0" type="text" value
            >Nenhum Horário Encontrado</option
          >
          <option v-else value></option>
          <option
            v-for="horario in Horarios"
            :key="horario.id"
            :value="horario.id"
            >{{ horario.horario }}</option
          >
        </select>
        <select
          type="text"
          style="width: 67px;"
          id="horario2"
          v-model="turmaForm.Horario2"
          v-on:change="checkHorario(2)"
        >
          <option v-if="Horarios.length === 0" type="text" value
            >Nenhum Horário Encontrado</option
          >
          <option v-else value></option>
          <option
            v-for="horario in Horarios"
            :key="horario.id"
            :value="horario.id"
            >{{ horario.horario }}</option
          >
        </select>
      </div>
    </td>

    <td>
      <div style="width: 98px;  padding-top:1px; padding-bottom:1px">
        <select
          type="text"
          style="width:93px; margin-bottom:1px"
          id="sala1"
          v-model="turmaForm.Sala1"
          v-on:change="checkSala(1)"
        >
          <option v-if="Salas.length === 0" type="text" value
            >Nenhuma Sala Encontrada</option
          >
          <option v-else value></option>
          <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{
            sala.nome
          }}</option>
        </select>
        <select
          type="text"
          style="width: 93px"
          id="sala2"
          v-model="turmaForm.Sala2"
          v-on:change="checkSala(2)"
        >
          <option v-if="Salas.length === 0" type="text" value
            >Nenhuma Sala Encontrada</option
          >
          <option v-else value></option>
          <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{
            sala.nome
          }}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width:40px">
        <p style="40px; font-weight: bold;">{{ totalPedidos() }}</p>
        <p style="width: 40px;">
          {{ totalPedidosPeriodizados() }}+{{ totalPedidosNaoPeriodizados() }}
        </p>
      </div>
    </td>

    <template v-for="curso in Cursos">
      <td :key="curso.id">
        <template v-for="(pedido, index) in Pedidos">
          <template v-if="pedido.Curso === curso.id">
            <turmaExternaPedido
              :key="index"
              v-bind:index="index"
              v-bind:turma="turma"
            ></turmaExternaPedido>
          </template>
        </template>
      </td>
    </template>
  </div>
</template>
<script>
import _ from "lodash";
import turmaExternaPedido from "./TurmaExternaPedido.vue";
import turmaExternaService from "@/common/services/turmaExterna";
import pedidoExternoService from "@/common/services/pedidoExterno";

export default {
  name: "TurmaRow",
  props: {
    turma: Object,
    perfil: Object
  },

  components: {
    turmaExternaPedido
  },

  data() {
    return {
      ativo: false,
      valorAtual: undefined,
      turmaForm: undefined,
      currentData: undefined
    };
  },

  mounted() {
    this.turmaForm = _.clone(this.turma);
    this.currentData = this.TurmaForm;
  },

  methods: {
    totalPedidos() {
      var t = 0;
      var pedidos = this.$store.state.pedidoExterno.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
    },

    totalPedidosPeriodizados() {
      var t = 0;
      var pedidos = this.$store.state.pedidoExterno.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
      }
      return t;
    },

    totalPedidosNaoPeriodizados() {
      var t = 0;
      var pedidos = this.$store.state.pedidoExterno.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
    },

    editTurma(turma) {
      if (turma.Horario1 === "") turma.Horario1 = null;

      if (turma.Horario2 === "") turma.Horario2 = null;

      if (turma.Sala1 === "") turma.Sala1 = null;

      if (turma.Sala2 === "") turma.Sala2 = null;

      if (turma.turno1 === "") turma.turno1 = null;

      if (turma.turno1 === "EAD") {
        turma.Horario1 = 31;
        if (turma.Horario2 > 0) turma.Horario2 = null;
      }

      console.log(turma);

      turmaExternaService
        .update(turma.id, turma)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Turma ${response.Turma.letra} foi atualizada!`,
            type: "success"
          });
          this.currentData = _.clone(this.turmaForm);
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Turma</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    checkDelete(turma) {
      this.$store.commit("checkDeleteExterno", { Turma: turma });
      console.log(this.$store.state.turmaExterna.Deletar);
    },

    editPedido(pedido) {
      pedidoExternoService
        .update(pedido.Curso, pedido.Turma, pedido)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O pedido foi atualizado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Pedido</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    checkHorario(horario) {
      if (!this.checkHorarioSala(horario)) this.editTurma(this.turmaForm);
      else {
        if (horario === 1) this.turmaForm.Horario1 = this.currentData.Horario1;
        else this.turmaForm.Horario2 = this.currentData.Horario2;
      }
    },

    checkSala(sala) {
      if (!this.checkHorarioSala(sala)) this.editTurma(this.turmaForm);
      else {
        if (sala === 1) this.turmaForm.Sala1 = this.currentData.Sala1;
        else this.turmaForm.Sala2 = this.currentData.Sala2;
      }
    },

    checkHorarioSala(horario) {
      let horarios1618 = [4, 10, 16, 22, 28];
      let horarios1719 = [32, 34, 36, 38, 40];
      let horarios1820 = [33, 35, 37, 39, 41];
      let horarios1921 = [5, 11, 17, 23, 29];
      if (this.turmaForm.Horario1 === "") this.turmaForm.Horario1 = null;
      if (this.turmaForm.Horario2 === "") this.turmaForm.Horario2 = null;
      if (this.turmaForm.Sala1 === "") this.turmaForm.Sala1 = null;
      if (this.turmaForm.Sala2 === "") this.turmaForm.Sala2 = null;
      if (
        (!_.isNull(this.turmaForm.Horario1) ||
          !_.isNull(this.turmaForm.Horario2)) &&
        (!_.isNull(this.turmaForm.Sala1) || !_.isNull(this.turmaForm.Sala2))
      ) {
        if (
          horario === 1
            ? this.turmaForm.Horario1 === 31
            : this.turmaForm.Horario2 === 31
        ) {
          return false;
        } else if (
          horario === 1 &&
          _.includes(horarios1618, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1618(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1618, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1618(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1719, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1719(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1719, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1719(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1820, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1820(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1820, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1820(2, 2)) return true;
        } else if (
          horario === 1 &&
          _.includes(horarios1921, this.turmaForm.Horario1)
        ) {
          if (this.checkHorarioSala1921(1, 1)) return true;
        } else if (
          horario === 2 &&
          _.includes(horarios1921, this.turmaForm.Horario2)
        ) {
          if (this.checkHorarioSala1921(2, 2)) return true;
        } else {
          if (horario == 1) {
            if (this.checkHorarioSalaGeral(1, 1)) return true;
          } else {
            if (this.checkHorarioSalaGeral(2, 2)) return true;
          }
        }
      }
      return false;
    },

    notifyHorarioSala(horario, sala) {
      let h =
        horario === 1
          ? _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario1
            ])
          : _.find(this.$store.state.horario.Horarios, [
              "id",
              this.turmaForm.Horario2
            ]);
      let s =
        sala === 1
          ? _.find(this.$store.state.sala.Salas, ["id", this.turmaForm.Sala1])
          : _.find(this.$store.state.sala.Salas, ["id", this.turmaForm.Sala2]);

      let text = `Conflito no horário ${h.horario} com a sala ${s.nome}`;
      this.$notify({
        group: "general",
        title: "Erro",
        text: text,
        type: "error"
      });
    },

    checkHorarioSala1618(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        t => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              32 + (this.turmaForm.Horario1 - 4) / 3 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              32 + (this.turmaForm.Horario2 - 4) / 3 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1719(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        t => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario1 ||
              this.turmaForm.Horario1 + 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              4 + (this.turmaForm.Horario1 - 32) * 3 === t.Horario2 ||
              this.turmaForm.Horario1 + 1 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario1 ||
              this.turmaForm.Horario2 + 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              4 + (this.turmaForm.Horario2 - 32) * 3 === t.Horario2 ||
              this.turmaForm.Horario2 + 1 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1820(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        t => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario1 ||
              this.turmaForm.Horario1 - 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              5 + (this.turmaForm.Horario1 - 33) * 3 === t.Horario2 ||
              this.turmaForm.Horario1 - 1 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario1 ||
              this.turmaForm.Horario2 - 1 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              5 + (this.turmaForm.Horario2 - 33) * 3 === t.Horario2 ||
              this.turmaForm.Horario2 - 1 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSala1921(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        t => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              this.turmaForm.Horario1 === t.Horario1 ||
              33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario1 === t.Horario2 ||
              33 + (this.turmaForm.Horario1 - 5) / 3 === t.Horario2;
          } else {
            h1 =
              this.turmaForm.Horario2 === t.Horario1 ||
              33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario1;
            h2 =
              this.turmaForm.Horario2 === t.Horario2 ||
              33 + (this.turmaForm.Horario2 - 5) / 3 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    },

    checkHorarioSalaGeral(horario, sala) {
      let conflitos = _.filter(
        _.concat(
          this.$store.state.turma.Turmas,
          this.$store.state.turmaExterna.Turmas
        ),
        t => {
          if (this.turmaForm.periodo != t.periodo) {
            return false;
          }
          let h1, h2;
          if (horario === 1) {
            h1 =
              !_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario1;
            h2 =
              !_.isNull(this.turmaForm.Horario1) &&
              this.turmaForm.Horario1 === t.Horario2;
          } else {
            h1 =
              !_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario1;
            h2 =
              !_.isNull(this.turmaForm.Horario2) &&
              this.turmaForm.Horario2 === t.Horario2;
          }
          let d1, d2;
          if (sala === 1) {
            d1 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala1) &&
              this.turmaForm.Sala1 === t.Sala2;
          } else {
            d1 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala1;
            d2 =
              !_.isNull(this.turmaForm.Sala2) &&
              this.turmaForm.Sala2 === t.Sala2;
          }

          return (h1 && d1) || (h2 && d2);
        }
      );
      if (conflitos.length > 0) {
        if (conflitos.length === 1) {
          if (conflitos[0].id === this.turmaForm.id) {
            return false;
          }
        }

        this.notifyHorarioSala(horario, sala);

        return true;
      }
      return false;
    }
  },

  computed: {
    Cursos() {
      return _.slice(this.$store.state.curso.Cursos, 0, 4);
    },

    Disciplinas() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return d.Perfil == 13 || d.Perfil == 15;
        }),
        "nome"
      );
    },

    DisciplinasCod() {
      return _.orderBy(
        _.filter(this.$store.state.disciplina.Disciplinas, function(d) {
          return d.Perfil == 13 || d.Perfil == 15;
        }),
        "codigo"
      );
    },

    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },

    Pedidos() {
      return this.$store.state.pedidoExterno.Pedidos[this.turma.id];
    },

    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },

    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */
.turmarow {
  width: -webkit-max-content !important;
  width: -moz-max-content !important;
  width: max-content !important;
}
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
select {
  height: 18px !important;
}
input[type="text"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 25px;
  width: 18px;
  text-align: center !important;
}
input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 15px;
  width: 15px;
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
