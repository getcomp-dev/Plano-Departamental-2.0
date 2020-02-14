import Vue from 'vue'

export default {
    fetchAll (config = {}) {
        return Vue.axios.get(`/history`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },
}
