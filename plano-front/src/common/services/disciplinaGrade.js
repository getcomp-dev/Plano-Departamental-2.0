import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/disciplinaGrade`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (disciplinaGradeId, config = {}) {
        return Vue.axios.get(`/disciplinaGrade/${disciplinaGradeId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/disciplinaGrade', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (disciplinaGradeId, config = {}) {
        return Vue.axios.post(`/disciplinaGrade/${disciplinaGradeId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (disciplinaGradeId, config = {}) {
        return Vue.axios.delete(`/disciplinaGrade/${disciplinaGradeId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}