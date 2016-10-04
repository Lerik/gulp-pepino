var pepinoLib = require('pepino-lib');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('child_process').exec;
var path = require('path');
var _ = require('lodash');
var through = require('through2');

const PLUGIN_NAME = 'gulp-pepino';

var browsers = {
    CH: 'chrome',
    IE: 'ie',
    FX: 'firefox',
    SF: 'safari',
    PJ: 'phantomjs'
};

var chimpBrowserOptions = {
  string: 'browser',
  default: { browser: browsers.CH }
};

var runChimp = function(directory, browser) {
    var browserSelected;
    if (browser) {
        browserSelected = browser;
    } else {
        browserSelected = chimpBrowserOptions.default.browser;
    }

    var child = exec(`chimp --path="` + directory + `" --browser=${browserSelected}`);

    child.stdout.on('data', function(data) {
        if (data && data !== '\n') {
            console.log(data);
        }
    });

    child.stderr.on('data', function(data) {
        console.log(data);
    });
}

var translateStepFile = function(stepFile) {
    console.log('Translating: ' + path.basename(stepFile.path));
    var content = stepFile.contents.toString('utf8');
    var jsCode = pepinoLib.convert(content);
    
    var fileLocation = path.format({
        dir: path.dirname(stepFile.path),
        base: path.basename(stepFile.path) + '.js'
    });
    
    fs.writeFileSync(fileLocation, jsCode);
    console.log(path.basename(stepFile.path) + ' has been translated successfully.');
}

var pepino = function(browser) {
    return through({ objectMode: true }, function(stepFile, enc, callback) {
        translateStepFile(stepFile);
        runChimp(path.dirname(stepFile.path), browser);
        this.push(null);
        callback();
    });
}

var translateStepFileStream = function() {
    return through({ objectMode: true }, function(stepFile, enc, callback) {
        translateStepFile(stepFile);
        this.push(null);
        callback();
    });
}

var runChimpStream = function(browser) {
    return through({ objectMode: true }, function(stepFile, enc, callback) {
        runChimp(stepFile.path, browser);
        this.push(null);
        callback();
    });
}

module.exports = {
    translateStepFile: translateStepFile,
    translateStepFileStream: translateStepFileStream,
    runChimp: runChimp,
    runChimpStream: runChimpStream,
    pepino: pepino,
    browsers: browsers
};
