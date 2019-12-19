import Vue from 'vue'
import _ from 'lodash'
import horarioService from '../../common/services/horario'
import { HORARIO_FETCHED, SOCKET_HORARIO_CREATED, SOCKET_HORARIO_DELETED, SOCKET_HORARIO_UPDATED } from '../mutation-types'

const state = {
    Horarios: []
}

const mutations = {
    [HORARIO_FETCHED] (state, data) {
        state.Horarios = data.Horarios
    },

    [SOCKET_HORARIO_CREATED] (state, data) {
        state.Horarios.push(data.Horario)
    },

    [SOCKET_HORARIO_UPDATED] (state, data) {
        let index = _.findIndex(state.Horarios, horario => horario.id === data.Horario.id);
        Vue.set(state.Horarios, index, data.Horario)
    },

    [SOCKET_HORARIO_DELETED] (state, data) {
        let index = _.findIndex(state.Horarios, horario => horario.id === data.Horario.id);
        state.Horarios.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            horarioService.fetchAll().then(response => {
                commit(HORARIO_FETCHED, response)
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
