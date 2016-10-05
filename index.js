var pepinoLib = require('pepino-lib');
var fs = require('fs');
var path = require('path');
var through = require('through2');

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
