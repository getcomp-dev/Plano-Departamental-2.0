<template>
    <div class="turmarow" style="width: 571px;" v-bind:style="{backgroundColor: perfil.cor}">
        <td style="width: 16px;">
            <input type="text" style="width: 16px;" id="periodo" v-model="turmaForm.periodo" v-on:blur="editTurma(turma)">
            <input type="checkbox" name="ativa" value="true" v-on:click="checkDelete(turma)" v-model="ativo" style="width:16px;height: 16px;padding:0;">
        </td>
        <td style="width: 64px;">
            <template v-for="disciplina in Disciplinas">
                <template v-if="disciplina.id===turma.Disciplina">
                    <p :key="disciplina.id" style="width:64px">{{disciplina.codigo}}</p>
                </template>
            </template>
        </td>
        <td style="width: 120px;">
            <select type="text" style="width:120px;" id="disciplina" v-model="turmaForm.Disciplina"
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
            <input type="text" style="width: 20px; margin-left: 8px; margin-right: 8px" v-model="turmaForm.letra" v-on:blur="editTurma(turma)">
        </td>
        <td style="width: 100px;">
            <select type="text" style="width:100px" id="docente1" v-model="turmaForm.Docente1"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-else type="text" value=""></option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
            <br/>
            <select type="text" style="width:100px;" id="docente2" v-model="turmaForm.Docente2"
                    v-on:change="editTurma(turma)">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-else type="text" value=""></option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
        </td>
        <td style="width: 62px;">
            <select type="text" style="width: 62px" id="turno1" v-model="turmaForm.turno1" v-on:change="editTurma(turma)">
                <option value=""></option>
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
            </select>
            <br/>
        </td>
        <td style="width: 65px;">
            <select type="text" style="width: 65px" id="horario1" v-model="turmaForm.Horario1"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
            <br/>
            <select type="text" style="width: 65px" id="horario2" v-model="turmaForm.Horario2"
                    v-on:change="editTurma(turma)">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-else value=""></option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
        </td>
        <td style="width: 60px">
            <select type="text" style="width:60px" id="sala1" v-model="turmaForm.Sala1" v-on:change="editTurma(turma)">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-else value=""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
            <br/>
            <select type="text" style="width: 60px" id="sala2" v-model="turmaForm.Sala2" v-on:change="editTurma(turma)">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-else value=""></option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
        </td>
        <td style="width:28px"><p style="width: 28px">{{totalPedidos()}}</p></td>
        <template v-for="curso in Cursos" v-if="CursosAtivos[curso.id]">
            <td style="width: 32px;" :key="curso.id">
                <template v-for="(pedido, index) in Pedidos" v-if="pedido.Curso===curso.id">
                    <turmaPedido :key="index" v-bind:index="index" v-bind:turma="turma"></turmaPedido>
                </template>
            </td>
        </template>
    </div>
</template>
<script>
    import turmaService from '../../common/services/turma'
    import turmaPedido from './TurmaPedido.vue'
    import _ from 'lodash'

    const emptyTurma = {
        id:undefined,
        periodo:undefined,
        letra:undefined,
        turno1:undefined,
        turno2:undefined,
        Disciplina:undefined,
        Docente1:undefined,
        Docente2:undefined,
        Horario1:undefined,
        Horario2:undefined,
        Sala1:undefined,
        Sala2:undefined
    }

    export default {
        name:'TurmaRow',
        props: {
            turma:Object,
            perfil:Object
        },

        data () {
            return {
                ativo: false,
                valorAtual:undefined,
                turmaForm:_.clone(emptyTurma)
            }
        },

        components: {
            turmaPedido
        },

        mounted: function(){
            this.turmaForm = _.clone(this.turma)
        },

        methods: {

            totalPedidos(){
              var t = 0
              var pedidos = this.$store.state.pedido.Pedidos[this.turma.id]
              for(var p =0; p < pedidos.length; p++){
                      t+=parseInt(pedidos[p].vagasPeriodizadas, 10)
                      t+=parseInt(pedidos[p].vagasNaoPeriodizadas, 10)
              }
              return t
            },

            editTurma() {
                if(this.turmaForm.periodo !=1 && this.turmaForm.periodo!=3){
                    this.turmaForm.periodo = this.turma.periodo
                    this.$notify({
                        title: "Erro",
                        text: "O semestre deve ser 1 ou 3",
                        type: "error"
                    })
                    return
                }

                if(this.turmaForm.Docente1==="")
                    this.turmaForm.Docente1=null

                if(this.turmaForm.Docente2==="")
                    this.turmaForm.Docente2=null

                if(this.turmaForm.Horario1==="")
                    this.turmaForm.Horario1=null

                if(this.turmaForm.Horario2==="")
                    this.turmaForm.Horario2=null

                if(this.turmaForm.Sala1==="")
                    this.turmaForm.Sala111=null

                if(this.turmaForm.Sala2==="")
                    this.turmaForm.Sala2=null

                if(this.turmaForm.Turno1==="")
                    this.turmaForm.Turno1=null
                turmaService.update(this.turma.id, this.turmaForm).then((response) => {
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

        },
        computed: {
            Cursos () {
                return _.orderBy(this.$store.state.curso.Cursos, 'posicao')
            },

            CursosAtivos () {
                return this.$store.state.curso.Ativos
            },

            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas,'nome')
            },

            Docentes () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
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
                return this.$store.state.pedido.Pedidos[this.turma.id]
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