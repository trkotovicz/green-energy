const { expect } = require('chai');
const { dataSuccess, dataFailure, historicoConsumo, historicoConsumoInelegivel,
  razoesDeInelegibilidade, responseSuccess, responseFailure,
} = require('../mocks/eligibilityMocks');
const EligibilityService = require('../../src/api/services/Eligibility');

describe('Testa a função validateData', () => {

  it('Em caso de sucesso deve retornar true', () => {
    const data = EligibilityService.validateData(dataSuccess);
    expect(data).to.eq(true);
  });
});

describe('Testa a função classeConsumo', () => {

  it('Em caso de sucesso deve retornar true', () => {
    const classe = EligibilityService.classeConsumo('comercial');
    expect(classe).to.eq(true);
  });

  it('Em caso de falha deve retornar "Classe de consumo não aceita"', () => {
    const classe = EligibilityService.classeConsumo('rural');
    expect(classe).to.eq('Classe de consumo não aceita');
  });
});

describe('Testa a função modalidadeTarifa', () => {

  it('Em caso de sucesso deve retornar true', () => {
    const modalidade = EligibilityService.modalidadeTarifa('convencional');
    expect(modalidade).to.eq(true);
  });

  it('Em caso de falha deve retornar "Modalidade tarifária não aceita"', () => {
    const modalidade = EligibilityService.modalidadeTarifa('azul');
    expect(modalidade).to.eq('Modalidade tarifária não aceita');
  });
});

describe('Testa a função mediaConsumo', () => {

  it('Deve retornar a média de consumo do cliente com duas casas decimais', () => {
    const media = EligibilityService.mediaConsumo(historicoConsumo);
    expect(media).to.eq('4978.40');
  });
});

describe('Testa a função consumoMinimo', () => {

  it('Em caso de sucesso deve retornar true', () => {
    const consumo = EligibilityService.consumoMinimo(historicoConsumo, 'monofasica');
    expect(consumo).to.eq(true);
  });

  it('Em caso de falha deve retornar "Consumo muito baixo para tipo de conexão"', () => {
    const consumo = EligibilityService.consumoMinimo(historicoConsumoInelegivel, 'trifasica');
    expect(consumo).to.eq('Consumo muito baixo para tipo de conexão');
  });
});

describe('Testa a função reducaoCO2', () => {

  it('Deve retornar a estimativa de quanto CO2 o cliente deixará de emitir em um ano', () => {
    const CO2 = EligibilityService.reducaoCO2(historicoConsumo);
    expect(CO2).to.eq('5018.23');
  });
});

describe('Testa a função verifyElegibility', () => {

  it('Retorna um array com 3 itens', () => {
    const data = EligibilityService.verifyElegibility(dataSuccess);
    expect(data).to.have.length(3);
  });

  it('Em caso de cliente elegível, retorna um array onde os 3 items são true', () => {
    const data = EligibilityService.verifyElegibility(dataSuccess);
    const isTrue = data.every((elem) => (elem === true));
    expect(isTrue).to.eq(true);
  });

  it('Em caso de cliente não elegível, retorna um array com os motivos da inegibilidade', () => {
    const data = EligibilityService.verifyElegibility(dataFailure);
    expect(data).to.deep.eq(razoesDeInelegibilidade);
  });
});

describe('Testa a função isElegible', () => {

  it('Retorna um objeto', () => {
    const data = EligibilityService.isElegible(dataSuccess);
    expect(data).to.be.instanceOf(Object);
  });

  it('Em caso de cliente elegível, retorna um objeto com as chaves "elegivel" e "economiaAnualDeCO2"', () => {
    const data = EligibilityService.isElegible(dataSuccess);
    expect(data).to.contains.keys('elegivel');
    expect(data).to.contains.keys('economiaAnualDeCO2');
  });

  it('Em caso de cliente elegível, retorna true para elegivel e o valor da econômia anual de CO2', () => {
    const data = EligibilityService.isElegible(dataSuccess);
    expect(data).to.deep.equal(responseSuccess);
  });

  it('Em caso de cliente não elegível, retorna false para elegivel e um array com os motivos da inegibilidade', () => {
    const data = EligibilityService.isElegible(dataFailure);
    expect(data).to.deep.equal(responseFailure);
  });
});
