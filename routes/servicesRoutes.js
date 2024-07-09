import ServiceController from "../controllers/serviceController_.js";
import express from 'express';
const ServiceRouter = express.Router();


ServiceRouter.post('/services/addService',ServiceController.addServiceCtrl);
ServiceRouter.post('/services/editService',ServiceController.editServiceCtrl);
ServiceRouter.delete('/services/deleteService/:service_id',ServiceController.deleteServiceCtrl);
ServiceRouter.get('/services/getServices',ServiceController.getAllServicesCtrl);
ServiceRouter.post('/services/sellectedServices/:searchWord',ServiceController.getSellectedServiceCtrl);

export default ServiceRouter;