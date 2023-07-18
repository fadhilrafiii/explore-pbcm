const { CREDIT_SCORING_PROJECT_COLUMNS } = require("../constants/creditScoring");
const { dbQuery } = require("./db");

const createCreditScoringProject = async (params) => {
  try {
    let query = 'INSERT INTO credit_scoring_account ('
    for (let idx = 0; idx < CREDIT_SCORING_PROJECT_COLUMNS.length; idx++) {
      if (idx === 0) query += ` ${CREDIT_SCORING_PROJECT_COLUMNS[idx]}`;
      else query += `, ${CREDIT_SCORING_PROJECT_COLUMNS[idx]}`
    }
    query +=  ') VALUES ?';

    return dbQuery(query, [params]);
  } catch (error) {
  }
};

module.exports = {
  createCreditScoringProject,
}