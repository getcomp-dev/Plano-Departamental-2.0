import Vue from 'vue'

export default {
  fetchAll (config = {}) {
    return Vue.axios.get(`/perfil`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  get (perfilId, config = {}) {
    return Vue.axios.get(`/perfil/${perfilId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  create (payload, config = {}) {
    return Vue.axios.post('/perfil', payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  update (perfilId, config = {}) {
    return Vue.axios.post(`/perfil/${perfilId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  delete (perfilId, config = {}) {
    return Vue.axios.delete(`/perfil/${perfilId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
