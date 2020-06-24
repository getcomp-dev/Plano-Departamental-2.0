import Vue from 'vue'

export default {
    fetchAll (PlanoId, config = {}) {
        return Vue.axios.get(`/turmaExterna/Plano/${PlanoId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (turmaId, config = {}) {
        return Vue.axios.get(`/turmaExterna/${turmaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/turmaExterna', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (turmaId, config = {}) {
        return Vue.axios.post(`/turmaExterna/${turmaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (turmaId, config = {}) {
        return Vue.axios.delete(`/turmaExterna/${turmaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}
