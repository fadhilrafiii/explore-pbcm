const {
  createPayment
} = require('../controllers/payment')

const BASE_PATH = '/api/payment';

module.exports = [
  {
    method: "POST",
    path: BASE_PATH,
    handler: createPayment, // Handler aka controller of the route
  },
]