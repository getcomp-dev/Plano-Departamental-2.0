import Vue from 'vue'
import App from './App.vue'

import store from './vuex/store'
import router from './router'
import {sync} from 'vuex-router-sync'

sync(store, router)

import axios from './common/services/axios'

axios(Vue, store)

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/css/fontawesome-all.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
