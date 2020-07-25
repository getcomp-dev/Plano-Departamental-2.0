import { SET_LOADING_STATE } from "../mutation-types";

const state = {
  loadingState: "complete",
};
//'partial' loading sem destruir o componentes main, navbar e sidebar.
//'entire' loading destruindo componentes citados acima
//'completed' loading completo

const mutations = {
  [SET_LOADING_STATE](state, data) {
    state.loadingState = data;
  },
};

const actions = {
  setLoadingState({ commit }, payload) {
    commit("SET_LOADING_STATE", payload);
  },
};

const getters = {
  loadingState(state) {
    return state.loadingState;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
