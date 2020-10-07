import Vue from 'vue'

export default {
    fetchAll (PlanoId, config = {}) {
        return Vue.axios.get(`/turma/Plano/${PlanoId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (turmaId, config = {}) {
        return Vue.axios.get(`/turma/${turmaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/turma', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (turmaId, config = {}) {
        return Vue.axios.post(`/turma/${turmaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (turmaId, config = {}) {
        return Vue.axios.delete(`/turma/${turmaId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    search(payload, config = {}) {
        return Vue.axios.post('/turma/busca', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}
