import Vue from "vue";

export default {
  createDump(payload, config = {}) {
    return Vue.axios
      .post("/bddump", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  restoredump(filename, config = {}) {
    return Vue.axios
      .post(`/bddump/${filename}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  returnFiles(config = {}) {
    return Vue.axios
      .get("/bddump/", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  downloadFile(filename, config = {}) {
    return Vue.axios
      .get(`/bddump/${filename}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
