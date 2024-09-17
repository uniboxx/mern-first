import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;
const FEURL = process.env.FEURL;
const BEURL = process.env.BEURL;
const corsOptions = { origin: FEURL };

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ message: 'hello world' });
});

app.listen(port, () => {
  console.log(`Server listening on ${BEURL}`);
});
