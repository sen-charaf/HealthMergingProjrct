import express, { Application }  from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './routes/index.js'
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const app: Application = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api',routes); 

app.get('/', (req, res) => {
  res.send('Healthcare API is running');
});

export default app;
