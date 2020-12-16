import Vue from "vue";
import gradeCursoExternoService from "../../common/services/gradeCursoExterno";
import { cloneDeepWith, orderBy } from "lodash-es";
import { validateObjectKeys, setEmptyValuesToNull } from "@/common/utils";
import {
    GRADE_CURSO_EXTERNO_FETCHED,
    SOCKET_GRADE_CURSO_EXTERNO_CREATED,
    SOCKET_GRADE_CURSO_EXTERNO_DELETED,
    SOCKET_GRADE_CURSO_EXTERNO_UPDATED,
    PUSH_NOTIFICATION,
} from "../mutation-types";

const state = {
    Grades: [],
};

const mutations = {
    [GRADE_CURSO_EXTERNO_FETCHED](state, data) {
        state.Grades = data.Grades;
    },

    [SOCKET_GRADE_CURSO_EXTERNO_CREATED](state, data) {
        state.Grades.push(data.Grade);
    },

    [SOCKET_GRADE_CURSO_EXTERNO_UPDATED](state, data) {
        let index = state.Grades.findIndex((grade) => grade.id === data.Grade.id);
        Vue.set(state.Grades, index, data.Grade);
    },

    [SOCKET_GRADE_CURSO_EXTERNO_DELETED](state, data) {
        let index = state.Grades.findIndex((grade) => grade.id === data.Grade.id);
        state.Grades.splice(index, 1);
    },
};

const actions = {
    fetchAll({ commit }) {
        return new Promise((resolve, reject) => {
            gradeCursoExternoService
                .fetchAll()
                .then((response) => {
                    commit(GRADE_CURSO_EXTERNO_FETCHED, response);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async createGradeCursoExterno({ commit }, grade) {
        const gradeNormalized = cloneDeepWith(grade, setEmptyValuesToNull);
        validateObjectKeys(gradeNormalized, ["nome", "periodoInicio", "Curso"]);

        await gradeCursoExternoService.create(gradeNormalized);

        commit(PUSH_NOTIFICATION, {
            type: "success",
            text: `A grade ${gradeNormalized.nome} foi criada`,
        });
    },
    async editGradeCursoExterno({ commit }, grade) {
        const gradeNormalized = cloneDeepWith(grade, setEmptyValuesToNull);
        validateObjectKeys(gradeNormalized, ["nome", "periodoInicio", "Curso"]);

        await gradeCursoExternoService.update(gradeNormalized.id, gradeNormalized);

        commit(PUSH_NOTIFICATION, {
            type: "success",
            text: `A grade ${gradeNormalized.nome} foi atualizada`,
        });
    },
    async deleteGradeCursoExterno({ commit }, grade) {
        const gradeNormalized = cloneDeepWith(grade, setEmptyValuesToNull);
        validateObjectKeys(gradeNormalized, ["id", "Curso"]);

        await gradeCursoExternoService.delete(gradeNormalized.id, gradeNormalized);

        commit(PUSH_NOTIFICATION, {
            type: "success",
            text: `A grade ${gradeNormalized.nome} foi excluída`,
        });
    },
};

const getters = {
    AllGradesCursosExternos(state) {
        return orderBy(state.Grades, "periodoInicio", "desc");
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
