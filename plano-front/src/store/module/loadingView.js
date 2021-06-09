import Vue from "vue";
import {
  SET_LOADING,
  SET_PROGRESS_BAR,
  INCREMENT_PROGRESS_BAR_CURRENT_VALUE,
} from "../mutation-types";

const state = {
  onLoading: {
    partial: false,
    table: false,
    fetching: false,
    progress: false,
    route: false,
  },
  loadingProgress: {
    currentPercentage: 0,
    currentValue: 0,
    finalValue: null,
  },
};

const mutations = {
  [SET_LOADING](state, data) {
    Vue.set(state.onLoading, data.type, data.value);
  },
  [SET_PROGRESS_BAR](state, data) {
    Vue.set(state.loadingProgress, data.key, data.value);
  },
  [INCREMENT_PROGRESS_BAR_CURRENT_VALUE](state) {
    state.loadingProgress.currentValue++;
  },
};

const actions = {
  setLoading({ commit }, { type, value, wait = 300 }) {
    if (type === "fetching") {
      commit(SET_LOADING, { type, value });
    } else {
      if (value === true) commit(SET_LOADING, { type, value });
      else setTimeout(() => commit(SET_LOADING, { type, value }), wait); // Tempo mínimo de espera
    }
  },

  initializeProgressBar({ commit }, { finalValue }) {
    commit(SET_LOADING, { type: "progress", value: true });
    commit(SET_PROGRESS_BAR, { key: "currentValue", value: 0 });
    commit(SET_PROGRESS_BAR, { key: "finalValue", value: finalValue });
    commit(SET_PROGRESS_BAR, { key: "currentPercentage", value: 0 });
  },

  updateProgressBar({ state, commit }) {
    commit(INCREMENT_PROGRESS_BAR_CURRENT_VALUE);

    const { currentValue, finalValue } = state.loadingProgress;
    const currentPercentage = Math.floor(currentValue * (100 / finalValue));
    commit(SET_PROGRESS_BAR, { key: "currentPercentage", value: currentPercentage });
  },

  async finishProgressBar({ commit }) {
    await timeout(500);
    commit(SET_LOADING, { type: "progress", value: false });
  },
};

const timeout = (wait) => {
  return new Promise((resolve) => setTimeout(resolve, wait));
};

const getters = {
  onLoading(state) {
    return state.onLoading;
  },
  loadingProgress(state) {
    return state.loadingProgress;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
