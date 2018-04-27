/* globals localStorage */
import _ from 'lodash'
import authService from '../../common/services/auth'

import {AUTHENTICATE, AUTHENTICATE_FAILURE, USER_FETCHED, USER_LOGGED_OUT} from '../mutation-types'

const state = {
  token: localStorage.getItem('token'),
  usuario: undefined,
  error: undefined
}

const mutations = {
  [AUTHENTICATE] (state, data) {
    state.token = data.token
    localStorage.setItem('token', state.token)
    state.usuario = data.Usuario
  },

  [AUTHENTICATE_FAILURE] (state, data) {
    state.error = data.message
  },

  [USER_FETCHED] (state, data) {
    state.usuario = data.Usuario
  },

  [USER_LOGGED_OUT] (state) {
    state.token = undefined
    localStorage.removeItem('token')
    state.usuario = undefined
  }
}

const actions = {
  authenticate ({commit}, payload) {
    return new Promise((resolve, reject) => {
      authService.authenticate(payload).then(response => {
        commit(AUTHENTICATE, response)
        resolve()
      }).catch(error => {
        if (error.response) {
          commit(AUTHENTICATE_FAILURE, error.response.data)
        }
        reject()
      })
    })
  },

  fetchUsuario ({commit, state}) {
    return new Promise((resolve, reject) => {
      if (state.usuario) {
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
    return state.usuario ? _.words(state.usuario.name)[0] : ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
