import Vue from "vue";
import _ from "lodash";
import cursoService from "../../common/services/curso";
import ls from "local-storage";
import {
  CURSO_FETCHED,
  SOCKET_CURSO_CREATED,
  SOCKET_CURSO_DELETED,
  SOCKET_CURSO_UPDATED,
  TOGGLE_CURSO_ATIVO,
  TOGGLE_ALL_CURSO_ATIVO_TRUE,
  TOGGLE_ALL_CURSO_ATIVO_FALSE,
} from "../mutation-types";

const state = {
  Cursos: [],
  Ativos: {},
};

const mutations = {
  [CURSO_FETCHED](state, data) {
    state.Cursos = data.Cursos;
    for (var c = 0; c < state.Cursos.length; c++) {
      state.Ativos[state.Cursos[c].id] = true;
      ls.set(`${state.Cursos[c].id}`, true);
    }
    state.Ativos = Object.assign({}, state.Ativos);
  },

  [SOCKET_CURSO_CREATED](state, data) {
    state.Cursos.push(data.Curso);
    ls.set(`${data.Curso.id}`, true);
    Vue.set(state.Ativos, data.Curso.id, true);
  },

  [SOCKET_CURSO_UPDATED](state, data) {
    let index = _.findIndex(
      state.Cursos,
      (curso) => curso.id === data.Curso.id
    );
    Vue.set(state.Cursos, index, data.Curso);
  },

  [SOCKET_CURSO_DELETED](state, data) {
    let index = _.findIndex(
      state.Cursos,
      (curso) => curso.id === data.Curso.id
    );
    state.Cursos.splice(index, 1);
    ls.remove(`${data.Curso.id}`);
    Vue.set(state.Ativos, data.Curso.id, undefined);
  },

  [TOGGLE_CURSO_ATIVO](state, id) {
    var ativo = !state.Ativos[id];
    Vue.set(state.Ativos, id, ativo);
  },

  [TOGGLE_ALL_CURSO_ATIVO_TRUE](state) {
    for (var c = 0; c < state.Cursos.length; c++) {
      state.Ativos[state.Cursos[c].id] = true;
    }
    state.Ativos = Object.assign({}, state.Ativos);
  },

  [TOGGLE_ALL_CURSO_ATIVO_FALSE](state) {
    for (var c = 0; c < state.Cursos.length; c++) {
      state.Ativos[state.Cursos[c].id] = false;
    }
    state.Ativos = Object.assign({}, state.Ativos);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      cursoService
        .fetchAll()
        .then((response) => {
          commit(CURSO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  toggleCurso({ commit }, id) {
    commit(TOGGLE_CURSO_ATIVO, id);
  },

  toggleAllCursosTrue({ commit }) {
    commit(TOGGLE_ALL_CURSO_ATIVO_TRUE);
  },

  toggleAllCursosFalse({ commit }) {
    commit(TOGGLE_ALL_CURSO_ATIVO_FALSE);
  },
};

const getters = {
  AllCursos(state) {
    return _.orderBy(state.Cursos, ["nome"]);
  },
  CursosDCC(state) {
    return _.filter(state.Cursos, (curso) => {
      switch (curso.codigo) {
        case "35A":
        case "65C":
        case "76A":
        case "65B":
        case "65A":
        case "65AB":
        case "65AC":
          return true;
        default:
          return false;
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
