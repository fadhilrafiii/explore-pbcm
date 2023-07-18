const { createCreditScoringWriteOff } = require("../../repositories/creditScoringWriteOff");
const { formatTimeFromMilliseconds } = require("../../utils/datetime");
const { parseCsvToJson } = require("../../utils/file");

const migrateCreditScoringWriteOffsCsvToDatabase = async () => {
  try {
    const startTime = performance.now();
    console.log("[migrateCreditScoringWriteOffsCsvToDatabase][IN PROGRESS] Migrating credit scoring writeoffs csv...");
    const creditScoringWriteOffsFilePath = 'assets/write_off_details_20230710_v2.csv';
    console.log("[migrateCreditScoringWriteOffsCsvToDatabase][IN PROGRESS] Parsing CSV credit scoring writeoffs...");
    const data = await parseCsvToJson(creditScoringWriteOffsFilePath);
    console.log("[migrateCreditScoringWriteOffsCsvToDatabase][IN PROGRESS] Finish parsing CSV credit scoring writeoffs, start storing to DB...");
    const bulkSize = 5000;
    console.log(data.length, 'FADHIL');

    for (let startIdx = 0; startIdx < data.length; startIdx += bulkSize) {
      const tempData = [];
      for (let idx = startIdx; idx < startIdx + bulkSize && idx < data.length; idx++) {
        if (idx === 270397) console.log(data[idx])
        tempData.push(data[idx]);
      }
      // return;
      console.log(`[migrateCreditScoringWriteOffsCsvToDatabase][IN PROGRESS] Storing records ${startIdx + 1} - ${startIdx + bulkSize + 1 >= data.length ? data.length : startIdx + bulkSize}`)
      await createCreditScoringWriteOff(tempData);
    };

    console.log(`[migrateCreditScoringWriteOffsCsvToDatabase][SUCCESS] Migrating credit scoring writeoffs csv with ${data.length} rows`);
    
    const finishTime = performance.now();
    console.log(`Time taken: ${formatTimeFromMilliseconds(finishTime - startTime)}`)
  } catch (error) {
    console.log(`[ERROR][migrateCreditScoringWriteOffsCsvToDatabase]: ${error}`)
  }
};

module.exports = {
  migrateCreditScoringWriteOffsCsvToDatabase,
}