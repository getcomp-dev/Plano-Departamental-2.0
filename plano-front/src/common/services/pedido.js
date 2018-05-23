import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/pedido`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (pedidoId, config = {}) {
        return Vue.axios.get(`/pedido/${pedidoId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/pedido', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (pedidoId, config = {}) {
        return Vue.axios.post(`/pedido/${pedidoId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (pedidoId, config = {}) {
        return Vue.axios.delete(`/pedido/${pedidoId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}