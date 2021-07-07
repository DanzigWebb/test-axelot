import express from 'express';
import getFormRouter from './routers/get-form.router';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('I Backend service');
});

app.get('/getForm', getFormRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
