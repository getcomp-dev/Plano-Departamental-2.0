import Vue from 'vue'
import _ from 'lodash'
import docentePerfilService from '../../common/services/docentePerfil'
import { DOCENTE_PERFIL_FETCHED, SOCKET_DOCENTE_PERFIL_CREATED, SOCKET_DOCENTE_PERFIL_DELETED, SOCKET_DOCENTE_PERFIL_UPDATED } from '../mutation-types'

const state = {
    DocentePerfis: []
}

const mutations = {
    [DOCENTE_PERFIL_FETCHED] (state, data) {
        state.DocentePerfis = data.DocentePerfis
    },

    [SOCKET_DOCENTE_PERFIL_CREATED] (state, data) {
        state.DocentePerfis.push(data[0].DocentePerfil)
    },

    [SOCKET_DOCENTE_PERFIL_UPDATED] (state, data) {
        let index = _.findIndex(state.DocentePerfis, docentePerfil => (docentePerfil.Docente === data[0].DocentePerfil.Docente & docentePerfil.Perfil === data[0].Perfil));
        Vue.set(state.DocentePerfis, index, data[0].DocentePerfil)
    },

    [SOCKET_DOCENTE_PERFIL_DELETED] (state, data) {
        let index = _.findIndex(state.DocentePerfis, docentePerfil => (docentePerfil.Docente === data[0].DocentePerfil.Docente & docentePerfil.Perfil === data[0].Perfil));
        state.DocentePerfis.splice(index, 1)
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            docentePerfilService.fetchAll().then(response => {
                commit(DOCENTE_PERFIL_FETCHED, response)
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