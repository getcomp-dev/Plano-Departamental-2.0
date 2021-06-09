import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/gradeCursoExterno", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(gradeId, config = {}) {
    return Vue.axios
      .get(`/gradeCursoExterno/${gradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/gradeCursoExterno", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(gradeId, config = {}) {
    return Vue.axios
      .post(`/gradeCursoExterno/${gradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(gradeId, config = {}) {
    return Vue.axios
      .delete(`/gradeCursoExterno/${gradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
