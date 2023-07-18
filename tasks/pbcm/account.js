const { createBulkAccountBilling } = require('../../repositories/account');
const { formatTimeFromMilliseconds } = require('../../utils/datetime');
const { readCsv } = require('../../utils/file');

const parseAccountBillingCsvData = (data) => {
  for (let i = 0; i < data.length; i++) {
    if (!data[i]) continue;

    if (i > 11) data[i] = parseFloat(data[i])
    else data[i] = data[i].replace(/\"/g, '');
  }

  return data;
}

const insertBulkAccountBillingCsvDataToDatabase = async (rows, count) => {
  const data = [];
  for (let row of rows) {
    const parsedRow = parseAccountBillingCsvData(row)
    data.push(parsedRow);
  }

  console.log(`[IN PROGRESS][insertBulkAccountBillingCsvDataToDatabase]: Inserting data ${count - rows.length + 1} - ${count}`)
  await createBulkAccountBilling(data);
};

const migrateAccountBillingsFromCSVToDatabase = async () => {
  try {
    const bulkInterval = 50000;
    const start = performance.now();
    const filename = "assets/b2b_pbcm_dash_acc_20230628.csv";
    await readCsv(
      filename,
      insertBulkAccountBillingCsvDataToDatabase,
      { interval: bulkInterval, separator: '^', maxConcurrent: 4 }
    );
    const end = performance.now();

    console.log(`Time taken with bulk interval ${bulkInterval}: ${formatTimeFromMilliseconds(end - start)}`)
  } catch (error) {
    console.log('Error migrateAccountBillingDataFromCSVToDatabase:');
    console.log(error.message);
  }
};

module.exports = {
  migrateAccountBillingsFromCSVToDatabase
};