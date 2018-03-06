'use strict';

const fs = require('fs');

module.exports.pwd = function (args, done) {
  done(process.cwd());
}

module.exports.ls = function (args, done) {
   fs.readdir('.', function(err, filenames) {
      if (err) throw err;
      done(filenames.join('\n'));
      });
}

  module.exports.date = function(args, done) {
    done(Date());
  }

  module.exports.echo = function (args, done) {
  const output = args
  .split(' ')
  .map(function(arg){
    return (arg[0] === '$') ? process.env[arg.slice(1)] : arg;
  })
  .join(' ');
  done(output);
}
