import ServiceController from "../controllers/serviceController_.js";
import express from 'express';
const ServiceRouter = express.Router();


ServiceRouter.post('/services/add-service',ServiceController.addServiceCtrl);
ServiceRouter.post('/services/edit-service',ServiceController.editServiceCtrl);
ServiceRouter.delete('/services/delete-service/:service_id',ServiceController.deleteServiceCtrl);
ServiceRouter.get('/services/get-services',ServiceController.getAllServicesCtrl);
ServiceRouter.post('/services/sellected-services/:searchWord',ServiceController.getSellectedServiceCtrl);

export default ServiceRouter;
