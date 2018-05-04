import perfilService from '../../common/services/perfil'

import { PERFIL_FETCHED, SOCKET_PERFIL_CREATED } from '../mutation-types'

const state = {
  Perfis: []
}

const mutations = {
  [PERFIL_FETCHED] (state, data) {
    state.Perfis = data.Perfis
  },

  [SOCKET_PERFIL_CREATED] (state, data) {
    state.Perfis.push(data[0].Perfil)
  }
}

const actions = {
  fetchAll ({commit}) {
    return new Promise((resolve, reject) => {
      perfilService.fetchAll().then(response => {
        commit(PERFIL_FETCHED, response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
