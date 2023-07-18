const { CREDIT_SCORING_ACCOUNT_COLUMNS } = require("../constants/creditScoring");
const { dbQuery } = require("./db");

const createCreditScoringAccount = (params) => {
  try {
    let query = 'INSERT INTO credit_scoring_write_off ('
    for (let idx = 0; idx < CREDIT_SCORING_ACCOUNT_COLUMNS.length; idx++) {
      if (idx === 0) query += ` ${CREDIT_SCORING_ACCOUNT_COLUMNS[idx]}`;
      else query += `, ${CREDIT_SCORING_ACCOUNT_COLUMNS[idx]}`
    }
    
    query +=  ') VALUES ?';
    return dbQuery(query, [params]);
  } catch (error) {
    console.log(`[ERROR][createCreditScoringAccounts]: ${error}`);
  }
}

module.exports = {
  createCreditScoringAccount,
}