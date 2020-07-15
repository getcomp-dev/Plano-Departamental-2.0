import Vue from "vue";
import Vuex from "vuex";

import auth from "./module/auth";
import perfil from "./module/perfil";
import curso from "./module/curso";
import disciplina from "./module/disciplina";
import pedido from "./module/pedido";
import pedidoExterno from "./module/pedidoExterno";
import grade from "./module/grade";
import disciplinaGrade from "./module/disciplinaGrade";
import docente from "./module/docente";
import docentePerfil from "./module/docentePerfil";
import turma from "./module/turma";
import turmaExterna from "./module/turmaExterna";
import sala from "./module/sala";
import horario from "./module/horario";
import vaga from "./module/vaga";
import cargaPos from "./module/cargaPos";
import plano from "./module/plano";
import usuario from "./module/usuario";
import history from "./module/history";
import sidebar from "./module/sidebar";
import baseModalOverlay from "./module/baseModalOverlay";

import {
  USER_LOGGED_OUT,
  COMPONENT_LOADING,
  COMPONENT_LOADED,
  HTTP_REQUEST_INCREMENT,
  HTTP_REQUEST_DECREMENT,
} from "./mutation-types";

const state = {
  httpRequestCount: 0,
  isLoading: false,
  year: 2019,
};

const mutations = {
  [USER_LOGGED_OUT](state) {
    state.isLoading = false;
  },

  [HTTP_REQUEST_INCREMENT](state) {
    state.httpRequestCount += 1;
  },

  [HTTP_REQUEST_DECREMENT](state) {
    state.httpRequestCount -= 1;
  },

  [COMPONENT_LOADING](state) {
    state.isLoading = true;
  },

  [COMPONENT_LOADED](state) {
    state.isLoading = false;
  },

  setYear(year) {
    state.year = year;
  },
};

const actions = {};

const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    auth,
    perfil,
    curso,
    disciplina,
    pedido,
    pedidoExterno,
    grade,
    disciplinaGrade,
    docente,
    docentePerfil,
    turma,
    turmaExterna,
    sala,
    horario,
    vaga,
    cargaPos,
    plano,
    usuario,
    history,
    sidebar,
    baseModalOverlay,
  },

  strict: process.env.NODE_ENV !== "production",
});
