import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/disciplinaGradeCursoExterno`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (disciplinaGradeId, config = {}) {
        return Vue.axios.get(`/disciplinaGradeCursoExterno/${disciplinaGradeId}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/disciplinaGradeCursoExterno', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (disciplinaGradeDisciplina, disciplinaGradeGrade, config = {}) {
        return Vue.axios.post(`/disciplinaGradeCursoExterno/${disciplinaGradeDisciplina}&&${disciplinaGradeGrade}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (disciplinaGradeDisciplina, disciplinaGradeGrade, config = {}) {
        return Vue.axios.delete(`/disciplinaGradeCursoExterno/${disciplinaGradeDisciplina}&&${disciplinaGradeGrade}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}