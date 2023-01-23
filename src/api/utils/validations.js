const joi = require('joi');
const { cpf, cnpj } = require('cpf-cnpj-validator');

module.exports = {
  validateCpf: (data) => {
    const isValid = cpf.isValid(data);
    if (!isValid) {
      const error = new Error('invalidCPF');
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
  },

  validateCnpj: (data) => {
    const isValid = cnpj.isValid(data);
    if (!isValid) {
      const error = new Error('invalidCNPJ');
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
  },

  eligibilitySchema: (data) => {
    const schema = joi.object({
      numeroDoDocumento: joi.alternatives().try(
        joi.string().pattern('^[0-9]+$').length(11),
        joi.string().pattern('^[0-9]+$').length(14)),
      tipoDeConexao: joi.string().valid('monofasico', 'bifasico', 'trifasico'),
      classeDeConsumo: joi.string().valid('residencial', 'industrial', 'comercial', 'rural', 'poderPublico'),
      modalidadeTarifaria: joi.string().valid('azul', 'branca', 'verde', 'convencional'),
      historicoDeConsumo: joi.array().items(
        joi.number().positive().integer().min(0).max(9999)
      ).min(3).max(12)
    }).required();

    const { error, value } = schema.validate(data);
    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
    return value;
  },
}
