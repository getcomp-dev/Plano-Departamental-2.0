import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/horario`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (horarioId, config = {}) {
        return Vue.axios.get(`/horario/${horarioId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/horario', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (horarioId, config = {}) {
        return Vue.axios.post(`/horario/${horarioId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (horarioId, config = {}) {
        return Vue.axios.delete(`/horario/${horarioId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}
