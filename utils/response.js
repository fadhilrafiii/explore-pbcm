const errorResponse = (error) => {
  return {
    message: (error ? error.message : error) || 'Unknown error occured!',
    success: false
  }
}

const successResponse = (data, message) => {
  return {
    data,
    message: message || 'Transaction success!',
    success: true,
  }
}

module.exports = {
  errorResponse,
  successResponse,
}