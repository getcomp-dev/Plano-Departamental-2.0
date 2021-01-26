import Vue from "vue";
import turmaExternaService from "../../services/turmaExterna";
import { cloneDeepWith, find, orderBy } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
  PUSH_NOTIFICATION,
  TURMA_EXTERNA_FETCHED,
  SOCKET_TURMA_EXTERNA_CREATED,
  SOCKET_TURMA_EXTERNA_DELETED,
  SOCKET_TURMA_EXTERNA_UPDATED,
  TOGGLE_TURMA_EXTERNA_TO_DELETE,
  EMPTY_DELETE_TURMA_EXTERNA,
} from "../mutation-types";

const state = {
  Turmas: [],
  Ativas: [],
  Deletar: [],
};

const mutations = {
  [TURMA_EXTERNA_FETCHED](state, data) {
    state.Turmas = data.Turmas;
  },

  [SOCKET_TURMA_EXTERNA_CREATED](state, data) {
    state.Turmas.push(data.Turma);
  },

  [SOCKET_TURMA_EXTERNA_UPDATED](state, data) {
    let index = state.Turmas.findIndex((turma) => turma.id === data.Turma.id);
    Vue.set(state.Turmas, index, data.Turma);
  },

  [SOCKET_TURMA_EXTERNA_DELETED](state, data) {
    let index = state.Turmas.findIndex((turma) => turma.id === data.Turma.id);
    state.Turmas.splice(index, 1);
  },

  redefinirExternoAtivas(state, data) {
    state.Ativas = data.Ativas;
  },

  [TOGGLE_TURMA_EXTERNA_TO_DELETE](state, data) {
    if (data.index === -1) state.Deletar.push(data.turmaToDelete);
    else state.Deletar.splice(data.index, 1);
  },

  [EMPTY_DELETE_TURMA_EXTERNA](state) {
    state.Deletar = [];
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      turmaExternaService
        .fetchAll(localStorage.getItem("Plano"))
        .then((response) => {
          commit(TURMA_EXTERNA_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async createTurmaExterna({ commit, dispatch, rootGetters }, turma) {
    const turmaNormalized = cloneDeepWith(turma, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["Disciplina", "letra"]);
    turmaNormalized.Plano = rootGetters.currentPlano.id;

    await turmaExternaService.create(turmaNormalized);
    await dispatch("fetchAllPedidosExternos");

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A turma ${turmaNormalized.letra} foi criada`,
    });
  },

  async editTurmaExterna({ commit, dispatch }, turma) {
    const turmaNormalized = cloneDeepWith(turma, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["letra", "Disciplina"]);

    await turmaExternaService.update(turmaNormalized.id, turmaNormalized);

    dispatch("clearTurmasExternasToDelete");
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A turma ${turmaNormalized.letra} foi atualizada`,
    });
  },

  async deleteTurmasExternas({ state, commit }) {
    if (!state.Deletar.length) return;

    for (let i = 0; i < state.Deletar.length; i++) {
      await turmaExternaService.delete(state.Deletar[i].id, state.Deletar[i]);
    }

    commit(EMPTY_DELETE_TURMA_EXTERNA);
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: "As turma(s) selecionadas foram excluída(s)",
    });
  },

  toggleTurmaExternaToDelete({ commit, state }, turmaToDelete) {
    const index = state.Deletar.findIndex((turma) => turma.id === turmaToDelete.id);
    commit(TOGGLE_TURMA_EXTERNA_TO_DELETE, { index, turmaToDelete });
  },

  clearTurmasExternasToDelete({ commit, state }) {
    if (state.Deletar.length) commit(EMPTY_DELETE_TURMA_EXTERNA);
  },
};

const getters = {
  AllTurmasExternas(state, getters) {
    const turmas = [];
    state.Turmas.forEach((turma) => {
      const disciplinaFound = find(getters.DisciplinasExternas, ["id", turma.Disciplina]);

      if (disciplinaFound)
        turmas.push({
          ...turma,
          disciplina: {
            ...disciplinaFound,
          },
        });
    });

    return orderBy(turmas, "letra");
  },

  TurmasExternasToDelete(state) {
    return state.Deletar;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
