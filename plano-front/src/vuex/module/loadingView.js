import { SET_FETCHING_LOADING, SET_PARTIAL_LOADING } from "../mutation-types";

const state = {
  onPartialLoading: false,
  onFetchingLoading: false,
};

const mutations = {
  [SET_FETCHING_LOADING](state, data) {
    state.onFetchingLoading = data;
  },
  [SET_PARTIAL_LOADING](state, data) {
    state.onPartialLoading = data;
  },
};

const actions = {
  setFetchingLoading({ commit }, payload) {
    commit("SET_FETCHING_LOADING", payload);
  },
  setPartialLoading({ commit }, payload) {
    //Tempo mínimo de espera
    if (!payload) setTimeout(() => commit("SET_PARTIAL_LOADING", payload), 300);
    else commit("SET_PARTIAL_LOADING", payload);
  },
};

const getters = {
  loadingState(state) {
    return state.loadingState;
  },

  onLoading(state) {
    return {
      fetching: state.onFetchingLoading,
      partial: state.onPartialLoading,
    };
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
