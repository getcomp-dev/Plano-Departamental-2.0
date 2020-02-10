import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

import Login from './components/TheLogin'

import Dashboard from './components/TheDashboard'
import DashboardHome from './components/Dashboard/Home'
import DashboardTurmas from './components/Dashboard/Turmas'
import DashboardTurmasExternas from './components/Dashboard/TurmasExternas'
import DashboardRelatorios from './components/Dashboard/Relatorios'
import DashboardHorarios from './components/Dashboard/Horarios'
import DashboardCursos from './components/Dashboard/Cursos'
import DashboardDocentes from './components/Dashboard/Docentes'
import DashboardGrades from './components/Dashboard/Grades'
import DashboardPerfis from './components/Dashboard/Perfis'
import DashboardDisciplinas from './components/Dashboard/Disciplinas'
import DashboardPedidos from './components/Dashboard/DashboardPrototipo'
import DashboardCargaProfessores from './components/Dashboard/CargaProfessores'
import DashboardHorariosResumo from './components/Dashboard/HorariosResumo'
import DashboardLaboratoriosAlocacao from './components/Dashboard/LaboratoriosAlocacao'
import DashboardCargaPos from './components/Dashboard/CargaPos'
import DashboardSalas from './components/Dashboard/Salas'
import DashboardGradeDisciplinas from './components/Dashboard/GradeDisciplinas'
import DashboardRelatorioDisciplinas from './components/Dashboard/RelatorioDisciplinas'


import {USER_LOGGED_OUT} from './vuex/mutation-types'

Vue.use(VueRouter)

function requireAuth(to, from, next) {
  store.dispatch('fetchUsuario').then(() => {
    next()
  }).catch(() => {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  })
}

const routes = [
  {path: '/', name: 'home', redirect: '/dashboard', beforeEnter: requireAuth},
  {path: '/login', name: 'login', component: Login},
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      {path: '', name: 'dashboard', component: DashboardHome},
      {path: 'pedidos', name: 'pedidos', component: DashboardPedidos},
      {path: 'turmas', name: 'turmas', component: DashboardTurmas},
      {path: 'turmasExternas', name: 'turmasExternas', component: DashboardTurmasExternas},
      {path: 'relatorios', name: 'relatorios', component: DashboardRelatorios},
      {path: 'horarios', name: 'horarios', component: DashboardHorarios} ,
      {path: 'cursos', name: 'cursos', component: DashboardCursos},
      {path: 'docentes', name: 'docentes', component: DashboardDocentes},
      {path: 'grades', name: 'grades', component: DashboardGrades},
      {path: 'disciplinas', name: 'disciplinas', component: DashboardDisciplinas},
      {path: 'perfis', name: 'perfis', component: DashboardPerfis},
      {path: 'cargaProfessores', name: 'cargaProfessores', component: DashboardCargaProfessores},
      {path: 'horariosResumo', name: 'horariosResumo', component: DashboardHorariosResumo},
      {path: 'laboratoriosAlocacao', name: 'laboratoriosAlocacao', component: DashboardLaboratoriosAlocacao},
      {path: 'cargaPos', name: 'cargaPos', component: DashboardCargaPos},
      {path: 'salas', name: 'salas', component: DashboardSalas},
      {path: 'gradeDisciplinas', name: 'gradeDisciplinas', component: DashboardGradeDisciplinas},
      {path: 'relatorioDisciplinas', name: 'relatorioDisciplinas', component: DashboardRelatorioDisciplinas}
    ]
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: function (to, from, next) {
      store.commit(USER_LOGGED_OUT)
      next('/login')
    }
  },
  {path: '/*', redirect: '/'}
]
export default new VueRouter({
  routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  saveScrollPosition: true
})
