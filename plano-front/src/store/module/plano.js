import Vue from "vue";
import $socket from "@/socketInstance.js";
import planoService from "@/services/plano";
import { cloneDeepWith, find, orderBy } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
  PLANO_FETCHED,
  SOCKET_PLANO_DELETED,
  SOCKET_PLANO_CREATED,
  SOCKET_PLANO_UPDATED,
  SET_CURRENT_PLANO_ID,
  PUSH_NOTIFICATION,
} from "../mutation-types";

const state = {
  Plano: [],
  CurrentPlanoId: null,
};

const mutations = {
  [SET_CURRENT_PLANO_ID](state, data) {
    state.CurrentPlanoId = data;
  },

  [PLANO_FETCHED](state, data) {
    state.Plano = data.Plano;
  },

  [SOCKET_PLANO_CREATED](state, data) {
    state.Plano.push(data.Plano);
  },

  [SOCKET_PLANO_UPDATED](state, data) {
    let index = state.Plano.findIndex((plano) => plano.id === data.Plano.id);
    Vue.set(state.Plano, index, data.Plano);
  },

  [SOCKET_PLANO_DELETED](state, data) {
    let index = state.Plano.findIndex((plano) => plano.id === data.Plano.id);
    state.Plano.splice(index, 1);
  },
};

const actions = {
  fetchAllPlanos({ commit }) {
    return new Promise((resolve, reject) => {
      planoService
        .fetchAll()
        .then((response) => {
          console.log(response);
          commit(PLANO_FETCHED, response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async initializeCurrentPlano({ commit, dispatch, state }) {
    try {
      dispatch("setLoading", { type: "fetching", value: true });
      await dispatch("fetchAllPlanos");
      let storagePlanoId = parseInt(localStorage.getItem("Plano"), 10);
      const planoExisteEVisible = find(
        state.Plano,
        (plano) => plano.id === storagePlanoId && plano.visible === true
      );

      if (!storagePlanoId || !planoExisteEVisible) {
        const firstVisiblePlano = find(state.Plano, ["visible", true]);
        storagePlanoId = firstVisiblePlano.id;
      }

      dispatch("setCurrentPlanoId", storagePlanoId);
      await dispatch("fetchAll");
      $socket.open();
      commit("setYear", 2019);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch("setLoading", { type: "fetching", value: false });
    }
  },

  async changeCurrentPlano({ dispatch }, planoId) {
    try {
      dispatch("setLoading", { type: "fetching", value: true });
      dispatch("setCurrentPlanoId", planoId);
      await dispatch("fetchAllTurmas");
      await dispatch("fetchAllPedidos");
      $socket.open();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch("setLoading", { type: "fetching", value: false });
    }
  },

  async createPlano({ commit }, { data, notify }) {
    const planoNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(planoNormalized, ["nome", "ano"]);
    const response = await planoService.create(planoNormalized);

    if (notify) {
      commit(PUSH_NOTIFICATION, {
        text: `Plano ${planoNormalized.nome} foi criado`,
      });
    }

    return response.Plano;
  },

  async deletePlano({ commit }, { data, notify }) {
    await planoService.delete(data.id, data);

    if (notify) {
      commit(PUSH_NOTIFICATION, {
        text: `Plano ${data.nome} - ${data.ano} foi removido`,
      });
    }
  },

  async updatePlano({ commit }, { data, notify }) {
    const planoNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(planoNormalized, ["nome", "ano"]);
    const response = await planoService.update(planoNormalized.id, planoNormalized);

    if (notify) {
      commit(PUSH_NOTIFICATION, { text: `Plano ${planoNormalized.nome} atualizado` });
    }
    return response.Plano;
  },

  setCurrentPlanoId({ commit }, planoId) {
    localStorage.setItem("Plano", parseInt(planoId, 10));
    commit(SET_CURRENT_PLANO_ID, parseInt(planoId, 10));
  },
};

const getters = {
  currentPlano(state, rootGetters) {
    return find(rootGetters.Planos, ["id", state.CurrentPlanoId]);
  },
  Planos(state) {
    return orderBy(state.Plano, "ano");
  },
  AnosDoPlano() {
    let firstYear = 2000;
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear + 5;
    const yearsArray = [];

    while (firstYear <= lastYear) {
      yearsArray.push(parseInt(firstYear, 10));
      firstYear++;
    }
    yearsArray.push(2099); // plano de dev

    return yearsArray;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
