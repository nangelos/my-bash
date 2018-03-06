'use strict';

const prompt = '\nprompt > ';
const fs = require('fs');

module.exports.pwd = function (filename) {
   process.stdout.write(process.cwd());
   process.stdout.write(prompt);
}

module.exports.ls = function (filenames) {
   fs.readdir('.', function(err, filenames) {
      if (err) throw err;
      process.stdout.write(filenames.join('\n'));
      process.stdout.write(prompt);
      });
}

module.exports.echo = function (args) {
  const output = args
  .split(' ')
  .map(function(arg){
    return (arg[0] === '$') ? process.env[arg.slice(1)] : arg;
  })
  .join(' ');
  process.stdout.write(output);
  process.stdout.write(prompt);
}

module.exports.date = function(filename) {
  process.stdout.write(Date());
  process.stdout.write(prompt);
}

// module.exports.cat = function (filename) {
//   fs.readFile('./' + filename, 'utf8', function(err, data) {
//     if (err) {throw err}
//     else {console.log(data);}
//   })
// };

// module.exports.head = function (filename) {
//   fs.readFile('./' + filename, 'utf8', function(err, data) {
//     if (err) {throw err}
//     else {console.log(data);}
//   })
// };
