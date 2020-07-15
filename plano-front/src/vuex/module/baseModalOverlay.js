import { SHOW_MODAL_OVERLAY, HIDE_MODAL_OVERLAY } from "../mutation-types";

const state = {
  modalOverlayVisibility: false,
};

const mutations = {
  [SHOW_MODAL_OVERLAY](state) {
    state.modalOverlayVisibility = true;
  },

  [HIDE_MODAL_OVERLAY](state) {
    state.modalOverlayVisibility = false;
  },
};

const actions = {};

const getters = {
  modalOverlayVisibility(state) {
    return state.modalOverlayVisibility;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
