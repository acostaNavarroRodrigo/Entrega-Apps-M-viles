const fs = require('fs');

console.time('syn');
const data = fs.readFileSync('C:/Celular ro/Viajes/fotos y videos/20170412_194536.mp4');
console.timeEnd('syn');

console.time('callback');
console.time('asyn');
fs.readFile('/Users/gustavogretter/Downloads/zigly1.gif', (err, data) => {
  console.timeLog('callback');
});
console.timeEnd('asyn');
