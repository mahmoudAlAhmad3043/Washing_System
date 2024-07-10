import CarController from '../controllers/carController_.js';
import express from 'express';
const CarRouter = express.Router();

CarRouter.post('/cars/create-car',CarController.addCarCtrl);
CarRouter.post('/cars/edit-car',CarController.editCarCtrl);
CarRouter.delete('/cars/delete-car/:car_id',CarController.deleteCarCtrl);
CarRouter.get('/cars/get-car/:car_plate/:car_description',CarController.getSellectedCarCtrl);


export default CarRouter;
