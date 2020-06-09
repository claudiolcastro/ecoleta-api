import express from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';

import PointsController from '../controllers/pointsController';
import ItemsController from '../controllers/itemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const intemsController = new ItemsController();

routes.get('/items', intemsController.index);

routes.post('/points', upload.single('image'), pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
