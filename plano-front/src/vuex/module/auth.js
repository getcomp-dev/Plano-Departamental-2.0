/* globals localStorage */
import _ from 'lodash'
import authService from '../../common/services/auth'

import {AUTHENTICATE, USER_FETCHED, USER_LOGGED_OUT, SOCKET_USUARIO_UPDATED} from '../mutation-types'

const state = {
  token: localStorage.getItem('token'),
  Usuario: undefined
}

const mutations = {
  [AUTHENTICATE] (state, data) {
    state.token = data.token
    localStorage.setItem('token', state.token)
    state.Usuario = data.Usuario
  },

  [SOCKET_USUARIO_UPDATED] (state, data) {
    if(state.Usuario.id === data.Usuario.id){
      state.Usuario = data.Usuario
      if(data.Usuario.admin === true){
        state.Usuario.admin = 1
      }
    }
  },

  [USER_FETCHED] (state, data) {
    state.Usuario = data.Usuario
  },

  [USER_LOGGED_OUT] (state) {
    state.token = undefined
    localStorage.removeItem('token')
    state.Usuario = undefined
  }
}

const actions = {
  authenticate ({commit}, payload) {
    return new Promise((resolve, reject) => {
      authService.authenticate(payload).then(response => {
        commit(AUTHENTICATE, response)
        resolve()
      }).catch(error => reject(error))
    })
  },

  fetchUsuario ({commit, state}) {
    return new Promise((resolve, reject) => {
      if (state.Usuario) {
        resolve()
      } else if (state.token) {
        authService.fetch().then(response => {
          commit(USER_FETCHED, response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        reject()
      }
    })
  }
}

const getters = {
  getUsuarioFirstName: state => {
    return state.Usuario ? _.words(state.Usuario.nome)[0] : ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
