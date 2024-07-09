import express from 'express';
import cors from 'cors'
import UsersRouter from './routes/userRoute.js'; 
import InvoiceRouter from './routes/invoiceRoutes.js'
import CarRouter from './routes/carRoutes.js'
import ServiceRouter from './routes/servicesRoutes.js';
import OrdersRouter from './routes/ordersRoutes.js';
const app = express();
app.use(express.json());
app.use(cors());


app.use('/app',UsersRouter);
app.use('/app',InvoiceRouter);
app.use('/app',CarRouter);
app.use('/app',ServiceRouter);
app.use('/app',OrdersRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

