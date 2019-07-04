<template>
    <div class="Grades Disciplinas" style="height: calc(100vh - 48px)" v-if="Admin">
        <div class="d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="overflow: auto; width: 100%">
            <h1 class="h2 col-12">Grades Disciplinas</h1>
        </div>

        <div style="height: 80vh; overflow-y: scroll; overflow-x: scroll;" ref = "mainTable">
            <table class="table table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col"><p style="text-align: center">Cod</p></th>
                    <th scope="col"><p style="text-align: center">Disciplina</p></th>
                    <th scope="col"><p style="text-align:center">76A</p></th>
                    <th scope="col"><p style="text-align:center">35A</p></th>
                    <th scope="col"><p style="text-align:center">65C</p></th>
                    <th scope="col"><p style="text-align:center">65B</p></th>
                </tr>
                </thead>
                <tbody>

                    <template v-for="perfil in Perfis">
                        <tr v-for="disciplina in inPerfil(perfil, Disciplinas)" :key="disciplina.id"  v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                 'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                 'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
                            <td><p style="text-align: center">{{disciplina.codigo}}<p/></td>
                            <td><p>{{disciplina.nome}}</p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center"> - </p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center"> - </p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center"> - </p></td>
                            <td style="border-style: solid; border-width: 1px; border-color: whitesmoke;"><p style=" text-align: center"> - </p></td>

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

        name: 'GradeDisciplinas',

        data () {
            return {
                error: undefined,
                disciplinasGrades: {},
                gradesAtivas:{
                   1: undefined, //CCN
                   2: undefined, //EC
                   3: undefined, //SI
                   4: undefined  //CCD
                }
            }
        },

        beforeMount: function () {
            this.$store.state.disciplina.Disciplinas.forEach( d => {
                this.disciplinasGrades[d.id] =[[0, 0], [0, 0], [0, 0], [0, 0]]
            })

            for(let i = 1; i <= 4; i++){
                this.gradesAtivas[i] = _.orderBy(_.filter(this.$store.state.grade.Grades, ['Curso', i]), 'periodoInicio', 'desc')
            }

            console.log(this.disciplinasGrades)
            console.log(this.gradesAtivas)
        },

        methods: {

            inPerfil: function (perfil, disciplinas) {
                return disciplinas.filter(function (disciplina) {
                    return disciplina.Perfil===perfil.id
                })

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
                return this.$store.state.disciplina.Disciplinas
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
                return this.$store.state.perfil.Perfis
            },

            Turmas () {

                return _.orderBy(_.orderBy(_.filter(this.$store.state.turma.Turmas, function(t) { return t.Disciplina !== null}), 'letra'), 'Disciplina')
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
        background-color: #ffb800 !important;
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
        font-size: 10px;
    }

    p {
        margin: 0px;
    }

</style>
