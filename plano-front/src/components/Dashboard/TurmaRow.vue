<template>
<div class="turmarow" style="width: 850px;  font-size:11px;" v-bind:style="{backgroundColor: perfil.cor}">
    <td>
        <div style="width:24px !important;">
            <input :disabled="Admin ? false : true" type="text" style="width: 18px; height:15px; margin-top:3px" id="periodo" v-model="turmaForm.periodo" v-on:blur="editTurma(turma)">
            <input :disabled="Admin ? false : true" type="checkbox" style="margin-top:2px; width:16px; height:14px" name="ativa" value="true" v-on:click="checkDelete(turma)" v-model="ativo">
        </div>
    </td>
    <td>
        <div style="width:70px;">
            <template v-for="disciplina in Disciplinas">
                <template v-if="disciplina.id===turma.Disciplina">
                    <p :key="disciplina.id" style="width:70px">{{disciplina.codigo}}</p>
                </template>
            </template>
        </div>
    </td>
    <td >
        <div style="width: 330px;">
            <select :disabled="Admin ? false : true" type="text" style="width:325px;" id="disciplina" v-model="turmaForm.Disciplina"
                    v-on:change="editTurma(turma)">
                <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">
                    {{disciplina.nome}}
                </option>
            </select>
        </div>
    </td>
    <td>
        <div style="width: 18px;">
            <p style="width:18px;">
                <template v-for="disciplina in Disciplinas">
                    <template v-if="disciplina.id===turma.Disciplina">
                        {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                    </template>
                </template>
            </p>
        </div>
    </td>
    <td >
        <div style="width: 40px">
            <input :disabled="Admin ? false : true" type="text" style="width: 20px;" v-model="turmaForm.letra" v-on:blur="editTurma(turma)">
        </div>
    </td>
    <td>
        <div style="width: 130px;">
            <select :disabled="Admin ? false : true" type="text" style="width:125px" id="docente1" v-model="turmaForm.Docente1"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-else type="text" value=""></option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>

            <select :disabled="Admin ? false : true" type="text" style="width:125px;" id="docente2" v-model="turmaForm.Docente2"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-else type="text" value=""></option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
        </div>
    </td>

    <td>
        <div style="width: 68px">
            <select :disabled="Admin ? false : true" type="text" style="width: 63px" id="turno1" v-model="turmaForm.turno1" v-on:change="editTurma(turma)">
                <option value=""></option>
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
                <option value="EAD">EAD</option>
            </select>
        </div>
    </td>

    <td>
        <div style="width:72px">
            <select :disabled="Admin ? false : true" type="text" style="width: 67px; margin-bottom:1px" id="horario1" v-model="turmaForm.Horario1"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>

            <select :disabled="Admin ? false : true" type="text" style="width: 67px" id="horario2" v-model="turmaForm.Horario2"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
        </div>
    </td>
    <td>
        <div style="width: 98px">
            <select :disabled="Admin ? false : true" type="text" style="width:92px; margin-bottom:1px;" id="sala1" v-model="turmaForm.Sala1" v-on:change="editTurma(turma)">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-else value=""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
            <select :disabled="Admin ? false : true" type="text" style="width: 92px" id="sala2" v-model="turmaForm.Sala2" v-on:change="editTurma(turma)">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-else value=""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
        </select>
        </div>
    </td>

    <td>
        <div style="width:32px">
            <p style="width: 32px">
                {{totalPedidos()}}
            </p>
            <p style="width: 32px; margin:0;">
                {{totalPedidosPeriodizados()}}+{{totalPedidosNaoPeriodizados()}}
            </p>
        </div>
    </td>

    <template v-for="curso in cursos">
        <td :key="curso.id">
          <template v-for="(pedido, index) in Pedidos" v-if="pedido.Curso===curso.id">
            <turmaPedido :key="index" v-bind:index="index" v-bind:turma="turma"></turmaPedido>
          </template>
        </td>
    </template>
  </div>
</template>
<script>
import turmaService from "../../common/services/turma";
import turmaPedido from "./TurmaPedido.vue";
import _ from "lodash";

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
  name: "TurmaRow",
  props: {
    turma: Object,
    perfil: Object,
    cursos: Array
  },

  data() {
    return {
      ativo: false,
      valorAtual: undefined,
      turmaForm: _.clone(emptyTurma)
    };
  },

  components: {
    turmaPedido
  },

  mounted: function() {
    this.turmaForm = _.clone(this.turma);
  },

  methods: {
    totalPedidos() {
      var t = 0;
      var pedidos = this.$store.state.pedido.Pedidos[this.turma.id];
      for (var p = 0; p < pedidos.length; p++) {
        t += parseInt(pedidos[p].vagasPeriodizadas, 10);
        t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10);
      }
      return t;
    },

    totalPedidosPeriodizados(){
        var t = 0
        var pedidos = this.$store.state.pedido.Pedidos[this.turma.id]
        for(var p =0; p < pedidos.length; p++){
            t+=parseInt(pedidos[p].vagasPeriodizadas, 10)
        }
        return t
    },

    totalPedidosNaoPeriodizados(){
        var t = 0
        var pedidos = this.$store.state.pedido.Pedidos[this.turma.id]
        for(var p =0; p < pedidos.length; p++){
            t+=parseInt(pedidos[p].vagasNaoPeriodizadas, 10)
        }
        return t
    },

    editTurma() {
      if (this.turmaForm.periodo != 1 && this.turmaForm.periodo != 3) {
        this.turmaForm.periodo = this.turma.periodo;
        this.$notify({
          title: "Erro",
          text: "O semestre deve ser 1 ou 3",
          type: "error"
        });
        return;
      }

      if (this.turmaForm.Docente1 === "") this.turmaForm.Docente1 = null;

      if (this.turmaForm.Docente2 === "") this.turmaForm.Docente2 = null;

      if (this.turmaForm.Horario1 === "") this.turmaForm.Horario1 = null;

      if (this.turmaForm.Horario2 === "") this.turmaForm.Horario2 = null;

      if (this.turmaForm.Sala1 === "") this.turmaForm.Sala111 = null;

      if (this.turmaForm.Sala2 === "") this.turmaForm.Sala2 = null;

      if(this.turmaForm.turno1==="")  this.turmaForm.turno1=null

      if(this.turmaForm.turno1==="EAD"){
        this.turmaForm.Horario1 = 31
        if(this.turmaForm.Horario2 > 0)
          this.turmaForm.Horario2 = null
      }
      turmaService
        .update(this.turma.id, this.turmaForm)
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
    checkDelete(turma) {
      this.$store.commit("checkDelete", { Turma: turma });
      console.log(this.$store.state.turma.Deletar);
    }
  },
  computed: {
    Cursos() {
      return _.orderBy(this.$store.state.curso.Cursos, "posicao");
    },

    CursosAtivos() {
      return this.$store.state.curso.Ativos;
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
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

    Pedidos () {
        return this.$store.state.pedido.Pedidos[this.turma.id]
    },

    Admin () {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true
      } else {
        return false
      }
    },

    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },

    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    },

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