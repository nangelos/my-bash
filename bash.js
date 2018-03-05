const commands = require('./commands.js')
const prompt = '\nprompt > ';

process.stdout.write(prompt);

process.stdin.on('data', function (data) {
 const cmd = data.toString().trim();//.split(' ');
 if (commands[cmd]) commands[cmd]();
 else process.stderr.write('Command not found: ' + cmd);
 process.stdout.write(prompt);
});
