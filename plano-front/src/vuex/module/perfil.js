import Vue from "vue";
import perfilService from "../../services/perfil";
import { orderBy, filter } from "lodash-es";
import {
  PERFIL_FETCHED,
  SOCKET_PERFIL_CREATED,
  SOCKET_PERFIL_DELETED,
  SOCKET_PERFIL_UPDATED,
} from "../mutation-types";

const state = {
  Perfis: [],
};

const mutations = {
  [PERFIL_FETCHED](state, data) {
    state.Perfis = data.Perfis;
  },

  [SOCKET_PERFIL_CREATED](state, data) {
    state.Perfis.push(data.Perfil);
  },

  [SOCKET_PERFIL_UPDATED](state, data) {
    let index = state.Perfis.findIndex((perfil) => perfil.id === data.Perfil.id);
    Vue.set(state.Perfis, index, data.Perfil);
  },

  [SOCKET_PERFIL_DELETED](state, data) {
    let index = state.Perfis.findIndex((perfil) => perfil.id === data.Perfil.id);
    state.Perfis.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      perfilService
        .fetchAll()
        .then((response) => {
          commit(PERFIL_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  AllPerfis(state) {
    return orderBy(state.Perfis, ["nome"]);
  },

  PerfisDCC(_, getters) {
    return filter(getters.AllPerfis, (perfil) => perfil.id !== 13);
  },

  PerfisExternos(_, getters) {
    return filter(getters.AllPerfis, (perfil) => perfil.id === 13 || perfil.id === 15);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
