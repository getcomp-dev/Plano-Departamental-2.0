import Vue from 'vue'
import _ from 'lodash'
import pedidoService from '../../common/services/pedido'
import { PEDIDO_FETCHED, SOCKET_PEDIDO_CREATED, SOCKET_PEDIDO_DELETED, SOCKET_PEDIDO_UPDATED } from '../mutation-types'

const state = {
    Pedidos: []
}

const mutations = {
    [PEDIDO_FETCHED] (state, data) {
        state.Pedidos = data.Pedidos
    },

    [SOCKET_PEDIDO_CREATED] (state, data) {
        state.Pedidos.push(data[0].Pedido)
    },

    [SOCKET_PEDIDO_UPDATED] (state, data) {
        let index = _.findIndex(state.Pedidos, pedido => pedido.id === data[0].Pedido.id);
        Vue.set(state.Pedidos, index, data[0].Pedido)
    },

    [SOCKET_PEDIDO_DELETED] (state, data) {
        let index = _.findIndex(state.Pedidos, pedido => pedido.id === data[0].Pedido.id);
        state.Pedidos.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            pedidoService.fetchAll().then(response => {
                commit(PEDIDO_FETCHED, response)
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
