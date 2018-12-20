import Vue from 'vue'

export default {
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
}
