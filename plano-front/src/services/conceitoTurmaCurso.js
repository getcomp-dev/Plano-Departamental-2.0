import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/conceitoTurmaCurso", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/conceitoTurmaCurso", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(conceitoTurmaCursoId, config = {}) {
    return Vue.axios
      .post(`/conceitoTurmaCurso/${conceitoTurmaCursoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(conceitoTurmaCursoId, config = {}) {
    return Vue.axios
      .delete(`/conceitoTurmaCurso/${conceitoTurmaCursoId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
