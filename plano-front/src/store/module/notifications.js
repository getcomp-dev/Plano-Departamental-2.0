import { PUSH_NOTIFICATION } from "../mutation-types";

const state = {
  queue: [],
  max: 5,
};

const mutations = {
  [PUSH_NOTIFICATION](state, notificationProps) {
    let { type = "success", group = "general", title, text, duration } = notificationProps;
    if (!title) {
      if (type === "success") title = "Sucesso!";
      else if (type === "error") title = "Erro!";
      else if (type === "warn") title = "Aviso!";
    }

    state.queue.push({ type, title, text, group, duration });
    if (state.queue.length > state.max) state.queue.shift();
  },
};
const actions = {
  pushNotification({ commit }, payload) {
    commit(PUSH_NOTIFICATION, payload);
  },
};

const getters = {
  notificationsQueue(state) {
    return state.queue;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
