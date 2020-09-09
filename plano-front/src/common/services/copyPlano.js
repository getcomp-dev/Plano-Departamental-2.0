import Vue from 'vue'

export default {
    copyPlano (planoOld, planoNew, config = {}) {
        return Vue.axios.post(`/copyPlano/${planoOld}&&${planoNew}`, config)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error))
    }
}