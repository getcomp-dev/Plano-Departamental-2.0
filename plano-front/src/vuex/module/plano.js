import Vue from "vue";
import planoService from "../../common/services/plano";
import {
  PLANO_FETCHED,
  SOCKET_PLANO_DELETED,
  SOCKET_PLANO_CREATED,
  SOCKET_PLANO_UPDATED,
} from "../mutation-types";
import _ from "lodash";

const state = {
  Plano: [],
};

const mutations = {
  [PLANO_FETCHED](state, data) {
    state.Plano = data.Plano;
  },

  [SOCKET_PLANO_CREATED](state, data) {
    state.Plano.push(data.Plano);
  },

  [SOCKET_PLANO_UPDATED](state, data) {
    let index = _.findIndex(state.Plano, (plano) => plano.id === data.Plano.id);
    Vue.set(state.Plano, index, data.Plano);
  },

  [SOCKET_PLANO_DELETED](state, data) {
    let index = _.findIndex(state.Plano, (plano) => plano.id === data.Plano.id);
    state.Plano.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      planoService
        .fetchAll()
        .then((response) => {
          console.log(response);
          commit(PLANO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  allPlanos(state) {
    const planosResultantes = _.orderBy(state.Plano, ["ano"]);

    if (process.env.NODE_ENV === "development") return planosResultantes;
    else return _.filter(planosResultantes, (plano) => plano.id != 2090); //2090 = id do plano de dev
  },
  AnosDoPlano() {
    let firstYear = 2019;
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear + 5;
    const yearsArry = [];

    while (firstYear <= lastYear) {
      yearsArry.push(parseInt(firstYear, 10));
      firstYear++;
    }
    if (process.env.NODE_ENV === "development") yearsArry.push(2099);

    return yearsArry;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
