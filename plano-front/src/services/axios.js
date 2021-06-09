import axios from "axios";
import VueAxios from "vue-axios";

export default function(Vue, store) {
  Vue.use(VueAxios, axios);
  Vue.axios.defaults.baseURL = "http://200.131.219.57:3000/api/";

  Vue.axios.interceptors.request.use(
    function(config) {
      if (store.state.auth.token) {
        config.headers["authorization"] = `Bearer ${store.state.auth.token}`;
      }

      return config;
    },
    function(error) {
      console.log("REQUEST ERROR");
      console.log(error);
      return Promise.reject(error);
    }
  );

  Vue.axios.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      if (!error.response) {
        console.log("RESPONSE ERROR");
        console.log(error);
      }

      return Promise.reject(error);
    }
  );
}
