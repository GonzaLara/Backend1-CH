import { Router } from "express";

const router = Router();

// Array para almacenar los productos
export let products = [];

// Obtener todos los recursos
router.get('/', (req, res)=>{
    res.json(products);
});

// Ruta GET /api/products/:pid (obtener producto por ID)
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = products.find(prod => prod.id === pid);
    if (product) {
       res.json(product);
    } else {
       res.status(404).json({ message: 'Producto no encontrado.' });
    }
});
 
 // Ruta POST /api/products (agregar nuevo producto)
 router.post('/', (req, res) => {
    const { id, title, description, code, price, status, stock, category } = req.body;

    // Validacion de datos
    if (!id || !title || !description || !code || !price || !status || !stock || !category) {
        return res.status(400).json({ message: 'Completar todos los campos.' });
    }

    // Verificacion para que no haya un producto con el mismo ID
    const existingProduct = products.find(prod => prod.id === id || prod.code === code);
    if (existingProduct) {
        return res.status(400).json({ message: 'Ya existe un producto con ese ID.' });
    }

    const newProduct = { id, title, description, code, price, status, stock, category };
    products.push(newProduct);
    res.status(201).json(newProduct);
});


 // Ruta PUT /api/products/:pid (actualizar producto por ID)
 router.put('/:pid', (req, res) => {
    const { pid } = req.params;
    const { id, ...updatedFields } = req.body;

    const productIndex = products.findIndex(prod => prod.id === pid);
    if (productIndex !== -1) {
       products[productIndex] = { ...products[productIndex], ...updatedFields };
       res.json(products[productIndex]);
    } else {
       res.status(404).json({ message: 'Producto no encontrado.' });
    }
});
 
 // Ruta DELETE /api/products/:pid (eliminar producto por ID)
 router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const productIndex = products.findIndex(prod => prod.id === pid);
    if (productIndex !== -1) {
       products.splice(productIndex, 1);
       res.status(204).end();
    } else {
       res.status(404).json({ message: 'Producto no encontrado.' });
    }
});

export default router;