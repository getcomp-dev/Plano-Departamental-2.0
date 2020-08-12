import Vue from "vue";
import $socket from "@/socketInstance.js";

import _ from "lodash";
import planoService from "../../common/services/plano";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";

import {
  PLANO_FETCHED,
  SOCKET_PLANO_DELETED,
  SOCKET_PLANO_CREATED,
  SOCKET_PLANO_UPDATED,
} from "../mutation-types";

const state = {
  Plano: [],
  currentPlanoId: null,
};

const mutations = {
  ["SET_CURRENT_PLANO_ID"](state, data) {
    state.currentPlanoId = data;
  },

  [PLANO_FETCHED](state, data) {
    state.Plano = data.Plano;
  },

  [SOCKET_PLANO_CREATED](state, data) {
    state.Plano.push(data.Plano);
  },

  [SOCKET_PLANO_UPDATED](state, data) {
    let index = _.findIndex(state.Plano, (plano) => plano.id === data.Plano.id);
    Vue.set(state.Plano, index, data.Plano);
  },

  [SOCKET_PLANO_DELETED](state, data) {
    let index = _.findIndex(state.Plano, (plano) => plano.id === data.Plano.id);
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

  async initializePlano({ commit, dispatch }) {
    try {
      commit("SET_FETCHING_LOADING", true);

      const PlanoInitial = localStorage.getItem("Plano")
        ? localStorage.getItem("Plano")
        : "1";
      dispatch("setCurrentPlanoId", PlanoInitial);

      await dispatch("fetchAll");
      $socket.open();
      commit("setYear", 2019);
    } catch (error) {
      console.log(error);
    } finally {
      commit("SET_FETCHING_LOADING", false);
    }
  },

  async changeCurrentPlano({ commit, dispatch }, planoId) {
    try {
      commit("SET_FETCHING_LOADING", true);

      dispatch("setCurrentPlanoId", planoId);
      await dispatch("fetchAll");
      $socket.open();
    } catch (error) {
      console.log(error);
    } finally {
      commit("SET_FETCHING_LOADING", false);
    }
  },

  async deletePlano({ commit, dispatch, rootGetters }, plano) {
    await planoService.delete(plano.id, plano);

    if (plano.id === rootGetters.currentPlanoId)
      await dispatch("changeCurrentPlano", 1);

    commit("PUSH_NOTIFICATION", {
      text: `Plano ${plano.nome} - ${plano.ano} foi removido`,
    });
  },

  async editPlano({ commit }, plano) {
    const planoNormalized = _.cloneDeepWith(plano, setEmptyValuesToNull);

    validateObjectKeys(planoNormalized, ["nome", "ano"]);
    await planoService.update(planoNormalized.id, planoNormalized);

    commit("PUSH_NOTIFICATION", { text: "Plano atualizado" });
  },

  setCurrentPlanoId({ commit }, planoId) {
    localStorage.setItem("Plano", parseInt(planoId, 10));
    commit("SET_CURRENT_PLANO_ID", parseInt(planoId, 10));
  },
};

const getters = {
  currentPlanoId(state) {
    return state.currentPlanoId;
  },

  allPlanos(state) {
    const planosResultantes = _.orderBy(state.Plano, ["ano"]);

    if (process.env.NODE_ENV === "development") return planosResultantes;
    else return _.filter(planosResultantes, (plano) => plano.id != 2090); //2090 = id do plano de dev
  },

  AnosDoPlano() {
    let firstYear = 2019;
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear + 5;
    const yearsArry = [];

    while (firstYear <= lastYear) {
      yearsArry.push(parseInt(firstYear, 10));
      firstYear++;
    }
    if (process.env.NODE_ENV === "development") yearsArry.push(2099);

    return yearsArry;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
