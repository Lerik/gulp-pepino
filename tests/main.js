var gpepino = require('../index.js');
var sinon = require('sinon');
var assert = require('chai').assert;
var expect = require('chai').expect;
var fs = require('fs');
var pepino = require('pepino-lib');

describe('Gulp Pepino', function() {
    
    var readFileSyncSpy;
    var path ='./features/test.step';

    it('should be defined', function() {
        assert.isDefined(gpepino);
    });

    describe('When translating step file', function(){
        var contentRead = 'ContentToBeTranslated';
        var contentTranslated = 'ContentToBeWritten';
        var stub_fs_readFileSync, stub_pepino_convert;

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
            gpepino.translate(path);
            stub_fs_readFileSync.restore();

            var contentWritten = fs.readFileSync('./features/generatedCode.step.js', 'utf8');
            console.log(contentWritten);
            expect(contentWritten).to.be.equal(contentTranslated);
        });



    });

    
});