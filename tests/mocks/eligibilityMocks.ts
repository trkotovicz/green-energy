import { classeDeConsumo, modalidadeTarifaria, tipoConexao } from "../../src/interfaces/IEligibility";

export const mock = {
  historicoConsumo: [3878, 9760, 5976, 2797, 2481],  
  historicoConsumoInelegivel: [278, 760, 576, 797, 481],

  razoesDeInelegibilidade: [
    'Classe de consumo não aceita',
    'Modalidade tarifária não aceita',
    'Consumo muito baixo para tipo de conexão',
  ],

  classeConsumo: classeDeConsumo.comercial,
  classeConsumoInelegivel: classeDeConsumo.rural,

  modalidadeTarifa: modalidadeTarifaria.convencional,
  modalidadeTarifaInelegivel: modalidadeTarifaria.verde,

  conexaoMonofasica: tipoConexao.monofasica,
  conexaoTrifasica: tipoConexao.trifasica,

  bodyFailure: {
    numeroDoDocumento: '46241772000116',
    tipoDeConexao: tipoConexao.trifasica,
    classeDeConsumo: classeDeConsumo.rural,
    modalidadeTarifaria: modalidadeTarifaria.verde,
    historicoDeConsumo: [278]
  },

  dataSuccess: {
    numeroDoDocumento: '46241772000116',
    tipoDeConexao: tipoConexao.bifasica,
    classeDeConsumo: classeDeConsumo.comercial,
    modalidadeTarifaria: modalidadeTarifaria.convencional,
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
  },

  responseSuccess: {
    elegivel: true,
    economiaAnualDeCO2: 5553.24,
  },

  dataFailure: {
    numeroDoDocumento: '46241772000116',
    tipoDeConexao: tipoConexao.trifasica,
    classeDeConsumo: classeDeConsumo.rural,
    modalidadeTarifaria: modalidadeTarifaria.verde,
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
  },

  responseFailure: {
    elegivel: false,
    razoesDeInelegibilidade: [
      'Classe de consumo não aceita',
      'Modalidade tarifária não aceita',
      'Consumo muito baixo para tipo de conexão',
    ],
  },
}

// const historicoConsumo = [3878, 9760, 5976, 2797, 2481];
// const historicoConsumoInelegivel = [278, 760, 576, 797, 481];

// const razoesDeInelegibilidade = [
//   'Classe de consumo não aceita',
//   'Modalidade tarifária não aceita',
//   'Consumo muito baixo para tipo de conexão',
// ];

// const classeConsumo = classeDeConsumo.comercial;
// const classeConsumoInelegivel = classeDeConsumo.rural;

// const responseSuccess = {
//   elegivel: true,
//   economiaAnualDeCO2: 5553.24,
// };

// const responseFailure = {
//   elegivel: false,
//   razoesDeInelegibilidade: [
//     'Classe de consumo não aceita',
//     'Modalidade tarifária não aceita',
//     'Consumo muito baixo para tipo de conexão',
//   ],
// };

// const dataSuccess: IEligibility = {
//   numeroDoDocumento: '46241772000116',
//   tipoDeConexao: tipoConexao.bifasica,
//   classeDeConsumo: classeDeConsumo.comercial,
//   modalidadeTarifaria: modalidadeTarifaria.convencional,
//   historicoDeConsumo: [
//     3878,
//     9760,
//     5976,
//     2797,
//     2481,
//     5731,
//     7538,
//     4392,
//     7859,
//     4160,
//     6941,
//     4597,
//   ],
// };

// const dataFailure = {
//   numeroDoDocumento: '46241772000116',
//   tipoDeConexao: tipoConexao.trifasica,
//   classeDeConsumo: classeDeConsumo.rural,
//   modalidadeTarifaria: modalidadeTarifaria.verde,
//   historicoDeConsumo: [
//     278,
//     760,
//     576,
//     297,
//     481,
//     531,
//     538,
//     492,
//     859,
//     160,
//   ],
// };

// export {
//   dataSuccess,
//   dataFailure,
//   historicoConsumo,
//   historicoConsumoInelegivel,
//   razoesDeInelegibilidade,
//   responseSuccess,
//   responseFailure,
//   classeConsumo,
//   classeConsumoInelegivel,
// };
