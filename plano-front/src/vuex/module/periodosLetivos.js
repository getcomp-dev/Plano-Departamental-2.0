const state = {
  PeriodosLetivos: [
    {
      id: 1,
      semestreId: 1,
      nome: "Primeiro",
    },
    {
      id: 2,
      semestreId: 1,
      nome: "Segundo (inverno)",
    },
    {
      id: 3,
      semestreId: 2,
      nome: "Terceiro",
    },
    {
      id: 4,
      semestreId: 2,
      nome: "Quarto (verão)",
    },
  ],
};

const getters = {
  PeriodosLetivos(state) {
    return state.PeriodosLetivos;
  },
};

export default {
  state,
  getters,
};
