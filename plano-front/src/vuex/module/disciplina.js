import Vue from "vue";
import _ from "lodash";
import disciplinaService from "../../common/services/disciplina";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
  DISCIPLINA_FETCHED,
  SOCKET_DISCIPLINA_CREATED,
  SOCKET_DISCIPLINA_DELETED,
  SOCKET_DISCIPLINA_UPDATED,
  PUSH_NOTIFICATION,
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

  async createDisciplina({ commit }, disciplina) {
    const disciplinaNormalized = _.cloneDeepWith(
      disciplina,
      setEmptyValuesToNull
    );
    validateObjectKeys(disciplinaNormalized, [
      "nome",
      "codigo",
      "cargaTeorica",
      "cargaPratica",
    ]);

    if (disciplinaDCCENaoPossuiPerfil(disciplinaNormalized)) {
      commit(PUSH_NOTIFICATION, {
        type: "error",
        text: "Disciplinas do DCC devem fazer parte de um Perfil",
      });
      return;
    }

    await disciplinaService.create(disciplinaNormalized);

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A disciplina ${disciplinaNormalized.nome} foi criada`,
    });
  },

  async editDisciplina({ commit }, disciplina) {
    const disciplinaNormalized = _.cloneDeepWith(
      disciplina,
      setEmptyValuesToNull
    );
    validateObjectKeys(disciplinaNormalized, [
      "nome",
      "codigo",
      "cargaTeorica",
      "cargaPratica",
    ]);

    if (disciplinaDCCENaoPossuiPerfil(disciplinaNormalized)) {
      commit(PUSH_NOTIFICATION, {
        type: "error",
        text: "Disciplinas do DCC devem fazer parte de um Perfil",
      });
      return;
    }

    await disciplinaService.update(
      disciplinaNormalized.id,
      disciplinaNormalized
    );

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A disciplina ${disciplinaNormalized.nome} foi atualizada`,
    });
  },

  async deleteDisciplina({ commit }, disciplina) {
    await disciplinaService.delete(disciplina.id, disciplina);

    commit(PUSH_NOTIFICATION, {
      type: "success",
      text: `A disciplina ${disciplina.nome} foi excluída`,
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
      } else {
        disciplinasResults.push({
          ...disciplina,
          perfil: {
            nome: "",
            abreviacao: "",
            cor: undefined,
          },
        });
      }
    });

    return disciplinasResults;
  },
  DisciplinasDCCInPerfis(state, getters) {
    return _.filter(getters.DisciplinasInPerfis, ["departamento", 1]);
  },
  DisciplinasExternasInPerfis(state, getters) {
    return _.filter(getters.DisciplinasInPerfis, ["departamento", 2]);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};

function disciplinaDCCENaoPossuiPerfil(disciplina) {
  return disciplina.departamento === 1 && disciplina.Perfil === null;
}
