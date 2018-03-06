'use strict';
const fs = require('fs');

module.exports.cat = function(filenames, done){
  filenames = filenames.split(' ');
  const texts = [];
  var count = 0;
  filenames.forEach(function(filename, i){
    fs.readFile(filename, {encoding: 'utf8'}, function (err, text){
      if (err) throw err;
      count++;
      texts[i] = text;
      if (count === filenames.length) {
        done(texts.join(''));
      }
    });
  });

}

module.exports.head = function(filename, done) {
  fs.readFile(filename, {encoding: 'utf8'}, function(err, text){
    if (err) throw err;
    done(text.split('\n').slice(0, 5).join('\n'));
  });
}

module.exports.tail = function(filename, done) {
  fs.readFile(filename, {encoding: 'utf8'}, function(err, text){
    if (err) throw err;
    done(text.split('\n').slice(-5).join('\n'));
  });
}

module.exports.sort = function(filename, done) {
  fs.readFile(filename, {encoding: 'utf8'}, function(err, text){
    if (err) throw err;
    const lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] === lines[i + 1]) {
        lines.splice(i, 1);
        i--;
      }
    }
    done(lines.join('\n'));
  });
}

module.exports.wc = function(filename, done) {
  fs.readFile(filename, {encoding: 'utf8'}, function(err, text){
    if (err) throw err;
    done(text.split('\n').length);
  });
}

module.exports.uniq = function(filename, done) {
  fs.readFile(filename, {encoding: 'utf8'}, function(err, text){
    if (err) throw err;
    done(text.split('\n').length);
  });
}

module.exports.curl = function (url, done) {

}
