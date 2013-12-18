var es = require('event-stream');
var iced = require('iced-coffee-script');
var gutil = require('gulp-util');
var formatError = require('./lib/formatError');

module.exports = function(opt){
  function modifyFile(file, cb){
    try {
      file.contents = iced.compile(String(file.contents), opt);
    } catch (err) {
      var newError = formatError(file, err);
      return cb(newError);
    }
    file.path = gutil.replaceExtension(file.path, ".js");
    cb(null, file);
  }

  return es.map(modifyFile);
};
