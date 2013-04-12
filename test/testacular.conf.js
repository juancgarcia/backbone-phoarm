// Testacular configuration
// Generated on Fri Apr 12 2013 09:34:56 GMT-0400 (Eastern Daylight Time)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  // libs
  'app/vendor/requirejs.text-2.0.5.js',
  'app/vendor/jquery-1.9.1.js',
  'app/vendor/underscore-1.4.4.js',
  'app/vendor/backbone-1.0.0.js',
  'app/vendor/backbone-forms.js',
  'app/vendor/backbone.localStorage.js',
  'app/vendor/backbone.subroute-0.3.2.js',
  // source modules
  {pattern: 'app/modules/**/*.js', included: false},
  {pattern: 'app/views/**/*.js', included: false},
  {pattern: 'app/*.js', included: false},
  // test modules
  {pattern: 'test/**/*.test.js', included: false},
  'test/test-main.js'
];


// list of files to exclude
exclude = [
  //'extra/files/*.swp'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
