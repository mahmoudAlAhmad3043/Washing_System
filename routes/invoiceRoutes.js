import InvoiceController from '../controllers/invoiceController_.js';
import express from 'express';
const InvoiceRouter = express.Router();

InvoiceRouter.post('/invoices/createInvoice',InvoiceController.createInvoiceCtrl);
InvoiceRouter.post('/invoices/editInvoice',InvoiceController.editInvoiceCtrl);
InvoiceRouter.delete('/invoices/deleteInvoice/:invoice_id',InvoiceController.deleteInvoiceCtrl);
InvoiceRouter.get('/invoices/AllInvoices',InvoiceController.getAllInvoicesCtrl);
InvoiceRouter.post('/invoices/sellectedInvoice/:searchWord',InvoiceController.getSellectedInvoiceCtrl);


export default InvoiceRouter;