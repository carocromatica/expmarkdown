var path = require('path');
var filename = path.resolve('src/text.txt');
console.log(filename);


fs = require('fs')

fs.readFile(filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});