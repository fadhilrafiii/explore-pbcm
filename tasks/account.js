const { createBulkAccountBilling } = require('../repositories/account');
const { readCsv } = require('../utils/file');

const parseAccountBillingCsvData = (data) => {
  const values = data.split('|')
  console.log(values.length)
  
  for (let i = 0; i < values.length; i++) {
    if (i > 11) values[i] = parseFloat(values[i])
    else values[i] = values[i].replace(/\"/g, '');
  }

  return values;
}

const insertBulkAccountBillingCsvDataToDatabase = (rows) => {
  const data = [];
  for (let row of rows) {
    const parsedRow = parseAccountBillingCsvData(row)
    data.push(parsedRow);
  }

  createBulkAccountBilling(data);
};

const migrateAccountBillingsFromCSVToDatabase = async () => {
  try {
    const bulkInterval = 1;
    const start = performance.now();
    const filename = "assets/b2b_pbcm_dash_acc_20230628.csv";
    await readCsv(filename, insertBulkAccountBillingCsvDataToDatabase, { interval: bulkInterval, includeHeader: false });
    const end = performance.now();

    console.log(`Time taken with bulk interval ${bulkInterval}: ${end - start}`)
  } catch (error) {
    console.log('Error migrateAccountBillingDataFromCSVToDatabase:');
    console.log(error.message);
  }
};

module.exports = {
  migrateAccountBillingsFromCSVToDatabase
};