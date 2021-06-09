import { TOGGLE_SIDEBAR, SET_SIDEBAR_VISIBILITY } from "../mutation-types";

const state = {
  sidebarVisibility: false,
};

const mutations = {
  [SET_SIDEBAR_VISIBILITY](state, data) {
    state.sidebarVisibility = data;
  },

  [TOGGLE_SIDEBAR](state) {
    state.sidebarVisibility = !state.sidebarVisibility;
  },
};

const actions = {
  openSidebar({ commit }) {
    if (!state.sidebarVisibility) commit("SET_SIDEBAR_VISIBILITY", true);
  },

  closeSidebar({ state, commit }) {
    if (state.sidebarVisibility) commit("SET_SIDEBAR_VISIBILITY", false);
  },

  toggleSidebar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
};

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
