const { StatusCodes } = require('http-status-codes');
const { teste } = require('../services/eligibility');

module.exports = {
  teste: (req, res) => {
    teste(req.body);
    const elegivel = {
      elegivel: true,
      economiaAnualDeCO2: 5553.24,
    };
    const inelegivel = {
      elegivel: false,
      razoesInelegibilidade: [
        'Classe de consumo não aceita',
        'Modalidade tarifária não aceita',
      ],
    };
    res.status(StatusCodes.OK).json({ elegivel, inelegivel });
  },
};