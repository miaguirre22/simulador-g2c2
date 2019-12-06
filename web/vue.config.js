module.exports = {
    configureWebpack: {
      devtool: 'source-map'
    },
    devServer: {
        port: 9000
    },

    pluginOptions: {
      quasar: {
        treeShake: true
      }
    },

    transpileDependencies: [
      /[\\\/]node_modules[\\\/]quasar[\\\/]/
    ]
}
