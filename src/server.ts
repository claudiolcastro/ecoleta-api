import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  response.json({ name: 'Cláudio' });
});

app.post('/users', (request, response) => {
  const user = {
    name: 'claudio',
    email: 'claudio@email.com',
  };

  return response.json(user);
});

app.listen(3333);
