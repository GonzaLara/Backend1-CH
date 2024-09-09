import express from 'express';

//Routers
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

//Inicializacion del servidor
app.listen(8080, () => {
    console.log("El servidor esta escuchando.");
})

//Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Se implementan los routers creados (endpoints raiz)
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


