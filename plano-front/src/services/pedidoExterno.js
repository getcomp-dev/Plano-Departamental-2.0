import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/pedidoExterno", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(pedidoCurso, pedidoTurma, config = {}) {
    return Vue.axios
      .get(`/pedidoExterno/${pedidoCurso}&&${pedidoTurma}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/pedidoExterno", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(pedidoCurso, pedidoTurma, config = {}) {
    return Vue.axios
      .post(`/pedidoExterno/${pedidoCurso}&&${pedidoTurma}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(pedidoCurso, pedidoTurma, config = {}) {
    return Vue.axios
      .delete(`/pedidoExterno/${pedidoCurso}&&${pedidoTurma}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
