import Vue from "vue";
import { find, map } from "lodash-es";
import docenteDisciplinaService from "../../common/services/docenteDisciplina";
import {
  DOCENTE_DISCIPLINA_FETCHED,
  SOCKET_DOCENTE_DISCIPLINA_CREATED,
  SOCKET_DOCENTE_DISCIPLINA_DELETED,
  SOCKET_DOCENTE_DISCIPLINA_UPDATED,
} from "../mutation-types";

const state = {
  DocenteDisciplinas: [],
};

const mutations = {
  [DOCENTE_DISCIPLINA_FETCHED](state, data) {
    state.DocenteDisciplinas = data.DocenteDisciplinas;
  },

  [SOCKET_DOCENTE_DISCIPLINA_CREATED](state, data) {
    state.DocenteDisciplinas.push(data.DocenteDisciplina);
  },

  [SOCKET_DOCENTE_DISCIPLINA_UPDATED](state, data) {
    const index = state.DocenteDisciplinas.findIndex(
      (docenteDisciplina) =>
        (docenteDisciplina.Disciplina === data.DocenteDisciplina.Disciplina) &
        (docenteDisciplina.Docente === data.DocenteDisciplina.Docente)
    );
    Vue.set(state.DocenteDisciplinas, index, data.DocenteDisciplina);
  },

  [SOCKET_DOCENTE_DISCIPLINA_DELETED](state, data) {
    const index = state.DocenteDisciplinas.findIndex(
      (docenteDisciplina) =>
        (docenteDisciplina.Disciplina === data.DocenteDisciplina.Disciplina) &
        (docenteDisciplina.Docente === data.DocenteDisciplina.Docente)
    );
    state.DocenteDisciplinas.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      docenteDisciplinaService
        .fetchAll()
        .then((response) => {
          commit(DOCENTE_DISCIPLINA_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  PreferenciasDocentes(state, rootGetters) {
    return map(state.DocenteDisciplinas, (pref) => {
      return {
        ...pref,
        disciplina: find(rootGetters.DisciplinasInPerfis, ["id", pref.Disciplina]),
        docente: find(rootGetters.AllDocentes, ["id", pref.Docente]),
      };
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
