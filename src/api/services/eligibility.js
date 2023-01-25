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

const modalidadeTarifa = (modalidade) => {
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

const verifyElegibility = (data) => {
  validateData(data);
  const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = data;
  const classe = classeConsumo(classeDeConsumo);
  const modalidade = modalidadeTarifa(modalidadeTarifaria);
  const consumo = consumoMinimo(historicoDeConsumo, tipoDeConexao);
  return [classe, modalidade, consumo];    
};

const isElegible = (data) => {
  const results = verifyElegibility(data);
  
  const razoesDeInelegibilidade = [];
  results.filter((elemento) => {
    if (elemento !== true) return razoesDeInelegibilidade.push(elemento);
    return false;
  });
  if (razoesDeInelegibilidade.length) return { elegivel: false, razoesDeInelegibilidade };

  const { historicoDeConsumo } = data;
  const economiaCO2 = reducaoCO2(historicoDeConsumo);
  return {
    elegivel: true,
    economiaAnualDeCO2: Number(economiaCO2),
  };
};

module.exports = { isElegible };
