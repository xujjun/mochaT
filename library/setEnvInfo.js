var program = require('commander');
var fs = require("fs")

program
  .version('0.1.0')
  .option('-p, --preview', 'http://preview.airwallex.com:30001')
  .option('-d, --demo', 'https://demo.airwallex.com:30001')
  .parse(process.argv);

console.log('the environment as below:');
if (program.preview) {
    var app = 'http://preview.airwallex.com:30001';
    console.log('  - preview') 
}

if (program.demo) {
    var app = 'https://demo.airwallex.com:30001';
    console.log('  - demo');
}

fs.writeFileSync('environment.txt',app);
var data = fs.readFileSync('environment.txt');
console.log("check the environment is: " + data);

// module.exports = data;