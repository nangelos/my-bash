'use strict';
const fs = require('fs');
const prompt = '\nprompt > ';

module.exports.cat = function(filenames){
  filenames = filenames.split(' ');
  const texts = [];
  var count = 0;
  filenames.forEach(function(filename, i){
    fs.readFile(filename, {encoding: 'utf8'}, function (err, text){
      if (err) throw err;
      count++;
      texts[i] = text;
      if (count === filenames.length) {
        process.stdout.write(texts.join(''));
        process.stdout.write(prompt);
      }
    });
  });

}

module.exports.head = function(args) {

}

module.exports.tail = function(args) {

}
