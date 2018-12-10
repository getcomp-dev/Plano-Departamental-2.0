<template>
    <div class="DashboardCargaProfessores row">
        <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Carga Professores</h1>
        </div>
        <table class="table table-hover table-sm">
            <thead class="thead-light">
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">S.</th>
                <th scope="col">Disciplina</th>
                <th scope="col"></th>
                <th scope="col">T.</th>
                <th scope="col">Horário</th>
                <th scope="col">C.</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="Professores.length > 0">
            <template v-for="professor in Professores">
                <template v-if="turmas(professor).length > 0">
                    <td>{{professor.nome}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{creditos(professor)}}</td>
                </template>

                <template v-for="disciplina in Disciplinas">
                    <tr v-for="turma in turmas(professor)" v-if="turma.Disciplina===disciplina.id && (turma.Docente1===professor.id || turma.Docente2===professor.id)" :key="turma.id">
                        <td></td>
                        <td>{{turma.periodo}}</td>
                        <td>{{disciplina.codigo}}</td>
                        <td>{{disciplina.nome}}</td>
                        <td>{{turma.letra}}</td>
                        <td>
                            <template v-for="horario in Horarios" v-if="horario.id===turma.Horario1">{{horario.horario}}</template>
                            <br/>
                            <template v-for="horario in Horarios" v-if="horario.id===turma.Horario2">{{horario.horario}}</template>
                        </td>
                        <td>{{disciplina.cargaTeorica + disciplina.cargaPratica}}</td>
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
    export default {
        name: 'DashboardCargaProfessores',

        methods: {
            isNaN(value){
                return _.isNaN(value)
            },

            turmas(professor){
                return _.filter(this.$store.state.turma.Turmas,(turma) => {
                    return (turma.Docente1===professor.id || turma.Docente2===professor.id)
                })
            },

            creditos(professor){
                var c = 0
                for (var t = 0; t < this.$store.state.turma.Turmas.length; t++){
                    if(this.$store.state.turma.Turmas[t].Docente1===professor.id || this.$store.state.turma.Turmas[t].Docente2===professor.id){
                        for (var d = 0; d < this.$store.state.disciplina.Disciplinas.length; d++){
                            if(this.$store.state.disciplina.Disciplinas[d].id===this.$store.state.turma.Turmas[t].Disciplina){
                                c+=this.$store.state.disciplina.Disciplinas[d].cargaPratica
                                c+=this.$store.state.disciplina.Disciplinas[d].cargaTeorica
                            }
                        }
                    }

                }
                return c
            }
        },

        computed: {
            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas, 'nome')
            },
            Horarios () {
                return this.$store.state.horario.Horarios
            },
            Professores () {
                return _.orderBy(this.$store.state.docente.Docentes, 'nome')
            }
        }
    }
</script>

<style scoped>
</style>