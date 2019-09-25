<template>
    <div>
        <td>
            <input type="text" style="width: 16px;" id="periodo" v-model="turmaForm.periodo">
        </td>
        <td>
            <template v-for="disciplina in Disciplinas">
                <template v-if="disciplina.id===turmaForm.Disciplina">
                    <p :key="disciplina.id" style="width:64px">{{disciplina.codigo}}</p>
                </template>
            </template>
        </td>
        <td>
            <select type="text" style="width:120px;" id="disciplina" v-model="turmaForm.Disciplina">
                <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
            </select>
        </td>
        <td>
            <p style="width:20px; min-width: 20px;">
                <template v-for="disciplina in Disciplinas">
                    <template v-if="disciplina.id===turmaForm.Disciplina">
                        {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                    </template>
                </template>
            </p>
        </td>
        <td>
            <input type="text" style="width: 36px" id="turma" v-model="turmaForm.letra">
        </td>
        <td>
            <select type="text" style="width:100px" id="docente1" v-model="turmaForm.Docente1">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
            <br/>
            <select type="text" style="width:100px;" id="docente2" v-model="turmaForm.Docente2">
                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.apelido}}</option>
            </select>
        </td>
        <td>
            <select type="text" style="width: 62px" id="turno1" v-model="turmaForm.turno1">
                <option value="Diurno">Diurno</option>
                <option value="Noturno">Noturno</option>
            </select>
            <br/>
        </td>
        <td>
            <select type="text" style="width: 65px" id="horario1" v-model="turmaForm.Horario1" v-on:change="adjustTurno1">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
            <br/>
            <select type="text" style="width: 65px" id="horario2" v-model="turmaForm.Horario2" v-on:change="adjustTurno2">
                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
            </select>
        </td>
        <td>
            <select type="text" style="width:60px" id="sala1" v-model="turmaForm.Sala1">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
            <br/>
            <select type="text" style="width: 60px" id="sala2" v-model="turmaForm.Sala2">
                <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
            </select>
        </td>
    </div>
</template>
<script>
    import _ from 'lodash'
    import turmaService from '../../common/services/turma'
    import { EventBus } from '../../event-bus.js'

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
        name:'NovaTurma',

        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                semestre: 1,
                error: undefined
            }
        },

        mounted () {
            EventBus.$on('addTurma', () => {
                this.addTurma()
            })
            this.turmaForm.periodo = this.semestre
            this.turmaForm.letra = 'A'
        },

        beforeDestroy () {
            EventBus.$off('addTurma')
        },

        methods: {
            adjustTurno1: function() {
                if(this.turmaForm.Horario1== 1 || this.turmaForm.Horario1== 2 || this.turmaForm.Horario1== 7 || this.turmaForm.Horario1== 8 || this.turmaForm.Horario1== 13 || this.turmaForm.Horario1== 14 || this.turmaForm.Horario1== 19 || this.turmaForm.Horario1== 20 || this.turmaForm.Horario1== 25 || this.turmaForm.Horario1== 26 || this.turmaForm.Horario1== 3 || this.turmaForm.Horario1== 4 || this.turmaForm.Horario1== 9 || this.turmaForm.Horario1== 10 || this.turmaForm.Horario1== 15 || this.turmaForm.Horario1== 16 || this.turmaForm.Horario1== 21 || this.turmaForm.Horario1== 22 || this.turmaForm.Horario1== 27 || this.turmaForm.Horario1== 28){
                    this.turmaForm.turno1 = "Diurno"
                }else if(this.turmaForm.Horario1==31){
                    this.turmaForm.turno1 = "EAD"
                }else {
                    this.turmaForm.turno1 = "Noturno"
                }
            },

            adjustTurno2: function() {
                if(this.turmaForm.Horario2== 1 || this.turmaForm.Horario2== 2 || this.turmaForm.Horario2== 7 || this.turmaForm.Horario2== 8 || this.turmaForm.Horario2== 13 || this.turmaForm.Horario2== 14 || this.turmaForm.Horario2== 19 || this.turmaForm.Horario2== 20 || this.turmaForm.Horario2== 25 || this.turmaForm.Horario2== 26 || this.turmaForm.Horario2== 3 || this.turmaForm.Horario2== 4 || this.turmaForm.Horario2== 9 || this.turmaForm.Horario2== 10 || this.turmaForm.Horario2== 15 || this.turmaForm.Horario2== 16 || this.turmaForm.Horario2== 21 || this.turmaForm.Horario2== 22 || this.turmaForm.Horario2== 27 || this.turmaForm.Horario2== 28){
                    this.turmaForm.turno1 = "Diurno"
                }else if(this.turmaForm.Horario2==31){
                    this.turmaForm.turno1 = "EAD"
                }else {
                    this.turmaForm.turno1 = "Noturno"
                }
            },

            addTurma() {
                if(this.turmaForm.periodo !=1 && this.turmaForm.periodo !=3) {
                    this.$notify({
                        group: 'general',
                        title: `Erro`,
                        text: `O semestre deve ser 1 ou 3`,
                        type: 'error'
                    })
                    return
                }
                var turmasLivres = _.filter(this.$store.state.turma.Turmas, function(t) { return t.Disciplina === null})
                console.log(turmasLivres)
                this.turmaForm.id = turmasLivres[0].id
                console.log(this.turmaForm)
                this.editTurma(this.turmaForm)
                this.semestre = this.turmaForm.periodo
                this.cleanTurma()

            },

            editTurma(turma) {
                turmaService.update(turma.id, turma).then((response) => {
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

            cleanTurma() {
                this.turmaForm = _.clone(emptyTurma)
                this.turmaForm.periodo = this.semestre
                this.turmaForm.letra = "A"
                this.error = undefined
            },
        },

        computed: {
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
                return this.$store.state.perfil.Perfis
            },
        }
    }
</script>
<style scoped>
    td {
        padding:0;
        text-align: center;
    }
</style>