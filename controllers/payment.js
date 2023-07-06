const Response = require('../utils/response')

const createPayment = async (_, res) => {
  try {
    return res.response(Response.successResponse(null))
  } catch (err) {
    return res.response(Response.errorResponse(err))
  }
}

module.exports = {
  createPayment
}