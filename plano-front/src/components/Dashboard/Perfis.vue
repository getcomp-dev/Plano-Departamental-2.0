<template>
  <div class="DashboardPerfis row" v-if="Admin">
    <div class="col">
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Perfis</h1>
      </div>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Abreviação</th>
          <th scope="col">Cor</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Perfis.length > 0">
          <tr v-for="perfil in Perfis" :key="perfil.id" v-on:click.prevent="showPerfil(perfil)">
            <td>{{perfil.nome}}</td>
            <td>{{perfil.abreviacao}}</td>
            <input type="color" v-model="perfil.cor">
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum perfil encontrado!
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
          <h1 class="h2">Editar Perfil</h1>
        </template>
        <template v-else>
          <h1 class="h2">Adicionar Perfil</h1>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-sm-2 col-form-label">Nome</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="nome" v-model="perfilForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="abreviacao" class="col-sm-2 col-form-label">Abreviação</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="abreviacao" v-model="perfilForm.abreviacao">
          </div>
        </div>
        <div class="form-group row">
          <label for="cor" class="col-sm-2 col-form-label">Cor</label>
          <div class="col-sm-10">
            <input type="color" class="form-control" id="cor" v-model="perfilForm.cor">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editPerfil" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deletePerfil" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanPerfil" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addPerfil" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanPerfil" :key="2">Resetar
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
import perfilService from '../../common/services/perfil'

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined,
  cor: '#ff0000'
}

export default {
  name: 'DashboardPerfis',

  data () {
    return {
      perfilForm: _.clone(emptyPerfil),
      error: undefined
    }
  },

  methods: {
    addPerfil () {
      perfilService.create(this.perfilForm).then((response) => {
        this.cleanPerfil()
        this.$notify({
          group: 'general',
          title: `Sucesso!`,
          text: `O Perfil ${response.Perfil.nome} foi criado!`,
          type: 'success'
        })
      }).catch(error => {
        this.error = '<b>Erro ao criar Perfil</b>'
        if (error.response.data.fullMessage) {
          this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
        }
      })
    },

    editPerfil () {
      perfilService.update(this.perfilForm.id, this.perfilForm).then((response) => {
        this.$notify({
          group: 'general',
          title: `Sucesso!`,
          text: `O Perfil ${response.Perfil.nome} foi atualizado!`,
          type: 'success'
        })
      }).catch(error => {
        this.error = '<b>Erro ao atualizar Perfil</b>'
        if (error.response.data.fullMessage) {
          this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
        }
      })
    },

    deletePerfil () {
      perfilService.delete(this.perfilForm.id, this.perfilForm).then((response) => {
        this.cleanPerfil()
        this.$notify({
          group: 'general',
          title: `Sucesso!`,
          text: `O Perfil ${response.Perfil.nome} foi excluído!`,
          type: 'success'
        })
      }).catch(() => {
        this.error = '<b>Erro ao excluir Perfil</b>'
      })
    },

    cleanPerfil () {
      console.log(this.perfilForm.cor)
      this.perfilForm = _.clone(emptyPerfil)
      this.error = undefined
    },

    showPerfil (perfil) {
      this.cleanPerfil()
      this.perfilForm = _.clone(perfil);
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
    Perfis () {
      return this.$store.state.perfil.Perfis
    },

    isEdit () {
      return this.perfilForm.id !== undefined
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

<style scoped>
</style>