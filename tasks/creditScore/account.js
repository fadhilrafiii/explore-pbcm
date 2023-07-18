const { createCreditScoringAccount } = require("../../repositories/creditScoringAccount");
const { formatTimeFromMilliseconds } = require("../../utils/datetime");
const { parseCsvToJson } = require("../../utils/file");

const migrateCreditScoringAccountsCsvToDatabase = async () => {
  try {
    const startTime = performance.now();
    console.log("[migrateCreditScoringAccountsCsvToDatabase][IN PROGRESS] Migrating credit scoring accounts csv...");
    const creditScoringAccountsFilePath = 'assets/credit_scoring_core_acc_20230710_v2.csv';
    console.log("[migrateCreditScoringAccountsCsvToDatabase][IN PROGRESS] Parsing CSV credit scoring accounts...");
    const data = await parseCsvToJson(creditScoringAccountsFilePath);
    console.log("[migrateCreditScoringAccountsCsvToDatabase][IN PROGRESS] Finish parsing CSV credit scoring accounts, start storing to DB...");
    const bulkSize = 5000;

    for (let startIdx = 0; startIdx < data.length; startIdx += bulkSize) {
      const tempData = [];
      for (let idx = startIdx; idx < startIdx + bulkSize && idx < data.length; idx++) {
        if (idx === 270397) console.log(data[idx])
        tempData.push(data[idx]);
      }

      console.log(`[migrateCreditScoringAccountsCsvToDatabase][IN PROGRESS] Storing records ${startIdx + 1} - ${startIdx + bulkSize + 1 >= data.length ? data.length : startIdx + bulkSize}`)
      await createCreditScoringAccount(tempData);
    };

    console.log(`[migrateCreditScoringAccountsCsvToDatabase][SUCCESS] Migrating credit scoring accounts csv with ${data.length} rows`);
    
    const finishTime = performance.now();
    console.log(`Time taken: ${formatTimeFromMilliseconds(finishTime - startTime)}`)
  } catch (error) {
    console.log(`[ERROR][migrateCreditScoringAccountsCsvToDatabase]: ${error}`)
  }
};

module.exports = {
  migrateCreditScoringAccountsCsvToDatabase,
}