<template>
  <div class="DashboardDocentes row">
    <div class="col">
      <div
              class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Docentes</h1>
      </div>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Apelido</th>
          <th scope="col">Créditos</th>
          <th scope="col">Ativo</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Docentes.length > 0">
          <tr v-for="docente in Docentes" :key="docente.id" v-on:click.prevent="showDocentes(docente)">
            <td>{{docente.nome}}</td>
            <td>{{docente.apelido}}</td>
            <td>{{docente.creditos}}</td>
            <td>{{docente.ativo}}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum docente encontrado!
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
          <h1 class="h2">Editar Docente</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Docente</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-sm-2 col-form-label">Nome</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="nome" v-model="docenteForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="apelido" class="col-sm-2 col-form-label">Apelido</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="apelido" v-model="docenteForm.apelido">
          </div>
        </div>
        <div class="form-group row">
          <label for="creditos" class="col-sm-2 col-form-label">Créditos</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="creditos" v-model="docenteForm.creditos">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <label for="ativo" class="col-form-label">
              <input type="checkbox" id="ativo" value="1" v-model="docenteForm.ativo">
          Ativo</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editDocente" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deleteDocente" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanDocente" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addDocente" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanDocente" :key="2">Resetar
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
    import docenteService from '../../common/services/docente'

    const emptyDocente = {
        id:undefined,
        nome:undefined,
        apelido:undefined,
        creditos:undefined,
        ativo:1
    }

    export default {
        name: 'DashboardDocente',

        data () {
            return {
                docenteForm: _.clone(emptyDocente),
                error: undefined
            }
        },

        methods: {
            addDocente() {
                docenteService.create(this.docenteForm).then((response) => {
                    this.cleanDocente()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Docente ${response.Docente.nome} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Docente</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            editDocente() {
                docenteService.update(this.docenteForm.id, this.docenteForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Docente ${response.Docente.nome} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Docente</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteDocente() {
                docenteService.delete(this.docenteForm.id, this.docenteForm).then((response) => {
                    this.cleanDocente()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Docente ${response.Docente.nome} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Docente</b>'
                })
            },

            cleanDocente() {
                this.docenteForm = _.clone(emptyDocente)
                this.error = undefined
            },

            showDocentes(docente) {
                this.cleanDocente()
                this.docenteForm = _.clone(docente);
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
            Docentes () {
                return this.$store.state.docente.Docentes
            },

            /*Perfis () {
                return this.$store.state.perfil.Perfis
            },*/

            isEdit () {
                return this.docenteForm.id !== undefined
            }
        }
    }
</script>

<style scoped>
</style>