import Vue from "vue";
import disciplinaGradeCursoExternoService from "../../common/services/disciplinaGradeCursoExterno";
import {
    DISCIPLINA_GRADE_CURSO_EXTERNO_FETCHED,
    SOCKET_DISCIPLINA_GRADE_CURSO_EXTERNO_CREATED,
    SOCKET_DISCIPLINA_GRADE_CURSO_EXTERNO_DELETED,
    SOCKET_DISCIPLINA_GRADE_CURSO_EXTERNO_UPDATED,
} from "../mutation-types";

const state = {
    DisciplinaGrades: [],
};

const mutations = {
    [DISCIPLINA_GRADE_CURSO_EXTERNO_FETCHED](state, data) {
        state.DisciplinaGrades = data.DisciplinaGrades;
    },

    [SOCKET_DISCIPLINA_GRADE_CURSO_EXTERNO_CREATED](state, data) {
        state.DisciplinaGrades.push(data.DisciplinaGrade);
    },

    [SOCKET_DISCIPLINA_GRADE_CURSO_EXTERNO_UPDATED](state, data) {
        const index = state.DisciplinaGrades.findIndex(
            (disciplinaGrade) =>
                (disciplinaGrade.Disciplina === data.DisciplinaGrade.Disciplina) &
                (disciplinaGrade.Grade === data.DisciplinaGrade.Grade)
        );
        Vue.set(state.DisciplinaGrades, index, data.DisciplinaGrade);
    },

    [SOCKET_DISCIPLINA_GRADE_CURSO_EXTERNO_DELETED](state, data) {
        const index = state.DisciplinaGrades.findIndex(
            (disciplinaGrade) =>
                (disciplinaGrade.Disciplina === data.DisciplinaGrade.Disciplina) &
                (disciplinaGrade.Grade === data.DisciplinaGrade.Grade)
        );
        state.DisciplinaGrades.splice(index, 1);
    },
};

const actions = {
    fetchAll({ commit }) {
        return new Promise((resolve, reject) => {
            disciplinaGradeCursoExternoService
                .fetchAll()
                .then((response) => {
                    commit(DISCIPLINA_GRADE_CURSO_EXTERNO_FETCHED, response);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

const getters = {
    DisciplinasDasGradesCursosExternos(state) {
        return state.DisciplinaGrades;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
