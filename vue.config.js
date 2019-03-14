// vue.config.js
module.exports = {
  // webpack设置
  configureWebpack:{
    module: {
      rules: [{
        test: /\.less$/,
        loader: 'less-loader' // compiles Less to CSS
      }]
    }
  }
}