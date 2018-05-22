<template>
  <div class="DashboardCursos row">
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Cursos</h1>
      </div>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Código</th>
          <th scope="col">Turno</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Cursos.length > 0">
          <tr v-for="curso in Cursos" :key="curso.id" v-on:click.prevent="showCurso(curso)">
            <td>{{curso.nome}}</td>
            <td>{{curso.codigo}}</td>
            <td>{{curso.turno}}</td>

          </tr>
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
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <template v-if="isEdit">
          <h1 class="h2">Editar Curso</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Curso</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-sm-2 col-form-label">Nome</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="nome" v-model="cursoForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="codigo" class="col-sm-2 col-form-label">Codigo</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="codigo" v-model="cursoForm.codigo">
          </div>
        </div>
        <div class="form-group row">
          <label for="turno" class="col-sm-2 col-form-label">Turno</label>
          <div class="col-sm-10">
            <div id="turno">
              <input type="radio" name="truno" value="Diurno" v-model="cursoForm.turno"> Diurno<br/>
              <input type="radio" name="truno" value="Integral" v-model="cursoForm.turno"> Integral<br/>
              <input type="radio" name="truno" value="Noturno" v-model="cursoForm.turno"> Noturno<br/>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editCurso" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteCurso" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanCurso" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addCurso" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanCurso" :key="2">Resetar
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
import cursoService from '../../common/services/curso'

const emptyCurso = {
    id:undefined,
    nome:undefined,
    codigo:undefined,
    turno:undefined
}

export default {
    name: 'DashboardCursos',

    data () {
        return {
            cursoForm: _.clone(emptyCurso),
            error: undefined
        }
    },

    methods: {
        addCurso() {
            cursoService.create(this.cursoForm).then((response) => {
                this.cleanCurso()
            this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `O Curso ${response.Curso.nome} foi criado!`,
                type: 'success'
            })
        }).
            catch(error => {
                this.error = '<b>Erro ao criar Curso</b>'
            if (error.response.data.fullMessage) {
                this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
            }
        })
        },

        editCurso() {
            cursoService.update(this.cursoForm.id, this.cursoForm).then((response) => {
                this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `O Curso ${response.Curso.nome} foi atualizado!`,
                type: 'success'
            })
        }).
            catch(error => {
                this.error = '<b>Erro ao atualizar Curso</b>'
            if (error.response.data.fullMessage) {
                this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
            }
        })
        },

        deleteCurso() {
            cursoService.delete(this.cursoForm.id, this.cursoForm).then((response) => {
                this.cleanCurso()
            this.$notify({
                group: 'general',
                title: `Sucesso!`,
                text: `O Curso ${response.Curso.nome} foi excluído!`,
                type: 'success'
            })
        }).
            catch(() => {
                this.error = '<b>Erro ao excluir Curso</b>'
        })
        },

        cleanCurso() {
            this.cursoForm = _.clone(emptyCurso)
            this.error = undefined
        },

        showCurso(curso) {
            this.cleanCurso()
            this.cursoForm = _.clone(curso);
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
        Cursos () {
            return this.$store.state.curso.Cursos
        },

        isEdit () {
            return this.cursoForm.id !== undefined
        }
    }
}
</script>

<style scoped>
</style>