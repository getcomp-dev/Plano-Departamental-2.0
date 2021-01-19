import Vue from "vue";
import pedidoService from "../../services/pedido";
import { normalizePedido } from "@/common/utils";
import {
  PEDIDO_FETCHED,
  SOCKET_PEDIDO_CREATED,
  SOCKET_PEDIDO_DELETED,
  SOCKET_PEDIDO_UPDATED,
} from "../mutation-types";

const state = {
  Pedidos: {},
};

const mutations = {
  [PEDIDO_FETCHED](state, data) {
    state.Pedidos = {};
    for (let p = 0; p < data.Pedidos.length; p++) {
      if (data.Pedidos[p].hasOwnProperty("Turma")) {
        let t = data.Pedidos[p].Turma;
        if (state.Pedidos[t] === undefined) {
          state.Pedidos[t] = [];
        }
        state.Pedidos[data.Pedidos[p].Turma].push(data.Pedidos[p]);
      }
    }
    state.Pedidos = Object.assign({}, state.Pedidos);
  },

  [SOCKET_PEDIDO_CREATED](state, data) {
    state.Pedidos[data.Pedido].push(data.Pedido);
  },

  [SOCKET_PEDIDO_UPDATED](state, data) {
    let index = state.Pedidos[data.Pedido.Turma].findIndex(
      (pedido) => pedido.Curso === data.Pedido.Curso
    );

    if (index !== -1) Vue.set(state.Pedidos[data.Pedido.Turma], index, data.Pedido);
  },

  [SOCKET_PEDIDO_DELETED](state, data) {
    let index = state.Pedidos[data.Pedido.Turma].findIndex(
      (pedido) => pedido.Curso === data.Pedido.Curso
    );
    state.Pedidos[data.Pedido.Turma].splice(index, 1);
  },
};

const actions = {
  fetchAll({ dispatch }) {
    return dispatch("fetchAllPedidos");
  },

  fetchAllPedidos({ commit }) {
    return new Promise((resolve, reject) => {
      pedidoService
        .fetchAll()
        .then((response) => {
          commit(PEDIDO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async editPedido({ commit }, pedido) {
    const pedidoNormalized = normalizePedido(pedido, ["vagasPeriodizadas", "vagasNaoPeriodizadas"]);
    const response = await pedidoService.update(
      pedidoNormalized.Curso,
      pedidoNormalized.Turma,
      pedidoNormalized
    );

    commit("PUSH_NOTIFICATION", { type: "success", text: "O pedido foi atualizado" });
    return response.Pedido;
  },
};

const getters = {
  Pedidos(state) {
    return state.Pedidos;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
