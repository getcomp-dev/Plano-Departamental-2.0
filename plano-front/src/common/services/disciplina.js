import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/disciplina`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (disciplinaId, config = {}) {
        return Vue.axios.get(`/disciplina/${disciplinaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/disciplina', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (disciplinaId, config = {}) {
        return Vue.axios.post(`/disciplina/${disciplinaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (disciplinaId, config = {}) {
        return Vue.axios.delete(`/disciplina/${disciplinaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}