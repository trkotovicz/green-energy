import { expect } from 'chai';
import EligibilityService from '../../src/services/Eligibility';
import { mock } from '../mocks/eligibilityMocks';

describe('Testa a função validateData', () => {
  it('Em caso de sucesso deve retornar true', () => {
    const data = EligibilityService.prototype.validateData(mock.dataSuccess);
    expect(data).to.be.equal(true);
  });
});

describe('Testa a função classeConsumo', () => {
  describe('Em caso de sucesso', () => {
    it('Deve retornar true', () => {
      const data = EligibilityService.prototype.classeConsumo(mock.classeConsumo);
      expect(data).to.eq(true);
    });
  });

  describe('Em caso de falha', () => {
    it('Deve retornar "Classe de consumo não aceita"', () => {
      const data = EligibilityService.prototype.classeConsumo(mock.classeConsumoInelegivel)
      expect(data).to.eq('Classe de consumo não aceita');
    });
  });
});

describe('Testa a função modalidadeTarifa', () => {
  describe('Caso seja uma modalidade aceita', () => {
    it('Deve retornar true', () => {
      const data = EligibilityService.prototype.modalidadeTarifa(mock.modalidadeTarifa);
      expect(data).to.eq(true);
    });
  });

  describe('Caso não seja uma modalidade aceita', () => {
    it('Deve retornar "Modalidade tarifária não aceita"', () => {
      const data = EligibilityService.prototype.modalidadeTarifa(mock.modalidadeTarifaInelegivel);
      expect(data).to.eq('Modalidade tarifária não aceita');
    });
  })
});

describe('Testa a função mediaConsumo', () => {
  it('Deve retornar a média de consumo do cliente com duas casas decimais', () => {
    const media = EligibilityService.prototype.mediaConsumo(mock.historicoConsumo);
    expect(media).to.eq('4978.40');
  });
});

describe('Testa a função consumoMinimo', () => {
  describe('Caso seja elegível', () => {
    it('Deve retornar true', () => {
      const consumo = EligibilityService.prototype.consumoMinimo(mock.historicoConsumo, mock.conexaoMonofasica);
      expect(consumo).to.eq(true);
    });
  });

  describe('Caso não tenha o consumo mínimo necessário', () => {
    it('Em caso de falha deve retornar "Consumo muito baixo para tipo de conexão"', () => {
      const consumo = EligibilityService.prototype.consumoMinimo(mock.historicoConsumoInelegivel, mock.conexaoTrifasica);
      expect(consumo).to.eq('Consumo muito baixo para tipo de conexão');
    });
  });
});

describe('Testa a função reducaoCO2', () => {
  it('Deve retornar a estimativa de quanto CO2 o cliente deixará de emitir em um ano', () => {
    const CO2 = EligibilityService.prototype.reducaoCO2(mock.historicoConsumo);
    expect(CO2).to.eq('5018.23');
  });
});

describe('Testa a função verifyElegibility', () => {
  describe('Caso ocliente seja elegível', () => {
    it('Retorna um array com 3 itens', () => {
      const data = EligibilityService.prototype.verifyElegibility(mock.dataSuccess);
      expect(data).to.have.length(3);
    });
  
    it('Retorna um array onde os 3 items são true', () => {
      const data = EligibilityService.prototype.verifyElegibility(mock.dataSuccess);
      const isTrue = data.every((elem: any) => (elem === true));
      expect(isTrue).to.eq(true);
    });
  });

  describe('Em caso de cliente não elegível', () => {
    it('Retorna um array com 3 itens', () => {
      const data = EligibilityService.prototype.verifyElegibility(mock.dataFailure);
      expect(data).to.have.length(3);
    });

    it('Retorna um array com os motivos da inegibilidade', () => {
      const data = EligibilityService.prototype.verifyElegibility(mock.dataFailure);
      expect(data).to.deep.eq(mock.razoesDeInelegibilidade);
    });
  });
});

describe('Testa a função isElegible', () => {

  describe('Em caso de cliente elegível', () => {
    it('Retorna um objeto', () => {
      const data = EligibilityService.prototype.isElegible(mock.dataSuccess);
      expect(data).to.be.instanceOf(Object);
    });
    it('Retorna um objeto com as chaves "elegivel" e "economiaAnualDeCO2"', () => {
      const data = EligibilityService.prototype.isElegible(mock.dataSuccess);
      expect(data).to.contains.keys('elegivel');
      expect(data).to.contains.keys('economiaAnualDeCO2');
    });
    it('Retorna true para elegivel e o valor da econômia anual de CO2', () => {
      const data = EligibilityService.prototype.isElegible(mock.dataSuccess);
      expect(data).to.deep.equal(mock.responseSuccess);
    });
  });

  describe('Em caso de cliente não elegível', () => {
    it('Retorna um objeto', () => {
      const data = EligibilityService.prototype.isElegible(mock.dataFailure);
      expect(data).to.be.instanceOf(Object);
    });
      it('Retorna false para elegivel e um array com os motivos da inegibilidade', () => {
      const data = EligibilityService.prototype.isElegible(mock.dataFailure);
      expect(data).to.deep.equal(mock.responseFailure);
    });
  });
});
