require('dotenv/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');//import cors library

//Importar routers
const productsRouter = require('./routers/products');
const categoryRouter = require('./routers/category');
const orderItemsRouter = require('./routers/orderItems');
const orderRouter = require('./routers/orders');
const usersRouter = require('./routers/users');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

//Enable CORS
app.use(cors());
app.options('*', cors());

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler)

const api = process.env.API_URL;

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/orders`, orderRouter);
app.use(`${api}/orderItems`, orderItemsRouter);

//Conexion con MongoDB
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database connection is ready');
})
.catch(()=>{
    console.log(error);
})

//Inicio de servidor
app.listen(3000, ()=>{
    console.log('Server is running in port 3000');
})