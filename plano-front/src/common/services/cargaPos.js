import Vue from 'vue'

export default {
    fetchAll (PlanoId, config = {}) {
        return Vue.axios.get(`/cargaPos/Plano/${PlanoId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (cargaPosId, config = {}) {
        return Vue.axios.get(`/cargaPos/${cargaPosId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/cargaPos', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (cargaPosId, config = {}) {
        return Vue.axios.post(`/cargaPos/${cargaPosId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (cargaPosId, config = {}) {
        return Vue.axios.delete(`/cargaPos/${cargaPosId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}
