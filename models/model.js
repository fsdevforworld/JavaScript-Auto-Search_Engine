const csvToJson = require('convert-csv-to-json');

const fileInputName = 'models/data.csv'; 
const fileOutputName = 'data.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
