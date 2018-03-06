'use strict';

const fs = require('fs');
const request = require('request');

module.exports.cat = function(stdin, filenames, done){
  if (stdin && !filenames) return done(stdin);
  filenames = filenames.split(' ');
  const texts = [];
  var count = 0;
  filenames.forEach(function(filename, i){
    fs.readFile(filename, {encoding: 'utf8'}, function (err, text){
      if (err) throw err;
      if (!text) text = '';
      texts[i] = text;
      count++;
      if (count === filenames.length) done(texts.join(''));
    });
  });

}

module.exports.head = function(stdin, filename, done) {
  if (stdin && !filename) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput)
  function produceOutput (err, text){
    if (err) throw err;
    done(text.split('\n').slice(0, 5).join('\n'));
  }
}

module.exports.tail = function(stdin, filename, done) {
  if (stdin && !filename) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput)
  function produceOutput(err, text){
    if (err) throw err;
    done(text.split('\n').slice(-5).join('\n'));
  }
}

module.exports.sort = function(stdin, filename, done) {
  if (stdin && !filename) produceOutput(null, stdin)
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput)
  function produceOutput(err, text){
    if (err) throw err;
    const lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] === lines[i + 1]) {
        lines.splice(i, 1);
        i--;
      }
    }
    done(lines.join('\n'));
  }
}

module.exports.wc = function(stdin, filename, done) {
  if (stdin && !filename) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput)
  function produceOutput (err, text){
    if (err) throw err;
    done(text.split('\n').length);
  }
}

module.exports.uniq = function(stdin, filename, done) {
  if (stdin && !filename) produceOutput(null, stdin);
  else fs.readFile(filename, {encoding: 'utf8'}, produceOutput)
  function produceOutput(err, text){
    if (err) throw err;
    done(text.split('\n').length);
  }
}

module.exports.curl = function (url, done) {
  if (url.slice(0,7) !== 'http://') url = 'http://' + url;
  request(url, function (err, response, body){
    if (err) throw err;
    else if (response && (response.statusCode > 399)) throw new Error(response.statusCode)
    if (body) done(body)
    else done('');
  });
}
