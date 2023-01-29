import joi from 'joi';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { ErrorTypes } from '../errors/catalog';

const validateCpf = (data: string) => {
  const isValid = cpf.isValid(data);
  if (!isValid) throw new Error(ErrorTypes.InvalidFormatError);
};

const validateCnpj = (data: string) => {
  const isValid = cnpj.isValid(data);
  if (!isValid) throw new Error(ErrorTypes.InvalidFormatError);
};

const eligibilitySchema = (data: object) => {
  const schema = joi.object({
    numeroDoDocumento: joi.alternatives()
      .try(joi.string().length(11), joi.string().length(14)).required(),
    tipoDeConexao: joi.string().valid('monofasica', 'bifasica', 'trifasica').required(),
    classeDeConsumo: joi.string()
      .valid('residencial', 'industrial', 'comercial', 'rural', 'poderPublico').required(),
    modalidadeTarifaria: joi.string().valid('azul', 'branca', 'verde', 'convencional').required(),
    historicoDeConsumo: joi.array().items(joi.number().positive().integer().min(0)
      .max(9999)).min(3).max(12).required(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw new Error(ErrorTypes.ValidationError);
  return value;
};

export { validateCpf, validateCnpj, eligibilitySchema }
