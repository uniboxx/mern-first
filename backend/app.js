import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { JSONFilePreset } from 'lowdb/node';

const defaultData = { posts: [] };
const db = await JSONFilePreset('db.json', defaultData);
const NODEJS_ENV = process.env.NODEJS_ENV;
console.log(NODEJS_ENV);

const app = express();
const port = 8000;
//^ attenzione l'url non deve finire con lo slash
const FEURL =
  NODEJS_ENV === 'production'
    ? 'https://mern-first-frontend.onrender.com'
    : 'http://localhost:5173';
const BEURL = 'http://localhost:8000';
const corsOptions = { origin: FEURL };

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.listen(port, () => {
  console.log(`Server listening on ${BEURL}`);
});
