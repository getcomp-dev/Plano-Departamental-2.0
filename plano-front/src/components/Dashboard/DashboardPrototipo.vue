<template>
    <div class="DashboardPrototipo" style="overflow: auto">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2">Plano</h1>
                <template v-if="isAdd">
                    <div class="col-sm-9"></div>
                    <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="addTurma" style=""> Confirmar </button>
                    <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="margin-left: 10px;">Cancelar </button>
                </template>
                <template v-else>
                    <div class="col-sm-10"></div>
                    <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="toggleAdd" style="">Adicionar </button>
                </template>
        </div>
        <table class="table table-hover table-sm">
            <thead class="thead-light">
            <tr>
                <th scope="col" style="width:16px">S.</th>
                <th scope="col" style="width:80px">Cod</th>
                <th scope="col" style="width:178px">Disciplina</th>
                <th scope="col" style="width:20px">C.</th>
                <th scope="col" style="width:52px">Turma</th>
                <th scope="col" style="width:90px">Horário</th>
                <th scope="col" style="width:144px">Docente</th>
                <th scope="col" style="width:84px">Turno</th>
                <th scope="col" style="width:60px">Sala</th>
                <th scope="col" style="width:52px">Total</th>
                <th v-for="curso in Cursos" :key="curso.id" style="width: 64px">{{curso.codigo}}</th>
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
                    <p style="width:20px; min-width: 20px;">
                        <template v-for="disciplina in Disciplinas">
                            <template v-if="disciplina.id===turmaForm.Disciplina">
                                {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                            </template>
                        </template>
                    </p>
                    <td>
                        <input type="text" style="width: 28px" id="turma" v-model="turmaForm.letra">
                    </td>
                    <td>
                        <select type="text" style="width: 86px" id="horario1" v-model="turmaForm.Horario1">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                    <br/>
                        <select type="text" style="width: 86px" id="horario2" v-model="turmaForm.Horario2">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                    </td>
                    <td>
                            <select type="text" style="width:144px" id="docente1" v-model="turmaForm.Docente1">
                                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                            </select>
                    <br/>
                            <select type="text" style="width:144px;" id="docente2" v-model="turmaForm.Docente2">
                                <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                                <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                            </select>
                    </td>
                    <td>
                        <select type="text" style="width: 84px" id="turno1" v-model="turmaForm.turno1">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                    <br/>
                        <select type="text" style="width: 84px" id="turno2" v-model="turmaForm.turno2">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
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
                <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" :key="turma.id" v-on:click.prevent="showTurma(turma)">
                    <td>
                        <input type="text" style="width: 16px;" id="periodo" v-model="turma.periodo">
                    </td>
                    <td>
                        <template v-for="disciplina in Disciplinas">
                            <template v-if="disciplina.id===turma.Disciplina">
                                <p :key="disciplina.id" style="width:80px">{{disciplina.codigo}}</p>
                            </template>
                        </template>
                    </td>
                    <td>
                        <select type="text" style="width:170px;" id="disciplina" v-model="turma.Disciplina">
                            <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                            <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
                        </select>
                    </td>
                    <p style="width:20px; min-width: 20px;">
                        <template v-for="disciplina in Disciplinas">
                            <template v-if="disciplina.id===turma.Disciplina">
                                {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                            </template>
                        </template>
                    </p>

                    <td>
                        <input type="text" style="width: 28px" v-model="turma.letra">
                    </td>
                    <td>
                        <select type="text" style="width: 86px" id="horario1" v-model="turma.Horario1">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                        <br/>
                        <select type="text" style="width: 86px" id="horario2" v-model="turma.Horario2">
                            <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                            <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                        </select>
                    </td>
                    <td>
                        <select type="text" style="width:144px" id="docente1" v-model="turma.Docente1">
                            <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                            <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                        </select>
                        <br/>
                        <select type="text" style="width:144px;" id="docente2" v-model="turma.Docente2">
                            <option v-if="Docentes.length===0" type="text" value="">Nenhum Docente Encontrado</option>
                            <option v-for="docente in Docentes" :key="docente.id" :value="docente.id">{{docente.nome}}</option>
                        </select>
                    </td>
                    <td>
                        <select type="text" style="width: 84px" id="turno1" v-model="turma.turno1">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                        <br/>
                        <select type="text" style="width: 84px" id="turno2" v-model="turma.turno2">
                            <option value="Diurno">Diurno</option>
                            <option value="Integral">Integral</option>
                            <option value="Noturno">Noturno</option>
                        </select>
                    </td>
                    <td>
                        <select type="text" style="width:60px" id="sala1" v-model="turma.Sala1">
                            <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                            <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                        </select>
                        <br/>
                        <select type="text" style="width: 60px" id="sala2" v-model="turma.Sala2">
                            <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                            <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                        </select>
                    </td>
                    <td style="width:52px">0</td>
                    <template v-for="curso in Cursos">
                        <td scope="col" :key="curso.id" style="width: 64px"><input type="text" style="width: 64px"><br><input type="text" style="width: 64px"></td>
                    </template>
                </tr>
            </template>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import _ from 'lodash'
    import turmaService from '../../common/services/turma'

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
                isAdd:false
            }
        },

        methods: {
            inPerfil: function (perfil, turmas, disciplinas) {
                return turmas.filter(function (turma) {
                    var disciplina = _.find(disciplinas, function(disc) { return disc.id===turma.Disciplina})
                    return disciplina.Perfil===perfil.id
                })

            },
            addTurma() {
                turmaService.create(this.turmaForm).then((response) => {
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

            editTurma() {
                turmaService.update(this.turmaForm.id, this.turmaForm).then((response) => {
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

            deleteTurma() {
                turmaService.delete(this.turmaForm.id, this.turmaForm).then((response) => {
                    this.cleanTurma()
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
                this.error = undefined
            },

            showTurma(turma) {
                this.cleanTurma()
                this.turmaForm = _.clone(turma);
            },

            toggleAdd() {
                this.cleanTurma()
                this.isAdd = !this.isAdd;
            }
        },


        computed: {
            Cursos () {
                return this.$store.state.curso.Cursos
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            },

            Docentes () {
                return this.$store.state.docente.Docentes
            },

            Horarios () {
                return this.$store.state.horario.Horarios
            },

            Salas () {
                return this.$store.state.sala.Salas
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            Turmas() {

               return _.orderBy(_.orderBy(this.$store.state.turma.Turmas, 'letra'), 'Disciplina')
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
    table {
        table-layout: fixed;
        overflow: auto;
        max-height: 100%;
        max-width: 100%;
    }

    input {
        height: 25px;
    }

    td {
        text-align: left;
    }

    th {
        text-align: center;
    }

    input {
        width:auto;
        text-align: left;
    }

    tr:nth-child(odd) {
        background: white;
    }


    tr:nth-child(even) {
        background: whitesmoke;
    }

    thead th {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
        background: white;
        z-index: 10;
    }

    .floating {
        display: block;
        float: right !important;
        clear: right !important;
    }
</style>