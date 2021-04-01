const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@utils": path.resolve(__dirname, "src/common/utils"),
        "@mixins": path.resolve(__dirname, "src/common/mixins"),
      },
    },
    // devServer: { hot: false }, // para desabilitar HMR
  },
};
