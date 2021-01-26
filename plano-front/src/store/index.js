import Vue from "vue";
import Vuex from "vuex";

import auth from "./module/auth";
import perfil from "./module/perfil";
import curso from "./module/curso";
import disciplina from "./module/disciplina";
import pedido from "./module/pedido";
import pedidoExterno from "./module/pedidoExterno";
import pedidoOferecido from "./module/pedidoOferecido";
import grade from "./module/grade";
import disciplinaGrade from "./module/disciplinaGrade";
import gradeCursoExterno from "./module/gradeCursoExterno";
import disciplinaGradeCursoExterno from "./module/disciplinaGradeCursoExterno";
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
import modals from "./module/modals";
import loadingView from "./module/loadingView";
import routesLists from "./module/routesLists";
import notifications from "./module/notifications";
import periodosLetivos from "./module/periodosLetivos";
import semestresLetivos from "./module/semestresLetivos";
import docenteDisciplina from "./module/docenteDisciplina";
import conceitoTurmaCurso from "./module/conceitoTurmaCurso";
import { HTTP_REQUEST_INCREMENT, HTTP_REQUEST_DECREMENT } from "./mutation-types";

const state = {
  httpRequestCount: 0,
  year: 2019,
};

const mutations = {
  [HTTP_REQUEST_INCREMENT](state) {
    state.httpRequestCount += 1;
  },

  [HTTP_REQUEST_DECREMENT](state) {
    state.httpRequestCount -= 1;
  },

  setYear(year) {
    state.year = year;
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    auth,
    perfil,
    curso,
    disciplina,
    pedido,
    pedidoExterno,
    pedidoOferecido,
    grade,
    disciplinaGrade,
    gradeCursoExterno,
    disciplinaGradeCursoExterno,
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
    modals,
    loadingView,
    routesLists,
    notifications,
    periodosLetivos,
    semestresLetivos,
    docenteDisciplina,
    conceitoTurmaCurso,
  },
  strict: process.env.NODE_ENV !== "production",
});
