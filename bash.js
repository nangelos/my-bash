const commands = require('./commands')
const chalk = require('chalk');
const prompt = chalk.blue('\nprompt > ');

var cmdGroups = [];

process.stdout.write(prompt);

process.stdin.on('data', function (data) {

cmdGroups = data.toString().trim().split(/\s*\|s*/g);
const unsafeCommands = getUnsafe(cmdGroups);
console.log(unsafeCommands, unsafeCommands.length);
if (unsafeCommands.length) {
  process.stderr.write(chalk.red('command(s) not found: ') + unsafeCommands.join(' '));
  cmdGroups = [];
  done('');
}
else {
  execute(cmdGroups.shift());
}
});

function getUnsafe (cmdStrings) {
  return cmdStrings
  .map(cmdString => cmdString.split(' ')[0])
  .filter(cmd => !commands[cmd]);
}

function execute (cmdString, lastOutput) {
  const tokens = cmdString.toString().trim().split(' ');
  const cmd = tokens[0];
  const args = tokens.slice(1).join(' ');
  if (commands[cmd]) commands[cmd](lastOutput, args, done);
}

function done (output) {
  if (cmdGroups.length) {
    execute(cmdGroups.shift(), output);
  }
  else {
  process.stdout.write(output + prompt);
  }
}
