var gpepino = require('../index.js');
var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var fs = require('fs');
var pepino = require('pepino-lib');
var proc = require('child_process');

describe('Gulp Pepino', function() {
    
    var readFileSyncSpy;
    var path ='./features/test.step';

    it('should be defined', function() {
        assert.isDefined(gpepino);
    });

    describe('When translating step file', function(){
        var contentRead = 'ContentToBeTranslated';
        var contentTranslated = 'ContentToBeWritten';
        var stdOut = {on:function(){}};
        var stub_fs_readFileSync, stub_pepino_convert, stub_proc_exec;

        beforeEach(function() {
            stub_fs_readFileSync = sinon.stub(fs, 'readFileSync');
            stub_pepino_convert = sinon.stub(pepino, 'convert');
        });

        afterEach(function() {
            stub_fs_readFileSync.restore();
            stub_pepino_convert.restore();
        });

        it('should translate the step file', function() {
            stub_fs_readFileSync.returns(contentRead);
            stub_pepino_convert.returns(contentTranslated);
            gpepino.translateStepFile({
                path: path,
                contents: new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
            });
            stub_fs_readFileSync.restore();

            var contentWritten = fs.readFileSync('./features/test.step.js', 'utf8');
            expect(contentWritten).to.be.equal(contentTranslated);
        });
    });
    
});