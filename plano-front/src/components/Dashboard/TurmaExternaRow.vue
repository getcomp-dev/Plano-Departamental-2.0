<template>
    <div class="turmarow" style="width: 100vw" v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
        <td style="width: 16px;">
            <input type="text" style="width: 16px;" id="periodo" v-model="turma.periodo" v-on:blur="editTurma(turma)">
            <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(turma)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
        </td>
        <td style="width: 80px;">
            <template v-for="disciplina in Disciplinas">
                <template v-if="disciplina.id===turma.Disciplina">
                    <p :key="disciplina.id" style="width:80px">{{disciplina.codigo}}</p>
                </template>
            </template>
        </td>
        <td style="width: 178px;">
            <select type="text" style="width:178px;" id="disciplina" v-model="turma.Disciplina"
                    v-on:change="editTurma(turma)">
                <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">
                    {{disciplina.nome}}
                </option>
            </select>
        </td>
        <td style="width: 20px;">
            <p style="width:20px; min-width: 20px;">
                <template v-for="disciplina in Disciplinas">
                    <template v-if="disciplina.id===turma.Disciplina">
                        {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                    </template>
                </template>
            </p>
        </td>
        <td style="width: 52px;">
            <input type="text" style="width: 28px; margin-left: 12px; margin-right: 12px" v-model="turma.letra" v-on:blur="editTurma(turma)">
        </td>
        <td style="width: 84px;">
            <select type="text" style="width: 84px" id="turno1" v-model="turma.turno1" v-on:change="editTurma(turma)">
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
            </select>
            <br/>
        </td>
        <td style="width: 90px;">
            <select type="text" style="width: 90px" id="horario1" v-model="turma.Horario1"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value = ""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
            <br/>
            <select type="text" style="width: 90px" id="horario2" v-model="turma.Horario2"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
        </td>
        <td style="width: 60px">
            <select type="text" style="width:60px" id="sala1" v-model="turma.Sala1" v-on:change="editTurma(turma)">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-else value=""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
            <br/>
            <select type="text" style="width: 60px" id="sala2" v-model="turma.Sala2" v-on:change="editTurma(turma)">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-else value = ""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
        </td>
        <td style="width:52px"><p style="width: 52px">{{totalPedidos()}}</p></td>
        <template v-for="curso in Cursos">
            <td style="width: 64px">
                <template v-for="pedido in Pedidos" v-if="pedido.Curso===curso.id">
                    <input type="text" v-model="pedido.vagasPeriodizadas" style="width: 64px"
                           v-on:change="editPedido(pedido)">
                    <input type="text" v-model="pedido.vagasNaoPeriodizadas" style="width: 64px"
                           v-on:change="editPedido(pedido)">
                </template>
            </td>
        </template>
    </div>
</template>
<script>
    import _ from 'lodash'
    import turmaExternaService from '../../common/services/turmaExterna'
    import pedidoExternoService from '../../common/services/pedidoExterno'

    export default {
        name:'TurmaRow',
        props: {
            turma:Object,
            perfil:Object
        },

        data () {
            return {
                ativo: false,
                valorAtual:undefined
            }
        },

        methods: {

            totalPedidos(){
                var t = 0
                var id = this.turma.id
                var pedidos = _.filter(this.$store.state.pedidoExterno.Pedidos, function(p) { return p.Turma==id })
                for(var p =0; p < pedidos.length; p++){
                    t+=parseInt(pedidos[p].vagasPeriodizadas, 10)
                    t+=parseInt(pedidos[p].vagasNaoPeriodizadas, 10)
                }
                return t
            },

            editTurma(turma) {

                if(turma.Horario1==="")
                    turma.Horario1=null

                if(turma.Horario2==="")
                    turma.Horario2=null

                if(turma.Sala1==="")
                    turma.Sala111=null

                if(turma.Sala2==="")
                    turma.Sala2=null
                console.log(turma)

                turmaExternaService.update(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi atualizada!`,
                        type: 'success'
                    })
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },
            checkDelete(turma) {
                this.$store.commit('checkDeleteExterno', {Turma:turma})
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
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Pedido</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            }
        },
        computed: {
            Cursos () {
                return _.slice(this.$store.state.curso.Cursos, 0, 4)
            },

            Disciplinas () {
                return _.orderBy(_.filter(this.$store.state.disciplina.Disciplinas, function(d) {return d.Perfil==13}),'nome')
            },

            Horarios () {
                return _.orderBy(this.$store.state.horario.Horarios,'horario')
            },

            Salas () {
                return _.orderBy(this.$store.state.sala.Salas,'nome')
            },

            Perfis () {
                return _.orderBy(this.$store.state.perfil.Perfis,'nome')
            },

            Pedidos () {
                var t = this.turma.id
                return _.filter(this.$store.state.pedidoExterno.Pedidos, function(p) { return p.Turma==t })
            }


        }
    }
</script>
<style scoped>
    td {
        text-align: center;
        padding: 0!important;
    }

    p {
        text-align: center;
    }

    input {
        height: 25px;
        width:auto;
        text-align: left;
    }
</style>