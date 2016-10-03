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
            stub_proc_exec = sinon.stub(proc, 'exec');

        });

        afterEach(function() {
            stub_fs_readFileSync.restore();
            stub_pepino_convert.restore();
            stub_proc_exec.restore();
        });

        it('should translate the step file', function() {
            stub_fs_readFileSync.returns(contentRead);
            stub_pepino_convert.returns(contentTranslated);
            gpepino.translate(path);
            stub_fs_readFileSync.restore();

            var contentWritten = fs.readFileSync('./features/generatedCode.step.js', 'utf8');
            console.log(contentWritten);
            expect(contentWritten).to.be.equal(contentTranslated);
        });

        it('should run chimp', function(){
            
            gpepino.runChimp(path.substring(0, path.lastIndexOf('/')), {});
            sinon.assert.called(proc.exec);
        });


    });

    
});