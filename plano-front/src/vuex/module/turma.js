import Vue from 'vue'
import _ from 'lodash'
import turmaService from '../../common/services/turma'
import { TURMA_FETCHED, SOCKET_TURMA_CREATED, SOCKET_TURMA_DELETED, SOCKET_TURMA_UPDATED } from '../mutation-types'

const state = {
    Turmas: []
}

const mutations = {
    [TURMA_FETCHED] (state, data) {
        state.Turmas = data.Turmas
    },

    [SOCKET_TURMA_CREATED] (state, data) {
        state.Turmas.push(data[0].Turma)
    },

    [SOCKET_TURMA_UPDATED] (state, data) {
        let index = _.findIndex(state.Turmas, turma => turma.id === data[0].Turma.id);
        Vue.set(state.Turmas, index, data[0].Turma)
    },

    [SOCKET_TURMA_DELETED] (state, data) {
        let index = _.findIndex(state.Turmas, turma => turma.id === data[0].Turma.id);
        state.Turmas.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            turmaService.fetchAll().then(response => {
                commit(TURMA_FETCHED, response)
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
