// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage/s3-see'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--remote-debugging-port=9222',
          '--disable-extensions',
          '--no-sandbox'
        ]
      }
    },
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    singleRun: false
  };

  process.env.NO_PROXY = 'localhost, 0.0.0.0/4201, 0.0.0.0/9876';
  process.env.no_proxy = 'localhost, 0.0.0.0/4201, 0.0.0.0/9876';

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
    configuration.singleRun = true;
    configuration.autoWatch = true;
  }

  config.set(configuration);
};
