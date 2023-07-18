const { CREDIT_SCORING_WRITEOFF_COLUMNS } = require("../constants/creditScoring");
const { dbQuery } = require("./db");

const createCreditScoringWriteOff = (params) => {
  try {
    let query = 'INSERT INTO credit_scoring_write_off ('
    for (let idx = 0; idx < CREDIT_SCORING_WRITEOFF_COLUMNS.length; idx++) {
      if (idx === 0) query += ` ${CREDIT_SCORING_WRITEOFF_COLUMNS[idx]}`;
      else query += `, ${CREDIT_SCORING_WRITEOFF_COLUMNS[idx]}`
    }
    
    query +=  ') VALUES ?';

    return dbQuery(query, [params]);
  } catch (error) {
    console.log(`[ERROR][createCreditScoringWriteOffs]: ${error}`);
  }
}

module.exports = {
  createCreditScoringWriteOff,
}