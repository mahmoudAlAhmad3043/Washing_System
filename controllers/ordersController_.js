import OrdersModel from '../models/ordersModel_.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

class OrdersController{
    static async addOrderCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let order = req.body.order;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await OrdersModel.addOrder(order)
                .then(result =>{
                    res.status(201).json({result:'Add Order Successfully',data:{'order':result}})
                }).catch(error =>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:"Add order field",data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:"Add order field",data:[]})
        }
    }

    static async deleteOrderCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let order_id = req.params.order_id;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await OrdersModel.deleteOrder(order_id)
                .then(result =>{
                    if(result)
                        res.status(200).json({result:'Delete Order Successfully',data:[]})
                    else
                        res.status(404).json({result:'field',error:"Delete order field",data:[]})
                }).catch(error =>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:"Delete order field",data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:"Delete order field",data:[]})
        }
    }

    static async getOrdersByInvoiceIdCtrl(req,res){
        let token = req.headers.authorization.split(' ')[1];
        let invoice_id = req.params.invoice_id;
        config();
        try{
            let result = jwt.verify(token,process.env.SECRET_KEY);
            if(result.userId){
                await OrdersModel.getOrdersByInvoiceId(invoice_id)
                .then(orders =>{
                    if(orders)
                        res.status(200).json({result:'Successfully',data:orders})
                    else
                        res.status(404).json({result:'field',error:"field",data:[]})
                }).catch(error =>{
                    res.status(404).json({result:'field',error:error,data:[]})
                })
            }else{
                res.status(404).json({result:'field',error:"field",data:[]})
            }
        }catch{
            res.status(404).json({result:'field',error:"field",data:[]})
        }
    }
}

export default OrdersController;