import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/docentePerfil", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(docentePerfilDocente, docentePerfilPerfil, config = {}) {
    return Vue.axios
      .get(`/docentePerfil/${docentePerfilDocente}&&${docentePerfilPerfil}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/docentePerfil", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(docentePerfilDocente, docentePerfilPerfil, config = {}) {
    return Vue.axios
      .post(`/docentePerfil/${docentePerfilDocente}&&${docentePerfilPerfil}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(docentePerfilDocente, docentePerfilPerfil, config = {}) {
    return Vue.axios
      .delete(`/docentePerfil/${docentePerfilDocente}&&${docentePerfilPerfil}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
