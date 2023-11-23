const sonarqubeScanner = require('sonarqube-scanner');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.sources': './src', // Ruta a tus archivos fuente TypeScript
      'sonar.inclusions': '**/*.ts', // Patrón de inclusión para archivos TypeScript
      'sonar.ts.tscconfigpath': path.resolve('./tsconfig.json'), // Ruta al archivo tsconfig.json
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov-report/*.lcov', // Si estás generando informes de cobertura
      'sonar.token': `${process.env.SONAR_TOKEN}` || '', // Reemplaza 'TU_TOKEN_AQUI' con tu token generado
    },
  },
  () => process.exit()
);
