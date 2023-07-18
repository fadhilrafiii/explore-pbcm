const { createCreditScoringProject } = require("../../repositories/creditScoringProject");
const { formatTimeFromMilliseconds } = require("../../utils/datetime");
const { parseCsvToJson } = require("../../utils/file");

const migrateCreditScoringProjectsCsvToDatabase = async () => {
  try {
    const startTime = performance.now();
    console.log("[migrateCreditScoringProjectsCsvToDatabase][IN PROGRESS] Migrating credit scoring project csv...");
    const creditScoringProjectFilePath = 'assets/credit_scoring_core_prj_20230710_v2.csv';
    console.log("[migrateCreditScoringProjectsCsvToDatabase][IN PROGRESS] Parsing CSV credit scoring project...");
    const data = await parseCsvToJson(creditScoringProjectFilePath);
    console.log("[migrateCreditScoringProjectsCsvToDatabase][IN PROGRESS] Finish parsing CSV credit scoring project, start storing to DB...");
    const bulkSize = 5000;

    for (let startIdx = 0; startIdx < data.length; startIdx += bulkSize) {
      const tempData = [];
      for (let idx = startIdx; idx < startIdx + bulkSize && idx < data.length; idx++) {
        tempData.push(data[idx]);
      }

      console.log(`[migrateCreditScoringProjectsCsvToDatabase][IN PROGRESS] Storing records ${startIdx + 1} - ${startIdx + bulkSize + 1 >= data.length ? data.length : startIdx + bulkSize}`)
      await createCreditScoringProject(tempData);
    };

    console.log(`[migrateCreditScoringProjectsCsvToDatabase][SUCCESS] Migrating credit scoring project csv with ${data.length} rows`);
    
    const finishTime = performance.now();
    console.log(`Time taken: ${formatTimeFromMilliseconds(finishTime - startTime)}`)
  } catch (error) {
    console.log(`[ERROR][migrateCreditScoringProjectsCsvToDatabase]: ${error}`)
  }
};

module.exports = {
  migrateCreditScoringProjectsCsvToDatabase,
}