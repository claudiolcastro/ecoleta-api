import express from 'express';
import Knex from 'knex';

const routes = express.Router();

routes.get('/', (request, response) => {
  response.json({ name: 'Cláudio' });
});

routes.get('/items', async (request, response) => {
  const items = await Knex('items').select('*');

  const serializedItems = items.map((item) => ({
    title: item.title,
    image: `http://localhost:3333/uploads/${item.image}`,
  }));

  return response.json(serializedItems);
});

export default routes;
