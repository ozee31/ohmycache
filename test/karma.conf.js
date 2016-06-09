var config = require('../build/webpack.base.js')

var webpackConfig = config

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],

    files: [
      { pattern: 'index.js'}
    ],

    frameworks: ['jasmine'],

    preprocessors: {
      './index.js': ['webpack']
    },

    webpack: webpackConfig
  });
};