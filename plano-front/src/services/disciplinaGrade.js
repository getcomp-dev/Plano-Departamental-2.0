import Vue from "vue";

export default {
  fetchAll(config = {}) {
    return Vue.axios
      .get("/disciplinaGrade", config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  get(disciplinaGradeId, config = {}) {
    return Vue.axios
      .get(`/disciplinaGrade/${disciplinaGradeId}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  create(payload, config = {}) {
    return Vue.axios
      .post("/disciplinaGrade", payload, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  update(disciplinaGradeDisciplina, disciplinaGradeGrade, config = {}) {
    return Vue.axios
      .post(`/disciplinaGrade/${disciplinaGradeDisciplina}&&${disciplinaGradeGrade}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },

  delete(disciplinaGradeDisciplina, disciplinaGradeGrade, config = {}) {
    return Vue.axios
      .delete(`/disciplinaGrade/${disciplinaGradeDisciplina}&&${disciplinaGradeGrade}`, config)
      .then((response) => Promise.resolve(response.data))
      .catch((error) => Promise.reject(error));
  },
};
