import Vue from "vue";
import { orderBy, filter, cloneDeepWith } from "lodash-es";
import { setEmptyValuesToNull, validateObjectKeys } from "@utils";
import docenteService from "../../services/docente";
import docentePerfilService from "@/services/docentePerfil";
import {
  DOCENTE_FETCHED,
  SOCKET_DOCENTE_CREATED,
  SOCKET_DOCENTE_DELETED,
  SOCKET_DOCENTE_UPDATED,
} from "../mutation-types";

const state = {
  Docentes: [],
};

const mutations = {
  [DOCENTE_FETCHED](state, data) {
    state.Docentes = data.Docentes;
  },

  [SOCKET_DOCENTE_CREATED](state, data) {
    state.Docentes.push(data.Docente);
  },

  [SOCKET_DOCENTE_UPDATED](state, data) {
    const index = state.Docentes.findIndex((docente) => docente.id === data.Docente.id);
    Vue.set(state.Docentes, index, data.Docente);
  },

  [SOCKET_DOCENTE_DELETED](state, data) {
    const index = state.Docentes.findIndex((docente) => docente.id === data.Docente.id);
    state.Docentes.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      docenteService
        .fetchAll()
        .then((response) => {
          commit(DOCENTE_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async createDocente({ dispatch }, { data, notify }) {
    const docenteNormalized = normalizeDocente(data);
    docenteNormalized.nomesiga = docenteNormalized.nome;
    const response = await docenteService.create(docenteNormalized);

    if (notify) {
      dispatch("pushNotification", {
        type: "success",
        text: `O docente ${docenteNormalized.nome} foi criado`,
      });
    }
    return response.Docente;
  },
  async updateDocente({ dispatch, rootGetters }, { data, notify }) {
    const { docente, docentePerfisIds } = data;
    const docenteNormalized = normalizeDocente(docente);
    const response = await docenteService.update(docenteNormalized.id, docenteNormalized);

    if (docentePerfisIds) {
      const currentPerfisDoDocente = rootGetters.DocentesPerfis.filter(
        (perfilDocente) => perfilDocente.DocenteId === docenteNormalized.id
      );

      for (const perfil of rootGetters.AllPerfis) {
        const formHasPerfil = docentePerfisIds.some((perfilId) => perfilId === perfil.id);
        const alreadyHasPerfil = currentPerfisDoDocente.some(
          (perfilDocente) => perfilDocente.Perfil === perfil.id
        );

        // Se tem no form e ainda não possui, então adiciona
        if (formHasPerfil && !alreadyHasPerfil) {
          await docentePerfilService.create({ Docente: docenteNormalized.id, Perfil: perfil.id });
        }
        // se não tem no form e já possui, então remove
        else if (!formHasPerfil && alreadyHasPerfil) {
          await docentePerfilService.delete(docenteNormalized.id, perfil.id);
        }
      }
    }

    if (notify) {
      dispatch("pushNotification", {
        type: "success",
        text: `O docente ${docenteNormalized.apelido} foi atualizado`,
      });
    }
    return response.Docente;
  },
  async deleteDocente({ dispatch }, { data, notify }) {
    await docenteService.delete(data.id, data);

    if (notify) {
      dispatch("pushNotification", {
        type: "success",
        text: `O docente ${data.nome} foi criado`,
      });
    }
  },
};

const getters = {
  AllDocentes(state) {
    return orderBy(state.Docentes, "apelido");
  },
  DocentesAtivos(_, getters) {
    return filter(getters.AllDocentes, ["ativo", true]);
  },
};

function normalizeDocente(docente) {
  const docenteNormalized = cloneDeepWith(docente, setEmptyValuesToNull);
  validateObjectKeys(docenteNormalized, ["nome", "apelido"]);
  return docenteNormalized;
}

export default {
  state,
  mutations,
  actions,
  getters,
};
