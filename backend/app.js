import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = 8000;
const FEURL = 'https://mern-first-frontend.onrender.com/';
const BEURL = 'http://localhost:8000';
const corsOptions = { origin: FEURL };

app.use(express.json());
app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', FEURL);
//   next();
// });

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.listen(port, () => {
  console.log(`Server listening on ${BEURL}`);
});
