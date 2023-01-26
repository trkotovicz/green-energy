
enum tipoConexao {
  monofasica = 'monofasica',
  bifasica = 'bifasica',
  trifasica = 'trifasica'
}

enum classeConsumo {
  residencial = 'residencial',
  industrial = 'industrial',
  comercial = 'comercial',
  rural = 'rural',
  poderPublico = 'poderPublico'
}

enum modalidadeTarifa {
  azul = 'azul',
  branca = 'branca',
  verde = 'verde',
  convencional = 'convencional'
}

export default interface IEligibility {
  numeroDoDocumento: string,
  tipoDeConexao: tipoConexao,
  classeDeConsumo: classeConsumo,
  modalidadeTarifaria: modalidadeTarifa,
	historicoDeConsumo: Array<number>
}
