import Vue from "vue";
import pedidoOferecidoService from "../../services/pedidoOferecido";
import { normalizePedido } from "@/common/utils";
import {
  PEDIDO_OFERECIDO_FETCHED,
  SOCKET_PEDIDO_OFERECIDO_CREATED,
  SOCKET_PEDIDO_OFERECIDO_DELETED,
  SOCKET_PEDIDO_OFERECIDO_UPDATED,
} from "../mutation-types";

const state = {
  Pedidos: {},
};

const mutations = {
  [PEDIDO_OFERECIDO_FETCHED](state, data) {
    state.Pedidos = {};
    for (var p = 0; p < data.Pedidos.length; p++) {
      if (data.Pedidos[p].hasOwnProperty("Turma")) {
        var t = data.Pedidos[p].Turma;
        if (state.Pedidos[t] === undefined) {
          state.Pedidos[t] = [];
        }
        state.Pedidos[data.Pedidos[p].Turma].push(data.Pedidos[p]);
      }
    }
    state.Pedidos = Object.assign({}, state.Pedidos);
  },

  [SOCKET_PEDIDO_OFERECIDO_CREATED](state, data) {
    if (state.Pedidos[data.Pedido.Turma] === undefined) state.Pedidos[data.Pedido.Turma] = [];
    state.Pedidos[data.Pedido.Turma].push(data.Pedido);
    state.Pedidos = Object.assign({}, state.Pedidos);
  },

  [SOCKET_PEDIDO_OFERECIDO_UPDATED](state, data) {
    const index = state.Pedidos[data.Pedido.Turma].findIndex(
      (pedido) => pedido.Curso === data.Pedido.Curso
    );
    Vue.set(state.Pedidos[data.Pedido.Turma], index, data.Pedido);
  },

  [SOCKET_PEDIDO_OFERECIDO_DELETED](state, data) {
    const index = state.Pedidos[data.Pedido.Turma].findIndex(
      (pedido) => pedido.Curso === data.Pedido.Curso
    );
    state.Pedidos[data.Pedido.Turma].splice(index, 1);
  },
};

const actions = {
  fetchAll({ dispatch }) {
    return dispatch("fetchAllPedidosOferecidos");
  },

  fetchAllPedidosOferecidos({ commit }) {
    return new Promise((resolve, reject) => {
      pedidoOferecidoService
        .fetchAll()
        .then((response) => {
          commit(PEDIDO_OFERECIDO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async createPedidoOferecido({ commit }, { data, notify }) {
    const pedidoNormalized = normalizePedido(data);

    const response = await pedidoOferecidoService.create(pedidoNormalized);

    if (notify) {
      commit("PUSH_NOTIFICATION", {
        type: "success",
        text: "O pedido foi criado",
      });
    }
    return response.Pedido;
  },

  async updatePedidoOferecido({ commit }, { data, notify }) {
    const pedidoNormalized = normalizePedido(data);

    const pedidoUpdated = await pedidoOferecidoService.update(
      pedidoNormalized.Curso,
      pedidoNormalized.Turma,
      pedidoNormalized
    );

    if (notify) {
      commit("PUSH_NOTIFICATION", {
        type: "success",
        text: "O pedido foi atualizado",
      });
    }
    return pedidoUpdated;
  },
};

const getters = {
  PedidosOferecidos(state) {
    return state.Pedidos;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
