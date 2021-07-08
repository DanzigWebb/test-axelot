import express from 'express';
import cors from 'cors';
import getDataRouter from './routers/get-data.router';
import getFormRouter from './routers/get-form.router';

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('I Backend service');
});

app.get('/getForm', getFormRouter);
app.get('/getData', getDataRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
