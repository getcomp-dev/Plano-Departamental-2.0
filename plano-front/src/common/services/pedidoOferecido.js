import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/pedidoOferecido`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/pedidoOferecido', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (pedidoCurso, pedidoTurma, config = {}) {
        return Vue.axios.post(`/pedidoOferecido/${pedidoCurso}&&${pedidoTurma}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (pedidoCurso, pedidoTurma, config = {}) {
        return Vue.axios.delete(`/pedidoOferecido/${pedidoCurso}&&${pedidoTurma}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}