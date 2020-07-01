import Vue from 'vue'
import _ from 'lodash'
import cargaPosService from '../../common/services/cargaPos'
import { CARGA_POS_FETCHED, SOCKET_CARGA_POS_CREATED, SOCKET_CARGA_POS_DELETED, SOCKET_CARGA_POS_UPDATED} from '../mutation-types'

const state = {
    Cargas: [],
    Deletar: []
}

const mutations = {
    [CARGA_POS_FETCHED] (state, data) {
        state.Cargas = data.CargasPos
    },

    [SOCKET_CARGA_POS_CREATED] (state, data) {
        state.Cargas.push(data.CargaPos)
    },

    [SOCKET_CARGA_POS_UPDATED] (state, data) {
        let index = _.findIndex(state.Cargas, carga => carga.id === data.CargaPos.id);
        Vue.set(state.Cargas, index, data.CargaPos)
    },

    [SOCKET_CARGA_POS_DELETED] (state, data) {
        let index = _.findIndex(state.Cargas, carga => carga.id === data.CargaPos.id);
        state.Cargas.splice(index, 1)
    },

    checkDeleteCarga (state, data) {
        let index = _.findIndex(state.Deletar, carga => carga.id === data.CargaPos.id);
        if(index>-1)
            state.Deletar.splice(index, 1)
        else
            state.Deletar.push(data.CargaPos)
    },

    emptyDeleteCarga (state) {
        state.Deletar = []
    }
}

const actions = {
    fetchAll ({commit}) {
        return new Promise((resolve, reject) => {
            cargaPosService.fetchAll(localStorage.getItem('Plano')).then(response => {
                commit(CARGA_POS_FETCHED, response)
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
