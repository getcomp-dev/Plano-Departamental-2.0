import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/plano", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/plano", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(planoId, config = {}) {
    return Vue.axios
      .post(`/plano/${planoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(planoId, config = {}) {
    return Vue.axios
      .delete(`/plano/${planoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
