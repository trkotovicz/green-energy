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
      numeroDoDocumento: joi.alternatives()
        .try(joi.string().length(11), joi.string().length(14)).required(),
      tipoDeConexao: joi.string().valid('monofasica', 'bifasica', 'trifasica').required(),
      classeDeConsumo: joi.string()
        .valid('residencial', 'industrial', 'comercial', 'rural', 'poderPublico').required(),
      modalidadeTarifaria: joi.string().valid('azul', 'branca', 'verde', 'convencional').required(),
      historicoDeConsumo: joi.array().items(joi.number().positive().integer().min(0)
        .max(9999)).min(3).max(12)
.required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
      error.name = 'ValidationError';
      error.status = 400;
      throw error;
    }
    return value;
  },
};
