const commands = require('./commands')
const chalk = require('chalk');
const prompt = chalk.blue('\nprompt > ');

process.stdout.write(prompt);

process.stdin.on('data', function (data) {
 const tokens = data.toString().trim().split(' ');
 const cmd = tokens[0];
 const args = tokens.slice(1).join(' ');
 if (commands[cmd]) commands[cmd](args, done);
 else process.stderr.write('Command not found: ' + cmd);
//  process.stdout.write(prompt);
});

function done (output) {
  process.stdout.write(output + prompt);
}
