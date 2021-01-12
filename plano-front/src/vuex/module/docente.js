import Vue from "vue";
import { orderBy, filter } from "lodash-es";
import docenteService from "../../services/docente";
import {
  DOCENTE_FETCHED,
  SOCKET_DOCENTE_CREATED,
  SOCKET_DOCENTE_DELETED,
  SOCKET_DOCENTE_UPDATED,
} from "../mutation-types";

const state = {
  Docentes: [],
};

const mutations = {
  [DOCENTE_FETCHED](state, data) {
    state.Docentes = data.Docentes;
  },

  [SOCKET_DOCENTE_CREATED](state, data) {
    state.Docentes.push(data.Docente);
  },

  [SOCKET_DOCENTE_UPDATED](state, data) {
    const index = state.Docentes.findIndex((docente) => docente.id === data.Docente.id);
    Vue.set(state.Docentes, index, data.Docente);
  },

  [SOCKET_DOCENTE_DELETED](state, data) {
    const index = state.Docentes.findIndex((docente) => docente.id === data.Docente.id);
    state.Docentes.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      docenteService
        .fetchAll()
        .then((response) => {
          commit(DOCENTE_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  AllDocentes(state) {
    return orderBy(state.Docentes, "apelido");
  },

  DocentesAtivos(_, getters) {
    return filter(getters.AllDocentes, ["ativo", true]);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
