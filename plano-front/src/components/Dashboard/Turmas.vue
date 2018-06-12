<template>
  <div class="DashboardTurmas row">
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Turmas</h1>
      </div>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Período</th>
          <th scope="col">Letra</th>
          <th scope="col">Turno</th>
          <th scope="col">Disciplina</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Turmas.length > 0">
          <tr v-for="turma in Turmas" :key="turma.id" v-on:click.prevent="showTurma(turma)">
            <td>{{turma.periodo}}</td>
            <td>{{turma.letra}}</td>
            <td>{{turma.turno}}</td>
            <template v-for="disciplina in Disciplinas">
              <td v-if="disciplina.id===turma.Disciplina" :key="disciplina.id">{{disciplina.nome}}</td>
            </template>

          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhuma turma encontrada!
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
          <h1 class="h2">Editar Turma</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Turma</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="periodo" class="col-sm-2 col-form-label">Período</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="periodo" v-model="turmaForm.periodo">
          </div>
        </div>
        <div class="form-group row">
          <label for="letra" class="col-sm-2 col-form-label">Letra</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="letra" v-model="turmaForm.letra">
          </div>
        </div>
        <div class="form-group row">
          <label for="disciplina" class="col-sm-2 col-form-label">Disciplina</label>
          <div class="col-sm-10">
            <select type="text" class="form-control" id="disciplina" v-model="turmaForm.Disciplina">
              <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
              <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="turno" class="col-sm-2 col-form-label">Turno</label>
          <div class="col-sm-10">
            <div id="turno">
              <input type="radio" name="turno" value="Diurno" v-model="turmaForm.turno"> Diurno<br/>
              <input type="radio" name="turno" value="Integral" v-model="turmaForm.turno"> Integral<br/>
              <input type="radio" name="turno" value="Noturno" v-model="turmaForm.turno"> Noturno<br/>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editTurma" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteTurma" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanTurma" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addTurma" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanTurma" :key="2">Resetar
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
    import turmaService from '../../common/services/turma'

    const emptyTurma = {
        id:undefined,
        periodo:undefined,
        letra:undefined,
        turno:undefined,
        Disciplina:undefined
    }

    export default {
        name: 'DashboardTurmas',

        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                error: undefined
            }
        },

        methods: {
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
            Turmas () {
                return this.$store.state.turma.Turmas
            },

            Disciplinas () {
                return this.$store.state.disciplina.Disciplinas
            },

            isEdit () {
                return this.turmaForm.id !== undefined
            }
        }
    }
</script>

<style scoped>
</style>