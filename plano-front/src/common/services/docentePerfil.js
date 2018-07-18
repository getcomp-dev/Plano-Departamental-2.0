import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/docentePerfil`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    get (docentePerfilDocente, docentePerfilPerfil, config = {}) {
        return Vue.axios.get('/docentePefil/', {params: {
            DisciplinaId: docentePerfilDocente,
            Perfil: docentePerfilPerfil}}, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    create (payload, config = {}) {
        return Vue.axios.post('/disciplinaGrade', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    update (docentePerfilDocente, docentePerfilPerfil, config = {}) {
        return Vue.axios.post('/docentePefil/', {params: {
                DisciplinaId: docentePerfilDocente,
                Perfil: docentePerfilPerfil}}, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

    delete (docentePerfilDocente, docentePerfilPerfil, config = {}) {
        return Vue.axios.delete('/docentePefil/', {params: {
                DisciplinaId: docentePerfilDocente,
                Perfil: docentePerfilPerfil}}, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}