import Vue from "vue";

export default {
  downloadTable(payload, config = {}) {
    return Vue.axios
      .post("/xlsx", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
