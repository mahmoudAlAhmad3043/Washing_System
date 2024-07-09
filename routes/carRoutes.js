import CarController from '../controllers/carController_.js';
import express from 'express';
const CarRouter = express.Router();

CarRouter.post('/cars/createCar',CarController.addCarCtrl);
CarRouter.post('/cars/editCar',CarController.editCarCtrl);
CarRouter.delete('/cars/deleteCar/:car_id',CarController.deleteCarCtrl);
CarRouter.get('/cars/getCar/:car_plate/:car_description',CarController.getSellectedCarCtrl);


export default CarRouter;