import Vue from "vue";
import usuarioService from "../../common/services/usuario";
import {
  USUARIO_FETCHED,
  SOCKET_USUARIO_CREATED,
  SOCKET_USUARIO_DELETED,
  SOCKET_USUARIO_UPDATED,
} from "../mutation-types";

const state = {
  Usuarios: [],
};

const mutations = {
  [USUARIO_FETCHED](state, data) {
    state.Usuarios = data.Usuarios;
  },

  [SOCKET_USUARIO_CREATED](state, data) {
    state.Usuarios.push(data.Usuario);
  },

  [SOCKET_USUARIO_UPDATED](state, data) {
    const index = state.Usuarios.findIndex((usuario) => usuario.id === data.Usuario.id);
    Vue.set(state.Usuarios, index, data.Usuario);
  },

  [SOCKET_USUARIO_DELETED](state, data) {
    const index = state.Usuarios.findIndex((usuario) => usuario.id === data.Usuario.id);
    state.Usuarios.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      usuarioService
        .fetchAll()
        .then((response) => {
          commit(USUARIO_FETCHED, response);
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
