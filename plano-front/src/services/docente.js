import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/docente", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(docenteId, config = {}) {
    return Vue.axios
      .get(`/docente/${docenteId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/docente", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(docenteId, config = {}) {
    return Vue.axios
      .post(`/docente/${docenteId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(docenteId, config = {}) {
    return Vue.axios
      .delete(`/docente/${docenteId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
