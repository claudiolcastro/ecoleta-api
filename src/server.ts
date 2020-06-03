import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json({ name: 'Cláudio' })
});

app.listen(3333);
