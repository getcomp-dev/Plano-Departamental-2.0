import Vue from 'vue'
import _ from 'lodash'
import cursoService from '../../common/services/curso'
import { CURSO_FETCHED, SOCKET_CURSO_CREATED, SOCKET_CURSO_DELETED, SOCKET_CURSO_UPDATED, TOGGLE_CURSO } from '../mutation-types'

const state = {
    Cursos: []
}

const mutations = {
    [CURSO_FETCHED] (state, data) {
        state.Cursos = data.Cursos
        if(localStorage.ativos){
            state.Ativos = Object.assign({}, localStorage.ativos)
        } else {
            for (var c = 0; c < state.Cursos.length; c++) {
                state.Ativos[state.Cursos[c].id] = true
            }
            state.Ativos = Object.assign({}, state.Ativos)
        }
    },

    [SOCKET_CURSO_CREATED] (state, data) {
        state.Cursos.push(data[0].Curso)
        Vue.set(state.Ativos, data[0].Curso.id, data[0].Curso)
    },

    [SOCKET_CURSO_UPDATED] (state, data) {
        let index = _.findIndex(state.Cursos, curso => curso.id === data[0].Curso.id);
        Vue.set(state.Cursos, index, data[0].Curso)
    },

    [SOCKET_CURSO_DELETED] (state, data) {
        let index = _.findIndex(state.Cursos, curso => curso.id === data[0].Curso.id);
        state.Cursos.splice(index, 1)
        Vue.set(state.Ativos, data[0].Curso.id, undefined)
    },

}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            cursoService.fetchAll().then(response => {
            commit(CURSO_FETCHED, response)
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
