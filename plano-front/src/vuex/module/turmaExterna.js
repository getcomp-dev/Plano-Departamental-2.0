import Vue from "vue";
import _ from "lodash";
import turmaExternaService from "../../common/services/turmaExterna";
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
    let index = _.findIndex(
      state.Turmas,
      (turma) => turma.id === data.Turma.id
    );
    Vue.set(state.Turmas, index, data.Turma);
  },

  [SOCKET_TURMA_EXTERNA_DELETED](state, data) {
    let index = _.findIndex(
      state.Turmas,
      (turma) => turma.id === data.Turma.id
    );
    state.Turmas.splice(index, 1);
  },

  redefinirExternoAtivas(state, data) {
    state.Ativas = data.Ativas;
  },

  [TOGGLE_TURMA_EXTERNA_TO_DELETE](state, data) {
    if (data.index === -1) state.Deletar.push(data.turma);
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

  async addNovaTurmaExterna({ commit, dispatch, rootGetters }, turma) {
    const turmaNormalized = _.cloneDeepWith(turma, setEmptyValuesToNull);
    validateObjectKeys(turmaNormalized, ["Disciplina", "letra"]);
    turmaNormalized.Plano = rootGetters.currentPlanoId;

    await turmaExternaService.create(turmaNormalized);
    await dispatch("fetchAllPedidosExternos");

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A turma ${turmaNormalized.letra} foi criada`,
    });
  },

  async editTurmaExterna({ commit, dispatch }, turma) {
    const turmaNormalized = _.cloneDeepWith(turma, setEmptyValuesToNull);
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

  toggleTurmaExternaToDelete({ commit, state }, turma) {
    const index = _.findIndex(state.Deletar, ["id", turma.id]);

    commit(TOGGLE_TURMA_EXTERNA_TO_DELETE, { index, turma });
  },

  clearTurmasExternasToDelete({ commit, state }) {
    if (state.Deletar.length) commit(EMPTY_DELETE_TURMA_EXTERNA);
  },
};

const getters = {
  AllTurmasExternas(state) {
    return _.orderBy(state.Turmas, ["letra"]);
  },
  TurmasExternasToDelete(state) {
    return state.Deletar;
  },
  TurmasExternasInDisciplinas(state, getters) {
    const turmasResult = [];
    _.forEach(getters.AllTurmasExternas, (turma) => {
      const disciplinaFounded = _.find(getters.DisciplinasExternasInPerfis, [
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
};

export default {
  state,
  mutations,
  actions,
  getters,
};
