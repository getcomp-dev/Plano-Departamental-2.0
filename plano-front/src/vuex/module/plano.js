import Vue from 'vue'
import planoService from '../../common/services/plano'
import { PLANO_FETCHED, SOCKET_PLANO_UPDATED } from '../mutation-types'

const state = {
    Plano: {}
}

const mutations = {
    [PLANO_FETCHED] (state, data) {
        state.Plano = data.Plano
    },

    [SOCKET_PLANO_UPDATED] (state, data) {
        Vue.set(state.Plano, 0, data[0].Plano)
    },
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            planoService.fetchAll().then(response => {
                console.log(response)
                commit(PLANO_FETCHED, response)
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
