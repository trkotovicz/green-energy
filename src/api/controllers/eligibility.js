const { StatusCodes } = require('http-status-codes');
const { isElegible } = require('../services/eligibility');

module.exports = {
  eligibility: (req, res) => {
    const data = isElegible(req.body);
    res.status(StatusCodes.OK).json(data);
  },
};