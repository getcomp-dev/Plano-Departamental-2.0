import Vue from "vue";
import _ from "lodash";
import disciplinaService from "../../common/services/disciplina";
import {
  DISCIPLINA_FETCHED,
  SOCKET_DISCIPLINA_CREATED,
  SOCKET_DISCIPLINA_DELETED,
  SOCKET_DISCIPLINA_UPDATED,
} from "../mutation-types";

const state = {
  Disciplinas: [],
};

const mutations = {
  [DISCIPLINA_FETCHED](state, data) {
    state.Disciplinas = data.Disciplinas;
  },

  [SOCKET_DISCIPLINA_CREATED](state, data) {
    state.Disciplinas.push(data.Disciplina);
  },

  [SOCKET_DISCIPLINA_UPDATED](state, data) {
    let index = _.findIndex(
      state.Disciplinas,
      (disciplina) => disciplina.id === data.Disciplina.id
    );
    Vue.set(state.Disciplinas, index, data.Disciplina);
  },

  [SOCKET_DISCIPLINA_DELETED](state, data) {
    let index = _.findIndex(
      state.Disciplinas,
      (disciplina) => disciplina.id === data.Disciplina.id
    );
    state.Disciplinas.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      disciplinaService
        .fetchAll()
        .then((response) => {
          commit(DISCIPLINA_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  AllDisciplinas(state) {
    const disciplinasResult = _.map(state.Disciplinas, (disciplina) => ({
      ...disciplina,
      creditoTotal:
        parseInt(disciplina.cargaTeorica, 10) +
        parseInt(disciplina.cargaPratica, 10),
    }));

    return _.orderBy(disciplinasResult, ["codigo"]);
  },
  DisciplinasInPerfis(state, getters) {
    const disciplinasResults = [];

    _.forEach(getters.AllDisciplinas, (disciplina) => {
      const perfilFounded = _.find(getters.AllPerfis, [
        "id",
        disciplina.Perfil,
      ]);

      if (perfilFounded) {
        disciplinasResults.push({
          ...disciplina,
          perfil: {
            nome: perfilFounded.nome,
            abreviacao: perfilFounded.abreviacao,
            cor: perfilFounded.cor,
          },
        });
      }
    });

    return disciplinasResults;
  },
  DisciplinasDCCInPerfis(state, getters) {
    return _.filter(getters.DisciplinasInPerfis, (disciplina) => {
      if (disciplina.Perfil !== 13 && disciplina.Perfil !== 15) return true;
      //Disciplinas exceções MAC
      else if (disciplina.id === 77 || disciplina.id === 88) return true;
      else false;
    });
  },
  DisciplinasExternasInPerfis(state, getters) {
    return _.filter(
      getters.DisciplinasInPerfis,
      (disciplina) =>
        (disciplina.Perfil === 13 || disciplina.Perfil === 15) &&
        (disciplina.id !== 77 && disciplina.id !== 88) //Remove as disciplinas exceções MAC que são do DCC
    );
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
