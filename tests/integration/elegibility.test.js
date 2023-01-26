const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/api/app');
const { dataSuccess, responseSuccess, dataFailure, responseFailure } = require('../mocks/eligibilityMocks');

const { expect } = chai;
chai.use(chaiHttp);

describe('Fazendo a requizição com o método POST em /lemon para verificar a elegibilidade do cliente', () => {
  describe('Em caso de cliente elegivel', () => {
    it('Retorna o status 200 e um json com as propriedades corretas', async () => {
      const response = await chai.request(app).post('/lemon').send(dataSuccess);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('elegivel');
      expect(response.body).to.haveOwnProperty('economiaAnualDeCO2');
      expect(response.body).to.deep.equal(responseSuccess);
    });
  });

  describe('Em caso de cliente não elegivel', () => {
    it('Retorna o status 200 e um json com as propriedades corretas', async () => {
      const response = await chai.request(app).post('/lemon').send(dataFailure);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('elegivel');
      expect(response.body).to.haveOwnProperty('razoesDeInelegibilidade');
      expect(response.body.razoesDeInelegibilidade).to.be.instanceOf(Array)
      expect(response.body).to.deep.equal(responseFailure);
    });
  });
});
