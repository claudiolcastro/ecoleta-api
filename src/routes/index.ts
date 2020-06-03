import express from 'express';

import PointsController from '../controllers/pointsController';
import ItemsController from '../controllers/itemsController';

const routes = express.Router();
const pointsController = new PointsController();
const intemsController = new ItemsController();

routes.get('/', (request, response) => {
});

routes.get('/items', intemsController.index);

routes.post('/points', pointsController.create);

export default routes;
