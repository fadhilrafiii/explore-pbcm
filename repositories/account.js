const { dbQuery } = require("./db");

const createBulkAccountBilling = async (params) => {
  const query =
    'INSERT INTO account (' +
    ' segment, ' +
    ' subsegment, ' +
    ' region, ' +
    ' account_id, ' +
    ' account_name, ' +
    ' flag_synergi, ' +
    ' flag_si, ' +
    ' flag_m2m, ' +
    ' crm_name, ' +
    ' crm_account_name, ' +
    ' rt, ' +
    ' ba_rt, ' +
    ' bill_cycle, ' +
    ' bill_cycle_crm, ' +
    ' total_fa, ' +
    ' bill_amount_1, ' +
    ' bill_amount_2, ' +
    ' bill_amount_3, ' +
    ' bill_amount_4, ' +
    ' bill_amount_5, ' +
    ' bill_amount_6, ' +
    ' bill_amount_7, ' +
    ' bill_amount_8, ' +
    ' bill_amount_9, ' +
    ' bill_amount_10, ' +
    ' bill_amount_11, ' +
    ' bill_amount_12, ' +
    ' bucket_1, ' +
    ' bucket_2, ' +
    ' bucket_3, ' +
    ' bucket_4, ' +
    ' bucket_5, ' +
    ' bucket_6, ' +
    ' bucket_7, ' +
    ' bucket_8, ' +
    ' bucket_9, ' +
    ' bucket_10, ' +
    ' bucket_11, ' +
    ' bucket_12, ' +
    ' bucket_13, ' +
    ' total_bucket, ' +
    ' bill_before_due, ' +
    ' os_before_due, ' +
    ' bill_due_date, ' +
    ' os_due_date, ' +
    ' bill_over_due, ' +
    ' os_over_due, ' +
    ' bill_next_due, ' +
    ' os_next_due, ' +
    ' total_billing, ' +
    ' total_payment, ' +
    ' event_date ' +
    ') VALUES ?;';

  return dbQuery(query, [params]);
}

module.exports = {
  createBulkAccountBilling
};