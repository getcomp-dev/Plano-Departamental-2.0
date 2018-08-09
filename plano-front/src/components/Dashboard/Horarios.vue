<template>
    <div class="DashboardHorarios row">
        <div class="col">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Lista Horarios</h1>
            </div>
            <template v-if="ccnSelecionado">
                <h3>Ciência da Computação Noturno</h3>
            </template>
            <template v-if="!horarioVazio(CCN[0])">
                <h5>1 Período</h5>
                <b-table responsive :items="CCN[0]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[1])">
                <h5>2 Período</h5>
                <b-table responsive :items="CCN[1]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[2])">
                <h5>3 Período</h5>
                <b-table responsive :items="CCN[2]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[3])">
                <h5>4 Período</h5>
                <b-table responsive :items="CCN[3]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[4])">
                <h5>5 Período</h5>
                <b-table responsive :items="CCN[4]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[5])">
                <h5>6 Período</h5>
                <b-table responsive :items="CCN[5]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[6])">
                <h5>7 Período</h5>
                <b-table responsive :items="CCN[6]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[7])">
                <h5>8 Período</h5>
                <b-table responsive :items="CCN[7]"></b-table>
            </template>
            <template v-if="!horarioVazio(CCN[8])">
                <h5>9 Período</h5>
                <b-table responsive :items="CCN[8]"></b-table>
            </template>

        </div>
        <div class="col">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1>Definir Grades</h1>
            </div>
            <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
            </b-alert>
            <form>
                <div class="form-group row">
                    <b-form-checkbox-group v-model="cursos" buttons button-variant="primary" size="lg" name="cursosCheck" :options="options">
                    </b-form-checkbox-group>
                        <p>{{cursos}}</p>
                </div>
                <div class="form-group row">
                  <div v-if="activeCCD">
                      <label for="formCCN">Ciência da Computação Diurno</label>
                      <p>{{cursos}}</p>
                  </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeCCN">
                        <label for="formCCN">Ciência da Computação Noturno</label>
                        <form name="formCCN" id="formCCN" ref="formCCN">
                            <div v-for="n in rangeCCN" :key="n" class="grade">
                                <label for="selectGrade">Grade</label>
                                <b-form-select id="selectGrade" class="sm-12">
                                    <option v-for="grade in GradesCCN" :value="grade.id">{{grade.periodoInicio}}</option>
                                </b-form-select>
                                <label for="inicio">Período Início</label>
                                <b-form-input id="inicio" class="inicio"></b-form-input>
                                <label for="fim">Período Fim</label>
                                <b-form-input id="fim" class="fim"></b-form-input>
                                <br/>
                            </div>
                        </form>
                        <b-form-radio-group id="radioCCN" v-model="evenCCN">
                            <b-form-radio value="false">Períodos Ímpares</b-form-radio>
                            <b-form-radio value="true">Períodos Pares</b-form-radio>
                        </b-form-radio-group>
                        <b-button variant="success" v-on:click="addGradeCCN">Adicionar nova Grade</b-button>
                        <b-button variant="success" v-on:click="removeGradeCCN">Remover última Grade</b-button>
                    </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeSI">
                        <label for="formSI">Sistemas de Informação</label>
                        <form name="formSI" id="formSI" ref="formSI">
                            <p>{{cursos}}</p>
                        </form>
                    </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeEC">
                        <label for="formEC">Engenharia Computacional</label>
                        <form name="formEC" id="formEC" ref="formEC">
                            <p>{{cursos}}</p>
                        </form>
                    </div>
                </div>
                <b-button v-if="cursos!=undefined" variant="success" v-on:click="createHorarios">Gerar Horários</b-button>

            </form>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    const emptyHorarioNoturno = [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ]

    const emptyHorariosNoturnos = [[{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
        {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
    ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ],
        [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
            {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
        ]]

    export default {
        name: 'DashboardHorarios',

        data () {
            return {
                cursos: undefined,
                error: undefined,
                options: [
                    {text: "CC Diurno", value:1},
                    {text: "CC Noturno", value:2},
                    {text: "SI", value:3},
                    {text: "Eng. Comp.", value:4},
                ],
                rangeCCN: 1,
                evenCCN:"false",
                CCN:[[{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ],
                    [{hora:"19-21",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined},
                                 {hora:"21-23",seg: undefined, ter:undefined, qua:undefined, qui:undefined, sex:undefined, sab:undefined}
                                ]]

            }
        },

        methods: {
            addGradeCCN () {
                this.rangeCCN++
            },

            removeGradeCCN () {
                this.rangeCCN--
            },

            isEven (number) {
                if(number%2===0)
                    return 'true'
                else
                    return 'false'
            },

            createHorarios () {
                this.CCN = _.clone(emptyHorariosNoturnos)
                var grade
                var inicio
                var fim
                var pedidos = _.filter(this.$store.state.pedido.Pedidos, ['Curso', 1])
                var disciplinas = this.$store.state.disciplina.Disciplinas
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = this.$store.state.turma.Turmas
                //CC Noturno está selecionado
                if(_.indexOf(this.cursos, 2)>-1) {
                    for (var i = 0; i < this.rangeCCN; i++) {
                        //grade
                        grade = this.$refs.formCCN[3*i].value
                        //inicio
                        inicio = this.$refs.formCCN[3*i+1].value
                        //fim
                        fim = this.$refs.formCCN[3*i+2].value
                        for (var k = 0; k < disciplinaGrades.length; k++){
                            if((disciplinaGrades[k].Grade==grade) && (this.isEven(disciplinaGrades[k].periodo)==this.evenCCN) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo<=parseInt(fim, 10))){
                                for(var j = 0; j < turmas.length; j++){
                                    if(turmas[j].Disciplina==disciplinaGrades[k].Disciplina){
                                        for(var p = 0; p < pedidos.length; p++){
                                            if((pedidos[p].vagasPeriodizadas>0)&&(pedidos[p].Turma==turmas[j].id)){
                                                switch(turmas[j].Horario1){
                                                    case 5:this.CCN[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].seg)
                                                           break;
                                                    case 6:this.CCN[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].seg)
                                                           break;
                                                    case 11:this.CCN[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].ter)
                                                            break;
                                                    case 12:this.CCN[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].ter)
                                                            break;
                                                    case 17:this.CCN[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qua)
                                                            break;
                                                    case 18:this.CCN[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qua)
                                                            break;
                                                    case 23:this.CCN[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qui)
                                                            break;
                                                    case 24:this.CCN[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qui)
                                                            break;
                                                    case 29:this.CCN[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][0].sex)
                                                            break;
                                                    case 30:this.CCN[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                            console.log(this.CCN[disciplinaGrades[k].periodo-1][1].sex)
                                                            break;
                                                    default: break;
                                                }
                                                switch(turmas[j].Horario2){
                                                    case 5:this.CCN[disciplinaGrades[k].periodo-1][0].seg = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].seg)
                                                        break;
                                                    case 6:this.CCN[disciplinaGrades[k].periodo-1][1].seg = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].seg)
                                                        break;
                                                    case 11:this.CCN[disciplinaGrades[k].periodo-1][0].ter = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].ter)
                                                        break;
                                                    case 12:this.CCN[disciplinaGrades[k].periodo-1][1].ter = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].ter)
                                                        break;
                                                    case 17:this.CCN[disciplinaGrades[k].periodo-1][0].qua = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qua)
                                                        break;
                                                    case 18:this.CCN[disciplinaGrades[k].periodo-1][1].qua = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qua)
                                                        break;
                                                    case 23:this.CCN[disciplinaGrades[k].periodo-1][0].qui = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].qui)
                                                        break;
                                                    case 24:this.CCN[disciplinaGrades[k].periodo-1][1].qui = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].qui)
                                                        break;
                                                    case 29:this.CCN[disciplinaGrades[k].periodo-1][0].sex = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][0].sex)
                                                        break;
                                                    case 30:this.CCN[disciplinaGrades[k].periodo-1][1].sex = turmas[j].Disciplina
                                                        console.log(this.CCN[disciplinaGrades[k].periodo-1][1].sex)
                                                        break;
                                                    default: break;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for(var i=0; i<9;i++){
                        for(var j=0; j<disciplinas.length;j++){
                            if(this.CCN[i][0].seg == disciplinas[j].id){
                                this.CCN[i][0].seg = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].seg == disciplinas[j].id){
                                this.CCN[i][1].seg = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].ter == disciplinas[j].id){
                                this.CCN[i][0].ter = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].ter == disciplinas[j].id){
                                this.CCN[i][1].ter = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].qua == disciplinas[j].id){
                                this.CCN[i][0].qua = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].qua == disciplinas[j].id){
                                this.CCN[i][1].qua = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].qui == disciplinas[j].id){
                                this.CCN[i][0].qui = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].qui == disciplinas[j].id){
                                this.CCN[i][1].qui = disciplinas[j].codigo
                            }
                            if(this.CCN[i][0].sex == disciplinas[j].id){
                                this.CCN[i][0].sex = disciplinas[j].codigo
                            }
                            if(this.CCN[i][1].sex == disciplinas[j].id){
                                this.CCN[i][1].sex = disciplinas[j].codigo
                            }
                        }
                    }
                }
                console.log(this.CCN)
            },

            ccnSelecionado(){
              return (!(_.isEqual(this.CCN, emptyHorariosNoturnos)) && (_.indexOf(this.cursos, 2) > -1))
            },

            horarioVazio(horario){
                return _.isEqual(horario, emptyHorarioNoturno)
            }
        },

        computed: {
            Grades () {
                return this.$store.state.grade.Grades
            },

            DisciplinaGrades () {
                return this.$store.state.disciplinaGrade.DisciplinaGrades
            },

            GradesCCD () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 1])
            },

            GradesCCN () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 2])
            },
            GradesSI () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 3])
            },

            GradesEC () {
                return _.filter(this.$store.state.grade.Grades, ['Curso', 4])
            },

            activeCCD () {
                return _.indexOf(this.cursos, 1)>-1
            },

            activeCCN () {
                return _.indexOf(this.cursos, 2)>-1
            },

            activeSI () {
                return _.indexOf(this.cursos, 3)>-1
            },

            activeEC () {
                return _.indexOf(this.cursos, 4)>-1
            }

        }
    }
</script>

<style scoped>
</style>