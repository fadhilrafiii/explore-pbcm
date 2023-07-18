const { getTimeFromMilliseconds } = require("../utils/datetime");
const { dbQuery } = require("./db");

const createBulkPayment = async (params, count) => {
  const query =
    'INSERT INTO payment (' +
    ' payment_source, ' +
    ' payment_date, ' +
    ' channel_name, ' +
    ' account_number, ' +
    ' total_payment,' +
    ' segment, ' +
    ' subsegment, ' +
    ' region, ' +
    ' account_id, ' +
    ' account_name, ' +
    ' project_id, ' +
    ' project_name, ' +
    ' am_id, ' +
    ' am_name ' +
    ') VALUES ?;';

  const result = await dbQuery(query, [params]);

  return result;
}

module.exports = {
  createBulkPayment
};