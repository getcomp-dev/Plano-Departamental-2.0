<template>
    <div class="DashboardHorarios row">
        <div class="col">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Lista Horarios</h1>
            </div>

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
                      <label for="formCCD">Ciência da Computação Diurno</label>
                      <form name="formCCD" id="formCCD" ref="formCCD">
                        <div v-for="n in rangeCCD" :key="n" class="grade">
                          <label for="selectGrade">Grade</label>
                          <b-form-select id="selectGrade" class="sm-12">
                              <option v-for="grade in GradesCCD" :value="grade.id">{{grade.periodoInicio}}</option>
                          </b-form-select>
                          <label for="inicio">Período Início</label>
                          <b-form-input id="inicio" class="inicio"></b-form-input>
                          <label for="fim">Período Fim</label>
                          <b-form-input id="fim" class="fim"></b-form-input>
                          <br/>
                        </div>
                      </form>
                      <b-form-radio-group id="radioCCD" v-model="evenCCD">
                          <b-form-radio value="false">Períodos Ímpares</b-form-radio>
                          <b-form-radio value="true">Períodos Pares</b-form-radio>
                      </b-form-radio-group>
                      <b-button variant="success" v-on:click="addGradeCCD">Adicionar nova Grade</b-button>
                      <b-button variant="success" v-on:click="removeGradeCCD">Remover última Grade</b-button>
                  </div>
                </div>
                <div class="form-group row">
                    <div v-if="activeCCN">
                        <label for="formCCN">Ciência da Computação Noturno</label>
                        <form name="formCCN" id="formCCN" ref="formCCN">
                            <p>{{cursos}}</p>
                        </form>
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

    const emptyPerfil = {
        id: undefined,
        nome: undefined,
        abreviacao: undefined
    }

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
                rangeCCD: 1,
                evenCCD:"false"
            }
        },

        methods: {
            addGradeCCD () {
                this.rangeCCD++
            },

            removeGradeCCD () {
                this.rangeCCD--
            },

            isEven (number) {
                if(number%2===0)
                    return 'true'
                else
                    return 'false'
            },

            createHorarios () {
                var grade
                var inicio
                var fim
                var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades
                var turmas = this.$store.state.turma.Turmas
                //CC Diurno está selecionado
                if(_.indexOf(this.cursos, 1)>-1) {
                    for (var i = 0; i < this.rangeCCD; i++) {
                        //grade
                        grade = this.$refs.formCCD[i].value
                        //inicio
                        inicio = this.$refs.formCCD[i+1].value
                        //fim
                        fim = this.$refs.formCCD[i+2].value

                        for (var k = 0; k < disciplinaGrades.length; k++){
                            if((disciplinaGrades[k].Grade==grade) && (this.isEven(disciplinaGrades[k].periodo)==this.evenCCD) && (disciplinaGrades[k].periodo >= parseInt(inicio, 10)) && (disciplinaGrades[k].periodo<=parseInt(fim, 10))){
                                for(var j = 0; j < turmas.length; j++){

                                    if(turmas[j].Disciplina==disciplinaGrades[k].Disciplina){
                                        console.log([turmas[j].Horario1, turmas[j].Horario2])
                                    }
                                }
                            }
                        }
                    }
                }
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