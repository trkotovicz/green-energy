import { IEligibility, tipoConexao, classeDeConsumo, modalidadeTarifaria } from '../interfaces/IEligibility';
import { validateCpf, validateCnpj, eligibilitySchema } from '../utils/validations';

export default class EligibilityService {
  validateData = (data: IEligibility) => {
    const { numeroDoDocumento } = data;
    if (String(numeroDoDocumento).length === 11) validateCpf(numeroDoDocumento);
    if (String(numeroDoDocumento).length === 14) validateCnpj(numeroDoDocumento);
    eligibilitySchema(data);
    return true;
  };
  
  classeConsumo = (classe: classeDeConsumo) => {
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
  
  modalidadeTarifa = (modalidade: modalidadeTarifaria) => {
    switch (modalidade.toLowerCase()) {
      case 'convencional':
        return true;
      case 'branca':
        return true;
      default:
        return 'Modalidade tarifária não aceita';
    }
  };
  
  mediaConsumo = (historico: Array<number>): string => {
    const tamanho = historico.length;
    const soma = historico.reduce((acc, curr) => acc + curr, 0);
    return (soma / tamanho).toFixed(2);
  };
  
  consumoMinimo = (historico: Array<number>, conexao: tipoConexao) => {
    const media = this.mediaConsumo(historico);
    const minTiposConexao = {
      monofasica: 400,
      bifasica: 500,
      trifasica: 750,
    };
    if (Number(media) > minTiposConexao[conexao]) return true;
    return 'Consumo muito baixo para tipo de conexão';
  };
  
  reducaoCO2 = (consumo: Array<number>) => {
    const consumoAnual = Number(this.mediaConsumo(consumo)) * 12;
    return (consumoAnual * 0.084).toFixed(2);
  };
  
  verifyElegibility = (data: IEligibility) => {
    this.validateData(data);
    const { tipoDeConexao, classeDeConsumo, modalidadeTarifaria, historicoDeConsumo } = data;
    const classe = this.classeConsumo(classeDeConsumo);
    const modalidade = this.modalidadeTarifa(modalidadeTarifaria);
    const consumo = this.consumoMinimo(historicoDeConsumo, tipoDeConexao);
    return [classe, modalidade, consumo];    
  };
  
  isElegible = (data: IEligibility) => {
    const results = this.verifyElegibility(data);
    
    const razoesDeInelegibilidade: (string | boolean)[] = [];
    results.filter((elemento) => {
      if (elemento !== true) return razoesDeInelegibilidade.push(elemento);
      return false;
    });
    if (razoesDeInelegibilidade.length) return { elegivel: false, razoesDeInelegibilidade };
  
    const { historicoDeConsumo } = data;
    const economiaCO2 = this.reducaoCO2(historicoDeConsumo);
    return {
      elegivel: true,
      economiaAnualDeCO2: Number(economiaCO2),
    };
  };
}
