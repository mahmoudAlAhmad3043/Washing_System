import db from '../config/db.js';



class OrdersModel {
    static async addOrder(order) {
        return new Promise((resolve, reject) => {
            db('Washing_orders').insert(order)
                .then(result => {
                    if (result) {
                        return db('Washing_orders')
                            .select('*')
                            .where('order_id', function () {
                                this.select(db.raw('max(order_id)')).from('Washing_orders')
                            }).then(order => {
                                if (order) {
                                    // order_id , service_id , invoice_id
                                    let order_id = order[0].order_id;
                                    let service_id = order[0].service_id;
                                    let invoice_id = order[0].invoice_id;
                                    console.log(order_id);
                                    return db('Services').select('*')
                                        .where('service_id', service_id)
                                        .then(service => {
                                            if(service) resolve({ 'order_id': order_id, 'invoice_id': invoice_id, 'service': service })
                                            else reject("Add order field")
                                        }).catch(error => {
                                            reject(error)
                                        })
                                } else {
                                    reject("Add order field");
                                }

                            }).catch(error => {
                                reject(error)
                            })
                    } else {
                        reject("Add order field")
                    }
                }).catch(error => {
                    reject(error);
                })
        })
    }

    static async deleteOrder(order_id){
        return new Promise((resolve,reject)=>{
            db('Washing_orders')
            .delete()
            .where('order_id',order_id)
            .then(result =>{
                if(result) resolve(result);
                else reject("Delete order field");
            }).catch(error =>{
                reject(error)
            })
        })
    }

    static async getOrdersByInvoiceId(invoice_id){
        return new Promise((resolve,reject)=>{
            db('Services')
            .select('*')
            .join('Washing_orders','Services.service_id','Washing_orders.service_id')
            .where('Washing_orders.invoice_id',invoice_id)
            .then(result =>{
                if(result){
                    resolve(result);
                }else{
                    reject("field");
                }
            }).catch(error =>{
                reject(error);
            })
        })
    }
}

export default OrdersModel;