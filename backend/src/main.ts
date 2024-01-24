import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { propertyRoutes } from './routes/';

const app = express();
const port = process.env.PORT || 3000;

// Helmet
app.use(helmet());

// Cors
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello! :3');
});

// Routes
app.use('/properties', propertyRoutes);

// Server
app.listen(port, () => {
  console.log(`Server runner in http://localhost:${port}`);
});
