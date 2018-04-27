import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store'

import Login from './components/TheLogin'

import Dashboard from './components/TheDashboard'
import DashboardHome from './components/Dashboard/Home'
import DashboardPedidos from './components/Dashboard/Pedidos'

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
      {path: 'pedidos', name: 'pedidos', component: DashboardPedidos}
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
  saveScrollPosition: true
})
