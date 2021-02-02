import Vue from "vue";
import Vuex from "vuex";
import modules from "./module";

const state = {
  year: 2019,
};

const mutations = {
  setYear(year) {
    state.year = year;
  },
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  modules,
  strict: process.env.NODE_ENV !== "production",
});
