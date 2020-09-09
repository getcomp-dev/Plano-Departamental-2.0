import historyService from "../../common/services/history";
import { HISTORY_FETCHED, SOCKET_HISTORY_CREATED } from "../mutation-types";

const state = {
  History: [],
};

const mutations = {
  [HISTORY_FETCHED](state, data) {
    state.History = data.History;
  },

  [SOCKET_HISTORY_CREATED](state, data) {
    state.History.push(data.History);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      historyService
        .fetchAll()
        .then((response) => {
          commit(HISTORY_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  History(state) {
    return state.History;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
