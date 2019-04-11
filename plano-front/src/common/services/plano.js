import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/plano`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

       update (ano, config = {}) {
        return Vue.axios.post(`/plano/${ano}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}
