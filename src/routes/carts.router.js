import { Router } from "express";
import { products } from './products.router.js';

const router = Router();

// Array para almacenar los carritos
let carts = [];

// Ruta POST /api/carts (crear nuevo carrito)
router.post('/', (req, res) => {
    const { id, products = [] } = req.body;
    const newCart = { id, products };
    carts.push(newCart);
    res.status(201).json(newCart);
});

// Ruta GET /api/carts/:cid (obtener productos del carrito por ID)
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(carrito => carrito.id === cid);
    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado.' });
    }
    res.json(cart.products);
});

// Ruta POST /api/carts/:cid/products/:pid (agregar producto al carrito)
router.post('/:cid/products/:pid', (req, res) => {
    const { cid, pid } = req.params;

    // Buscar carrito
    const cart = carts.find(carrito => carrito.id === cid);
    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado.' });
    }

    // Verificar si el producto existe en el array de productos
    const product = products.find(prod => prod.id === pid);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    // Buscar si el producto ya existe en el carrito
    const productInCart = cart.products.find(p => p.product === pid);
    if (productInCart) {
        productInCart.quantity += 1; // Incrementar la cantidad
    } else {
        cart.products.push({ product: pid, quantity: 1 }); // Agregar nuevo producto
    }

    res.json(cart);
});

export default router;
