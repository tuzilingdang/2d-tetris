// vue.config.js
module.exports = {
    configureWebpack: {
      plugins: [],
      
      module: {
        rules: [{
          test: /\.less$/,
          loader: 'less-loader' // compiles Less to CSS
        }]
      }
    }
  }