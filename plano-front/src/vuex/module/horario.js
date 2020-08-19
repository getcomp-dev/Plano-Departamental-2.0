import Vue from "vue";
import _ from "lodash";
import horarioService from "../../common/services/horario";
import {
  HORARIO_FETCHED,
  SOCKET_HORARIO_CREATED,
  SOCKET_HORARIO_DELETED,
  SOCKET_HORARIO_UPDATED,
} from "../mutation-types";

const state = {
  Horarios: [],
};

const mutations = {
  [HORARIO_FETCHED](state, data) {
    state.Horarios = data.Horarios;
  },

  [SOCKET_HORARIO_CREATED](state, data) {
    state.Horarios.push(data.Horario);
  },

  [SOCKET_HORARIO_UPDATED](state, data) {
    let index = _.findIndex(
      state.Horarios,
      (horario) => horario.id === data.Horario.id
    );
    Vue.set(state.Horarios, index, data.Horario);
  },

  [SOCKET_HORARIO_DELETED](state, data) {
    let index = _.findIndex(
      state.Horarios,
      (horario) => horario.id === data.Horario.id
    );
    state.Horarios.splice(index, 1);
  },
};

const actions = {
  fetchAll({ commit }) {
    return new Promise((resolve, reject) => {
      horarioService
        .fetchAll()
        .then((response) => {
          commit(HORARIO_FETCHED, response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  AllHorarios(state) {
    return _.orderBy(state.Horarios, "horario");
  },
  HorariosEAD(state) {
    return [_.find(state.Horarios, { id: 31 })];
  },
  HorariosNoturno(state, getters) {
    return _.filter(
      getters.AllHorarios,
      (h) => parseInt(h.horario.slice(3, 5)) >= 17
    );
  },
  HorariosDiurno(state, getters) {
    return _.filter(
      getters.AllHorarios,
      (h) => parseInt(h.horario.slice(3, 5)) < 17
    );
  },

  //Usado para as tabelas de Horarios-cursos e Horarios-labs
  ListaDeHorariosDiurno() {
    const listHorarios = [
      {
        nome: "08-10",
        horariosIds: [],
      },
      {
        nome: "10-12",
        horariosIds: [],
      },
      {
        nome: "14-16",
        horariosIds: [],
      },
      {
        nome: "16-18",
        horariosIds: [],
      },
    ];

    let initialId = 1;
    _.forEach(listHorarios, (itemHorario) => {
      for (let horarioId = initialId; horarioId <= 28; horarioId += 6) {
        itemHorario.horariosIds.push(horarioId);
      }
      initialId++;
    });

    return listHorarios;
  },
  ListaDeHorariosNoturno() {
    const listHorarios = [
      {
        nome: "19-21",
        horariosIds: [],
      },
      {
        nome: "21-23",
        horariosIds: [],
      },
    ];

    let initialId = 5;
    _.forEach(listHorarios, (itemHorario) => {
      for (let horarioId = initialId; horarioId <= 30; horarioId += 6) {
        itemHorario.horariosIds.push(horarioId);
      }
      initialId++;
    });

    return listHorarios;
  },
  ListaDeHorariosEletivas(state, getters) {
    const HorariosExtra = [
      {
        nome: "17-19",
        horariosIds: [],
      },
      {
        nome: "18-20",
        horariosIds: [],
      },
    ];

    let initialId = 32;
    _.forEach(HorariosExtra, (itemHorario) => {
      for (let horarioId = initialId; horarioId <= 41; horarioId += 2) {
        itemHorario.horariosIds.push(horarioId);
      }
      initialId++;
    });

    return [
      ...getters.ListaDeHorariosDiurno,
      ...HorariosExtra,
      ...getters.ListaDeHorariosNoturno,
    ];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
