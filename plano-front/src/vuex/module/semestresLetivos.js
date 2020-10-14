const state = {
  SemestresLetivos: [
    {
      id: 1,
      nome: "Primeiro",
    },
    {
      id: 2,
      nome: "Segundo",
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
