import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/pedido`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (pedidoCurso, pedidoTurma, config = {}) {
        return Vue.axios.get(`/pedido/${pedidoCurso}&&${pedidoTurma}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/pedido', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (pedidoCurso, pedidoTurma, config = {}) {
        return Vue.axios.post(`/pedido/${pedidoCurso}&&${pedidoTurma}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (pedidoCurso, pedidoTurma, config = {}) {
        return Vue.axios.delete(`/pedido/${pedidoCurso}&&${pedidoTurma}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}