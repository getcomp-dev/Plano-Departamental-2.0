import Vue from 'vue'
import _ from 'lodash'
import pedidoExternoService from '../../common/services/pedidoExterno'
import { PEDIDO_EXTERNO_FETCHED, SOCKET_PEDIDO_EXTERNO_CREATED, SOCKET_PEDIDO_EXTERNO_DELETED, SOCKET_PEDIDO_EXTERNO_UPDATED } from '../mutation-types'

const state = {
    Pedidos: []
}

const mutations = {
    [PEDIDO_EXTERNO_FETCHED] (state, data) {
        state.Pedidos = data.Pedidos
    },

    [SOCKET_PEDIDO_EXTERNO_CREATED] (state, data) {
        state.Pedidos.push(data[0].Pedido)
    },

    [SOCKET_PEDIDO_EXTERNO_UPDATED] (state, data) {
        let index = _.findIndex(state.Pedidos, pedido => (pedido.Curso === data[0].Pedido.Curso & pedido.Turma === data[0].Pedido.Turma));
        Vue.set(state.Pedidos, index, data[0].Pedido)
    },

    [SOCKET_PEDIDO_EXTERNO_DELETED] (state, data) {
        let index = _.findIndex(state.Pedidos, pedido => (pedido.Curso === data[0].Pedido.Curso & pedido.Turma === data[0].Pedido.Turma));
        state.Pedidos.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            pedidoExternoService.fetchAll().then(response => {
                commit(PEDIDO_EXTERNO_FETCHED, response)
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
