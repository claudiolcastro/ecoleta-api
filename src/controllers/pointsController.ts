import { Request, Response } from 'express';
import Knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await Knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point')
      .whereIn('point_items.item', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .select('points.*');

    return response.json(points);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await Knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: `Point not found with ID: ${id}` });
    }

    const items = await Knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item')
      .where('point_items.point', id)
      .select('items.title');

    return response.json({ point, items });
  }

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

    const trx = await Knex.transaction();

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

    const insertedIds = await trx('points').insert(point);

    const pointItems = items.map((itemId: number) => ({
      item: itemId,
      point: insertedIds[0],
    }));

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return response.json({
      id: insertedIds[0],
      ...point,
    });
  }
}

export default PointsController;
