import { Request, Response } from 'express';
import Knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await Knex('items').select('*');

    const serializedItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      image: `http://192.168.0.191:3333/uploads/${item.image}`,
    }));

    return response.json(serializedItems);
  }
}

export default ItemsController;
