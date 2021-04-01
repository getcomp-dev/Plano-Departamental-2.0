import Vue from "vue";
import disciplinaGradeService from "../../services/disciplinaGrade";
import {
  DISCIPLINA_GRADE_FETCHED,
  SOCKET_DISCIPLINA_GRADE_CREATED,
  SOCKET_DISCIPLINA_GRADE_DELETED,
  SOCKET_DISCIPLINA_GRADE_UPDATED,
} from "../mutation-types";

const state = {
  DisciplinaGrades: [],
};

const mutations = {
  [DISCIPLINA_GRADE_FETCHED](state, data) {
    state.DisciplinaGrades = data.DisciplinaGrades;
  },

  [SOCKET_DISCIPLINA_GRADE_CREATED](state, data) {
    state.DisciplinaGrades.push(data.DisciplinaGrade);
  },

  [SOCKET_DISCIPLINA_GRADE_UPDATED](state, data) {
    const index = state.DisciplinaGrades.findIndex(
      (disciplinaGrade) =>
        (disciplinaGrade.Disciplina === data.DisciplinaGrade.Disciplina) &
        (disciplinaGrade.Grade === data.DisciplinaGrade.Grade)
    );
    Vue.set(state.DisciplinaGrades, index, data.DisciplinaGrade);
  },

  [SOCKET_DISCIPLINA_GRADE_DELETED](state, data) {
    const index = state.DisciplinaGrades.findIndex(
      (disciplinaGrade) =>
        (disciplinaGrade.Disciplina === data.DisciplinaGrade.Disciplina) &
        (disciplinaGrade.Grade === data.DisciplinaGrade.Grade)
    );
    state.DisciplinaGrades.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      disciplinaGradeService
        .fetchAll()
        .then((response) => {
          commit(DISCIPLINA_GRADE_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  DisciplinasGrades(state, rootGetters) {
    return state.DisciplinaGrades.map((disciplinaGrade) => {
      const disciplinaFound = rootGetters.AllDisciplinas.find(
        (disciplina) => disciplina.id === disciplinaGrade.Disciplina
      );

      return { ...disciplinaGrade, disciplina: { ...disciplinaFound } };
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
