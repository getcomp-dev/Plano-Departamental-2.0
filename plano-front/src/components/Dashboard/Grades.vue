<template>
  <div class="DashboardGrades row" v-if="Admin">
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Disciplinas</h1>
      </div>
      <label for="cursoAtual" class="col-sm-2 col-form-label">Curso</label>
      <select id="cursoAtual" v-model="currentCurso">
        <option value="4">Ciência da Computação Diurno</option>
        <option value="1">Ciência da Computação Noturno</option>
        <option value="3">Sistemas de Informação</option>
        <option value="2">Engenharia Computacional</option>
      </select>
      <label for="gradeAtual" class="col-sm-2 col-form-label">Grade</label>
      <select id="gradeAtual" v-model="currentGrade" v-on:change="findGrade()" style="width: 60px;">
        <option v-for="grade in Grades" v-if="grade.Curso == currentCurso" :value="grade.id">{{grade.nome}}</option>
      </select>
      <div class="col sm6 dataContainer">
        <div class="header" style="width: 15%;">Início</div>
        <div class="header" style="width: 40%;">Curso</div>
        <div class="header" style="width: 5%;">P.</div>
        <div class="header" style="width: 40%;">Disciplina</div>
        <br/>
        <template v-if="currentGrade!=undefined">
          <div v-for="grade in Grades" :key="grade.id" v-on:click.prevent="showGrade(grade)">
            <template v-if="grade.id===currentGrade">
            <div class="data" style="width: 15%">{{grade.periodoInicio}}</div>
              <div class="data" style="width: 40%">
                <template v-if="grade.Curso===4">Ciência da Computação Diurno</template>
                <template v-else-if="grade.Curso===1">Ciência da Computação Noturno</template>
                <template v-else-if="grade.Curso===3">Sistemas de Informação</template>
                <template v-else-if="grade.Curso===2">Engenharia Computacional</template>
              </div>
                <template v-for="disciplinaGrade in DisciplinaGrades">
                  <template v-if="disciplinaGrade.Grade===grade.id">
                    <div class="data" style="width: 45%;" v-bind:class="{'even':isEven(disciplinaGrade.periodo)}">
                    <div class="data" style="width: 11.1111%">{{disciplinaGrade.periodo}}</div>
                    <template v-for="disciplina in Disciplinas">
                      <template v-if="andConnector(grade, disciplina, disciplinaGrade)">
                        <div class="data" style="width: 88.8889%" v-on:click.prevent="showDisciplina(disciplinaGrade)">{{disciplina.nome}}</div>
                      </template>
                    </template>
                    </div>
                    <div class="header" style="width: 55%;"></div>
                  </template>
                </template>

          <br/>
          </template>
          </div>
        </template>
      </div>
    </div>
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <template v-if="isEdit">
          <h1 class="h2">Editar Grade</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Grade</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-sm-2 col-form-label">Nome</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="nome" v-model="gradeForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="periodoInicio" class="col-sm-2 col-form-label">Período de Início</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="periodoInicio" v-model="gradeForm.periodoInicio">
          </div>
        </div>
        <div class="form-group row">
          <label for="curso" class="col-sm-2 col-form-label">Curso</label>
          <div class="col-sm-10">
            <select type="text" class="form-control" id="curso" v-model="gradeForm.Curso">
              <option value="4">Ciência da Computação Diurno</option>
              <option value="1">Ciência da Computação Noturno</option>
              <option value="3">Sistemas de Informação</option>
              <option value="2">Engenharia Computacional</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <div class="form-group row">
                <label for="periodoDisciplina" class="col-sm-2 col-form-label">Período da Disciplina</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="periodoDisciplina" v-model="disciplinaGradeForm.periodo">
                </div>
              </div>
              <div class="form-group row">
                <label for="disciplina" class="col-sm-2 col-form-label">Disciplina</label>
                <div class="col-sm-10">
                  <select type="text" class="form-control" id="disciplina" v-model="disciplinaGradeForm.Disciplina">
                    <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                    <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
                  </select>
                </div>
              </div>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addDisciplinaGrade" :key="4">Adicionar à Grade</button>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editDisciplinaGrade" :key="4">Editar Período</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteDisciplinaGrade" :key="4">Excluir Disciplina</button>
            <br/>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editGrade" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteGrade" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanGrade" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addGrade" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanGrade" :key="2">Resetar
              </button>
            </template>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import _ from 'lodash'
    import gradeService from '../../common/services/grade'
    import disciplinaGradeService from '../../common/services/disciplinaGrade'

    const emptyGrade = {
        id:undefined,
        periodoInicio:undefined,
        Curso:undefined,
        nome: undefined
    }

    const emptyDisciplinaGrade = {
        periodo: undefined,
        Disciplina: undefined,
        Grade: undefined
    }

    export default {
        name: 'DashboardGrade',

        data () {
            return {
                gradeForm: _.clone(emptyGrade),
                disciplinaGradeForm: _.clone(emptyDisciplinaGrade),
                error: undefined,
                currentGrade: undefined,
                currentCurso: undefined,
                grades: []
            }
        },

        methods: {
            addGrade() {
                gradeService.create(this.gradeForm).then((response) => {
                    this.cleanGrade()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Grade ${response.Grade.nome} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Grade</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            editGrade() {
                gradeService.update(this.gradeForm.id, this.gradeForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Grade ${response.Grade.nome} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Grade</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteGrade() {
                gradeService.delete(this.gradeForm.id, this.gradeForm).then((response) => {
                    this.cleanGrade()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Grade ${response.Grade.nome} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Grade</b>'
                })
            },

            cleanGrade() {
                this.gradeForm = _.clone(emptyGrade)
                this.error = undefined
            },

            cleanDisciplina() {
                this.disciplinaGradeForm = _.clone(emptyDisciplinaGrade)

            },

            showGrade(grade) {
                this.cleanGrade()
                this.gradeForm = _.clone(grade);
                this.disciplinaGradeForm.Grade = this.gradeForm.id;
                (function smoothscroll(){
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if (currentScroll > 0) {
                        window.requestAnimationFrame(smoothscroll);
                        window.scrollTo (0,currentScroll - (currentScroll/5));
                    }
                })();
            },

            findGrade() {
                var grade = _.find(this.$store.state.grade.Grades,['id',this.currentGrade])
                this.showGrade(grade)
            },

            addDisciplinaGrade(){
              disciplinaGradeService.create(this.disciplinaGradeForm).then((response) => {
                this.disciplinaGradeForm.Disciplina = undefined;
                this.$notify({
                    group: 'general',
                    title: `Sucesso!`,
                    text: `A Disciplina ${response.Disciplina} foi adicionada à Grade ${response.Grade}!`,
                    type: 'success'
                })
              }).
              catch(error => {
                this.error = '<b>Erro ao incluir Disciplina</b>'
                if (error.response.data.fullMessage) {
                    this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                }
              })
            },

            editDisciplinaGrade(){
                disciplinaGradeService.update(this.disciplinaGradeForm.Disciplina, this.disciplinaGradeForm.Grade, this.disciplinaGradeForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Disciplina</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteDisciplinaGrade() {
                disciplinaGradeService.delete(this.disciplinaGradeForm.Disciplina, this.disciplinaGradeForm.Grade, this.disciplinaGradeForm).then((response) => {
                    this.cleanGrade()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Disciplina</b>'
                })
            },

            showDisciplina: function(disciplinaGrade) {
                this.cleanDisciplina
                this.disciplinaGradeForm = _.clone(disciplinaGrade)
            },

            andConnector: function(grade, disciplina, disciplinaGrade) {
                return (grade.id===disciplinaGrade.Grade && disciplina.id===disciplinaGrade.Disciplina)
            },

            isEven(number) {
                return (number % 2 === 0)
            }

        },

        computed: {
            Grades () {
                return this.$store.state.grade.Grades
            },

            Cursos () {
                return this.$store.state.curso.Cursos
            },

            Disciplinas () {
                return _.sortBy(this.$store.state.disciplina.Disciplinas, 'nome')
            },

            DisciplinaGrades () {
                return _.sortBy(this.$store.state.disciplinaGrade.DisciplinaGrades, 'periodo')
            },

            isEdit () {
                return this.gradeForm.id !== undefined
            },

            Admin () {
                if(this.$store.state.auth.Usuario.admin===1){
                    return true
                }else{
                    return false
                }
            }

        },

    }
</script>

<style scoped>
  .header {
    display: inline-block;
  }

  .data {
    display: inline-block;
  }

  .even {
    background-color: #a5a7a4;
  }
</style>