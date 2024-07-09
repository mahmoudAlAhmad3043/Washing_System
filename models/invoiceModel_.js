import db from '../config/db.js';

class InvoiceModel {
    // create invoice ..
    // in: data
    // out : invoice_id
    static async createInvoice(invoice) {
        return new Promise((resolve, reject) => {
            db('Invoices').insert(invoice)
                .then((result) => {
                    if (result) {
                        return db('Invoices')
                            .select('*')
                            .join('Cars','Invoices.car_id','Cars.car_id')
                            .where('invoice_id', function () {
                                this.select(db.raw('max(invoice_id)')).from('Invoices');
                            })
                            .then(result => {
                                if (result) {
                                    resolve(result);
                                } else {
                                    reject("created invoice field");
                                }
                            }).catch(err => {
                                reject(err);
                            })
                    } else {
                        reject("created invoice field")
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    // update invoice
    static async editInvoice(invoice) {
        return new Promise((resolve, reject) => {
            db('Invoices').where('invoice_id',invoice.invoice_id).update(
                invoice
            )
                .then((result) => {
                    if (result) {
                        return db('Invoices')
                            .select('*')
                            .join('Cars','Invoices.car_id','Cars.car_id')
                            .where('invoice_id', invoice.invoice_id)
                            .then(result => {
                                if (result) {
                                    resolve(result);
                                }else{
                                    reject("updated invoice field");
                                }
                            }).catch(err => {
                                reject(err);
                            })
                    } else {
                        reject("created invoice field")
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static async deleteInvoice(invoice_id) {
        return new Promise((resolve, reject) => {
            db('Invoices').delete().where('invoice_id', invoice_id)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    static async getAllInvoices() {
        return new Promise((resolve, reject) => {
            db('Invoices').select('*')
            .join('Cars','Invoices.car_id','Cars.car_id')
            .orderByRaw('invoice_id desc')
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    static async getSellectedInvoice(searchWord) {
        return new Promise((resolve,reject)=>{
            db('Invoices').select('*')
            .join('Cars','Invoices.car_id','Cars.car_id')
            .where('invoice_id',searchWord.invoice_id)
            .orWhere('Cars.car_plate','like',`%${searchWord.car.car_plate}%`)
            .orWhere('Cars.car_size','like',`%${searchWord.car.car_size}%`)
            .orWhere('Cars.car_description','like',`%${searchWord.car.car_description}%`)
            .orWhere('invoice_date',searchWord.invoice_date)
            .orWhere('total_amount',searchWord.amount)
            .orWhere('deducted_amount',searchWord.amount)
            .orWhere('paid_amount',searchWord.amount)
            .orderByRaw('invoice_id desc')
            .then(result=>{
                resolve(result);
            })
            .catch(error=>{
                reject(error);
            })
        })
    }
}


export default InvoiceModel;