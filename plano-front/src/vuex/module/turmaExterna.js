import Vue from 'vue'
import _ from 'lodash'
import turmaExternaService from '../../common/services/turmaExterna'
import { TURMA_EXTERNA_FETCHED, SOCKET_TURMA_EXTERNA_CREATED, SOCKET_TURMA_EXTERNA_DELETED, SOCKET_TURMA_EXTERNA_UPDATED} from '../mutation-types'

const state = {
    Turmas: [],
    Ativas: [],
    Deletar: []
}

const mutations = {
    [TURMA_EXTERNA_FETCHED] (state, data) {
        state.Turmas = data.Turmas
    },

    [SOCKET_TURMA_EXTERNA_CREATED] (state, data) {
        state.Turmas.push(data[0].Turma)
    },

    [SOCKET_TURMA_EXTERNA_UPDATED] (state, data) {
        let index = _.findIndex(state.Turmas, turma => turma.id === data[0].Turma.id);
        Vue.set(state.Turmas, index, data[0].Turma)
    },

    [SOCKET_TURMA_EXTERNA_DELETED] (state, data) {
        let index = _.findIndex(state.Turmas, turma => turma.id === data[0].Turma.id);
        state.Turmas.splice(index, 1)
    },

    redefinirExternoAtivas (state, data) {
        state.Ativas = data.Ativas
    },

    checkDeleteExterno (state, data) {
        let index = _.findIndex(state.Deletar, turma => turma.id === data.Turma.id);
        if(index>-1)
            state.Deletar.splice(index, 1)
        else
            state.Deletar.push(data.Turma)
    },

    emptyDeleteExterno (state) {
        state.Deletar = []
    }


}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            turmaExternaService.fetchAll().then(response => {
                commit(TURMA_EXTERNA_FETCHED, response)
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
