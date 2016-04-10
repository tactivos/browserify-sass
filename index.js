var path = require('path');
var through = require('through2');
var sass = require('node-sass');

var extensions = ['.scss', '.sass'];

module.exports = function (b, opts) {
  if (extensions.indexOf(path.extname(b)) === -1) {
    return through();
  }

  function read(data, encoding, callback) {
    callback();
  }

  function end() {
    var css = sass.renderSync({file: b, outputStyle: 'compressed'}).css.toString('utf8');
    this.push('module.exports = ' + JSON.stringify(css.trim()) + ';');
    this.push(null);
  }

  return through(read, end);
};
