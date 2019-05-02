import Vue from 'vue'

export default {
    download (config = {}) {
        return Vue.axios.get(`/download`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    },

}
