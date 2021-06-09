import Vue from "vue";
import turmaService from "../../services/turma";
import { find, cloneDeepWith, orderBy } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
  PUSH_NOTIFICATION,
  TURMA_FETCHED,
  SOCKET_TURMA_CREATED,
  SOCKET_TURMA_DELETED,
  SOCKET_TURMA_UPDATED,
  EMPTY_DELETE_TURMA,
  TOGGLE_TURMA_TO_DELETE,
} from "../mutation-types";

const state = {
  Turmas: [],
  Ativas1: [],
  Ativas2: [],
  Deletar: [],
};

const mutations = {
  [TURMA_FETCHED](state, data) {
    state.Turmas = data.Turmas;
  },

  [SOCKET_TURMA_CREATED](state, data) {
    if (this.state.plano.CurrentPlanoId === data.Turma.Plano) {
      state.Turmas.push(data.Turma);
    }
  },

  [SOCKET_TURMA_UPDATED](state, data) {
    if (this.state.plano.CurrentPlanoId === data.Turma.Plano) {
      let index = state.Turmas.findIndex((turma) => turma.id === data.Turma.id);
      Vue.set(state.Turmas, index, data.Turma);
    }
  },

  [SOCKET_TURMA_DELETED](state, data) {
    if (this.state.plano.CurrentPlanoId === data.Turma.Plano) {
      let index = state.Turmas.findIndex((turma) => turma.id === data.Turma.id);
      state.Turmas.splice(index, 1);
    }
  },

  redefinirAtivas1(state, data) {
    state.Ativas1 = data.Ativas;
  },

  redefinirAtivas2(state, data) {
    state.Ativas2 = data.Ativas;
  },

  [TOGGLE_TURMA_TO_DELETE](state, data) {
    if (data.index === -1) state.Deletar.push(data.turmaToDelete);
    else state.Deletar.splice(data.index, 1);
  },

  [EMPTY_DELETE_TURMA](state) {
    state.Deletar = [];
  },
};

const actions = {
  fetchAll({ dispatch }) {
    return dispatch("fetchAllTurmas");
  },

  fetchAllTurmas({ commit }) {
    return new Promise((resolve, reject) => {
      turmaService
        .fetchAll(localStorage.getItem("Plano"))
        .then((response) => {
          commit(TURMA_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async createTurma({ commit }, { data, notify }) {
    const turmaNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["Disciplina", "letra", "turno1"]);

    const response = await turmaService.create(turmaNormalized);
    if (notify) {
      commit(PUSH_NOTIFICATION, {
        type: "success",
        text: `Turma ${turmaNormalized.letra} foi criada`,
      });
    }
    return response.Turma;
  },

  async editTurma({ commit, dispatch }, { data, notify }) {
    const turmaNormalized = cloneDeepWith(data, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["letra", "Disciplina", "turno1"]);

    await turmaService.update(turmaNormalized.id, turmaNormalized);
    dispatch("clearTurmasToDelete");

    if (notify) {
      commit(PUSH_NOTIFICATION, {
        type: "success",
        text: `Turma ${turmaNormalized.letra} foi atualizada`,
      });
    }
  },

  async deleteTurmas({ commit, state }) {
    if (!state.Deletar.length) return;

    for (let i = 0; i < state.Deletar.length; i++) {
      await turmaService.delete(state.Deletar[i].id, state.Deletar[i]);
    }

    commit(EMPTY_DELETE_TURMA);
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: "A(s) turma(s) selecionadas foram excluída(s)",
    });
  },

  toggleTurmaToDelete({ commit, state }, turmaToDelete) {
    const index = state.Deletar.findIndex((turma) => turma.id === turmaToDelete.id);
    commit(TOGGLE_TURMA_TO_DELETE, { index, turmaToDelete });
  },

  clearTurmasToDelete({ commit, state }) {
    if (state.Deletar.length) commit(EMPTY_DELETE_TURMA);
  },
};

const getters = {
  AllTurmas(state, getters) {
    const turmas = [];
    state.Turmas.forEach((turma) => {
      const disciplinaFounded = find(getters.AllDisciplinas, ["id", turma.Disciplina]);

      if (disciplinaFounded)
        turmas.push({
          ...turma,
          disciplina: {
            ...disciplinaFounded,
          },
        });
    });

    return orderBy(turmas, "letra");
  },

  TurmasToDelete(state) {
    return state.Deletar;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
