var browserify = require('browserify');
var concatStream = require('concat-stream');
var partialify = require('partialify');

var assert = require('chai').assert;

var sass = require('..');

describe('browserify-sass', function() {
  it('should transform scss file', function(done) {
    var b = browserify();
    b.transform(sass);
    b.transform(partialify);
    b.require(__dirname + '/fixture.scss');
    b.bundle().pipe(concatStream(function(result) {
      assert.include(result.toString(), "module.exports = 'p a{color:red}';");
      done();
    }));
  });
});
