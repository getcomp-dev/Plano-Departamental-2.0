<template>
  <div class="DashboardPerfis row">
    <div class="col">
      <h3>Lista Perfis</h3>
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Abreviação</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Perfis.length > 0">
          <tr v-for="perfil in Perfis" :key="perfil.id" v-on:click.prevent="showPerfil(perfil)">
            <td>{{perfil.nome}}</td>
            <td>{{perfil.abreviacao}}</td>
            <td></td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="3" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum perfil encontrado!
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <div class="col">
      <template v-if="isEdit">
        <h3>Editar Perfil</h3>
      </template>
      <template v-else>
        <h3>Adicionar Perfil</h3>
      </template>
      <b-alert :show="Boolean(error)" variant="danger" dismissible>
        {{error}}
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
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="editPerfil">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deletePerfil">Excluir</button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanPerfil">Cancelar</button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addPerfil">Adicionar</button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanPerfil">Resetar</button>
            </template>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import perfilService from  '../../common/services/perfil'

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined
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
      perfilService.create(this.perfilForm).then(() => {
        this.cleanPerfil()
      }).catch(() => {
        this.error = 'Erro ao criar Perfil'
      })
    },

    editPerfil () {

    },

    deletePerfil () {

    },

    cleanPerfil () {
      this.perfilForm = _.clone(emptyPerfil)
      this.error = undefined
    },

    showPerfil (perfil) {
      this.cleanPerfil()
      this.perfilForm = _.clone(perfil)
    }
  },

  computed: {
    Perfis () {
      return this.$store.state.perfil.Perfis
    },

    isEdit () {
      return this.perfilForm.id !== undefined
    }
  }
}
</script>

<style scoped>
</style>