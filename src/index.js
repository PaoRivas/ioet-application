const fs = require('fs');
const {getCoincidences} = require("./tasks/coincidences.js");

try {
    let fileName = process.argv[2];
    if (fileName !== undefined) {
        const fileData = fs.readFileSync(fileName, 'utf-8');
        const coincidences = getCoincidences(fileData);
        console.table(coincidences);
    } else {
        throw new Error('File name missing!');
    }
} catch(e) {
    console.error(e);
}