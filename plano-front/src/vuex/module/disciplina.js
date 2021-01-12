import Vue from "vue";
import disciplinaService from "../../services/disciplina";
import { orderBy, cloneDeepWith, filter, find } from "lodash-es";
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
    let index = state.Disciplinas.findIndex((disciplina) => disciplina.id === data.Disciplina.id);
    Vue.set(state.Disciplinas, index, data.Disciplina);
  },

  [SOCKET_DISCIPLINA_DELETED](state, data) {
    let index = state.Disciplinas.findIndex((disciplina) => disciplina.id === data.Disciplina.id);
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
    const disciplinaNormalized = cloneDeepWith(disciplina, setEmptyValuesToNull);
    validateObjectKeys(disciplinaNormalized, ["nome", "codigo", "cargaTeorica", "cargaPratica"]);

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
    const disciplinaNormalized = cloneDeepWith(disciplina, setEmptyValuesToNull);
    validateObjectKeys(disciplinaNormalized, ["nome", "codigo", "cargaTeorica", "cargaPratica"]);

    if (disciplinaDCCENaoPossuiPerfil(disciplinaNormalized)) {
      commit(PUSH_NOTIFICATION, {
        type: "error",
        text: "Disciplinas do DCC devem fazer parte de um Perfil",
      });
      return;
    }

    await disciplinaService.update(disciplinaNormalized.id, disciplinaNormalized);

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
  AllDisciplinas(state, getters) {
    const disciplinas = state.Disciplinas.map((disciplina) => {
      const perfilFound = find(getters.AllPerfis, ["id", disciplina.Perfil]);

      return {
        ...disciplina,
        creditoTotal: parseInt(disciplina.cargaTeorica, 10) + parseInt(disciplina.cargaPratica, 10),
        perfil: {
          nome: perfilFound.nome,
          abreviacao: perfilFound.abreviacao,
          cor: perfilFound.cor,
        },
      };
    });

    return orderBy(disciplinas, ["codigo"]);
  },

  DisciplinasDCC(_, getters) {
    return filter(getters.AllDisciplinas, ["departamento", 1]);
  },

  DisciplinasExternas(_, getters) {
    return filter(getters.AllDisciplinas, ["departamento", 2]);
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
