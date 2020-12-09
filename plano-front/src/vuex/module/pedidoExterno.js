import Vue from "vue";
import { cloneDeepWith } from "lodash-es";
import pedidoExternoService from "../../common/services/pedidoExterno";
import { setEmptyValuesToNull } from "@/common/utils";
import {
  PEDIDO_EXTERNO_FETCHED,
  SOCKET_PEDIDO_EXTERNO_CREATED,
  SOCKET_PEDIDO_EXTERNO_DELETED,
  SOCKET_PEDIDO_EXTERNO_UPDATED,
} from "../mutation-types";

const state = {
  Pedidos: {},
};

const mutations = {
  [PEDIDO_EXTERNO_FETCHED](state, data) {
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

  [SOCKET_PEDIDO_EXTERNO_CREATED](state, data) {
    if (state.Pedidos[data.Pedido.Turma] === undefined)
      state.Pedidos[data.Pedido.Turma] = [];
    state.Pedidos[data.Pedido.Turma].push(data.Pedido);
    state.Pedidos = Object.assign({}, state.Pedidos);
  },

  [SOCKET_PEDIDO_EXTERNO_UPDATED](state, data) {
    const index = state.Pedidos[data.Pedido.Turma].findIndex(
      (pedido) => pedido.Curso === data.Pedido.Curso
    );
    Vue.set(state.Pedidos[data.Pedido.Turma], index, data.Pedido);
  },

  [SOCKET_PEDIDO_EXTERNO_DELETED](state, data) {
    const index = state.Pedidos[data.Pedido.Turma].findIndex(
      (pedido) => pedido.Curso === data.Pedido.Curso
    );
    state.Pedidos[data.Pedido.Turma].splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      pedidoExternoService
        .fetchAll()
        .then((response) => {
          commit(PEDIDO_EXTERNO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchAllPedidosExternos({ commit }) {
    return new Promise((resolve, reject) => {
      pedidoExternoService
        .fetchAll()
        .then((response) => {
          commit(PEDIDO_EXTERNO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async editPedidoExterno({ commit }, pedido) {
    const pedidoNormalized = cloneDeepWith(pedido, setEmptyValuesToNull);

    if (pedidoNormalized.vagasPeriodizadas === null)
      pedidoNormalized.vagasPeriodizadas = 0;
    if (pedidoNormalized.vagasNaoPeriodizadas === null)
      pedidoNormalized.vagasNaoPeriodizadas = 0;

    await pedidoExternoService.update(
      pedidoNormalized.Curso,
      pedidoNormalized.Turma,
      pedidoNormalized
    );

    commit("PUSH_NOTIFICATION", {
      type: "success",
      text: "O pedido foi atualizado",
    });
  },
};

const getters = {
  PedidosExternos(state) {
    return state.Pedidos;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
