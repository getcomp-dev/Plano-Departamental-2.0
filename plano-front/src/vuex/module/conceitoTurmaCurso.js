import Vue from "vue";
import { orderBy } from "lodash-es";
import conceitoTurmaCursoService from "../../services/conceitoTurmaCurso";
import {
  CONCEITO_TURMA_CURSO_FETCHED,
  SOCKET_CONCEITO_TURMA_CURSO_CREATED,
  SOCKET_CONCEITO_TURMA_CURSO_DELETED,
  SOCKET_CONCEITO_TURMA_CURSO_UPDATED,
} from "../mutation-types";

const state = {
  Conceitos: [],
};

const mutations = {
  [CONCEITO_TURMA_CURSO_FETCHED](state, data) {
    state.Conceitos = data.Conceitos;
  },

  [SOCKET_CONCEITO_TURMA_CURSO_CREATED](state, data) {
    state.Conceitos.push(data.ConceitoTurmaCurso);
  },

  [SOCKET_CONCEITO_TURMA_CURSO_UPDATED](state, data) {
    const index = state.Conceitos.findIndex(
      (conceito) => conceito.id === data.ConceitoTurmaCurso.id
    );
    Vue.set(state.Conceitos, index, data.ConceitoTurmaCurso);
  },

  [SOCKET_CONCEITO_TURMA_CURSO_DELETED](state, data) {
    const index = state.Conceitos.findIndex(
      (conceito) => conceito.id === data.ConceitoTurmaCurso.id
    );
    state.Conceitos.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      conceitoTurmaCursoService
        .fetchAll()
        .then((response) => {
          commit(CONCEITO_TURMA_CURSO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  AllConceitos(state) {
    return orderBy(state.Conceitos, ["Turma", "avaliacao"]);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
