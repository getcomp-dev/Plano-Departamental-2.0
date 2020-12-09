import Vue from "vue";
import vagaService from "../../common/services/vaga";
import {
  VAGA_FETCHED,
  SOCKET_VAGA_CREATED,
  SOCKET_VAGA_DELETED,
  SOCKET_VAGA_UPDATED,
} from "../mutation-types";

const state = {
  Vagas: [],
};

const mutations = {
  [VAGA_FETCHED](state, data) {
    state.Vagas = data.Vagas;
  },

  [SOCKET_VAGA_CREATED](state, data) {
    state.Vagas.push(data.Vaga);
  },

  [SOCKET_VAGA_UPDATED](state, data) {
    const index = state.Vagas.findIndex(
      (vaga) => (vaga.CursoId === data.Vaga.CursoId) & (vaga.Turma === data.Vaga.Turma)
    );
    Vue.set(state.Vagas, index, data.Vaga);
  },

  [SOCKET_VAGA_DELETED](state, data) {
    const index = state.Vagas.findIndex(
      (vaga) => (vaga.CursoId === data.Vaga.CursoId) & (vaga.Turma === data.Vaga.Turma)
    );
    state.Vagas.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      vagaService
        .fetchAll()
        .then((response) => {
          commit(VAGA_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
