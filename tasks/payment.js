const { createBulkPayment } = require('../repositories/payment');
const { readCsv } = require('../utils/file');

const parsePaymentCsvData = (data) => {
  const values = data.split('|')
  
  for (let i = 0; i < values.length; i++) {
    if (i === 4) values[i] = parseFloat(values[i])
    else values[i] = values[i].replace(/\"/g, '');
  }

  return values;
}

const insertBulkPaymentCsvDataToDatabase = (rows) => {
  const data = [];
  for (let row of rows) {
    const parsedRow = parsePaymentCsvData(row)
    data.push(parsedRow);
  }

  createBulkPayment(data);
};

const migratePaymentsFromCSVToDatabase = async () => {
  try {
    const bulkInterval = 20000;
    const start = performance.now();
    const filename = "assets/b2b_pbcm_dash_payment_20230628.csv";
    await readCsv(filename, insertBulkPaymentCsvDataToDatabase, { interval: bulkInterval, includeHeader: false });
    const end = performance.now();

    console.log(`Time taken with bulk interval ${bulkInterval}: ${end - start}`)
  } catch (error) {
    console.log('Error migratePaymentDataFromCSVToDatabase:');
    console.log(error.message);
  }
};

module.exports = {
  migratePaymentsFromCSVToDatabase
};