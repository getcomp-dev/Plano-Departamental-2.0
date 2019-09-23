<template>
    <div class="DashboardPrototipo" style="height: calc(100vh - 48px)" v-if="Admin">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2 col-2">Plano</h1>
            <div class="col-10">

                <template v-if="isAdd">
                    <button type="button" class="btn btn-success" v-on:click.prevent="toggleAdd" style="margin-left: 10px;float:right;">Cancelar </button>
                    <button type="button" class="btn btn-success" v-on:click.prevent="addTurma" style="margin-left: 10px;float:right;"> Confirmar </button>
                </template>
                <template v-else>
                    <button type="button" class="btn btn-success" style="margin-left: 10px;float:right;" v-b-modal.modalConfirma>Deletar </button>
                    <button type="button" class="btn btn-success" v-on:click.prevent="toggleAdd" style="margin-left: 10px;float:right;">Adicionar </button>
                    <button type="button" class="btn btn-success" v-on:click.prevent="xlsx(Pedidos)" style="margin-left: 10px;float:right;">XLSX </button>

                    <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                        <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
                        <template v-if="Deletar.length > 0">
                            <template v-for="turma in Deletar">
                                <template v-for="disciplina in Disciplinas">
                                    <template v-if="disciplina.id===turma.Disciplina">
                                        <p :key="'disciplina'+disciplina.id+'turma'+turma.id" style="width:80px">Disciplina:{{disciplina.codigo}}<br>Turma:{{turma.letra}}</p>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </b-modal>
                </template>
                <b-form-select v-model="periodos" style="width: 200px; float:right">
                    <option value = "1">Visualizar 1º Semestre</option>
                    <option value = "2">Visualizar 2º Semestre</option>
                    <option value = "3">Visualizar Ambos</option>
                </b-form-select>
                <b-button v-b-modal.modalPerfis style="float: right; margin-right:20px">Perfis</b-button>

                <b-modal id="modalPerfis" scrollable title="Selecione os perfis">
                    <b-form-checkbox-group id="checkboxGroupPerfis" v-model="PerfisAtivos">
                        <b-form-checkbox v-for="perfil in Perfis" :key="'perfil'+perfil.id" :value="perfil">{{perfil.nome}}</b-form-checkbox>
                    </b-form-checkbox-group>

                    <div slot="modal-footer">
                        <b-button size="sm" variant="success" @click="selectAll()" style="margin-right: 20px">
                            Selecionar Todos
                        </b-button>
                        <b-button size="sm" variant="success" @click="selectNone()">
                            Desmarcar Todos
                        </b-button>
                    </div>
                </b-modal>


            </div>
        </div>

    <div id="loading" v-if="isLoading">
        <div class="cube1"></div>
        <div class="cube2"></div>
    </div>

    <div style="height: 75vh; overflow-y: scroll; overflow-x: scroll;" v-if="!isLoading" ref = "mainTable">
        <table class="table table-hover table-sm">
            <thead class="thead-light sticky">
            <tr>
                <turmaheader></turmaheader>
            </tr>
            </thead>
            <tbody>

            <template v-if="isAdd">
                <tr>
                    <novaturma></novaturma>
                </tr>
            </template>
            <template v-if="Turmas.length>0">
            <template v-for="perfil in PerfisAtivos">
                <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==1 && (periodos == 1 || periodos==3)" :key="turma.id" v-bind:style="{backgroundColor: perfil.cor}">
                    <turmadata ref="turma" v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                </tr>
            </template>
            <template v-for="perfil in PerfisAtivos">
                <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==3 && (periodos==2 || periodos==3)" :key="turma.id"  v-bind:style="{backgroundColor: perfil.cor}">
                    <turmadata ref="turma" v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
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
    import turmaService from '../../common/services/turma'
    import pedidoService from '../../common/services/pedido'
    import turmadata from './TurmaRow.vue'
    import turmaheader from './TurmaHeader.vue'
    import novaturma from './NovaTurma.vue'
    import xlsx from '../../common/services/xlsx'
    import ls from 'local-storage'
    import { EventBus } from '../../event-bus.js'
    import {saveAs} from 'file-saver'

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

        name: 'DashboardPrototipo',

        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                error: undefined,
                isAdd:false,
                atual:undefined,
                semestre: 1,
                periodos: 3,
                PerfisAtivos: []
            }
        },

        components: {
            turmadata,
            turmaheader,
            novaturma
        },

        mounted: function () {
            ls.set('toggle', -1)
            ls.on('toggle', () => {
                var val =  ls.get('toggle')
                if(val === true){
                    this.$store.dispatch('toggleAllCursosTrue')
                } else{
                    this.$store.dispatch('toggleAllCursosFalse')
                }
                ls.set('toggle', -1)

            })
            for (var c = 0; c < this.$store.state.curso.Cursos.length; c++){
                let id = this.$store.state.curso.Cursos[c].id
                ls.on(`${id}`, () => {
                    this.$store.dispatch('toggleCurso', id)
                })
            }
        },

        beforeDestroy: function () {
            ls.off('toggle')
            for (var c = 0; c < this.$store.state.curso.Cursos.length; c++){
                let id = this.$store.state.curso.Cursos[c].id
                ls.off(`${id}`)
            }
        },

        methods: {
            selectAll(){
              if(this.PerfisAtivos != [])
                  this.PerfisAtivos = []
              for(var i = 0; i < this.$store.state.perfil.Perfis.length; i++)
                  this.PerfisAtivos.push(this.$store.state.perfil.Perfis[i])
            },

            selectNone(){
                this.PerfisAtivos = []
            },

            xlsx: function (pedidos) {
                xlsx.downloadTable({pedidos:pedidos}).then(() => {
                    console.log('done')
                    fetch("http://200.131.219.57:3000/api/xlsx/download", {method:'GET', headers:{'Authorization': `Bearer ${this.$store.state.auth.token}`}}).then(r => r.blob())
                        .then(blob => saveAs(blob, "tabela.xlsx"))
                }).catch(error => console.log(error))
            },

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
                var turmas = this.$store.state.turma.Deletar
                for (var i = 0; i< turmas.length;i++) {
                    this.deleteTurma(turmas[i])
                }
                this.$store.commit('emptyDelete')
            },

            inPerfil: function (perfil, turmas, disciplinas) {
                return turmas.filter(function (turma) {
                    if(_.isNull(turma.Disciplina))
                        return false
                    var disciplina = _.find(disciplinas, function(disc) { return disc.id===turma.Disciplina})
                    return disciplina.Perfil===perfil.id
                })

            },

            addTurma() {
                EventBus.$emit('addTurma');
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

            deleteTurma(turma) {
                turma.periodo = null
                turma.letra = null
                turma.turno1 = null
                turma.turno2 = null
                turma.Disciplina = null
                turma.Docente1 = null
                turma.Docente2 = null
                turma.Horario1 = null
                turma.Horario2 = null
                turma.Sala1 = null
                turma.Sala2 = null
                console.log(turma)

                this.editTurma(turma)

                var pedidos = this.$store.state.pedido.Pedidos[turma.id]
                for (var i = 0; i < pedidos.length; i++){
                    if(!(pedidos[i].vagasPeriodizadas === 0 && pedidos[i].vagasNaoPeriodizadas === 0)) {
                        pedidos[i].vagasPeriodizadas = 0
                        pedidos[i].vagasNaoPeriodizadas = 0
                        pedidoService.update(pedidos[i].Curso, pedidos[i].Turma, pedidos[i]).then(() => {
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
                }

            },

            toggleAdd() {
                this.isAdd = !this.isAdd;
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
                return this.$store.state.perfil.Perfis
            },

            Turmas () {

               return _.orderBy(_.orderBy(this.$store.state.turma.Turmas, 'letra'), 'Disciplina')
            },

            Deletar () {
                return this.$store.state.turma.Deletar
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
<style scoped>

    .DashboardPrototipo{
        max-height: 90vh;
        max-width: 90vw;
        overflow: hidden;
    }

    .sticky {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
    }

    .cursoGrande {
        font-size: 7px !important;
    }

    table {
        font-size: 10px;
    }

    tr thead {
        display:block;
    }

    tbody {
        top: 23px;
        display:block;
        overflow:auto;
        max-height: 100%;
        width:100%;
    }

        
    /*table.scrolling td:nth-child(-n+10),
    table.scrolling th:nth-child(-n+10) {
        position: -webkit-sticky;
        position: sticky;
        left:0;
    }*/

    .cube1, .cube2 {
        background-color: #333;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: cubemove 1.8s infinite ease-in-out;
        animation: cubemove 1.8s infinite ease-in-out;
    }

    .cube2 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    @-webkit-keyframes cubemove {
        25% {
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
        }
        50% {
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
        }
        75% {
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
        }
        100% {
            -webkit-transform: rotate(-360deg)
        }
    }

    @keyframes cubemove {
        25% {
            transform: translateX(42px) rotate(-90deg) scale(0.5);
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
        }
        50% {
            transform: translateX(42px) translateY(42px) rotate(-179deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
        }
        50.1% {
            transform: translateX(42px) translateY(42px) rotate(-180deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        }
        75% {
            transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        }
        100% {
            transform: rotate(-360deg);
            -webkit-transform: rotate(-360deg);
        }
    }
</style>
