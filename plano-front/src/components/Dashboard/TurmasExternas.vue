<template>
    <div class="TurmasExternas" style="height: calc(100vh - 48px)" v-if="Admin">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2">Plano</h1>
            <div class="col-sm-8"></div>
            <b-form-select v-model="periodos">
                <option value = "1">Primeiro</option>
                <option value = "2">Segundo</option>
                <option value = "3">Ambos</option>
            </b-form-select>
            <template v-if="isAdd">
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="addTurma" style=""> Confirmar </button>
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="margin-left: 10px;">Cancelar </button>
            </template>
            <template v-else>
                <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="">Adicionar </button>
                <button type="button" class="btn btn-success col-sm-1" style="" v-b-modal.modalConfirma>Deletar </button>

                <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                    <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
                    <template v-for="turma in Deletar">
                        <template v-for="disciplina in Disciplinas">
                            <template v-if="disciplina.id===turma.Disciplina">
                                <p :key="'disciplina'+disciplina.id+'tirma'+turma.id" style="width:80px">Disciplina:{{disciplina.codigo}}<br>Turma:{{turma.letra}}</p>
                            </template>
                        </template>
                    </template>

                </b-modal>
            </template>
        </div>

        <div id="loading" v-if="isLoading">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>

        <div style="width: 908px;height: 80vh; overflow-y: scroll; overflow-x: hidden;" v-if="!isLoading">
            <table class="table table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col" style="width:16px;">S.</th>
                    <th scope="col" style="width:80px;">Cod</th>
                    <th scope="col" style="width:178px;">Disciplina</th>
                    <th scope="col" style="width:20px;">C.</th>
                    <th scope="col" style="width:52px;">Turma</th>
                    <th scope="col" style="width:84px;">Turno</th>
                    <th scope="col" style="width:90px;">Horário</th>
                    <th scope="col" style="width:60px;">Sala</th>
                    <th scope="col" style="width:52px;">Total</th>
                    <template v-for="curso in Cursos">
                        <th :key="'curso'+curso.id" :id="'curso'+curso.id" style="width: 64px">{{curso.codigo}}</th>
                        <b-popover :key="curso.id" :target="'curso'+curso.id" placement="bottom" triggers="hover focus">
                            <div v-if="curso.semestreInicial==1 || curso.semestreInicial==3">1º - {{curso.alunosEntrada}}</div>
                            <div v-if="curso.semestreInicial==2 || curso.semestreInicial==3">2º - {{curso.alunosEntrada}}</div>
                        </b-popover>
                    </template>
                </tr>
                </thead>
                <tbody>

                <template v-if="isAdd">
                    <tr>
                        <td>
                            <input type="text" style="width: 16px;" id="periodo" v-model="turmaForm.periodo">
                        </td>
                        <td>
                            <template v-for="disciplina in Disciplinas">
                                <template v-if="disciplina.id===turmaForm.Disciplina">
                                    <p :key="disciplina.id" style="width:80px">{{disciplina.codigo}}</p>
                                </template>
                            </template>
                        </td>
                        <td>
                            <select type="text" style="width:170px;" id="disciplina" v-model="turmaForm.Disciplina">
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
                            <input type="text" style="width: 28px" id="turma" v-model="turmaForm.letra">
                        </td>
                        <td>
                            <select type="text" style="width: 84px" id="turno1" v-model="turmaForm.turno1">
                                <option value="Diurno">Diurno</option>
                                <option value="Noturno">Noturno</option>
                            </select>
                            <br/>
                        </td>
                        <td>
                            <select type="text" style="width: 86px" id="horario1" v-model="turmaForm.Horario1" v-on:change="adjustTurno1">
                                <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                                <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                            </select>
                            <br/>
                            <select type="text" style="width: 86px" id="horario2" v-model="turmaForm.Horario2" v-on:change="adjustTurno2">
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
                    </tr>
                </template>
                <template v-if="Turmas.length>0">
                    <template v-for="perfil in Perfis">
                        <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==1 && (periodos == 1 || periodos==3)" :key="turma.id"  v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
                            <turmadata v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                        </tr>
                    </template>
                    <template v-for="perfil in Perfis">
                        <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==3 && (periodos==2 || periodos==3)" :key="turma.id"  v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
                            <turmadata v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                        </tr>
                    </template>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import turmaExternaService from '../../common/services/turmaExterna'
    import pedidoExternoService from '../../common/services/pedidoExterno'
    import turmadata from './TurmaExternaRow.vue'

    const emptyTurma = {
        id:undefined,
        periodo:undefined,
        letra:undefined,
        turno1:undefined,
        turno2:undefined,
        Disciplina:undefined,
        Horario1:undefined,
        Horario2:undefined,
        Sala1:undefined,
        Sala2:undefined
    }

    const emptyPedido =  {
        vagasPeriodizadas: 0,
        vagasNaoPeriodizadas: 0,
        Curso: undefined,
        Turma: undefined,
    }

    export default {

        name: 'DashboardTurmasExternas',

        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                error: undefined,
                isAdd:false,
                atual:undefined,
                semestre: 1,
                periodos: 3,
            }
        },

        components: {
            turmadata
        },
        /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */

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

            deleteSelected: function() {
                var turmas = this.$store.state.turmaExterna.Deletar
                for (var i = 0; i< turmas.length;i++) {
                    this.deleteTurma(turmas[i])
                }
                this.$store.commit('emptyDeleteExterno')
            },

            inPerfil: function (perfil, turmas, disciplinas) {
                return turmas.filter(function (turma) {
                    var disciplina = _.find(disciplinas, function(disc) { return disc.id===turma.Disciplina})
                    return disciplina.Perfil===perfil.id
                })

            },

            addTurma() {
                turmaExternaService.create(this.turmaForm).then((response) => {
                    this.semestre = response.Turma.periodo
                    for (var i = 0; i< 4; i++){
                        var pedido = _.clone(emptyPedido)
                        pedido.Curso = this.$store.state.curso.Cursos[i].id
                        pedido.Turma = response.Turma.id
                        pedidoExternoService.create(pedido).then((response) => {
                            console.log(response.Pedido)
                        }).catch(error => {console.log("erro ao criar pedido: "+error)})
                    }
                    this.cleanTurma()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            editTurma(turma) {
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

            deleteTurma(turma) {
                turmaExternaService.delete(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Turma</b>'
                })
            },

            cleanTurma() {
                this.turmaForm = _.clone(emptyTurma)
                this.turmaForm.periodo = this.semestre
                this.turmaForm.letra = "A"
                this.error = undefined
            },

            toggleAdd() {
                this.cleanTurma()
                this.isAdd = !this.isAdd;
            },

        },


        computed: {
            Cursos () {
                return _.slice(this.$store.state.curso.Cursos, 0, 4)
            },

            Disciplinas () {
                return _.orderBy(_.filter(this.$store.state.disciplina.Disciplinas, function(d) {return d.Perfil==13}),'nome')
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

            Turmas () {

                return _.orderBy(_.orderBy(this.$store.state.turmaExterna.Turmas, 'letra'), 'Disciplina')
            },

            Deletar () {
                return this.$store.state.turmaExterna.Deletar
            },

            Pedidos () {
                return this.$store.state.pedido.Pedidos
            },

            isLoading () {
                return this.$store.state.isLoading
            },

            Admin () {
                if(this.$store.state.auth.Usuario.admin===1){
                    return true
                }else{
                    return false
                }
            }


        }
    }
</script>
<style>
    .avancado {
        background-color: #7c997f !important;
    }

    .basico {
        background-color: #a76663 !important;
    }

    .arqso {
        background-color: #a4a75a !important;
    }

    .bancosdedados {
        background-color: #60a75a !important;
    }

    .computacaografica {
        background-color: #a75877 !important;
    }

    .engenhariasoftware {
        background-color: #34a9f6 !important;
    }

    .iaic {
        background-color: #a449f6 !important;
    }

    .numoc {
        background-color: #a7000c !important;
    }

    .redes {
        background-color: #0f0da7 !important;
    }

    .teoria {
        background-color: #0aa702 !important;
    }

    .humempre {
        background-color: #0e6ba7 !important;
    }

    .multi {
        background-color: #9100a7 !important;
    }

    .ice {
        background-color: #9d9ea7 !important;
    }
</style>
<style scoped>

    .DashboardPrototipo{
        max-height: 90vh;
        max-width: 90vw;
        overflow: hidden;
    }
    table {
        overflow: auto;
        table-layout: fixed;
        max-height: 100%;
        max-width: 100%;
    }

    th {
        text-align: center;
    }

    thead th {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
        background: white;
        z-index: 10;
    }

    /*table.scrolling td:nth-child(-n+10),
    table.scrolling th:nth-child(-n+10) {
        position: -webkit-sticky;
        position: sticky;
        left:0;
    }*/

</style>
