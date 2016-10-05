var pepinoLib = require('pepino-lib');
var fs = require('fs');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('child_process').exec;
var path = require('path');
var _ = require('lodash');
var through = require('through2');

const PLUGIN_NAME = 'gulp-pepino';

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

var pepino = function() {
    return through({ objectMode: true }, function(stepFile, enc, callback) {
        translateStepFile(stepFile);
        this.push(null);
        callback();
    });
}

module.exports = {
    pepino: pepino
};
