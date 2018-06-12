<template>
  <div class="DashboardGrades row">
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Disciplinas</h1>
      </div>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Período de Início</th>
          <th scope="col">Curso</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Grades.length > 0">
          <tr v-for="grade in Grades" :key="grade.id" v-on:click.prevent="showGrade(grade)">
            <td>{{grade.periodoInicio}}</td>
            <template v-for="curso in Cursos">
              <td v-if="curso.id===grade.Curso" :key="curso.id">{{curso.nome}}</td>
            </template>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhuma grade encontrada!
            </td>
          </tr>
        </template>
        </tbody>
      </table>
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
          <label for="periodoInicio" class="col-sm-2 col-form-label">Período de Início</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="periodoInicio" v-model="gradeForm.periodoInicio">
          </div>
        </div>
        <div class="form-group row">
          <label for="curso" class="col-sm-2 col-form-label">Curso</label>
          <div class="col-sm-10">
            <select type="text" class="form-control" id="curso" v-model="gradeForm.Curso">
              <option v-if="Cursos.length===0" type="text" value="">Nenhum Curso Encontrado</option>
              <option v-for="curso in Cursos" :key="curso.id" :value="curso.id">{{curso.nome}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
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

    const emptyGrade = {
        id:undefined,
        periodoInicio:undefined,
        Curso:undefined
    }

    export default {
        name: 'DashboardGrade',

        data () {
            return {
                gradeForm: _.clone(emptyGrade),
                error: undefined
            }
        },

        methods: {
            addGrade() {
                gradeService.create(this.gradeForm).then((response) => {
                    this.cleanGrade()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Grade ${response.Grade.periodoInicio} foi criada!`,
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
                        text: `A Grade ${response.Grade.periodoInicio} foi atualizada!`,
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
                        text: `A Grade ${response.Grade.periodoInicio} foi excluída!`,
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

            showGrade(grade) {
                this.cleanGrade()
                this.gradeForm = _.clone(grade);
                (function smoothscroll(){
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if (currentScroll > 0) {
                        window.requestAnimationFrame(smoothscroll);
                        window.scrollTo (0,currentScroll - (currentScroll/5));
                    }
                })();
            }

        },

        computed: {
            Grades () {
                return this.$store.state.grade.Grades
            },

            Cursos () {
                return this.$store.state.curso.Cursos
            },

            isEdit () {
                return this.gradeForm.id !== undefined
            }
        }
    }
</script>

<style scoped>
</style>