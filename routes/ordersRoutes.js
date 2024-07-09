import  OrdersController from '../controllers/ordersController_.js';
import express from 'express';
const OrdersRouter = express.Router();


OrdersRouter.post('/orders/addOrder',OrdersController.addOrderCtrl);
OrdersRouter.delete('/orders/deleteOrder/:order_id',OrdersController.deleteOrderCtrl);
OrdersRouter.get('/orders/getOrders/:invoice_id',OrdersController.getOrdersByInvoiceIdCtrl);


export default OrdersRouter;