import Vue from 'vue'

export default {
  fetchAll (config = {}) {
    return Vue.axios.get(`/usuario`, config)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },

  create (payload, config = {}) {
    return Vue.axios.post('/usuario', payload, config)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },

  update (userId, config = {}) {
    return Vue.axios.post(`/usuario/${userId}`, config)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },

  delete (userId, config = {}) {
    return Vue.axios.delete(`/usuario/${userId}`, config)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  }
}
