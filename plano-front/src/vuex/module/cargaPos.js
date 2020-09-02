import Vue from "vue";
import _ from "lodash";
import cargaPosService from "../../common/services/cargaPos";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";

import {
  PUSH_NOTIFICATION,
  CARGA_POS_FETCHED,
  SOCKET_CARGA_POS_CREATED,
  SOCKET_CARGA_POS_DELETED,
  SOCKET_CARGA_POS_UPDATED,
  EMPTY_DELETE_CARGA_POS,
  TOGGLE_CARGA_POS_TO_DELETE,
} from "../mutation-types";

const state = {
  Cargas: [],
  Deletar: [],
};

const mutations = {
  [CARGA_POS_FETCHED](state, data) {
    state.Cargas = data.CargasPos;
  },

  [SOCKET_CARGA_POS_CREATED](state, data) {
    state.Cargas.push(data.CargaPos);
  },

  [SOCKET_CARGA_POS_UPDATED](state, data) {
    let index = _.findIndex(
      state.Cargas,
      (carga) => carga.id === data.CargaPos.id
    );
    Vue.set(state.Cargas, index, data.CargaPos);
  },

  [SOCKET_CARGA_POS_DELETED](state, data) {
    let index = _.findIndex(
      state.Cargas,
      (carga) => carga.id === data.CargaPos.id
    );
    state.Cargas.splice(index, 1);
  },

  [TOGGLE_CARGA_POS_TO_DELETE](state, data) {
    if (data.index === -1) state.Deletar.push(data.carga);
    else state.Deletar.splice(data.index, 1);
  },

  [EMPTY_DELETE_CARGA_POS](state) {
    state.Deletar = [];
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      cargaPosService
        .fetchAll(localStorage.getItem("Plano"))
        .then((response) => {
          commit(CARGA_POS_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async addNovaCargaPos({ commit, rootGetters }, carga) {
    const cargaNormalized = _.cloneDeepWith(carga, setEmptyValuesToNull);
    validateObjectKeys(cargaNormalized, [
      "Programa",
      "programa",
      "trimestre",
      "creditos",
    ]);
    cargaNormalized.Plano = rootGetters.currentPlanoId;

    await cargaPosService.create(cargaNormalized);

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A carga ${cargaNormalized.programa} foi criada`,
    });
  },

  async editCargaPos({ commit, dispatch }, carga) {
    const cargaNormalized = _.cloneDeepWith(carga, setEmptyValuesToNull);
    validateObjectKeys(cargaNormalized, ["creditos", "programa"]);

    await cargaPosService.update(cargaNormalized.id, cargaNormalized);

    dispatch("clearCargasPosToDelete");
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A carga ${cargaNormalized.programa} foi atualizada`,
    });
  },

  async deleteCargasPos({ commit, state }) {
    if (!state.Deletar.length) return;

    for (let i = 0; i < state.Deletar.length; i++) {
      await cargaPosService.delete(state.Deletar[i].id);
    }

    commit(EMPTY_DELETE_CARGA_POS);
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: "As carga(s) selecionadas foram excluída(s)",
    });
  },

  toggleCargaToDelete({ commit, state }, carga) {
    const index = _.findIndex(state.Deletar, ["id", carga.id]);

    commit(TOGGLE_CARGA_POS_TO_DELETE, { index, carga });
  },

  clearCargasPosToDelete({ commit, state }) {
    if (state.Deletar.length) commit(EMPTY_DELETE_CARGA_POS);
  },
};

const getters = {
  AllCargasPos(state) {
    return state.Cargas;
  },
  CargasPosToDelete(state) {
    return state.Deletar;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
