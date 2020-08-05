import _ from "lodash";

const LodashVue = {
  install(Vue) {
    if (!Vue.prototype._) {
      Object.defineProperty(Vue.prototype, "$_", {
        value: _,
      });
    }
  },
};

export default LodashVue;
