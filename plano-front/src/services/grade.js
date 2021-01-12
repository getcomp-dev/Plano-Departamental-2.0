import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/grade", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(gradeId, config = {}) {
    return Vue.axios
      .get(`/grade/${gradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/grade", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(gradeId, config = {}) {
    return Vue.axios
      .post(`/grade/${gradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(gradeId, config = {}) {
    return Vue.axios
      .delete(`/grade/${gradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
