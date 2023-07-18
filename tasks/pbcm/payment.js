const { createBulkPayment } = require('../repositories/payment');
const { readCsv, writeCsv } = require('../utils/file');

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

const writePaymentOneDayCsv = (rows) => {
  const csvOneDayFilepath = "assets/one_day_b2b_pbcm_dash_payment_20230628.csv"

  for (let row of rows) {
    const paymentDate = row.split('|')[1]
    if (paymentDate === '2023-06-28') writeCsv(csvOneDayFilepath, row);
  }
}

const migratePaymentsFromCSVToDatabase = async () => {
  try {
    const bulkInterval = 200;
    const start = performance.now();
    const filename = "assets/one_day_b2b_pbcm_dash_payment_20230628.csv";
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