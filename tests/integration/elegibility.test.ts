import chai from'chai';
import chaiHttp from'chai-http';
import app from'../../src/api/server';
import { mock } from'../mocks/eligibilityMocks';

const { expect } = chai;
chai.use(chaiHttp);

describe('Fazendo a requizição com o método POST em /lemon para verificar a elegibilidade do cliente', () => {
  describe('Em caso de cliente elegivel', () => {
    it('Retorna o status 200 e um json com as propriedades corretas', async () => {
      const response = await chai.request(app).post('/lemon').send(mock.dataSuccess);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('elegivel');
      expect(response.body).to.haveOwnProperty('economiaAnualDeCO2');
      expect(response.body).to.deep.equal(mock.responseSuccess);
    });
  });

  describe('Em caso de cliente não elegivel', () => {
    it('Retorna o status 200 e um json com as propriedades corretas', async () => {
      const response = await chai.request(app).post('/lemon').send(mock.dataFailure);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.haveOwnProperty('elegivel');
      expect(response.body).to.haveOwnProperty('razoesDeInelegibilidade');
      expect(response.body.razoesDeInelegibilidade).to.be.instanceOf(Array)
      expect(response.body).to.deep.equal(mock.responseFailure);
    });
  });
});
