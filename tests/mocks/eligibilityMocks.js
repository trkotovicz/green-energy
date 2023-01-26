const historicoConsumo = [3878, 9760, 5976, 2797, 2481];

const historicoConsumoInelegivel = [278, 760, 576, 797, 481];

const razoesDeInelegibilidade = [
  'Classe de consumo não aceita',
  'Modalidade tarifária não aceita',
  'Consumo muito baixo para tipo de conexão',
];

const responseSuccess = {
  elegivel: true,
  economiaAnualDeCO2: 5553.24,
};

const responseFailure = {
  elegivel: false,
  razoesDeInelegibilidade: [
    'Classe de consumo não aceita',
    'Modalidade tarifária não aceita',
    'Consumo muito baixo para tipo de conexão',
  ],
};

const dataSuccess = {
  numeroDoDocumento: '46241772000116',
  tipoDeConexao: 'bifasica',
  classeDeConsumo: 'comercial',
  modalidadeTarifaria: 'convencional',
  historicoDeConsumo: [
    3878,
    9760,
    5976,
    2797,
    2481,
    5731,
    7538,
    4392,
    7859,
    4160,
    6941,
    4597,
  ],
};

const dataFailure = {
  numeroDoDocumento: '46241772000116',
  tipoDeConexao: 'trifasica',
  classeDeConsumo: 'rural',
  modalidadeTarifaria: 'verde',
  historicoDeConsumo: [
    278,
    760,
    576,
    297,
    481,
    531,
    538,
    492,
    859,
    160,
  ],
};

module.exports = {
  dataSuccess,
  dataFailure,
  historicoConsumo,
  historicoConsumoInelegivel,
  razoesDeInelegibilidade,
  responseSuccess,
  responseFailure,
};
