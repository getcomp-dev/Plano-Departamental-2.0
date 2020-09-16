const state = {
  SemestresLetivos: [
    {
      nome: "Primeiro",
      id: 1,
    },
    {
      nome: "Segundo",
      id: 2,
    },
  ],
};

const getters = {
  SemestresLetivos(state) {
    return state.SemestresLetivos;
  },
};

export default {
  state,
  getters,
};
