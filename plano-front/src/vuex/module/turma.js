import Vue from "vue";
import _ from "lodash";
import turmaService from "../../common/services/turma";
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
    state.Turmas.push(data.Turma);
  },

  [SOCKET_TURMA_UPDATED](state, data) {
    let index = _.findIndex(state.Turmas, (turma) => turma.id === data.Turma.id);
    Vue.set(state.Turmas, index, data.Turma);
  },

  [SOCKET_TURMA_DELETED](state, data) {
    let index = _.findIndex(state.Turmas, (turma) => turma.id === data.Turma.id);
    state.Turmas.splice(index, 1);
  },

  redefinirAtivas1(state, data) {
    state.Ativas1 = data.Ativas;
  },

  redefinirAtivas2(state, data) {
    state.Ativas2 = data.Ativas;
  },

  [TOGGLE_TURMA_TO_DELETE](state, data) {
    if (data.index === -1) state.Deletar.push(data.turma);
    else state.Deletar.splice(data.index, 1);
  },

  [EMPTY_DELETE_TURMA](state) {
    state.Deletar = [];
  },
};

const actions = {
  fetchAll({ commit }) {
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

  async createTurma({ commit, dispatch }, turma) {
    const turmaNormalized = _.cloneDeepWith(turma, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["Disciplina", "letra", "turno1"]);

    const response = await turmaService.create(turmaNormalized);
    await dispatch("fetchAllPedidos");

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A turma ${turmaNormalized.letra} foi criada`,
    });
    return response.Turma;
  },

  async editTurma({ commit, dispatch }, turma) {
    const turmaNormalized = _.cloneDeepWith(turma, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["letra", "Disciplina", "turno1"]);

    await turmaService.update(turmaNormalized.id, turmaNormalized);

    dispatch("clearTurmasToDelete");
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A turma ${turmaNormalized.letra} foi atualizada`,
    });
  },

  async deleteTurmas({ commit, state }) {
    if (!state.Deletar.length) return;

    for (let i = 0; i < state.Deletar.length; i++) {
      await turmaService.delete(state.Deletar[i].id, state.Deletar[i]);
    }

    commit(EMPTY_DELETE_TURMA);
    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: "As turma(s) selecionadas foram excluída(s)",
    });
  },

  toggleTurmaToDelete({ commit, state }, turma) {
    const index = _.findIndex(state.Deletar, ["id", turma.id]);

    commit(TOGGLE_TURMA_TO_DELETE, { index, turma });
  },

  clearTurmasToDelete({ commit, state }) {
    if (state.Deletar.length) commit(EMPTY_DELETE_TURMA);
  },
};

const getters = {
  AllTurmas(state) {
    return _.orderBy(state.Turmas, ["letra"]);
  },
  TurmasInDisciplinasPerfis(state, getters) {
    const turmasResult = [];
    _.forEach(getters.AllTurmas, (turma) => {
      const disciplinaFounded = _.find(getters.DisciplinasInPerfis, [
        "id",
        turma.Disciplina,
      ]);

      if (disciplinaFounded)
        turmasResult.push({
          ...turma,
          disciplina: {
            ...disciplinaFounded,
          },
        });
    });
    return turmasResult;
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
