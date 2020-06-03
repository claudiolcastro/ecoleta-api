import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
  response.json({ name: 'Cláudio' });
});

export default routes;
