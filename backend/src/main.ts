import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
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

app.get('/', (req, res) => {
  res.send('Hello! :3');
});

// Routes
app.use('/propertys', propertyRoutes);

// Server
app.listen(port, () => {
  console.log(`Server runner in http://localhost:${port}`);
});
