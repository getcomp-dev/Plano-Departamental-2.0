import Vue from "vue";
import $socket from "@/socketInstance.js";
import planoService from "../../common/services/plano";
import { cloneDeepWith, find, orderBy } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
  PLANO_FETCHED,
  SOCKET_PLANO_DELETED,
  SOCKET_PLANO_CREATED,
  SOCKET_PLANO_UPDATED,
  SET_CURRENT_PLANO_ID,
} from "../mutation-types";

const state = {
  Plano: [],
  currentPlanoId: null,
};

const mutations = {
  [SET_CURRENT_PLANO_ID](state, data) {
    state.currentPlanoId = data;
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
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      planoService
        .fetchAll()
        .then((response) => {
          console.log(response);
          commit(PLANO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async initializeCurrentPlano({ commit, dispatch }) {
    try {
      dispatch("setLoading", { type: "fetching", value: true });

      const currentPlanoId = localStorage.getItem("Plano")
        ? localStorage.getItem("Plano")
        : 1;
      dispatch("setCurrentPlanoId", currentPlanoId);

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
      await dispatch("fetchAll");
      $socket.open();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch("setLoading", { type: "fetching", value: false });
    }
  },

  async deletePlano({ commit, dispatch, rootGetters }, plano) {
    if (plano.id === rootGetters.currentPlanoId) {
      await dispatch("changeCurrentPlano", 1);
    }

    await planoService.delete(plano.id, plano);

    commit("PUSH_NOTIFICATION", {
      text: `Plano ${plano.nome} - ${plano.ano} foi removido`,
    });
  },

  async editPlano({ commit }, plano) {
    const planoNormalized = cloneDeepWith(plano, setEmptyValuesToNull);

    validateObjectKeys(planoNormalized, ["nome", "ano"]);
    await planoService.update(planoNormalized.id, planoNormalized);

    commit("PUSH_NOTIFICATION", { text: "Plano atualizado" });
  },

  setCurrentPlanoId({ commit }, planoId) {
    localStorage.setItem("Plano", parseInt(planoId, 10));
    commit(SET_CURRENT_PLANO_ID, parseInt(planoId, 10));
  },
};

const getters = {
  currentPlano(state, rootGetters) {
    return find(rootGetters.AllPlanos, ["id", state.currentPlanoId]);
  },
  AllPlanos(state) {
    return orderBy(state.Plano, "ano");
  },
  AnosDoPlano() {
    let firstYear = 2000;
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear + 5;
    const yearsArry = [];

    while (firstYear <= lastYear) {
      yearsArry.push(parseInt(firstYear, 10));
      firstYear++;
    }
    yearsArry.push(2099); // plano de dev

    return yearsArry;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
