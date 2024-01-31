import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { propertyRoutes } from './routes/';
import mongoConnect from './config/database/mongoConfig';

const app = express();
const port = process.env.PORT || 3000;

// Connect MongoDB
mongoConnect();

// Helmet
app.use(helmet());

// Cors
app.use(cors());

// Middleware Json
app.use(express.json());

// Carregando o arquivo YAML
const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, 'swaggerConfig.yaml'), 'utf8'),
);

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello! :3');
});

// Routes
app.use('/propertys', propertyRoutes);

// Server
app.listen(port, () => {
  console.log(`Server runner in http://localhost:${port}`);
});
