import Vue from 'vue'

export default {
    createDump(payload, config = {}) {
        return Vue.axios.post('/bddump', payload, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}