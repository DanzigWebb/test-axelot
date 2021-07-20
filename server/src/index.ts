import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// Routers
import loginRouter from './routers/login.router';
import getDataRouter from './routers/get-data.router';
import getFormRouter from './routers/get-form.router';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('I Backend service');
});

app.post('/login', loginRouter);

app.get('/getForm', getFormRouter);
app.get('/getData', getDataRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
