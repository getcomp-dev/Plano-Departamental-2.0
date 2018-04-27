import Vue from 'vue'

export default {
  fetchAll (config = {}) {
    return Vue.axios.get(`/ambiente`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  },

  get (ambId, config = {}) {
    return Vue.axios.get(`/ambiente/${ambId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error))
  }
}
