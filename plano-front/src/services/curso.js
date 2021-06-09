import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/curso", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(cursoId, config = {}) {
    return Vue.axios
      .get(`/curso/${cursoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/curso", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(cursoId, config = {}) {
    return Vue.axios
      .post(`/curso/${cursoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(cursoId, config = {}) {
    return Vue.axios
      .delete(`/curso/${cursoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
