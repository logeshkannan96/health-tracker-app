module.exports = {
  sendResponse: function (res, data = {}, message = '', statusCode = 200) {
    res.status(statusCode).send({status: 'ok', data, message});
  },
  sendErrorResponse: function (res, data = {}, message = '', statusCode = 500) {
    res.status(statusCode).send({status: 'err', data, message});
  },
};
