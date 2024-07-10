import  OrdersController from '../controllers/ordersController_.js';
import express from 'express';
const OrdersRouter = express.Router();


OrdersRouter.post('/orders/add-order',OrdersController.addOrderCtrl);
OrdersRouter.delete('/orders/delete-order/:order_id',OrdersController.deleteOrderCtrl);
OrdersRouter.get('/orders/get-orders/:invoice_id',OrdersController.getOrdersByInvoiceIdCtrl);


export default OrdersRouter;
