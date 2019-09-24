<template>
    <div class="DashboardCargaProfessores row">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2">Carga Professores</h1>
            <button type="button" class="btn btn-success col-sm-1" v-on:click.prevent="pdf" style=""> Relatório </button>
        </div>
        <div style="width: 100%; height: 80vh; overflow: scroll" class="element" ref="carga">
        <table class="table table-hover table-sm">
            <thead class="thead-light">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">S.</th>
                <th scope="col">Disciplina</th>
                <th scope="col"></th>
                <th scope="col">T.</th>
                <th scope="col">Horário</th>
                <th scope="col" id="creditos1">
                    CS1
                    <b-popover :target="'creditos1'" placement="bottom" triggers="hover focus">
                        <p>Somatório dos créditos no 1º semestre</p>
                    </b-popover>
                </th>
                <th scope="col" id="creditos2">
                    CS2
                    <b-popover :target="'creditos2'" placement="bottom" triggers="hover focus">
                        <p>Somatório dos créditos no 2º semestre</p>
                    </b-popover>
                </th>
                <th scope="col" id="creditostotal">
                    CTotal
                    <b-popover :target="'creditostotal'" placement="bottom" triggers="hover focus">
                        <p>Somatório total dos créditos</p>
                    </b-popover>
                </th>
            </tr>
            </thead>
            <tbody>
            <template v-if="Professores.length > 0">
            <template v-for="professor in Professores">
                <template v-if="turmas(professor).length > 0">
                    <td>{{professor.apelido}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{creditos1(professor)}}</td>
                    <td>{{creditos2(professor)}}</td>
                    <td>{{creditos(professor)}}</td>
                </template>

                <template v-for="turma in turmas(professor)">
                    <tr v-for="disciplina in Disciplinas" v-if="turma.Disciplina===disciplina.id && (turma.Docente1===professor.id || turma.Docente2===professor.id)" :key="'turma'+turma.id+'disciplina'+disciplina.id+'professor'+professor.id">
                        <td></td>
                        <td>{{turma.periodo}}</td>
                        <td>{{disciplina.codigo}}</td>
                        <td>{{disciplina.nome}}</td>
                        <td>{{turma.letra}}</td>
                        <td>
                            <template v-for="horario in Horarios" v-if="horario.id===turma.Horario1">{{horario.horario}}</template>
                            <template v-for="horario in Horarios" v-if="horario.id===turma.Horario2"> / {{horario.horario}}</template>
                        </td>
                        <td v-if="turma.periodo===1">{{disciplina.cargaTeorica + disciplina.cargaPratica}}</td>
                        <td v-else></td>
                        <td v-if="turma.periodo===3">{{disciplina.cargaTeorica + disciplina.cargaPratica}}</td>
                        <td v-else></td>
                        <td></td>
                    </tr>
                </template>
                <template v-for="carga in CargasPos" v-if="carga.Docente===professor.id">
                    <tr>
                        <td></td>
                        <td>{{carga.trimestre}}</td>
                        <td></td>
                        <td>Disciplina do {{carga.programa}}</td>
                        <td></td>
                        <td></td>
                        <td v-if="carga.trimestre==1 || carga.trimestre==2">{{carga.creditos}}</td>
                        <td v-else></td>
                        <td v-if="carga.trimestre==3 || carga.trimestre==4">{{carga.creditos}}</td>
                        <td v-else></td>
                        <td></td>
                    </tr>
                </template>


            </template>
            </template>
            <template v-else>
                <tr>
                    <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum curso encontrado!
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
        </div>
    </div>

</template>

<script>
    import _ from 'lodash'
    import jsPDF from 'jspdf'
    import pdfs from '../../common/services/pdfs'
    import html2canvas from 'html2canvas'
    export default {
        name: 'DashboardCargaProfessores',

        methods: {

            pdf() {
                pdfs.pdfCargaProfessores()
            },

            turmas(professor){
                return _.orderBy(_.filter(this.$store.state.turma.Turmas,(turma) => {
                    return (turma.Docente1===professor.id || turma.Docente2===professor.id)
                }), 'periodo')
            },

            pos(professor){
                return _.filter(this.$store.state.cargaPos.Cargas,(turma) => {
                    return (turma.Docente===professor.id)
                })
            },

            creditos1(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].periodo===1 && (this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id)){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                            }
                        }
                    }

                }
                for(var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++){
                    if(this.$store.state.cargaPos.Cargas[t].Docente===professor.id){
                        if(this.$store.state.cargaPos.Cargas[t].trimestre==1 || this.$store.state.cargaPos.Cargas[t].trimestre==2){
                            c+= parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10)
                        }
                    }
                }
                return c
            },

            creditos2(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].periodo===3 && (this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id)){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                            }
                        }
                    }

                }
                for(var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++){
                    if(this.$store.state.cargaPos.Cargas[t].Docente===professor.id){
                        if(this.$store.state.cargaPos.Cargas[t].trimestre==3){
                            c+= parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10)
                        }
                    }
                }
                return c
            },

            creditos(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaPratica, 10)
                                c+=parseInt(this.$store.state.disciplina.Disciplinas[d].cargaTeorica, 10)
                            }
                        }
                    }

                }
                for(var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++){
                    if(this.$store.state.cargaPos.Cargas[t].Docente===professor.id){
                        c+= parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10)

                    }
                }
                return c
            }
        },

        computed: {
            CargasPos () {
                return _.orderBy(this.$store.state.cargaPos.Cargas, 'trimestre')
            },

            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas, 'nome')
            },
            Horarios () {
                return this.$store.state.horario.Horarios
            },
            Professores () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },
        }
    }
</script>

<style scoped>

    table {
        overflow: auto;
        max-height: 100%;
        max-width: 100%;
    }

    thead th {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
        background: white;
        z-index: 10;
    }

    .element::-webkit-scrollbar { width: 0 !important }

</style>