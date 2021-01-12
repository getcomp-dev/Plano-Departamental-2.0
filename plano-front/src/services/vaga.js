import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/vaga", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(vagaCurso, vagaTurma, config = {}) {
    return Vue.axios
      .get(`/vaga/${vagaCurso}&&${vagaTurma}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/vaga", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(vagaCurso, vagaTurma, config = {}) {
    return Vue.axios
      .post(`/vaga/${vagaCurso}&&${vagaTurma}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(vagaCurso, vagaTurma, config = {}) {
    return Vue.axios
      .delete(`/vaga/${vagaCurso}&&${vagaTurma}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
