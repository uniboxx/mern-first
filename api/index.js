import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { addTodo, deleteTodo, getTodos } from './db-actions.js';

const app = express();
const port = 3000;

const NODEJS_ENV = process.env.NODEJS_ENV;
console.log(NODEJS_ENV);

//^ attenzione l'url non deve finire con lo slash
const FEURL =
  NODEJS_ENV === 'production'
    ? 'https://mern-first-frontend.onrender.com'
    : 'http://localhost:5173';

const corsOptions = { origin: FEURL };

app.use(express.json());
app.use(express.text());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

//- route get todos
app.get('/todos', (req, res) => {
  getTodos(res);
});

//- route add todo
app.post('/todos', (req, res) => {
  addTodo(req, res);
});

//- route del todo
app.delete('/todos', (req, res) => {
  deleteTodo(req.body, res);
});

app.listen(port, () => {
  if (NODEJS_ENV === 'development')
    console.log(`✅ Server listening on http://localhost:${port}`);
});
