const data = require('./defaultQuestions');
const fs   = require('fs');
const path = require('path');
fs.writeFileSync(path.join(__dirname, 'defaultQuestions.json'), JSON.stringify(data, null, 2));
console.log('Exported defaultQuestions.json');
