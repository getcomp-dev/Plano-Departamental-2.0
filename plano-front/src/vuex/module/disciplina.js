import Vue from 'vue'
import _ from 'lodash'
import disciplinaService from '../../common/services/disciplina'
import { DISCIPLINA_FETCHED, SOCKET_DISCIPLINA_CREATED, SOCKET_DISCIPLINA_DELETED, SOCKET_DISCIPLINA_UPDATED } from '../mutation-types'

const state = {
    Disciplinas: []
}

const mutations = {
    [DISCIPLINA_FETCHED] (state, data) {
        state.Disciplinas = data.Disciplinas
    },

    [SOCKET_DISCIPLINA_CREATED] (state, data) {
        state.Disciplinas.push(data.Disciplina)
    },

    [SOCKET_DISCIPLINA_UPDATED] (state, data) {
        let index = _.findIndex(state.Disciplinas, disciplina => disciplina.id === data.Disciplina.id);
        Vue.set(state.Disciplinas, index, data.Disciplina)
    },

    [SOCKET_DISCIPLINA_DELETED] (state, data) {
        let index = _.findIndex(state.Disciplinas, disciplina => disciplina.id === data.Disciplina.id);
        state.Disciplinas.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            disciplinaService.fetchAll().then(response => {
                commit(DISCIPLINA_FETCHED, response)
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