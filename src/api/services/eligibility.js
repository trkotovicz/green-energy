const { validateCpf, validateCnpj, eligibilitySchema } = require('../utils/validations');

module.exports = {
  teste: (data) => {
    const { numeroDoDocumento } = data;
    if (String(numeroDoDocumento).length === 11) validateCpf(numeroDoDocumento);
    if (String(numeroDoDocumento).length === 14) validateCnpj(numeroDoDocumento);
    eligibilitySchema(data);
    return data;
  },
};
