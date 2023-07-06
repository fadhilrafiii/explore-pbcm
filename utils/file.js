const fs = require('fs');
const csvParser = require("csv-parser");

const readCsv = (
  filename,
  callback = () => null,
  options = {
    interval: 200,
    includeHeader: false
  }
) => {
  return new Promise((resolve) => {
    let result = [];
    let count = 0;
    fs.createReadStream(filename)
      .pipe(csvParser())
      .on("data", (data) => {
        if (result.length === options.interval) { // read reach interval
          callback(result);
          result = [];
        }
  
        // flag for adding the header also or not
        if (count > 0 || options.includeHeader) {
          result.push(Object.values(data)?.[0]);
          console.log(`[IN PROGRESS][Reading CSV ${filename}]: Row ${count + 1}`)
        }
        count++;
      })
      .on("end", () => {
        console.log(`[COMPLETE][Reading CSV ${filename}]: Finish reading ${count} rows of ${filename}`)
      });

    resolve({ result, count });
  });
};

module.exports = {
  readCsv
}