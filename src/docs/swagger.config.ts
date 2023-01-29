const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Lemnon Energy',
      description: `API que verifica a elegibilidade do cliente.`,
      version: '1.0.0',
    },
    servers: [{
      url: 'http://localhost:3001',
      description: 'servidor local',
    }],
  },
  apis: [
    './src/routes/Eligibility.ts',
  ],
};

export default swaggerConfig;
