export enum tipoConexao {
  monofasica = 'monofasica',
  bifasica = 'bifasica',
  trifasica = 'trifasica'
}

export enum classeDeConsumo {
  residencial = 'residencial',
  industrial = 'industrial',
  comercial = 'comercial',
  rural = 'rural',
  poderPublico = 'poderPublico'
}

export enum modalidadeTarifaria {
  azul = 'azul',
  branca = 'branca',
  verde = 'verde',
  convencional = 'convencional'
}

export interface IEligibility {
  numeroDoDocumento: string,
  tipoDeConexao: tipoConexao,
  classeDeConsumo: classeDeConsumo,
  modalidadeTarifaria: modalidadeTarifaria,
	historicoDeConsumo: Array<number>
}
