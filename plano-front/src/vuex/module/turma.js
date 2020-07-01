import Vue from 'vue'
import _ from 'lodash'
import turmaService from '../../common/services/turma'
import { TURMA_FETCHED, SOCKET_TURMA_CREATED, SOCKET_TURMA_DELETED, SOCKET_TURMA_UPDATED} from '../mutation-types'

const state = {
    Turmas: [],
    Ativas1: [],
    Ativas2: [],
    Deletar: []
}

const mutations = {
    [TURMA_FETCHED] (state, data) {
        state.Turmas = data.Turmas
    },

    [SOCKET_TURMA_CREATED] (state, data) {
        state.Turmas.push(data.Turma)
    },

    [SOCKET_TURMA_UPDATED] (state, data) {
        let index = _.findIndex(state.Turmas, turma => turma.id === data.Turma.id);
        Vue.set(state.Turmas, index, data.Turma)
    },

    [SOCKET_TURMA_DELETED] (state, data) {
        let index = _.findIndex(state.Turmas, turma => turma.id === data.Turma.id);
        state.Turmas.splice(index, 1)
    },

    redefinirAtivas1 (state, data) {
        state.Ativas1 = data.Ativas
    },

    redefinirAtivas2 (state, data) {
        state.Ativas2 = data.Ativas
    },

    checkDelete (state, data) {
        let index = _.findIndex(state.Deletar, turma => turma.id === data.Turma.id);
        if(index>-1)
            state.Deletar.splice(index, 1)
        else
            state.Deletar.push(data.Turma)
    },

    emptyDelete (state) {
        state.Deletar = []
    }


}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            turmaService.fetchAll(localStorage.getItem('Plano')).then(response => {
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
