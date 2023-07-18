const fs = require('fs');
const csvParser = require("csv-parser");
const { formatTimeFromMilliseconds } = require('./datetime');

const readCsv = async (
  filePath,
  callback = () => null,
  opts = { separator: '^', maxConcurrent: 1 }
) => {
  try {
    const parser = csvParser(opts);
    fs.createReadStream(filePath).pipe(parser);

    let data = [];
    let promises = [];
    let count = 0;
    let currentConcurrent = 0;
    for await (const row of parser) {
      const record = Object.values(row)[0].split('|').map((cell) => cell === 'NULL' || !cell ? null : cell);
      data.push(record);
      count++;

      if (opts.interval && data.length === opts.interval) {
        promises.push(callback(data, count));
        currentConcurrent++;

        data = [];
      }

      if (currentConcurrent === opts.maxConcurrent) {
        let start = performance.now();
        await Promise.all(promises);
        currentConcurrent = 0;
        promises = [];
        let end = performance.now();
        console.log(`Time to store ${opts.maxConcurrent} x ${opts.interval} data: ${formatTimeFromMilliseconds(end - start)}`)
      }
    }

    return data;
  } catch (error) {
    console.log(`[ERROR][readCsv]: ${error}`);
  }
}

const writeCsv = (filePath, data) => {
  try {
    fs.appendFileSync(filePath, data)
  } catch (error) {
    console.log(`[ERROR][writeCsv]: ${error}`)
  }
}

const parseCsvToJson = async (filePath, opts = { separator: '^' }) => {
  try {
    const parser = csvParser(opts);
    fs.createReadStream(filePath).pipe(parser);

    const data = []
    for await (const row of parser) {
      const record = Object.values(row)[0].split('|').map((cell) => cell === 'NULL' || !cell ? null : cell);
      data.push(record)
    }

    return data;
  } catch (error) {
    console.log(`[ERROR][parseCsvToJson]: ${error}`)
  }
}

module.exports = {
  readCsv,
  writeCsv,
  parseCsvToJson,
}