var webpack = require('webpack')
var config = require('./webpack.dev.js')
var chokidar = require('chokidar')
var webpackDevServer = require('webpack-dev-server')
var port = 8080

var compiler = webpack(config)
var hotMiddleware = require('webpack-hot-middleware')(compiler)

chokidar.watch('./*.html').on('all', function (ev, path) {
  console.log("file " + path + " has been modified")
  hotMiddleware.publish({action: 'reload'})
})

var server = new webpackDevServer(compiler, {
  hot: true,
  contentBase: './',
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: { colors: true }
})

server.use(hotMiddleware)

server.listen(port, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Listening at http://localhost:' + port)
  }
})