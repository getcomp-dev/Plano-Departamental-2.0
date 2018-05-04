import Vue from 'vue'
import Vuex from 'vuex'

import auth from './module/auth'
import perfil from './module/perfil'

import {
  USER_LOGGED_OUT,
  COMPONENT_LOADING,
  COMPONENT_LOADED,
  HTTP_REQUEST_INCREMENT,
  HTTP_REQUEST_DECREMENT
} from './mutation-types'

const state = {
  httpRequestCount: 0,
  isLoading: false,
  year: localStorage.getItem('year') || 2018
}

const mutations = {
  [USER_LOGGED_OUT](state) {
    state.isLoading = false
  },

  [HTTP_REQUEST_INCREMENT](state) {
    state.httpRequestCount += 1
  },

  [HTTP_REQUEST_DECREMENT](state) {
    state.httpRequestCount -= 1
  },

  [COMPONENT_LOADING](state) {
    state.isLoading = true
  },

  [COMPONENT_LOADED](state) {
    state.isLoading = false
  }
}

const actions = {}

const getters = {}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth,
    perfil
  },
  strict: process.env.NODE_ENV !== 'production'
})
