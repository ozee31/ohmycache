var path = require('path')
var root = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
    library: 'OhMyCache',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        est: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        include: root
      }
    ]
  },
  plugins: [

  ],
  eslint: {
    configFile: path.resolve(root, '.eslintrc'),
    formatter: require('eslint-friendly-formatter')
  }
}