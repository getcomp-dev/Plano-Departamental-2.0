const state = {
  queue: [],
  max: 5,
};

const mutations = {
  ["PUSH_NOTIFICATION"](state, { type = "success", title, text }) {
    if (!title) title = type === "success" ? "Sucesso!" : "Erro!";

    state.queue.push({ type, title, text });

    if (state.queue.length > state.max) state.queue.shift();
  },
};
const actions = {
  pushNotification({ commit }, payload) {
    commit("PUSH_NOTIFICATION", payload);
  },
};

export default {
  state,
  mutations,
  actions,
};
