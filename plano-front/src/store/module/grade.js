import Vue from "vue";
import gradeService from "../../services/grade";
import { cloneDeepWith, orderBy } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
  GRADE_FETCHED,
  SOCKET_GRADE_CREATED,
  SOCKET_GRADE_DELETED,
  SOCKET_GRADE_UPDATED,
  PUSH_NOTIFICATION,
} from "../mutation-types";

const state = {
  Grades: [],
};

const mutations = {
  [GRADE_FETCHED](state, data) {
    state.Grades = data.Grades;
  },

  [SOCKET_GRADE_CREATED](state, data) {
    state.Grades.push(data.Grade);
  },

  [SOCKET_GRADE_UPDATED](state, data) {
    let index = state.Grades.findIndex((grade) => grade.id === data.Grade.id);
    Vue.set(state.Grades, index, data.Grade);
  },

  [SOCKET_GRADE_DELETED](state, data) {
    let index = state.Grades.findIndex((grade) => grade.id === data.Grade.id);
    state.Grades.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      gradeService
        .fetchAll()
        .then((response) => {
          commit(GRADE_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async createGrade({ commit }, grade) {
    const gradeNormalized = cloneDeepWith(grade, setEmptyValuesToNull);
    validateObjectKeys(gradeNormalized, ["nome", "periodoInicio", "Curso"]);

    await gradeService.create(gradeNormalized);

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A grade ${gradeNormalized.nome} foi criada`,
    });
  },
  async editGrade({ commit }, grade) {
    const gradeNormalized = cloneDeepWith(grade, setEmptyValuesToNull);
    validateObjectKeys(gradeNormalized, ["nome", "periodoInicio", "Curso"]);

    await gradeService.update(gradeNormalized.id, gradeNormalized);

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A grade ${gradeNormalized.nome} foi atualizada`,
    });
  },
  async deleteGrade({ commit }, grade) {
    const gradeNormalized = cloneDeepWith(grade, setEmptyValuesToNull);
    validateObjectKeys(gradeNormalized, ["id", "Curso"]);

    await gradeService.delete(gradeNormalized.id, gradeNormalized);

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A grade ${gradeNormalized.nome} foi excluída`,
    });
  },
};

const getters = {
  AllGrades(state) {
    return orderBy(state.Grades, "periodoInicio", "desc");
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
