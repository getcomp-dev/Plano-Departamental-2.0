import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/docenteDisciplina", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(docenteDisciplinaId, config = {}) {
    return Vue.axios
      .get(`/docenteDisciplina/${docenteDisciplinaId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/docenteDisciplina", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(docenteDisciplinaDisciplina, docenteDisciplinaDocente, config = {}) {
    return Vue.axios
      .post(
        `/docenteDisciplina/${docenteDisciplinaDocente}&&${docenteDisciplinaDisciplina}`,
        config
      )
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(docenteDisciplinaDisciplina, docenteDisciplinaDocente, config = {}) {
    return Vue.axios
      .delete(
        `/docenteDisciplina/${docenteDisciplinaDocente}&&${docenteDisciplinaDisciplina}`,
        config
      )
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
