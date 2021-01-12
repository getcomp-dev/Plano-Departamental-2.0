import Vue from "vue";
import salaService from "../../services/sala";
import { orderBy, filter } from "lodash-es";
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
    const index = state.Salas.findIndex((sala) => sala.id === data.Sala.id);
    Vue.set(state.Salas, index, data.Sala);
  },

  [SOCKET_SALA_DELETED](state, data) {
    const index = state.Salas.findIndex((sala) => sala.id === data.Sala.id);
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
    return orderBy(state.Salas, "nome");
  },

  Laboratorios(state, getters) {
    return filter(getters.AllSalas, ["laboratorio", true]);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
