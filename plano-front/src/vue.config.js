module.exports = {
    parallel: false,
    chainWebpack: (config) => {
        config.module
            .rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader')
            .loader('worker-loader')
            .end();
    }