const { validateCpf, validateCnpj, eligibilitySchema } = require('../utils/validations');

const validateData = (data) => {
  const { numeroDoDocumento } = data;
  if (String(numeroDoDocumento).length === 11) validateCpf(numeroDoDocumento);
  if (String(numeroDoDocumento).length === 14) validateCnpj(numeroDoDocumento);
  eligibilitySchema(data);
  return true;
};

const classeConsumo = (classe) => {
  switch (classe.toLowerCase()) {
    case 'comercial':
      return true;
    case 'residencial':
      return true;
    case 'industrial':
      return true;
    default:
      return 'Classe de consumo não aceita';
  }
};

const modalidadeTarifaria = (modalidade) => {
  switch (modalidade.toLowerCase()) {
    case 'convencional':
      return true;
    case 'branca':
      return true;
    default:
      return 'Modalidade tarifária não aceita';
  }
};

const mediaConsumo = (historico) => {
  const tamanho = historico.length;
  const soma = historico.reduce((acc, curr) => acc + curr, 0);
  return (soma / tamanho).toFixed(2);
};

const consumoMinimo = (historico, conexao) => {
  const media = mediaConsumo(historico);
  const minTiposConexao = {
    monofasica: 400,
    bifasica: 500,
    trifasica: 750,
  };
  if (Number(media) > minTiposConexao[conexao]) return true;
  return 'Consumo muito baixo para tipo de conexão';
};

const reducaoCO2 = (consumo) => {
  const consumoAnual = mediaConsumo(consumo) * 12;
  return (consumoAnual * 0.084).toFixed(2);
};

module.exports = {

};

const arrayHistorico = [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597];
console.log(classeConsumo('rural'));
console.log(modalidadeTarifaria('azul'));
console.log(mediaConsumo(arrayHistorico));
console.log(consumoMinimo(arrayHistorico, 'trifasica'));
console.log(reducaoCO2(arrayHistorico));
