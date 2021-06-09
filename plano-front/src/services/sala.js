import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/sala", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(salaId, config = {}) {
    return Vue.axios
      .get(`/sala/${salaId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/sala", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(salaId, config = {}) {
    return Vue.axios
      .post(`/sala/${salaId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(salaId, config = {}) {
    return Vue.axios
      .delete(`/sala/${salaId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
