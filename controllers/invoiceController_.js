import InvoiceModel from '../models/invoiceModel_.js';
import CarModel from '../models/carsModel_.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import moment from 'moment';


// {
//     invoice_id: invoice_id,
//     car: {
//         car_id:car_id,
//         car_plate:car_plate,
//         car_size:car_size,
//         car_description:car_description
//     }
//     user_id: user_id,
//     invoice_date: invoice_date,
//     invoice_time: invoice_time,
//     total_amount: total_amount,
//     deducted_amount: deducted_amount,
//     paid_amount: paid_amount
// }

class InvoiceController {
    static testSearchWord(searchWord) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        const integerPattern = /^-?\d+$/;
        const floatPattern = /^-?\d+(\.\d+)?$/;
        const textPattern = /^[A-Za-z0-9_ ]+$/;
        let searchObj = {
            'invoice_date': 'None',
            'invoice_id': -1,
            'amount': -1,
            'car': {
                'car_plate': 'None',
                'car_size': 'None',
                'car_description': 'None'
            }
        }

        if (datePattern.test(searchWord)) {
            searchObj.invoice_date = searchWord;
        } else if (integerPattern.test(searchWord)) {
            searchObj.invoice_id = Number.parseInt(searchWord);
            searchObj.amount = Number.parseFloat(searchWord);
            searchObj.car.car_plate = searchWord;
        } else if (floatPattern.test(searchWord)) {
            searchObj.amount = Number.parseFloat(searchWord);
        } else if (textPattern.test(searchWord)) {
            let arr = ['Large', 'Small', 'Midum']
            if (arr.includes(searchWord)) {
                searchObj.car.car_size = searchWord;
            } else {
                searchObj.car.car_plate = searchWord;
                searchObj.car.car_description = searchWord;
            }
        }
        return searchObj;
    }

    static getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    static getTime24() {
        return moment().format('HH:mm:ss');
    }
    static getTime24_(time12) {
        return moment(time12, 'hh:mm:ss A').format('HH:mm:ss');
    }
    static getTime12() {
        return moment(InvoiceController.getTime24(), 'HH:mm:ss').format('hh:mm:ss A');
    }
    static getTime12_(time24) {
        return moment(time24, 'HH:mm:ss').format('hh:mm:ss A');

    }
    ///////////////////////////////////////////
    static async createInvoiceCtrl(req, res) {
        let token = req.headers.authorization.split(' ')[1];
        let invoice = req.body.invoice;
        invoice.invoice_date = InvoiceController.getCurrentDate();
        invoice.invoice_time = InvoiceController.getTime24();
        config();
        try {
            let result = jwt.verify(token, process.env.SECRET_KEY);
            if (result.userId) {
                invoice.user_id = result.userId;
                await CarModel.addCar(invoice.car)
                    .then(async car => {
                        if (car) {
                            let invoiceObj = {
                                invoice_id: null,
                                car_id: car[0].car_id,
                                user_id: invoice.user_id,
                                invoice_date: invoice.invoice_date,
                                invoice_time: invoice.invoice_time,
                                total_amount: invoice.total_amount,
                                deducted_amount: invoice.deducted_amount,
                                paid_amount: invoice.paid_amount
                            }
                            await InvoiceModel.createInvoice(invoiceObj)
                                .then(result => {
                                    result.forEach(async (element) => {
                                        element.invoice_time = InvoiceController.getTime12_(element.invoice_time);
                                    })
                                    if (result)
                                        res.status(201).json({ result: 'Create invoice successfully', 'data': { 'invoice': result } })
                                    else
                                        res.status(404).json({ result: 'field', error: 'Error', data: [] })
                                }).catch(err => {
                                    res.status(404).json({ result: 'field', error: err, data: [] })
                                })
                        } else {
                            res.status(404).json({ result: 'field', error: "field creat car", data: [] })
                        }

                    }).catch(err => {
                        res.status(404).json({ result: 'field', error: err, data: [] })
                    })
            } else {
                res.status(404).json({ result: 'field', error: 'Create invoice field', data: [] })
            }
        } catch {
            res.status(404).json({ result: 'field', error: 'Create invoice field', data: [] })
        }
    }
    static async editInvoiceCtrl(req, res) {
        let token = req.headers.authorization.split(' ')[1];
        let invoice = req.body.invoice;
        // invoice.invoice_date  = InvoiceController.getCurrentDate();
        invoice.invoice_time = InvoiceController.getTime24_(invoice.invoice_time);
        config();
        try {
            let result = jwt.verify(token, process.env.SECRET_KEY);
            if (result.userId) {
                invoice.user_id = result.userId;
                await CarModel.editCar(invoice.car)
                    .then(async car => {
                        if (car) {
                            let invoiceObj = {
                                invoice_id: invoice.invoice_id,
                                car_id: car[0].car_id,
                                user_id: invoice.user_id,
                                invoice_date: invoice.invoice_date,
                                invoice_time: invoice.invoice_time,
                                total_amount: invoice.total_amount,
                                deducted_amount: invoice.deducted_amount,
                                paid_amount: invoice.paid_amount
                            }
                            await InvoiceModel.editInvoice(invoiceObj)
                                .then(result => {
                                    result.forEach((element) => {
                                        element.invoice_time = InvoiceController.getTime12_(element.invoice_time);
                                    })
                                    if (result)
                                        res.status(200).json({ result: 'Edit invoice successfully', 'data': { 'invoice': result } })
                                    else
                                        res.status(404).json({ result: 'field', error: "Error", data: [] })
                                }).catch(err => {
                                    res.status(404).json({ result: 'field', error: err, data: [] })
                                })
                            }else{
                                res.status(404).json({ result: 'field', error: 'Edit invoice field', data: [] })
                            }
                        }).catch(error=>{
                            res.status(404).json({ result: 'field', error:error, data: [] })
                        })
            } else {
                res.status(404).json({ result: 'field', error: 'Edit invoice field', data: [] })
            }
        } catch {
            res.status(404).json({ result: 'field', error: 'Edit invoice field', data: [] })
        }
    }
    static async deleteInvoiceCtrl(req, res) {
        let token = req.headers.authorization.split(' ')[1];
        let invoice_id = req.params.invoice_id;
        config();
        try {
            let result = jwt.verify(token, process.env.SECRET_KEY);
            if (result.userId) {
                await InvoiceModel.deleteInvoice(invoice_id)
                    .then((result) => {
                        if (result)
                            res.status(200).json({ result: 'delete invoice successfully', 'data': [] })
                        else {
                            res.status(404).json({ result: 'field', error: "Error", data: [] })
                        }
                    }).catch(err => {
                        res.status(404).json({ result: 'field', error: err, data: [] })
                    })
            } else {
                res.status(404).json({ result: 'field', error: 'delete invoice field', data: [] })
            }
        } catch {
            res.status(404).json({ result: 'field', error: 'delete invoice field', data: [] })
        }
    }
    static async getAllInvoicesCtrl(req, res) {
        let token = req.headers.authorization.split(' ')[1];
        config();
        try {
            let result = jwt.verify(token, process.env.SECRET_KEY);
            if (result.userId) {
                await InvoiceModel.getAllInvoices()
                    .then((result) => {
                        result.forEach((element) => {
                            element.invoice_time = InvoiceController.getTime12_(element.invoice_time);
                        })
                        if (result)
                            res.status(200).json({ result: 'get invoices successfully', 'data': result })
                        else {
                            res.status(404).json({ result: 'field', error: "Error", data: [] })
                        }
                    }).catch(err => {
                        res.status(404).json({ result: 'field', error: err, data: [] })
                    })
            } else {
                res.status(404).json({ result: 'field', error: 'field', data: [] })
            }
        } catch {
            res.status(404).json({ result: 'field', error: 'field', data: [] })
        }
    }
    static async getSellectedInvoiceCtrl(req, res) {
        let token = req.headers.authorization.split(' ')[1];
        let searchWord = req.params.searchWord;
        config();
        try {
            let result = jwt.verify(token, process.env.SECRET_KEY);
            if (result.userId) {
                await InvoiceModel.getSellectedInvoice(InvoiceController.testSearchWord(searchWord))
                    .then((result) => {
                        result.forEach((element) => {
                            element.invoice_time = InvoiceController.getTime12_(element.invoice_time);
                        })
                        if (result)
                            res.status(200).json({ result: 'successfully', 'data': result })
                        else {
                            res.status(404).json({ result: 'field', error: "Error", data: [] })
                        }
                    }).catch(err => {
                        res.status(404).json({ result: 'field', error: err, data: [] })
                    })
            } else {
                res.status(404).json({ result: 'field', error: 'field', data: [] })
            }
        } catch {
            res.status(404).json({ result: 'field', error: 'field', data: [] })
        }
    }
}


export default InvoiceController;