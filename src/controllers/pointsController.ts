import { Request, Response } from 'express';
import Knex from '../database/connection';

class PointsController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      city,
      uf,
      items,
    } = request.body;

    // const trx = await Knex.transaction();

    const point = {
      image: 'mock_image',
      name,
      email,
      whatsapp,
      longitude,
      latitude,
      city,
      uf,
    };

    const insertedIds = await Knex('points').insert(point);

    const pointItems = items.map((itemId: number) => ({
      item: itemId,
      point: insertedIds[0],
    }));

    await Knex('point_items').insert(pointItems);

    return response.json({
      id: insertedIds[0],
      ...point,
    });
  }
}

export default PointsController;
