import Vue from "vue";
import usuarioService from "../../common/services/usuario";
import { cloneDeep, cloneDeepWith } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "../../common/utils";
import {
  PUSH_NOTIFICATION,
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
    state.Usuarios.push(cloneDeep(data.Usuario));
  },

  [SOCKET_USUARIO_UPDATED](state, data) {
    const index = state.Usuarios.findIndex((usuario) => usuario.id === data.Usuario.id);
    Vue.set(state.Usuarios, index, cloneDeep(data.Usuario));
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

  async createUsuario({ commit }, { data, notify }) {
    const userNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(userNormalized, ["login", "nome", "admin", "senha"]);
    const response = await usuarioService.create(userNormalized);

    if (notify) {
      commit(PUSH_NOTIFICATION, {
        type: "success",
        text: `Usuário ${userNormalized.nome} criado.`,
      });
    }
    return response.Usuario.id;
  },

  async updateUsuario({ commit }, { data, notify }) {
    const userNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(userNormalized, ["login", "nome", "admin"]);
    const response = await usuarioService.updateSuper(userNormalized.id, userNormalized);

    if (notify) {
      commit(PUSH_NOTIFICATION, {
        type: "success",
        text: `Usuário ${userNormalized.nome} atualizado.`,
      });
    }
    return response.Usuario.id;
  },

  async deleteUsuario({ commit }, { data, notify }) {
    const userNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(userNormalized, ["id"]);
    await usuarioService.delete(userNormalized.id, userNormalized);

    if (notify) {
      commit(PUSH_NOTIFICATION, {
        type: "success",
        text: `Usuário ${userNormalized.nome} foi removido.`,
      });
    }
  },
};

const getters = {
  AllUsuarios(state) {
    return state.Usuarios.map((user) => {
      return {
        ...user,
        senha: "",
      };
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
