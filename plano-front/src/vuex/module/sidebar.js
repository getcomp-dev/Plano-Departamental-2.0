import { OPEN_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "../mutation-types";

const state = {
  sidebarVisibility: false,
};

const mutations = {
  [OPEN_SIDEBAR](state) {
    state.sidebarVisibility = true;
  },
  [CLOSE_SIDEBAR](state) {
    state.sidebarVisibility = false;
  },
  [TOGGLE_SIDEBAR](state) {
    state.sidebarVisibility = !state.sidebarVisibility;
  },
};

const actions = {};

const getters = {
  sidebarVisibility(state) {
    return state.sidebarVisibility;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
