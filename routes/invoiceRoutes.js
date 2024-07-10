import InvoiceController from '../controllers/invoiceController_.js';
import express from 'express';
const InvoiceRouter = express.Router();

InvoiceRouter.post('/invoices/create-invoice',InvoiceController.createInvoiceCtrl);
InvoiceRouter.post('/invoices/edit-invoice',InvoiceController.editInvoiceCtrl);
InvoiceRouter.delete('/invoices/delete-invoice/:invoice_id',InvoiceController.deleteInvoiceCtrl);
InvoiceRouter.get('/invoices/all-invoices',InvoiceController.getAllInvoicesCtrl);
InvoiceRouter.post('/invoices/sellected-invoice/:searchWord',InvoiceController.getSellectedInvoiceCtrl);


export default InvoiceRouter;
