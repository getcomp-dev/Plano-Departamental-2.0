import Vue from 'vue'

export default {
    criarNovoPlano (config = {}) {
        return Vue.axios.post(`/novoPlano`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}
