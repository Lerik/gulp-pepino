var pepino = require('pepino-lib');
var fs = require('fs');
var minimist = require('minimist');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('child_process').exec;

const PLUGIN_NAME = 'gulp-pepino';

var knownOptions = {
  string: 'browser',
  default: { browser: 'chrome' }
};

var options = minimist(process.argv.slice(2), knownOptions);

var translateStepFile = function(path) {
    var pepinoLang = fs.readFileSync(path, 'utf8');
    var jsCode = pepino.convert(pepinoLang);
    fs.writeFileSync(path.substring(0, path.lastIndexOf('/')) + "generatedCode.step.js", jsCode);
}

var runChimp = function(options) {
    if (options.browser) {
        knownOptions.default.browser = options.browser;
    }

    var watcher = '';

    if (options.watch) {
        watcher = '--watch ';
    }

    var child = exec(`chimp ` + watcher + `--browser=${options.browser}`);

    child.stdout.on('data', function(data) {
        if (data && data !== '\n') {
            console.log(data);
        }
    });

    child.stderr.on('data', function(data) {
        console.log(data);
    });
}

module.exports = function(path, options) {
    translateStepFile(path);
    runChimp(options);
}
