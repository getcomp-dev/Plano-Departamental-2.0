import Vue from 'vue'
import _ from 'lodash'
import docenteService from '../../common/services/docente'
import { DOCENTE_FETCHED, SOCKET_DOCENTE_CREATED, SOCKET_DOCENTE_DELETED, SOCKET_DOCENTE_UPDATED } from '../mutation-types'

const state = {
    Docentes: []
}

const mutations = {
    [DOCENTE_FETCHED] (state, data) {
        state.Docentes = data.Docentes
    },

    [SOCKET_DOCENTE_CREATED] (state, data) {
        state.Docentes.push(data[0].Docente)
    },

    [SOCKET_DOCENTE_UPDATED] (state, data) {
        let index = _.findIndex(state.Docentes, docente => docente.id === data[0].Docente.id);
        Vue.set(state.Docentes, index, data[0].Docente)
    },

    [SOCKET_DOCENTE_DELETED] (state, data) {
        let index = _.findIndex(state.Docentes, docente => docente.id === data[0].Docente.id);
        state.Docentes.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            docenteService.fetchAll().then(response => {
                commit(DOCENTE_FETCHED, response)
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