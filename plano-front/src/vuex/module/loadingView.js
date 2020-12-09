import {
  SET_FETCHING_LOADING,
  SET_PARTIAL_LOADING,
  SET_TABLE_LOADING,
} from "../mutation-types";

const state = {
  onPartialLoading: false,
  onFetchingLoading: false,
  onTableLoading: false,
};

const mutations = {
  [SET_FETCHING_LOADING](state, data) {
    state.onFetchingLoading = data;
  },

  [SET_PARTIAL_LOADING](state, data) {
    state.onPartialLoading = data;
  },

  [SET_TABLE_LOADING](state, data) {
    state.onTableLoading = data;
  },
};

const actions = {
  setFetchingLoading({ commit }, payload) {
    commit(SET_FETCHING_LOADING, payload);
  },

  setPartialLoading({ commit }, payload) {
    //Tempo mínimo de espera
    if (!payload) setTimeout(() => commit(SET_PARTIAL_LOADING, payload), 300);
    else commit("SET_PARTIAL_LOADING", payload);
  },

  setTableLoading({ commit }, payload) {
    if (!payload) setTimeout(() => commit(SET_TABLE_LOADING, payload), 300);
    else commit(SET_TABLE_LOADING, payload);
  },
};

const getters = {
  onLoading(state) {
    return {
      fetching: state.onFetchingLoading,
      partial: state.onPartialLoading,
      table: state.onTableLoading,
    };
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
