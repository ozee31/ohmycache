var config = require('./webpack.base')
var webpack = require('webpack')

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({
    comments: false
  })
])

module.exports = config