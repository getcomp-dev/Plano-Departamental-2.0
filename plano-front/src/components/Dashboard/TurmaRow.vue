<template>
    <div class="turmarow" style="width: 776px;" v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
        <td style="width: 16px;">
            <input type="text" style="width: 16px;" id="periodo" v-model="turma.periodo" v-on:blur="editTurma(turma)">
            <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(turma)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
        </td>
        <td style="width: 40px;">
            <template v-for="disciplina in Disciplinas">
                <template v-if="disciplina.id===turma.Disciplina">
                    <p :key="disciplina.id" style="width:40px">{{disciplina.codigo}}</p>
                </template>
            </template>
        </td>
        <td style="width: 120px;">
            <select type="text" style="width:120px;" id="disciplina" v-model="turma.Disciplina"
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
        <td style="width: 36px;">
            <input type="text" style="width: 20px; margin-left: 8px; margin-right: 8px" v-model="turma.letra" v-on:blur="editTurma(turma)">
        </td>
        <td style="width: 65px;">
            <select type="text" style="width: 65px" id="horario1" v-model="turma.Horario1"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
            <br/>
            <select type="text" style="width: 65px" id="horario2" v-model="turma.Horario2"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
        </td>
        <td style="width: 100px;">
            <select type="text" style="width:100px" id="docente1" v-model="turma.Docente1"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-else type="text" value=""></option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
            <br/>
            <select type="text" style="width:100px;" id="docente2" v-model="turma.Docente2"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-else type="text" value=""></option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
        </td>
        <td style="width: 62px;">
            <select type="text" style="width: 62px" id="turno1" v-model="turma.turno1" v-on:change="editTurma(turma)">
                <option value=""></option>
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
            </select>
            <br/>
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
                <option v-else value=""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
        </td>
        <td style="width:28px"><p style="width: 28px">{{totalPedidos()}}</p></td>
        <template v-for="curso in Cursos">
            <td style="width: 42px">
                <template v-for="pedido in Pedidos" v-if="pedido.Curso===curso.id">
                    <input type="text" v-model="pedido.vagasPeriodizadas" style="width: 42px"
                           v-on:change="editPedido(pedido)">
                    <input type="text" v-model="pedido.vagasNaoPeriodizadas" style="width: 42px"
                           v-on:change="editPedido(pedido)">
                </template>
            </td>
        </template>
    </div>
</template>
<script>
    import turmaService from '../../common/services/turma'
    import pedidoService from '../../common/services/pedido'

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
              var pedidos = _.filter(this.$store.state.pedido.Pedidos, function(p) { return p.Turma==id })
              for(var p =0; p < pedidos.length; p++){
                      t+=parseInt(pedidos[p].vagasPeriodizadas, 10)
                      t+=parseInt(pedidos[p].vagasNaoPeriodizadas, 10)
              }
              return t
            },

            editTurma(turma) {
                if(turma.Docente1==="")
                    turma.Docente1=null

                if(turma.Docente2==="")
                    turma.Docente2=null

                if(turma.Horario1==="")
                    turma.Horario1=null

                if(turma.Horario2==="")
                    turma.Horario2=null

                if(turma.Sala1==="")
                    turma.Sala111=null

                if(turma.Sala2==="")
                    turma.Sala2=null

                if(turma.Turno1==="")
                    turma.Turno1=null
                turmaService.update(turma.id, turma).then((response) => {
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
                this.$store.commit('checkDelete', {Turma:turma})
                console.log(this.$store.state.turma.Deletar)
            },

            editPedido(pedido) {
                pedidoService.update(pedido.Curso, pedido.Turma, pedido).then((response) => {
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
                return this.$store.state.curso.Cursos
            },

            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas,'nome')
            },

            Docentes () {
                return _.orderBy(this.$store.state.docente.Docentes,'nome')
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
                return _.filter(this.$store.state.pedido.Pedidos, function(p) { return p.Turma==t })
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
        text-align: center;
    }
</style>