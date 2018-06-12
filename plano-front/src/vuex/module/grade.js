import Vue from 'vue'
import _ from 'lodash'
import gradeService from '../../common/services/grade'
import { GRADE_FETCHED, SOCKET_GRADE_CREATED, SOCKET_GRADE_DELETED, SOCKET_GRADE_UPDATED } from '../mutation-types'

const state = {
    Grades: []
}

const mutations = {
    [GRADE_FETCHED] (state, data) {
        state.Grades = data.Grades
    },

    [SOCKET_GRADE_CREATED] (state, data) {
        state.Grades.push(data[0].Grade)
    },

    [SOCKET_GRADE_UPDATED] (state, data) {
        let index = _.findIndex(state.Grades, grade => grade.id === data[0].Grade.id);
        Vue.set(state.Grades, index, data[0].Grade)
    },

    [SOCKET_GRADE_DELETED] (state, data) {
        let index = _.findIndex(state.Grades, grade => grade.id === data[0].Grade.id);
        state.Grades.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            gradeService.fetchAll().then(response => {
                commit(GRADE_FETCHED, response)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
