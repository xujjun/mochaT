var fs = require("fs")

var data = fs.readFileSync('environment.txt');
console.log("check the environment is: " + data.toString());
var app = data.toString();
module.exports = app;