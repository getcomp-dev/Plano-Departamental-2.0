import router from "@/router";
import authService from "@/services/auth";
import {
  AUTHENTICATE,
  USER_FETCHED,
  USER_LOGGED_OUT,
  SOCKET_USUARIO_UPDATED,
} from "../mutation-types";

const state = {
  token: localStorage.getItem("token"),
  Usuario: null,
};

const mutations = {
  [AUTHENTICATE](state, data) {
    state.token = data.token;
    localStorage.setItem("token", state.token);
    state.Usuario = data.Usuario;
  },

  [SOCKET_USUARIO_UPDATED](state, data) {
    if (state.Usuario.id === data.Usuario.id) {
      state.Usuario = data.Usuario;
      if (data.Usuario.admin === true) {
        state.Usuario.admin = 1;
      }
    }
  },

  [USER_FETCHED](state, data) {
    state.Usuario = data.Usuario;
  },

  [USER_LOGGED_OUT](state) {
    state.token = null;
    localStorage.removeItem("token");
    state.Usuario = null;
  },
};

const actions = {
  authenticate({ commit }, payload) {
    return new Promise((resolve, reject) => {
      authService
        .authenticate(payload)
        .then((response) => {
          commit(AUTHENTICATE, response);
          resolve();
        })
        .catch((error) => reject(error));
    });
  },

  fetchUsuario({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.Usuario) {
        resolve();
      } else if (state.token) {
        authService
          .fetch()
          .then((response) => {
            commit(USER_FETCHED, response);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject();
      }
    });
  },

  doLogout({ commit }) {
    commit(USER_LOGGED_OUT);
    router.push({ path: "/login" });
  },
};

const getters = {
  currentUser(state) {
    let isAdmin = false,
      isSuperAdmin = false,
      type = "";
    if (state.Usuario) {
      isAdmin = state.Usuario.admin >= 1;
      isSuperAdmin = state.Usuario.admin >= 2;
      type = textUserType(state.Usuario.admin);
    }

    return {
      ...state.Usuario,
      isAdmin,
      isSuperAdmin,
      type,
    };
  },
};

function textUserType(admin) {
  if (admin === 0) return "Consulta";
  else if (admin === 1) return "Comissão";
  else if (admin === 2) return "Administrador";
}

export default {
  state,
  mutations,
  actions,
  getters,
};
