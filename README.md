# Green Energy 🌿

Serviço desenvolvidado a fim de verificar se o cliente é elegível para fazer parte da Green, ou não.

### Contexto:
Nem todos os clientes que desejam fazer parte da Green podem ser aceitos no momento. Seja por razões regulatórias ou porque não vale a pena para o cliente ou para a Green ter essa empresa como cliente. No processo de aquisição de clientes, fazemos a checagem de elegibilidade da mesma, através dos dados contidos na conta de luz do cliente. Caso a empresa não seja elegível, precisamos explicitar os motivos para tal. Caso ela seja elegível, precisamos calcular também a projeção da quantidade de CO2 que ela deixaria de emitir caso usasse energia limpa.

## Ferramentas utilizadas

A aplicação foi desenvolvida em Node.js, utilizando Typescript, Express.js e Swagger para a documentação. </br>
Para os testes unitários e de integração, foi utilizado Mocha e Chai.

## Inicialização da Aplicação

### Inicialização via Docker 🐳

1. Clone o repositório `git@github.com:trkotovicz/green-energy-eligibility.git`.
2. Na raíz do repositório, abra o terminal e rode o comando `npm run compose:up` e aguarde a alicação subir (esse passo pode demorar um pouco).
3. Para encerrar a aplicação, rode o comando `npm run compose:down`.

### Inicialização local 🖥

1. Clone o repositório `git@github.com:trkotovicz/green-energy-eligibility.git`.
2. Na raíz do repositório instale as dependências e inicialize o projeto com o comando `npm start`.
3. Abra o navegador no endereço `http://localhost:3001/docs/#/` para testar a API.

## Testes

Para testar a aplicação, depois de ter instalado as dependências, basta abrir o terminal na raíz do repositório e rodar o comando `npm test` ou `npm run test`.

## API

Com a aplicação rodando acesse a [documentação da API](http://localhost:3001/docs/#/). </br>


### Critérios de Elegibilidade

Para checar a elegibilidade iremos aplicar os seguintes critérios:

- Classe de consumo da cliente
    - Possíveis Valores: Comercial, Residencial, Industrial, Poder Público, e Rural.
    - Elegíveis: Comercial, Residencial e Industrial.
- Modalidade tarifária
    - Possíveis Valores: Branca, Azul, Verde, e Convencional.
    - Elegíveis: Convencional, Branca.
- Consumo mínimo do cliente
    - O cálculo deve ser feito utilizando a média dos 12 valores mais recentes do histórico de consumo.
        - Clientes com tipo de conexão Monofásica só são elegíveis caso tenham consumo médio acima de 400 kWh.
        - Clientes com tipo de conexão Bifásica só são elegíveis caso tenham consumo médio acima de 500 kWh.
        - Clientes com tipo de conexão Trifásica só são elegíveis caso tenham consumo médio acima de 750 kWh.
- Para calcular a projeção da **economia anual** de CO2, considere que para serem gerados 1000 kWh no Brasil são emitidos em média 84kg de CO2.

---

Projeto desenvolvido por [Thais R Kotovicz](https://www.linkedin.com/in/thaiskotovicz/).
</br>
