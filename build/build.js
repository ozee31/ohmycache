var webpack = require('webpack')
var ora = require('ora')
var config = require('./webpack.prod.js')
var spinner = ora('in progress...')
require('shelljs/global')

spinner.start()
rm('-rf', 'dist')

webpack(config, function(err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})