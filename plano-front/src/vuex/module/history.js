import historyService from "../../common/services/history";
import { HISTORY_FETCHED, SOCKET_HISTORY_CREATED } from "../mutation-types";

const state = {
  History: [],
  wasFetched: false,
};

const mutations = {
  [HISTORY_FETCHED](state, data) {
    state.History = data.History;
    state.wasFetched = true;
  },

  [SOCKET_HISTORY_CREATED](state, data) {
    state.History.push(data.History);
  },
};

const actions = {
  fetchAllHistory({ commit, state, dispatch }) {
    if (!state.wasFetched) {
      dispatch("setLoading", { type: "fetching", value: true });

      return new Promise((resolve, reject) => {
        historyService
          .fetchAll()
          .then((response) => {
            commit(HISTORY_FETCHED, response);
            dispatch("setLoading", { type: "fetching", value: false });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
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
