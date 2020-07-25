import Vue from "vue";
import _ from "lodash";
import salaService from "../../common/services/sala";
import {
  SALA_FETCHED,
  SOCKET_SALA_CREATED,
  SOCKET_SALA_DELETED,
  SOCKET_SALA_UPDATED,
} from "../mutation-types";

const state = {
  Salas: [],
};

const mutations = {
  [SALA_FETCHED](state, data) {
    state.Salas = data.Salas;
  },

  [SOCKET_SALA_CREATED](state, data) {
    state.Salas.push(data.Sala);
  },

  [SOCKET_SALA_UPDATED](state, data) {
    let index = _.findIndex(state.Salas, (sala) => sala.id === data.Sala.id);
    Vue.set(state.Salas, index, data.Sala);
  },

  [SOCKET_SALA_DELETED](state, data) {
    let index = _.findIndex(state.Salas, (sala) => sala.id === data.Sala.id);
    state.Salas.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      salaService
        .fetchAll()
        .then((response) => {
          commit(SALA_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  AllSalas(state) {
    return _.orderBy(state.Salas, "nome");
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
