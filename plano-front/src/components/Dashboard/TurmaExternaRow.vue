<template>
  <div
    class="turmarow"
    style="width: ‭884‬px; font-size:11px;"
    v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}"
  >
    <td>
      <div style="width:24px !important; margin-left:-1px">
        <input
          type="text"
          style="width: 20px; height:15px; margin-top:3px"
          id="periodo"
          v-model="turma.periodo"
          v-on:blur="editTurma(turma)"
        />
        <input
          type="checkbox"
          style="margin-top:2px; width:16px; height:14px"
          name="ativa"
          value="true"
          v-on:click="checkDelete(turma)"
          v-model="ativo"
        />
      </div>
    </td>

    <td>
      <div style="width:70px;">
        <template type="text" style="width:70px;" v-for="disciplina in DisciplinasCod">
          <template v-if="disciplina.id ===  turma.Disciplina">
            {{disciplina.codigo}}
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
          v-model="turma.Disciplina"
          v-on:change="editTurma(turma)"
        >
          <option v-if="Disciplinas.length===0" type="text" value>Nenhuma Disciplina Encontrada</option>
          <option
            v-for="disciplina in Disciplinas"
            :key="disciplina.id"
            :value="disciplina.id"
          >{{disciplina.nome}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 18px;">
        <p style="width:18px;">
          <template v-for="disciplina in Disciplinas">
            <template
              v-if="disciplina.id===turma.Disciplina"
            >{{disciplina.cargaPratica + disciplina.cargaTeorica}}</template>
          </template>
        </p>
      </div>
    </td>

    <td>
      <div style="width: 40px">
        <input type="text" style="width: 20px;" v-model="turma.letra" v-on:blur="editTurma(turma)" />
      </div>
    </td>

    <td>
      <div style="width: 68px;">
        <select
          type="text"
          style="width: 63px; "
          id="turno1"
          v-model="turma.turno1"
          v-on:change="editTurma(turma)"
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
          v-model="turma.Horario1"
          v-on:change="editTurma(turma)"
        >
          <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
          <option v-else value></option>
          <option
            v-for="horario in Horarios"
            :key="horario.id"
            :value="horario.id"
          >{{horario.horario}}</option>
        </select>
        <select
          type="text"
          style="width: 67px;"
          id="horario2"
          v-model="turma.Horario2"
          v-on:change="editTurma(turma)"
        >
          <option v-if="Horarios.length===0" type="text" value>Nenhum Horário Encontrado</option>
          <option v-else value></option>
          <option
            v-for="horario in Horarios"
            :key="horario.id"
            :value="horario.id"
          >{{horario.horario}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width: 98px;  padding-top:1px; padding-bottom:1px">
        <select
          type="text"
          style="width:93px; margin-bottom:1px"
          id="sala1"
          v-model="turma.Sala1"
          v-on:change="editTurma(turma)"
        >
          <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
          <option v-else value></option>
          <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
        </select>
        <select
          type="text"
          style="width: 93px"
          id="sala2"
          v-model="turma.Sala2"
          v-on:change="editTurma(turma)"
        >
          <option v-if="Salas.length===0" type="text" value>Nenhuma Sala Encontrada</option>
          <option v-else value></option>
          <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
        </select>
      </div>
    </td>

    <td>
      <div style="width:32px">
        <p style="32px; font-weight: bold;">{{totalPedidos()}}</p>
        <p style="width: 32px; padding:0; border:0; margin:0;">{{totalPedidosPeriodizados()}}+{{totalPedidosNaoPeriodizados()}}</p>
      </div>
    </td>
        
    <template v-for="curso in Cursos">
      <td>
        <template v-for="(pedido, index) in Pedidos">
          <template v-if="pedido.Curso===curso.id">
            <turmaExternaPedido :key="index" v-bind:index="index" v-bind:turma="turma"></turmaExternaPedido>
          </template>
        </template>
      </td>
    </template>

  </div>
</template>
<script>
import _ from 'lodash'
import turmaExternaPedido from './TurmaExternaPedido.vue'
import turmaExternaService from '../../common/services/turmaExterna'
import pedidoExternoService from '../../common/services/pedidoExterno'

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
            valorAtual: undefined
        };
    },

    methods: {

        totalPedidos() {
            var t = 0
            var pedidos = this.$store.state.pedidoExterno.Pedidos[this.turma.id]
            for (var p = 0; p < pedidos.length; p++) {
                t += parseInt(pedidos[p].vagasPeriodizadas, 10)
                t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10)
            }
            return t
        },

        totalPedidosPeriodizados() {
            var t = 0
            var pedidos = this.$store.state.pedidoExterno.Pedidos[this.turma.id]
            for (var p = 0; p < pedidos.length; p++) {
                t += parseInt(pedidos[p].vagasPeriodizadas, 10)
            }
            return t
        },

        totalPedidosNaoPeriodizados() {
            var t = 0
            var pedidos = this.$store.state.pedidoExterno.Pedidos[this.turma.id]
            for (var p = 0; p < pedidos.length; p++) {
                t += parseInt(pedidos[p].vagasNaoPeriodizadas, 10)
            }
            return t
        },

        editTurma(turma) {
            if (turma.Horario1 === "") turma.Horario1 = null;

            if (turma.Horario2 === "") turma.Horario2 = null;

            if (turma.Sala1 === "") turma.Sala111 = null;

            if (turma.Sala2 === "") turma.Sala2 = null;

            if (turma.turno1 === "") turma.turno1 = null

            if (turma.turno1 === "EAD") {
                turma.Horario1 = 31
                if (turma.Horario2 > 0)
                    turma.Horario2 = null
            }

            console.log(turma);

            turmaExternaService.update(turma.id, turma).then((response) => {
                this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `A Turma ${response.Turma.letra} foi atualizada!`,
                type: 'success'
            })
        }).
            catch(error => {
                this.error = '<b>Erro ao atualizar Turma</b>'
            if (error.response.data.fullMessage) {
                this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
            }
        })
        },

        checkDelete(turma) {
            this.$store.commit('checkDeleteExterno', {Turma: turma})
            console.log(this.$store.state.turmaExterna.Deletar)
        },

        editPedido(pedido) {
            pedidoExternoService.update(pedido.Curso, pedido.Turma, pedido).then((response) => {
                this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `O pedido foi atualizado!`,
                type: 'success'
            })
        }).
            catch(error => {
                this.error = '<b>Erro ao atualizar Pedido</b>'
            if (error.response.data.fullMessage) {
                this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
            }
        })
        }
    },

    computed: {
        Cursos() {
            return _.slice(this.$store.state.curso.Cursos, 0, 4)
        },

        Disciplinas() {
            return _.orderBy(_.filter(this.$store.state.disciplina.Disciplinas, function (d) {
                return (d.Perfil == 13 || d.Perfil == 15)
            }), 'nome')
        },

        DisciplinasCod() {
            return _.orderBy(_.filter(this.$store.state.disciplina.Disciplinas, function (d) {
                return (d.Perfil == 13 || d.Perfil == 15)
            }), 'codigo')
        },

        Horarios() {
            return _.orderBy(this.$store.state.horario.Horarios, 'horario')
        },

        Pedidos() {
            return this.$store.state.pedidoExterno.Pedidos[this.turma.id]
        },

        Salas() {
            return _.orderBy(this.$store.state.sala.Salas, "nome");
        },

        Perfis() {
            return _.orderBy(this.$store.state.perfil.Perfis, "nome");
        },
    }
}
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

td {
  text-align: center!important;
  vertical-align: middle!important;
  padding: 0!important;
  height: 40px!important;
}
p {
  margin-bottom: 0!important;
  text-align: center!important;
}
input {
  height: 18px !important;
  text-align: center !important;
}
select {
  height: 18px !important;
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