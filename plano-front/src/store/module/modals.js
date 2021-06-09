import { SET_MODAL_OVERLAY_VISIBILITY } from "../mutation-types";

const state = {
  modalOverlayVisibility: false,
};

const mutations = {
  [SET_MODAL_OVERLAY_VISIBILITY](state, newValue) {
    state.modalOverlayVisibility = newValue;
  },
};

const actions = {
  setModalOverlayVisibility({ commit }, payload) {
    commit(SET_MODAL_OVERLAY_VISIBILITY, payload);
  },
};

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
