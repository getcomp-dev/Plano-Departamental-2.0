import Vue from 'vue'
import planoService from '../../common/services/plano'
import {PLANO_FETCHED, SOCKET_PLANO_DELETED, SOCKET_PLANO_CREATED, SOCKET_PLANO_UPDATED} from '../mutation-types'
import _ from "lodash";

const state = {
    Plano: []
}

const mutations = {
    [PLANO_FETCHED] (state, data) {
        state.Plano = data.Plano
    },

    [SOCKET_PLANO_CREATED] (state, data) {
        state.Plano.push(data.Plano)
    },

    [SOCKET_PLANO_UPDATED] (state, data) {
        let index = _.findIndex(state.Plano, plano => plano.id === data.Plano.id);
        Vue.set(state.Plano, index, data.Plano)
    },

    [SOCKET_PLANO_DELETED] (state, data) {
        let index = _.findIndex(state.Plano, plano => plano.id === data.Plano.id);
        state.Plano.splice(index, 1)
    }
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
